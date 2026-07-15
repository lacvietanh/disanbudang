# Backend — Hướng Dẫn Vận Hành & Tìm Hiểu

> **Đối tượng:** Owner dự án — không cần biết code, chỉ cần hiểu luồng và biết cách đọc dữ liệu.

---

## 1. Tổng quan — Cái gì chạy ở đâu?

```
Trình duyệt người dùng
        │
        │  HTTPS request
        ▼
┌─────────────────────────────────────────────────────────┐
│              Cloudflare Edge (CDN + WAF)                 │
│  • Chặn bot/DDoS tự động (miễn phí)                     │
│  • Inject header CF-Connecting-IP (IP thật của user)     │
│  • Phân phối static files (HTML/JS/CSS)                  │
└──────────────┬──────────────────────────────────────────┘
               │  /api/* requests
               ▼
┌─────────────────────────────────────────────────────────┐
│         Cloudflare Pages Functions (Nitro/Nuxt)          │
│  • Chạy code TypeScript phía server (server/api/*.ts)    │
│  • Kết nối D1 Database                                   │
│  • Verify Firebase token, check Turnstile                │
└──────────────┬──────────────────────────────────────────┘
               │  SQL queries
               ▼
┌─────────────────────────────────────────────────────────┐
│           Cloudflare D1 (SQLite trên cloud)              │
│  Bảng: users · contributions · visitor_logs · ratings    │
└─────────────────────────────────────────────────────────┘
```

**Firebase** chỉ làm 1 việc duy nhất: xác thực danh tính (login Google). ọi Firebase** — hoàn toàn offline verify bằng mật mã học.Sau khi user login, Firebase cấp cho họ một **ID Token** (chuỗi JWT). Token này được gửi lên server để chứng minh "tôi là người này". Server tự verify token mà **không cần g

---

## 2. Ba luồng request chính

---

### Luồng A — Người dùng gửi đóng góp (`/contribute`)

```
[Người dùng] → điền form 3 bước → bấm Gửi
                                       │
                              [Turnstile widget]
                              • Hiện challenge nhỏ
                              • Cấp token xác minh "không phải bot"
                                       │
                    POST /api/contribute
                    body: { type, title, content, authorName,
                            authorRole, heritageId, turnstileToken }
                                       │
                    [Server] bước 1: requireClient()
                    ├── Kiểm tra Origin header = disanbudang.com
                    ├── Lấy CF-Connecting-IP (IP thật do CF inject)
                    └── Gọi Cloudflare API verify Turnstile token
                              │ nếu token hợp lệ
                    [Server] bước 2: Validate dữ liệu
                    ├── type ∈ ['story','photo','document','memory','artwork','research']
                    ├── title: 5–200 ký tự
                    └── content: 20–10.000 ký tự
                              │ nếu hợp lệ
                    [D1] INSERT INTO contributions
                         status = 'pending'
                              │
                    [Response] { ok: true, id: "uuid..." }
                                       │
                    [Người dùng thấy] "Cảm ơn! Đang chờ duyệt."
```

**Bạn thấy request này bằng cách nào?**
```bash
# Xem danh sách pending trên remote D1:
wrangler d1 execute disanbudang-db --remote \
  --command="SELECT id, type, author_name, title, created_at FROM contributions WHERE status='pending' ORDER BY created_at DESC LIMIT 20"

# Hoặc vào Admin Panel: disanbudang.com/admin/contributions
```

---

### Luồng B — Bạn (admin) duyệt bài

```
[Bạn] → vào /admin → Google Sign-In
                           │
              [Firebase Auth] → cấp ID Token (JWT, hết hạn sau 1 giờ)
                           │
              [Admin Panel] lưu token vào bộ nhớ tạm
                           │
              Bạn bấm "Approve" một bài
                           │
              PATCH /api/admin/contributions/:id
              header: Authorization: Bearer eyJhbGci...  ← ID Token
              body: { status: "approved", review_note: "..." }
                           │
              [Server] bước 1: requireAdmin()
              ├── Đọc token từ header
              ├── Tách JWT thành 3 phần (header.payload.signature)
              ├── Fetch Google public keys (cache 1h)
              │   URL: googleapis.com/service_accounts/v1/jwk/securetoken@...
              ├── Verify chữ ký RSA256 bằng crypto.subtle (native CF)
              ├── Verify: iss = securetoken.google.com/disanbudang
              ├── Verify: aud = disanbudang
              ├── Verify: exp > now (chưa hết hạn)
              └── Verify: email = nguyenxuankiet294@gmail.com
                           │ nếu tất cả đúng
              [D1] UPDATE contributions
                   SET status='approved', reviewed_by='email@...', reviewed_at=now
                           │
              [Admin Panel] refresh danh sách
```

