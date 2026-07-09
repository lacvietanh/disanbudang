# PROJECT MASTER — DI SẢN THÀNH PHỐ ĐỒNG NAI

> **Đây là nguồn sự thật (Single Source of Truth) tối thượng của dự án.**
> Mọi quyết định kỹ thuật, nội dung, tính năng, và quy tắc phát triển đều phải tuân theo tài liệu này.
> Developer và AI agent đều phải đọc file này trước khi bắt đầu bất kỳ thay đổi nào.

---

## 1. Tổng quan Dự án

| Thuộc tính | Giá trị |
|---|---|
| **Tên sản phẩm** | Bảo Tàng Số Di Sản Bù Đăng — Thành Phố Đồng Nai |
| **Tên miền** | disanbudang.com |
| **Tên repo** | `disanbudang` |
| **Loại sản phẩm** | Web App — Bảo tàng số tương tác |
| **Tác giả** | Nguyễn Xuân Kiệt 
|


### Mục tiêu cốt lõi

Website có **hai vai trò song hành**, không thể tách rời:

1. **Công cụ giáo dục lịch sử địa phương** — Hỗ trợ học sinh tiếp cận tài liệu lịch sử, di sản văn hóa Thành Phố Đồng Nai theo cách tương tác và trực quan, thay thế sách giáo khoa truyền thống.
2. **Cổng thông tin du lịch thông minh** — Giúp du khách tự túc khám phá, định hướng và tìm hiểu các điểm di sản khắp Thành Phố Đồng Nai.

