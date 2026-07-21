# PLAN — Refactor theo Aki-RULE (đợt 1)

Trạng thái: **đã hoàn thành**. Kết quả rà soát toàn dự án theo bộ rule Aki-RULE (full load: RULE-agent-behavior, RULE-coding, RULE-docs, RULE-content-write, RULE-stack-akiNuxtCf, RULE-seo, RULE-release, RULE-db-design, METHOD-flow-audit, METHOD-deep-think), ngày rà soát: 2026-07-08.

Điểm sáng đã đạt chuẩn (không cần sửa): TypeScript strict + typecheck pass, `trailingSlash: true`, favicon/manifest đầy đủ đúng chuẩn, breadcrumb duy nhất render ở layout, `useSwal()` (không có `window.alert/confirm`), Organization schema có `alternateName`/`founder`, useMuseumSeo tự cắt title/description và loại em-dash, robots + sitemap cấu hình đúng.

---

## P0 — Bắt buộc sửa (vi phạm rule cứng hoặc lỗi người dùng nhìn thấy)

### P0.1 — Thiếu `CHANGELOG.md` gốc + không có version (RULE-release)
- `CHANGELOG.md` là **bắt buộc từ khi tạo project**; hiện không có. `package.json` cũng không có trường `version`.
- `docs/CHANGELOG_IMAGES_UI.md` là một mảnh changelog lạc chỗ, sai chuẩn.
- Việc cần làm:
  1. Tạo `CHANGELOG.md` ở gốc theo format Keep a Changelog (Added/Changed/Fixed/Removed), tiếng Anh.
  2. Thêm `"version"` vào `package.json` (đề xuất khởi điểm `0.1.0`).
  3. Hợp nhất nội dung `docs/CHANGELOG_IMAGES_UI.md` vào CHANGELOG rồi xoá file cũ.
  4. `releases.json` + trang release-notes: chưa cần (chỉ tạo khi có trang public render nó).

### P0.2 — Trang chi tiết di sản không có SEO meta (RULE-seo)
*(Đính chính sau rà soát sâu: chỉ 1 trang vi phạm, không phải 4 — grep ban đầu sót tên hàm `useHeritageSeo`/`useNewsSeo`. `news/[slug].vue` đã gọi `useNewsSeo`; trang QR đã gọi `useHeritageSeo` với canonical trỏ về trang chính; `library.vue` chỉ là redirect 301.)*

- `app/pages/heritage/[slug].vue` — **trang SEO quan trọng nhất của site** — không gọi SEO composable nào dù `useHeritageSeo(heritage)` đã tồn tại sẵn trong `useMuseumSeo.ts`.
- Đã sửa: thêm `useHeritageSeo(heritage)` vào trang.

### P0.3 — API contact/contribute trả về thành công giả (RULE-coding: never fabricate success)
- `server/api/contact.post.ts` và `server/api/contribute.post.ts` validate input rồi trả `{ ok: true }` nhưng **không lưu, không gửi đi đâu cả**. Người dùng gửi liên hệ/tư liệu tưởng thành công nhưng dữ liệu biến mất.
- **Quyết định (2026-07-08, chủ dự án):** dự án chưa có backend/database nên xử lý thuần frontend — chuyển UI form sang liên hệ trực tiếp (mailto / hiển thị email), gỡ 2 endpoint trả thành công giả. Khi nào có backend thật sẽ mở lại form qua plan riêng.

### P0.4 — Link hỏng trong `docs/index.md` + file docs sai chuẩn tên (RULE-docs)
- `docs/index.md` trỏ tới `PROJECT_MASTER.md` — file không tồn tại; file thật là `docs/Docs MASTER.md` (tên chứa dấu cách, không ổn định).
- Việc cần làm:
  1. Đổi tên `docs/Docs MASTER.md` → `docs/PROJECT_MASTER.md` (khớp link hiện có, tên ổn định không dấu cách).
  2. Cập nhật mọi link tham chiếu trong `docs/index.md`.

---

## P1 — Refactor cấu trúc (root shape, theo METHOD-flow-audit)

### P1.1 — Hai hệ thống nội dung song song: mock TS vs @nuxt/content
**Hiện trạng (actual flow):** dữ liệu thật của site nằm trong `app/data/mockHeritages.ts` (816 dòng), `mockPosts.ts`, `mockQuiz.ts` — được 15 file dùng làm nguồn chính thức. Trong khi đó `@nuxt/content` (kèm dependency `better-sqlite3`) chỉ phục vụ đúng `study.vue` với 6 file markdown (`content/heritage/` 1 file, `content/school/` 5 file).

**Vấn đề hình dạng luồng:**
- Tên `mock*` nói dối: đây không phải mock, đây là production data. Vi phạm nguyên tắc naming rõ ràng và gây hiểu nhầm "sẽ thay bằng API sau" trong khi không có kế hoạch đó.
- Hai nguồn sự thật cho cùng khái niệm "heritage": `mockHeritages.ts` và `content/heritage/*.md`.

**Đề xuất (quyết định 2 chiều, dễ đảo):** đợt 1 chỉ làm bước rẻ nhất — đổi tên file bỏ tiền tố mock (`heritages.ts`, `posts.ts`, `quizzes.ts`, đổi `MOCK_HERITAGES` → `HERITAGES`...), cập nhật import. Việc hợp nhất về một hệ (all-in @nuxt/content hoặc all-in TS data) là quyết định lớn hơn, tách thành plan riêng nếu muốn làm.

