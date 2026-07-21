## GLOBAL RULES

> [!NOTE] 
> This project uses the **akirule** skill as the rule loader.
> **Static Rule Index (MANDATORY for AI to load):**
> - Core & Release: `~/.aki/claudedoc/RULE-agent-behavior.md`, `~/.aki/claudedoc/RULE-coding.md`, `~/.aki/claudedoc/RULE-design-core.md`, `~/.aki/claudedoc/RULE-docs.md`, `~/.aki/claudedoc/RULE-release.md`
> - Stack & DB: `~/.aki/claudedoc/RULE-stack-akiNuxtCf.md`, `~/.aki/claudedoc/RULE-db-design.md`
> - UI, SEO & Content: `~/.aki/claudedoc/RULE-ui-pattern.md`, `~/.aki/claudedoc/RULE-seo.md`, `~/.aki/claudedoc/RULE-content-write.md`

---

## THIS PROJECT

### 0. Critical rule — Code as if this repo is ALWAYS public-read (ABSOLUTE)

Repo `disanbudang` is a **public GitHub repo by deliberate choice**. Backend (Nitro server routes / Pages Functions) lives in this same repo.
**Governing assumption for every line of backend code written here: any visitor can read the full source at any time.** 
Before any new backend/server-side endpoint is shipped (merged, not just written), it MUST satisfy:
1. **Spend cap** — any call to a paid API (AI/LLM, third-party paid service) must be bounded by an enforced quota (Cloudflare AI Gateway limit or a self-tracked counter in KV/D1).
2. **Turnstile + rate-limit** — every write endpoint requires bot verification (Cloudflare Turnstile) and rate-limiting.
3. **Auth via a standard provider** — session/auth logic must use a vetted provider/library.
4. **Small blast radius** — user data is stored separately from static content; D1/KV data has a backup/restore path.

### 1. Project Overview & Rules
- **Name**: Bảo Tàng Số Di Sản Bù Đăng — Thành Phố Đồng Nai (disanbudang.com)
- **Stack**: Nuxt 4 + Vue 3 (Composition API) + Tailwind CSS v3 + Pinia (+ persistedstate) + Nuxt Content v3 + Leaflet.js (bản đồ) + Howler.js (audio guide) + better-sqlite3 (quiz data) + nuxt-security. Triển khai trên Cloudflare Pages.
- **Code Rules**: Strict TypeScript (`strict: true`), PascalCase cho component, không dùng `any` trừ khi có lý do chính đáng.
- **Docs Rules**: Xem chi tiết cấu trúc hệ thống tại `docs/arch/system.md`.
- **Content Rules**: Tiếng Việt. Tên thuật ngữ dân tộc phải nhất quán: **S'Tiêng**, **M'Nông**. Thương hiệu ngắn: **Di Sản Bù Đăng**. Tagline: **Bảo Tàng Số Thành Phố Đồng Nai**. Cụm di sản: **Xã Bù Đăng**, **Sóc Bom Bo**, v.v.

### 2. Specific Config
- **Nội dung di sản**: Bài viết thuyết minh dạng Markdown trong `content/`. Metadata/type trong `app/types/`, fallback data trong `app/data/`.
- **Quiz data**: Lưu trong SQLite (`better-sqlite3`) phía server, truy vấn qua API route (`server/`).
- **State**: Mọi shared state giữa các trang ưu tiên `useState`, nhưng đối với state cần cross-page có logic phức tạp (audio, quiz) phải qua Pinia store (`app/stores/`). Store chính: `audio.ts` (không ngắt khi chuyển trang), `heritage.ts`, `quiz.ts` (persisted).
- **Security**: `nuxt-security` — CSP img-src whitelist (`images.unsplash.com`, `*.tile.openstreetmap.org`, `*.basemaps.cartocdn.com`), rate limiter 150 tokens/hour.

### 3. Backend Architecture Rules (BINDING)
- **SPA routes**: `/admin/**` và `/me/**` là `ssr: false` (routeRules).
- **Không dùng `firebase-admin`**: Verify Firebase ID token phía server bằng cách fetch GCP public keys và dùng `crypto.subtle` (RS256). Xem `server/utils/auth.ts`.
- **Không dùng KV**: Chỉ D1 cho toàn bộ persistence.
- **Admin email**: `nguyenxuankiet294@gmail.com` — hardcoded trong `server/utils/auth.ts` (BE) và `runtimeConfig.public.adminEmail` (FE).
- **Client guard**: Mọi write endpoint public phải qua `requireClient()` (Origin check + Cloudflare Turnstile).
- **Mọi admin API**: Phải gọi `requireAdmin(event)` trước bất kỳ thao tác nào.
- **Visitor tracking**: Upsert D1 `visitor_logs` theo `(ip, path)` — gọi từ `default.vue` layout qua `useVisitorTrack()`.
- **Auth composable boundary**: Mọi Firebase Auth interaction phải qua `useAuth()` — không import Firebase SDK trực tiếp trong page/layout.

### 4. Vibe / Styling
- **Vibe**: Dark mode mặc định, màu chủ đạo `#e18c1b` (amber, cảm hứng thổ cẩm S'tiêng). Typography: Playfair Display (tiêu đề), Inter (body), Cormorant Garamond (quote/caption). Animation qua GSAP (hero, scroll-trigger) + VueUse Motion (`v-motion`). Mobile-first, tối ưu cho bản đồ và quiz trên điện thoại.
