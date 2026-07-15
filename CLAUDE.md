# CLAUDE.md

## Aki Rules

Shared rules live at `~/.aki/claudedoc/`. Read `~/.aki/claudedoc/index.md` for the full rule index and loading policy.
Gemini reads them directly from that path.

---

## THIS PROJECT

### 0. Critical rule — Code as if this repo is ALWAYS public-read (ABSOLUTE)

Repo `disanbudang` is a **public GitHub repo by deliberate choice** (competition visibility +
credibility), not an accident. Backend (Nitro server routes / Pages Functions) lives in this same
repo. Decision record: `docs/research/2026-07-12-repo-visibility-akithink.md`.

**Governing assumption for every line of backend code written here: any visitor can read the
full source at any time.** Security must never depend on the repo being private or on code being
hard to find — assume the attacker has already read it. Concretely, before any new
backend/server-side endpoint is shipped (merged, not just written), it MUST satisfy:

1. **Spend cap** — any call to a paid API (AI/LLM, third-party paid service) must be bounded by an
   enforced quota (Cloudflare AI Gateway limit or a self-tracked counter in KV/D1), never an
   unbounded proxy. A public repo means anyone can script a loop that finds and hammers the
   endpoint.
2. **Turnstile + rate-limit** — every write endpoint (comments, user data, collections, contact
   forms, etc.) requires bot verification (Cloudflare Turnstile) and rate-limiting. No write path
   may be reachable by an anonymous, unthrottled request.
3. **Auth via a standard provider, never homemade** — session/auth logic must use a vetted
   provider/library; all input is validated server-side regardless of client-side validation
   (client checks are UX only, never a security boundary).
4. **Small blast radius** — user data is stored separately from static content; D1/KV data has a
   backup/restore path. A single exploited endpoint must not be able to corrupt or leak everything.

Never write backend code with reasoning like "this is fine, nobody will find this endpoint" —
that reasoning is invalid by construction in a public repo. If a shortcut only "works" because the
implementation is obscure, it is not shippable here.

### 1. Project
- **Name**: Bảo Tàng Số Di Sản Bù Đăng — Thành Phố Đồng Nai (disanbudang.com)
- **Description**: Web app bảo tàng số tương tác, đóng vai trò song hành: (1) công cụ giáo dục lịch sử địa phương, (2) cổng thông tin du lịch thông minh cho các điểm di sản Thành Phố Đồng Nai (khởi nguyên từ Bù Đăng). Chi tiết đầy đủ: `docs/PROJECT_MASTER.md` (nguồn sự thật tối thượng — đọc trước khi sửa bất kỳ gì).
- **Stack**: Nuxt 4 + Vue 3 (Composition API, strict TypeScript) + Tailwind CSS v3 + Pinia (+ persistedstate) + Nuxt Content v3 + Leaflet.js (bản đồ) + Howler.js (audio guide) + better-sqlite3 (quiz data) + nuxt-security. Triển khai trên Cloudflare Pages.
- **Build / Verification**:
  - Dev server: `npm run dev` (tự kill port 3000 trước khi chạy)
  - Build (SSR/hybrid): `npm run build`
  - Generate (SSG): `npm run generate` (chạy `nuxt generate` rồi `scripts/validate-seo.js`)
  - Preview: `npm run preview`
  - Type check: `npm run typecheck` (`vue-tsc --noEmit`)

### 2. Specific Config
- **Nội dung di sản**: Bài viết thuyết minh dạng Markdown trong `content/` (Nuxt Content v3, biên dịch tự động khi build). Metadata/type trong `app/types/`, fallback data trong `app/data/`.
- **Quiz data**: Lưu trong SQLite (`better-sqlite3`) phía server, truy vấn qua API route (`server/`).
- **State**: Mọi shared state giữa các trang phải qua Pinia store (`app/stores/`) — không dùng `reactive()`/`ref()` component-level cho dữ liệu cần chia sẻ. Store chính: `audio.ts` (global audio player, không ngắt khi chuyển trang), `heritage.ts`, `quiz.ts` (persisted qua LocalStorage).
- **Security**: `nuxt-security` — CSP img-src whitelist (`images.unsplash.com`, `*.tile.openstreetmap.org`, `*.basemaps.cartocdn.com`), rate limiter 150 tokens/hour. Xem thêm mục 0 (public-read rule) khi thêm backend mới.
- **Docs**: Mọi doc feature/arch/plan mới phải cập nhật `docs/index.md`. Xem `docs/PROJECT_MASTER.md` mục 9 cho quy tắc phát triển đầy đủ (code, commit, docs, content).

### 3. Backend Architecture Rules (BINDING)
- **SPA routes**: `/admin/**` và `/me/**` là `ssr: false` (routeRules). Phải dùng `layouts/admin.vue` riêng cho admin — không import AppTopNav/AppFooter/Breadcrumb vào admin layout.
- **Không dùng `firebase-admin`**: Verify Firebase ID token phía server bằng cách fetch GCP public keys và dùng `crypto.subtle` (RS256). Xem `server/utils/auth.ts`.
- **Không dùng KV**: Chỉ D1 cho toàn bộ persistence. KV tăng complexity không cần thiết ở quy mô này.
- **Admin email**: `nguyenxuankiet294@gmail.com` — hardcoded trong `server/utils/auth.ts` (BE) và `runtimeConfig.public.adminEmail` (FE). FE chỉ dùng để hiển thị nút admin trong `/me`.
- **Client guard**: Mọi write endpoint public phải qua `requireClient()` (Origin check + Cloudflare Turnstile). Xem `server/utils/turnstile.ts`.
- **Mọi admin API**: Phải gọi `requireAdmin(event)` từ `server/utils/auth.ts` trước bất kỳ thao tác nào.
- **Visitor tracking**: Upsert D1 `visitor_logs` theo `(ip, path)` — gọi từ `default.vue` layout qua `useVisitorTrack()`.
- **Auth composable boundary**: Mọi Firebase Auth interaction phải qua `useAuth()` — không import Firebase SDK trực tiếp trong page/layout.


### 3. Vibe / Styling
- **Vibe**: Dark mode mặc định, màu chủ đạo `#e18c1b` (amber, cảm hứng thổ cẩm S'tiêng). Typography: Playfair Display (tiêu đề), Inter (body), Cormorant Garamond (quote/caption). Animation qua GSAP (hero, scroll-trigger) + VueUse Motion (`v-motion`, micro-animation component-level). Mobile-first, tối ưu cho bản đồ và quiz trên điện thoại.
- **Ngôn ngữ nội dung**: Tiếng Việt. Thuật ngữ dân tộc nhất quán: **S'Tiêng**, **M'Nông** (xem `docs/PROJECT_MASTER.md` mục 9.5 cho quy tắc đặt tên brand/địa danh đầy đủ).