### P1.2 — Tên component chrome sai chuẩn canonical (RULE-stack-akiNuxtCf)
- `TheHeader.vue` → `AppTopNav.vue`; `TheFooter.vue` → `AppFooter.vue` (bảng canonical names, "rename on drift").
- `Breadcrumb.vue` và `ScrollToTop.vue` đã đúng tên.
- Cập nhật import trong `layouts/default.vue`. Nhân tiện: layout đang import thủ công 6 component dù đã bật auto-import (`pathPrefix: false`) — bỏ các dòng import thừa.

### P1.3 — Dọn dependency chết (RULE-coding: YAGNI)
Không có file nào trong `app/` dùng: `gsap`, `howler`, `@types/howler` (store audio dùng HTMLAudioElement thuần). Xác minh lần cuối bằng grep toàn repo rồi gỡ khỏi `package.json` + xoá `howler`/`gsap` khỏi `vite.optimizeDeps`. Kiểm tra thêm `vue-leaflet` (hiện chỉ thấy `leaflet` được dùng trực tiếp trong `MapContainer.vue`).

### P1.4 — Chuẩn hoá cây docs (RULE-docs)
- Tạo `docs/ref/`; chuyển `README_AUDIO.md` (gốc repo) → `docs/ref/audio-recording-guide.md`, cập nhật link trong `docs/index.md`.
- `docs/BAO_CAO_DU_AN.md` → `docs/ref/BAO_CAO_DU_AN.md` (tài liệu tra cứu ổn định) hoặc giữ nguyên nếu chủ dự án muốn nó nổi ở docs root — cần xác nhận.
- Tạo `docs/plan/done/`; chuyển `PLAN-001-standardize-docs.md` (đã hoàn thành) vào đó.
- Cập nhật `docs/index.md` sau mọi di chuyển.

---

## P2 — Cải thiện nhỏ (làm khi tiện tay)

### P2.1 — Nối `scripts/validate-seo.js` vào build flow (RULE-seo)
Script đã tồn tại nhưng không có npm script nào gọi nó. Thêm `"validate:seo": "node scripts/validate-seo.js"` và khuyến nghị chạy sau `generate`.

### P2.2 — Meta description mặc định chứa em-dash (RULE-seo)
`nuxt.config.ts` → `app.head` description chứa `—` ("...Thành phố Đồng Nai — từ vùng đất..."). `useMuseumSeo` đã tự strip em-dash nhưng fallback trong `app.head` thì không đi qua composable. Sửa trực tiếp chuỗi trong `nuxt.config.ts` (thay bằng `-` hoặc viết lại câu), đồng thời kiểm tra độ dài ≤ 155 ký tự.

### P2.3 — Script dev tiện ích (RULE-stack-akiNuxtCf)
Thêm `killport` với 1 port dev cố định cho project, và sửa `dev` thành `npm run killport && nuxt dev`.

### P2.4 — Breadcrumb leaf: cân nhắc chuyển sang `<ClientOnly>`
`Breadcrumb.vue` đang dùng cờ `isMounted` tự chế thay cho pattern chuẩn `<ClientOnly>` + fallback. Hoạt động tương đương, không phải bug; chỉ chuẩn hoá khi có dịp chạm vào file này.

### P2.5 — Pinia vs useState (ghi nhận, không bắt buộc sửa)
Rule ưu tiên `useState` trước, chỉ dùng Pinia khi store thật sự cần actions/getters phức tạp. Ba store hiện tại (`heritage`, `quiz`, `audio`) đều có getters + actions thật nên Pinia chấp nhận được; không refactor trong đợt này. Ghi lại để cân nhắc nếu sau này hợp nhất dữ liệu về @nuxt/content (store heritage sẽ teo lại đáng kể).

---

## Thứ tự thực thi đề xuất

1. P0.1 CHANGELOG + version (mở khoá quy trình commit/release cho mọi việc sau)
2. P0.4 sửa link docs hỏng, P1.4 chuẩn hoá cây docs (một lần di chuyển, một lần cập nhật index)
3. P0.2 bổ sung SEO cho 4 trang
4. P1.2 đổi tên component chrome
5. P1.1 đổi tên data files bỏ tiền tố mock
6. P1.3 gỡ dependency chết
7. P2.1 → P2.3 các cải thiện nhỏ
8. P0.3 quyết định hướng cho contact/contribute (cần chủ dự án chọn đích dữ liệu trước khi code)

## Tiêu chí hoàn thành

- `npm run typecheck` pass, `npm run generate` build sạch.
- `node scripts/validate-seo.js` pass trên output mới (đặc biệt các trang heritage/news slug).
- Mọi link trong `docs/index.md` mở được; không còn file docs nào có dấu cách trong tên.
- `CHANGELOG.md` tồn tại ở gốc, version trong `package.json` khớp entry mới nhất.
- Không còn identifier/tên file `mock*` cho dữ liệu production.
- Form contact/contribute hoặc gửi dữ liệu tới đích thật, hoặc UI không còn hứa hẹn giả.