**Firebase token hoạt động như thế nào?**

Firebase ID Token là một chuỗi JSON Web Token (JWT) gồm 3 phần ngăn cách bởi dấu chấm:
```
eyJhbGciOiJSUzI1NiIsImtpZCI6Ii4uLiJ9   ← Header (base64): { alg, kid }
.
eyJlbWFpbCI6InlvdUBleGFtcGxlLmNvbSIsImV4cCI6MTc1MC4uLn0  ← Payload: { email, exp, iss... }
.
MEUCIQD...                               ← Chữ ký RSA256
```

Server decode 3 phần này, lấy `kid` từ header, tìm public key tương ứng của Google, xác minh chữ ký. Nếu chữ ký hợp lệ → token thật, không bị làm giả. **Không cần gọi Firebase** — Google public key là công khai và server tự verify offline.

---

### Luồng C — Visitor tracking (tự động, không cần tương tác)

```
[Bất kỳ ai] → mở disanbudang.com/map
                           │
              [default.vue layout] onMounted → useVisitorTrack()
                           │
              POST /api/analytics/visit
              body: { path: "/map/", idToken: null hoặc token nếu đã login }
                           │
              [Server]
              ├── Lấy CF-Connecting-IP (IP thật)
              ├── Nếu có idToken: verify → lấy email, displayName
              └── UPSERT visitor_logs
                  Nếu (ip, path) đã tồn tại → visit_count + 1
                  Nếu chưa có → tạo row mới, count = 1
                           │
              [Admin xem tại] disanbudang.com/admin/visitors
```

---

## 3. Cách xem dữ liệu — Wrangler CLI

Wrangler là công cụ CLI chính thức của Cloudflare. Đã có sẵn trong project (chạy lệnh từ thư mục project).

### Xem đóng góp đang chờ duyệt

```bash
# Tất cả pending
wrangler d1 execute disanbudang-db --remote \
  --command="SELECT id, type, author_name, title, status, created_at FROM contributions WHERE status='pending' ORDER BY created_at DESC"

# Xem chi tiết 1 bài (thay UUID)
wrangler d1 execute disanbudang-db --remote \
  --command="SELECT * FROM contributions WHERE id='your-uuid-here'"

# Đếm theo status
wrangler d1 execute disanbudang-db --remote \
  --command="SELECT status, COUNT(*) as count FROM contributions GROUP BY status"
```

### Xem visitors

```bash
# Top 10 IP truy cập nhiều nhất
wrangler d1 execute disanbudang-db --remote \
  --command="SELECT ip, SUM(visit_count) as total FROM visitor_logs GROUP BY ip ORDER BY total DESC LIMIT 10"

# Top pages
wrangler d1 execute disanbudang-db --remote \
  --command="SELECT path, SUM(visit_count) as total FROM visitor_logs GROUP BY path ORDER BY total DESC LIMIT 10"

# Visitor đã đăng nhập (có email)
wrangler d1 execute disanbudang-db --remote \
  --command="SELECT ip, email, display_name, path, visit_count, last_seen_at FROM visitor_logs WHERE email IS NOT NULL ORDER BY last_seen_at DESC LIMIT 20"

# Tổng lượt truy cập
wrangler d1 execute disanbudang-db --remote \
  --command="SELECT COUNT(*) as unique_sessions, SUM(visit_count) as total_visits FROM visitor_logs"
```

### Xem users đã đăng ký

```bash
wrangler d1 execute disanbudang-db --remote \
  --command="SELECT uid, email, display_name, provider, created_at, last_seen_at FROM users ORDER BY last_seen_at DESC"
```

---

## 4. Admin Panel — Cách vận hành hàng ngày

### Truy cập

1. Vào **`disanbudang.com/admin`**
2. Bấm **Continue with Google** → chọn `nguyenxuankiet294@gmail.com`
3. Tự động redirect vào `/admin/contributions`

> **Lưu ý:** Nếu dùng email khác, hệ thống sẽ sign out và hiện lỗi "Not authorized". Chỉ email hardcoded mới vào được.

### Sidebar navigation

| Menu | Chức năng |
|------|-----------|
| **Contributions** | Danh sách bài đóng góp, filter theo status, badge số bài pending |
| **Visitors** | Thống kê lượt truy cập theo IP / email / path |

### Quy trình duyệt bài