> **Ghi chú phạm vi (2026-07):** Từ 1/7/2025, tỉnh Bình Phước hợp nhất vào tỉnh Đồng Nai; từ 30/4/2026, Đồng Nai trở thành thành phố trực thuộc Trung ương thứ 7 của Việt Nam. Huyện Bù Đăng cũ (tỉnh Bình Phước) nay là **Xã Bù Đăng** — một trong 95 xã, phường của Thành Phố Đồng Nai.
>
> **Quyết định thương hiệu:** "Bù Đăng" được giữ làm **tên riêng/khởi nguyên** của dự án (nơi văn hóa S'Tiêng, Sóc Bom Bo... được số hóa đầu tiên, gắn với domain `disanbudang.com`), không phải ranh giới hành chính. "Thành Phố Đồng Nai" là **phạm vi phục vụ thực tế** (tagline/subtitle). Vì vậy dữ liệu di sản KHÔNG bị giới hạn trong ranh giới xã Bù Đăng — Sóc Bom Bo, Phước Long, Lộc Ninh, núi Bà Rá... vẫn thuộc phạm vi dự án như các "cụm di sản" kết nối từ Bù Đăng ra toàn thành phố. Xem quy tắc đặt tên tại mục 9.5.

---

## 2. Vấn đề được giải quyết

Các hạn chế của các giải pháp hiện tại mà dự án này khắc phục triệt để:

| Vấn đề | Giải pháp của dự án |
|---|---|
| Thiếu bản đồ di sản tương tác | Bản đồ Leaflet.js + GPS Geolocation (`/map`) |
| Thiếu hệ thống trắc nghiệm sinh động | Góc Học Tập với Quiz + Huy hiệu điện tử (`/study`) |
| Không có hướng dẫn bằng âm thanh | Audio Guide toàn cục chạy ngầm (Howler.js + Pinia) |
| Nội dung rời rạc, không hệ thống | 11 di sản số hóa đầy đủ qua Nuxt Content v3 |
| Giao diện truyền thống, thiếu tương tác | Dark mode nghệ thuật, animation GSAP/VueUse Motion |

---

## 3. Tech Stack (Bất biến — Không thay thế nếu không có lý do kỹ thuật cụ thể)

| STT | Tên công nghệ | Phiên bản | Chức năng |
|---|---|---|---|
| 1 | **TypeScript** | ^5.8.3 | Ngôn ngữ lập trình — bắt buộc strict mode |
| 2 | **Vue 3** | ^3.5.34 | Framework UI, Composition API |
| 3 | **Nuxt 4** | ^4.4.2 | SSR/SSG framework, file-based routing, module ecosystem |
| 4 | **Tailwind CSS** | ^3.4.17 | Utility-first styling — Dark mode chủ đạo |
| 5 | **GSAP** | ^3.12.7 | Animation cinematic (hero, scroll-trigger) |
| 6 | **VueUse Motion** | ^3.0.3 | Directive-based animation cho Vue components |
| 7 | **Leaflet.js** | ^1.9.4 | Bản đồ tương tác tọa độ địa lý |
| 8 | **Vue-Leaflet** | ^0.1.0 | Wrapper Vue 3 cho Leaflet |
| 9 | **Howler.js** | ^2.2.4 | Trình phát âm thanh Audio Guide toàn cục |
| 10 | **Pinia** | ^2.3.0 | State management |
| 11 | **Pinia Persistedstate** | ^1.2.1 | Đồng bộ state vào LocalStorage |
| 12 | **better-sqlite3** | ^12.10.0 | Lưu trữ bộ câu hỏi Quiz phía server |
| 13 | **Nuxt Content v3** | ^3.14.0 | Quản lý bài viết thuyết minh dưới dạng Markdown |
| 14 | **nuxt-security** | ^2.5.1 | CSP headers, rate limiting |
| 15 | **SweetAlert2** | ^11.26.25 | Dialog xác nhận GPS, thông báo |
| 16 | **@nuxt/image** | ^1.10.0 | Tối ưu hóa ảnh, WebP, responsive |

> **Quy tắc Stack:** Không thêm thư viện mới nếu chức năng tương đương đã có trong stack hiện tại. Mọi đề xuất thư viện mới phải được ghi lại lý do trong `docs/plan/` trước khi thực thi.

---

## 4. Kiến trúc Hệ thống

### 4.1 Cấu trúc thư mục

```
disanbudang/
├── app/
│   ├── pages/          # File-based routing (Nuxt 4)
│   │   ├── index.vue       # Trang chủ
│   │   ├── about.vue       # Giới thiệu dự án
│   │   ├── map.vue         # Bản đồ di sản tương tác
│   │   ├── library.vue     # Thư viện di sản
│   │   ├── study.vue       # Góc học tập & Quiz
│   │   ├── study/          # Sub-routes học tập
│   │   ├── heritage/       # Chi tiết từng di sản [slug]
│   │   ├── explore/        # Khám phá (thay /community)
│   │   ├── contribute/     # Đóng góp cộng đồng
│   │   ├── news/           # Tin tức
│   │   ├── invest.vue      # Cơ hội đầu tư
│   │   └── contact.vue     # Liên hệ
│   ├── components/     # UI components (pathPrefix: false)
│   ├── composables/    # Shared logic
│   ├── stores/         # Pinia stores
│   │   ├── audio.ts        # AudioPlayerState toàn cục
│   │   ├── heritage.ts     # Dữ liệu danh sách di sản
│   │   └── quiz.ts         # Tiến trình Quiz & Huy hiệu
│   ├── types/          # TypeScript type definitions
│   ├── data/           # Dữ liệu tĩnh (fallback)
│   ├── layouts/        # Nuxt layouts
│   └── assets/css/     # Global CSS, Tailwind config
├── content/            # Bài viết Markdown (Nuxt Content v3)
├── public/             # Static assets
├── server/             # API routes (Nuxt server)
├── docs/               # Tài liệu dự án (thư mục này)
└── nuxt.config.ts      # Cấu hình Nuxt — nguồn sự thật config
```

### 4.2 Định tuyến (Route Map)

| URL | Trang | Ghi chú |
|---|---|---|
| `/` | Trang chủ | Hero, Overview, Featured Heritage |
| `/about` | Giới thiệu | Thông tin dự án, tác giả |
| `/map` | Bản đồ di sản | Leaflet + GPS + Popups |
| `/library` | Thư viện | Danh sách 11 di sản, filter/search |
| `/heritage/[slug]` | Chi tiết di sản | Markdown + Gallery + Audio + Timeline |
| `/study` | Góc học tập | Quiz, Flashcard, Huy hiệu |
| `/study/[id]` | Bài học chi tiết | |
| `/explore/` | Khám phá | Redirect từ `/community` (301) |
| `/contribute` | Đóng góp | Form gửi tư liệu cộng đồng |
| `/news/[slug]` | Tin tức | |
| `/invest` | Đầu tư | Cơ hội đầu tư du lịch |
| `/contact` | Liên hệ | |
| `/quiz` | *(redirect)* | → `/#quiz` (301) |
| `/school` | *(redirect)* | → `/study/` (301) |
| `/community` | *(redirect)* | → `/explore/` (301) |

### 4.3 State Management (Pinia Stores)

```
stores/
├── audio.ts     — AudioPlayerState: isPlaying, currentTrack, currentTime
│                  Chạy ngầm qua page transitions, không bị ngắt
├── heritage.ts  — Danh sách di sản, trạng thái tải, filter hiện tại
└── quiz.ts      — Tiến trình Quiz, điểm số, Huy hiệu đạt được
                   → Persisted vào LocalStorage qua Pinia Persistedstate
```

> **Quy tắc Store:** Không dùng `reactive()` hay `ref()` trực tiếp ở component-level cho dữ liệu cần chia sẻ giữa các trang. Mọi shared state phải đi qua Pinia store.

### 4.4 Nguyên tắc Nội dung Số (Content Layer)

- **Bài viết thuyết minh di sản:** Lưu dưới dạng Markdown trong `content/`. Nuxt Content v3 biên dịch tự động thành JSON khi build.
- **Dữ liệu câu hỏi Quiz:** Lưu trong SQLite (`better-sqlite3`) phía server, truy vấn qua API route.
- **Dữ liệu di sản (metadata):** TypeScript type definitions trong `app/types/`, data trong `app/data/` làm fallback.

---

## 5. Dữ liệu Di sản Cốt lõi

### 5.1 Số liệu đã số hóa

- **11 di sản** được tổ chức lưu trữ và biên soạn tài liệu khoa học
- **6 Ký ức cộng đồng** — câu chuyện truyền miệng từ già làng, nghệ nhân S'Tiêng, M'Nông
- **4 Audio Guide** hoàn thiện — tệp âm thanh thuyết minh giọng đọc truyền cảm

### 5.2 Phân loại Di sản (`HeritageCategory`)

| Slug | Tên hiển thị |
|---|---|
| `lich-su` | Lịch sử |
| `danh-thang` | Danh thắng |
| `van-hoa-phi-vat-the` | Văn hoá phi vật thể |
| `doi-song-cong-dong` | Đời sống cộng đồng |
| `giao-duc-truyen-thong` | Giáo dục truyền thống |

### 5.3 Phân loại theo Thời kỳ (`HeritagePeriod`)

`Tiền sử` → `Phong kiến` → `Pháp thuộc` → `Kháng chiến` → `Hiện đại`

### 5.3b Phân loại theo Cụm Di sản (`HeritageCluster`)

Kết nối di sản khởi nguồn Bù Đăng ra toàn Thành Phố Đồng Nai — dùng cho filter trên `/map` và `/explore`, gợi ý hành trình tham quan liên xã (không phải ranh giới hành chính):

| Slug | Tên hiển thị | Ghi chú |
|---|---|---|
| `bu-dang` | Bù Đăng | Căn cứ kháng chiến, rừng nguyên sinh, làng nghề, lễ hội bản địa |
| `bom-bo` | Sóc Bom Bo | Cồng chiêng, nhà dài, huyền thoại nhịp chày giã gạo |
| `phuoc-long` | Phước Long | Núi Bà Rá, hồ Thác Mơ, Chiến thắng Phước Long 06/01/1975 |
| `loc-ninh` | Lộc Ninh | Căn cứ Tà Thiết, Nhà Giao Tế |

Nguồn dữ liệu: `app/data/clusters.ts`.

### 5.4 Cấu trúc dữ liệu mỗi Di sản

Mỗi điểm di sản bắt buộc có đầy đủ các trường:

```typescript
{
  id: string           // Unique identifier
  slug: string         // URL slug
  name: string         // Tên di sản
  category: HeritageCategory
  period: HeritagePeriod
  coordinates: { lat: number; lng: number }  // Bắt buộc cho bản đồ
  gallery: string[]    // Mảng URL ảnh
  longStory: string    // Markdown content path
  quickFacts: QuickFact[]
  timeline: TimelineEvent[]
  audioGuideUrl?: string  // URL tệp âm thanh (nếu có)
}
```

---

## 6. Tính năng Chính — Đặc tả Kỹ thuật

### 6.1 Bản đồ Di sản Tương tác (`/map`)

- **Thư viện:** Leaflet.js + vue-leaflet
- **Tile layer:** OpenStreetMap / CartoCDN (đã whitelist trong CSP)
- **Tính năng bắt buộc:**
  - Marker phân màu theo `HeritageCategory`
  - Marker clustering khi thu nhỏ bản đồ
  - Custom Popup hiển thị ảnh + tên + tóm tắt di sản
  - Bộ lọc theo Category và Period
  - Tìm kiếm theo tên/từ khóa
  - **GPS Locate Me** — HTML5 Geolocation API, hiện vị trí thực của người dùng
  - Xác nhận GPS qua SweetAlert2 trước khi truy cập location

### 6.2 Audio Guide Toàn cục

- **Thư viện:** Howler.js
- **State:** `stores/audio.ts` — chạy độc lập với luồng UI
- **Yêu cầu cốt lõi:** Audio KHÔNG được ngắt khi người dùng chuyển trang, tắt màn hình điện thoại
- **Tích hợp:** Mỗi trang chi tiết di sản inject `heritageId` vào audioStore để load đúng track
- **Transcript:** Tuỳ chọn hiển thị văn bản thuyết minh chạy song song

### 6.3 Góc Học Tập & Gamification (`/study`)

- **Quiz Engine:** Câu hỏi từ SQLite, phân loại theo di sản cụ thể
- **Huy hiệu (Badges):**

  | Cấp độ | Điều kiện |
  |---|---|
  | Common | Hoàn thành bài cơ bản |
  | Rare | Điểm số cao |
  | Epic | Hoàn thành liên tiếp nhiều bài khó |
  | Legendary | Am hiểu toàn diện về Di sản Thành Phố Đồng Nai |

- **Persistence:** Điểm số + Huy hiệu lưu vào LocalStorage qua `pinia-plugin-persistedstate`
- **Flashcard:** Widget lật thẻ 3D — từ vựng bản địa S'tiêng (Yang Ching, Đ'rắp S'lung, Dak Mơ...)

### 6.4 Thư viện Di sản (`/library`)

- Danh sách đầy đủ 11 di sản với filter và search
- Card-based layout với lazy-loading ảnh
- Link sang trang chi tiết `/heritage/[slug]`

---

## 7. Thiết kế & UX

### 7.1 Bảng màu & Nhận diện thương hiệu

- **Màu chủ đạo:** `#e18c1b` (amber/ấm nóng — cảm hứng thổ cẩm S'tiêng)
- **Theme:** Dark mode là mặc định và chủ đạo
- **Typography:**
  - **Playfair Display** — Tiêu đề chính, serif uy nghiêm
  - **Inter** — Body text, sans-serif hiện đại
  - **Cormorant Garamond** — Quote, caption, italic

### 7.2 Animation

- **GSAP:** Hero sections, scroll-triggered reveals, complex timelines
- **VueUse Motion:** Directive-based micro-animations trên components (`v-motion`)
- **Nuxt Page Transition:** `out-in` mode cho page-level transitions
- **View Transitions API:** `experimental.viewTransition: true` bật trong nuxt.config

### 7.3 Responsive

- Breakpoints: `xs:320` / `sm:640` / `md:768` / `lg:1024` / `xl:1280` / `xxl:1536`
- Mobile-first design — Bản đồ và Quiz tối ưu trên điện thoại

---

## 8. Security & Performance

### 8.1 Security (nuxt-security)

- **CSP img-src whitelist:** `self`, `data:`, `images.unsplash.com`, `*.tile.openstreetmap.org`, `*.basemaps.cartocdn.com`
- **Rate Limiter:** 150 tokens/hour
- **CORS:** GET + POST từ mọi origin (phù hợp với API public)

### 8.2 Hình ảnh

- Format ưu tiên: WebP → JPG
- Quality: 85%
- Domain whitelist: `images.unsplash.com`
- Xử lý qua `@nuxt/image` — bắt buộc dùng `<NuxtImg>` thay cho `<img>` raw

---

## 9. Quy tắc Phát triển (Development Rules)

> Những quy tắc này là bất biến. Mọi AI agent và developer đều phải tuân theo.

### 9.1 Nguyên tắc chung

- **Scope discipline:** Làm đúng và đủ những gì được yêu cầu. Không tự ý thêm tính năng, refactor hay cleanup nếu không được yêu cầu.
- **YAGNI:** Không xây dựng những gì "có thể cần trong tương lai" — chỉ xây dựng những gì cần ngay bây giờ.
- **Source of truth:** Code thực tế > Docs này > Memory. Luôn đọc file nguồn trước khi chỉnh sửa.

### 9.2 Quy tắc Code

- **Ngôn ngữ code & comment:** Tiếng Anh
- **TypeScript:** Strict mode bắt buộc (`strict: true` trong tsconfig)
- **Component naming:** PascalCase, đặt theo chức năng rõ ràng
- **Không dùng `any`** trừ khi có lý do kỹ thuật được document rõ
- **Result pattern** cho mọi external call:
  ```typescript
  type Result<T> = { ok: true; data: T } | { ok: false; error: string }
  ```

### 9.3 Quy tắc Commit

- Commit message: Tiếng Anh, imperative style (`Add`, `Fix`, `Update`, không phải `Added`, `Fixed`)
- **Không** thêm co-author signatures của AI vào commit message

### 9.4 Quy tắc Docs

- Tài liệu feature: `docs/feat/<tên>.md`
- Tài liệu kiến trúc: `docs/arch/<tên>.md`
- Kế hoạch triển khai: `docs/plan/<PLAN-XXX-tên>.md`
- Khi hoàn thành plan: chuyển vào `docs/plan/done/`
- **Luôn cập nhật `docs/index.md`** khi thêm file doc mới
- Không tạo top-level thư mục mới trong `docs/` trừ khi thực sự cần thiết

### 9.5 Quy tắc Nội dung (Content)

- Tên thuật ngữ dân tộc phải nhất quán: **S'Tiêng**, **M'Nông**
- Tên thương hiệu ngắn (logo, UI, SEO site name): **Di Sản Bù Đăng** — dùng như tên riêng/khởi nguyên, không phải khẳng định ranh giới hành chính.
- Tagline/subtitle mô tả phạm vi phục vụ: **Bảo Tàng Số Thành Phố Đồng Nai** — luôn đi kèm brand ngắn để làm rõ phạm vi thực tế.
- Tên sản phẩm đầy đủ: **Bảo Tàng Số Di Sản Bù Đăng — Thành Phố Đồng Nai** (viết hoa đầy đủ).
- Địa danh cấp thành phố (khung phạm vi phục vụ): **Thành Phố Đồng Nai** — dùng trong mô tả tổng quát, SEO, metadata phạm vi.
- Địa danh cụ thể (khi mô tả một di sản/sự kiện cụ thể): **Xã Bù Đăng**, **Sóc Bom Bo**, núi Bà Rá, Căn cứ Tà Thiết, Lộc Ninh... Các cụm này được kết nối với nhau qua khái niệm "cụm/tuyến di sản" (xem roadmap mục 10), không dùng brand để gộp chúng.

---

## 10. Khả năng Mở rộng (Roadmap)

### Giai đoạn hiện tại (Đã hoàn thành)
- [x] 11 di sản số hóa
- [x] Bản đồ tương tác + GPS
- [x] Audio Guide toàn cục (4 track hoàn thiện)
- [x] Góc Học Tập với Quiz + Huy hiệu
- [x] Flashcard thuật ngữ S'tiêng
- [x] 6 ký ức cộng đồng thu âm

### Giai đoạn tiếp theo (Ưu tiên cao)
- [ ] Thêm audio guide cho các di sản còn lại (7 di sản chưa có audio)
- [ ] Thêm nội dung Markdown chi tiết cho tất cả 11 di sản
- [ ] Tích hợp Video phục dựng lễ hội Mừng Lúa Mới

### Tương lai (Sau khi có đủ nguồn lực)
- [ ] VR 360° cho các điểm di tích
- [ ] AI Chatbot hỗ trợ giải đáp thắc mắc du khách
- [ ] Mở rộng mô hình sang các phường/xã khác của TP. Đồng Nai
- [ ] Phiên bản đa ngôn ngữ (Anh, Khmer)

---

## 11. Giai đoạn Phát triển

Dự án được xây dựng trong **6 tháng**:

| Giai đoạn | Thời gian | Nội dung |
|---|---|---|
| **1 — Thu thập tư liệu** | Tháng 1–2 | Khảo sát địa bàn, thu thập tư liệu lịch sử, ảnh di sản thực tế, thu âm giọng đọc mẫu |
| **2 — Thiết kế UI/UX** | Tháng 3 | Thiết kế giao diện trên Figma — gam màu ấm nóng cảm hứng thổ cẩm S'tiêng |
| **3 — Lập trình** | Tháng 4–5 | Nuxt 4 + Leaflet + Audio Guide (Howler.js + Pinia) + GSAP |
| **4 — Số hóa & kiểm thử** | Tháng 6 | Nuxt Content v3, kết nối SQLite, kiểm thử, đóng gói |

---

## 12. Tài liệu Liên quan

Đọc kỹ các file sau trước khi làm việc trên từng mảng:

| Tài liệu | Đường dẫn | Mô tả |
|---|---|---|
| Docs Index | `docs/index.md` | Mục lục toàn bộ tài liệu |
| PROJECT MASTER | `docs/PROJECT_MASTER.md` | Nguồn sự thật tối thượng — tổng quan, tech stack, kiến trúc, quy tắc phát triển và roadmap đầy đủ. |
| Tech Stack Chi tiết | `docs/arch/tech-stack.md` | Quyết định kiến trúc chi tiết |
| Di sản (Heritage) | `docs/feat/heritage.md` | Data model và phân loại |
| Bản đồ | `docs/feat/map.md` | Leaflet, GPS, clustering |
| Audio Guide | `docs/feat/audio-guide.md` | Howler.js, global player |
| Gamification | `docs/feat/gamification.md` | Quiz, huy hiệu, rewards |
| Góc Học Đường | `docs/feat/school.md` | Tài nguyên giáo dục, flashcard |
| Gallery | `docs/feat/gallery.md` | Triển lãm ảnh |
| Đóng góp CĐ | `docs/feat/contribute.md` | Form đóng góp tư liệu |
| Du lịch | `docs/feat/tourism.md` | Tourism MVP |
| Đầu tư | `docs/feat/invest.md` | Invest MVP |
| Audio Script | `docs/ref/audio-recording-guide.md` | Kịch bản thu âm thuyết minh |
| Báo cáo Công nghệ | `docs/BAO_CAO_DU_AN.md` | Bảng công nghệ dành cho báo cáo cuộc thi |

---

*Cập nhật lần cuối: 2026-07-07 — Phiên bản 1.0*
*Tài liệu này phải được cập nhật đồng thời khi có thay đổi lớn về kiến trúc, tech stack, hoặc phạm vi tính năng.*