1. Vào **Contributions** → tab **Pending** (có số đỏ nếu có bài mới)
2. Đọc nội dung từng card
3. Bấm **Approve** hoặc **Reject**
4. Nhập ghi chú review (tuỳ chọn) → **Confirm**
5. Bài chuyển sang tab Approved hoặc Rejected, trang tự refresh

### Khi token hết hạn (sau 1 giờ)

Firebase ID Token tự expire sau 1h. Firebase Auth SDK **tự refresh token** nền khi bạn thao tác — không cần làm gì thêm. Nếu thấy lỗi 401 Unauthorized sau một thời gian dài không dùng: **F5 (refresh trang)** là đủ.

---

## 5. Cách xem logs request trên Cloudflare

### Cloudflare Dashboard (không cần terminal)

1. Vào [dash.cloudflare.com](https://dash.cloudflare.com)
2. Chọn **Workers & Pages** → **disanbudang**
3. Tab **Functions** → **Logs** (real-time stream)
4. Filter theo URL path: `/api/contribute`, `/api/admin/*`

> Free plan giữ logs 24h. Đủ cho mục đích debug và kiểm tra.

### Wrangler tail — xem log live từ terminal

```bash
# Chạy lệnh này, mở web và làm action → log hiện ngay
wrangler pages deployment tail --project-name=disanbudang
```

Ví dụ output:
```
[2026-07-16 00:12:34] POST /api/contribute          200  45ms
[2026-07-16 00:12:50] GET  /api/admin/contributions 200  12ms
[2026-07-16 00:13:01] POST /api/contribute          403   8ms  ← bot bị chặn
```

---

## 6. Sơ đồ bảo mật — Tại sao không ai hack được?

```
Tầng 1: Cloudflare WAF (tự động, miễn phí)
  → Chặn IP xấu, DDoS, scan tool trước khi request đến server code

Tầng 2: Turnstile (bảo vệ contribute form)
  → Bot không render JavaScript → không lấy được Turnstile token → 403 Forbidden

Tầng 3: Origin header check (mọi write endpoint)
  → Chỉ nhận request từ disanbudang.com
  → Curl/Postman trực tiếp từ bên ngoài → 403 Forbidden

Tầng 4: Firebase ID Token (mọi admin endpoint)
  → Token được Google ký bằng RSA private key
  → Không thể làm giả dù đã đọc toàn bộ source code
  → Server verify bằng crypto.subtle, không gọi internet để verify

Tầng 5: Email allowlist (admin)
  → Dù có token Google hợp lệ, email phải = nguyenxuankiet294@gmail.com
  → Tài khoản Google bất kỳ → token hợp lệ → vẫn bị 403 Forbidden
```

**Kịch bản tấn công thực tế và tại sao thất bại:**

| Kịch bản | Kết quả |
|----------|---------|
| Bot tự động spam contribute form | Không có Turnstile token → 403 |
| Curl trực tiếp tới `/api/contribute` | Không có Origin header đúng → 403 |
| Đoán URL admin và gọi trực tiếp | Không có token → 401 |
| Login Google account khác → gọi admin | Email không khớp → 403 |
| Đọc source code và làm giả token | RSA signature không thể giả mạo → 401 |
| Replay cũ token đã dùng | Token hết hạn sau 1h → 401 Token expired |

---

## 7. Database Schema — Đọc hiểu các bảng

### `contributions` — Bài đóng góp cộng đồng

| Cột | Kiểu | Ý nghĩa |
|-----|------|---------|
| `id` | TEXT (UUID) | ID duy nhất, tự sinh |
| `type` | TEXT | story / photo / document / memory / artwork / research |
| `author_name` | TEXT | Họ tên người gửi |
| `author_role` | TEXT | resident / student / teacher / visitor / other |
| `title` | TEXT | Tiêu đề (5–200 ký tự) |
| `content` | TEXT | Nội dung (20–10.000 ký tự) |
| `heritage_id` | TEXT | Liên kết di tích (nullable) |
| `status` | TEXT | **pending** / approved / rejected |
| `ip` | TEXT | IP người gửi (CF-Connecting-IP) |
| `review_note` | TEXT | Ghi chú admin khi duyệt |
| `reviewed_at` | DATETIME | Thời điểm duyệt |
| `reviewed_by` | TEXT | Email admin đã duyệt |
| `created_at` | DATETIME | Thời điểm gửi |

### `visitor_logs` — Lượt truy cập

| Cột | Kiểu | Ý nghĩa |
|-----|------|---------|
| `ip` | TEXT | IP visitor |
| `email` | TEXT | Email Firebase (nullable — chỉ có khi đã login) |
| `display_name` | TEXT | Tên Google (nullable) |
| `path` | TEXT | Đường dẫn trang (`/map/`, `/heritage/xxx/`) |
| `visit_count` | INTEGER | Số lần IP này vào trang này |
| `first_seen_at` | DATETIME | Lần đầu thấy |
| `last_seen_at` | DATETIME | Lần gần nhất |

> **Cách hoạt động:** Mỗi cặp `(ip, path)` là 1 row. Cùng 1 IP vào cùng 1 trang 5 lần → `visit_count = 5`, không tạo thêm row.

### `users` — Tài khoản đã đăng nhập

| Cột | Kiểu | Ý nghĩa |
|-----|------|---------|
| `uid` | TEXT | Firebase User ID (không thay đổi dù đổi email) |
| `email` | TEXT | Email Google |
| `display_name` | TEXT | Tên hiển thị |
| `photo_url` | TEXT | URL avatar |
| `email_verified` | INTEGER | 0 = chưa verify / 1 = đã verify |
| `provider` | TEXT | `google.com` / `password` |
| `created_at` | DATETIME | Lần đầu đăng nhập |
| `last_seen_at` | DATETIME | Lần login gần nhất |

### `ratings` — Đánh giá dự án (sao + nhận xét)

| Cột | Kiểu | Ý nghĩa |
|-----|------|---------|
| `id` | INTEGER | Auto-increment |
| `ip` | TEXT | IP người đánh giá (UNIQUE — 1 vote/IP) |
| `stars` | INTEGER | Số sao từ 1–5 |
| `comment` | TEXT | Nhận xét (tuỳ chọn, tối đa 500 ký tự) |
| `created_at` | DATETIME | Thời điểm gửi / cập nhật |

---

## 8. Checklist setup lần đầu (production)

- [ ] **Tạo Turnstile site**: [dash.cloudflare.com → Turnstile → Add site](https://dash.cloudflare.com/?to=/:account/turnstile)
  - Domain: `disanbudang.com`
  - Widget type: **Managed** (recommended)
  - Lấy **Site Key** → paste vào `wrangler.toml`: `NUXT_PUBLIC_TURNSTILE_SITE_KEY = "0x4AAAA..."`
  - Lấy **Secret Key** → chạy: `wrangler secret put NUXT_TURNSTILE_SECRET_KEY`

- [ ] **Push schema D1 remote**:
  ```bash
  npm run db.push
  ```

- [ ] **Deploy lên Cloudflare Pages**:
  ```bash
  git add . && git commit -m "feat: add backend system" && git push
  ```

- [ ] **Verify schema đã apply**:
  ```bash
  wrangler d1 execute disanbudang-db --remote \
    --command="SELECT name FROM sqlite_master WHERE type='table'"
  # Expected: contributions, visitor_logs, users
  ```

- [ ] **Test contribute form** trên production → kiểm tra D1 có row mới.

- [ ] **Test admin panel**: vào `/admin` → login → xem panel → approve 1 bài test.

---

## 9. File nguồn để tham chiếu

```
server/
  utils/
    auth.ts          ← verifyFirebaseToken() + requireAdmin()
    turnstile.ts     ← verifyTurnstile() + requireClient()
  api/
    contribute.post.ts              ← POST /api/contribute
    me/sync.post.ts                 ← POST /api/me/sync
    analytics/visit.post.ts         ← POST /api/analytics/visit
    admin/contributions/index.get.ts   ← GET  /api/admin/contributions
    admin/contributions/[id].patch.ts  ← PATCH /api/admin/contributions/:id
    admin/visitors/index.get.ts        ← GET  /api/admin/visitors
    ratings/index.get.ts               ← GET  /api/ratings  (public stats + comments)
    ratings/index.post.ts              ← POST /api/ratings  (submit/update rating)

app/
  composables/
    useAuth.ts          ← Firebase Auth boundary (login/logout/token)
    useVisitorTrack.ts  ← Auto-track mỗi route change
  layouts/
    admin.vue           ← SPA layout riêng (không dùng public nav)
  pages/
    admin/login.vue           ← Trang đăng nhập Google
    admin/contributions.vue   ← Duyệt bài đóng góp
    admin/visitors.vue        ← Thống kê lượt truy cập
    me/index.vue              ← Profile + nút Admin (nếu là admin email)
    contribute/index.vue      ← Form đóng góp + Turnstile widget
```
