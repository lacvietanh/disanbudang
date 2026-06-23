# Tổng quan Kiến trúc Kỹ thuật (Tech Stack Overview)

Dự án Di Sản Bù Đăng được xây dựng trên hệ sinh thái hiện đại của Vue và Nuxt.

## 1. Stack Chính
- **Framework:** Nuxt 4 (Vue 3). Sử dụng module-based architecture.
- **Styling:** Tailwind CSS.
- **Công cụ hỗ trợ giao diện:** GSAP & VueUse Motion (cho animation).

## 2. Quản lý Trạng thái (State Management)
Dự án sử dụng **Pinia** làm giải pháp quản lý trạng thái. Các logic phức tạp được tách biệt rõ ràng vào từng domain store:

- `stores/heritage.ts`: Quản lý dữ liệu danh sách di sản, trạng thái tải và lọc.
- `stores/map.ts` (nếu có): Quản lý vị trí bản đồ, filter trạng thái hiển thị popup.
- `stores/audio.ts`: Rất quan trọng. Lưu trữ `AudioPlayerState` toàn cục (isPlaying, currentTime, currentTrack) giúp audio không bị ngắt khi chuyển trang.
- `stores/quiz.ts`: Quản lý tiến trình làm bài kiểm tra, điểm số và huy hiệu của người dùng.

## 3. Cấu trúc Routing
- Sử dụng cơ chế file-based routing mặc định của Nuxt trong thư mục `app/pages/`.
- Các trang chính bao gồm: `/` (Home), `/heritage` (Danh sách), `/heritage/[slug]` (Chi tiết), `/map`, `/library`, `/community`, `/school`, `/quiz`.

## 4. Khả năng tương thích Cloudflare (Aki-RULE)
Dựa theo `RULE-stack-akiNuxtCf.md`:
- Nếu trong tương lai dự án deploy lên Cloudflare Pages, mọi lệnh gọi outbound phải tuân thủ chuẩn `fetch()`.
- Các trang public như `/heritage` nên được thiết lập prerender/SSG.
- Hiện tại dự án đang sử dụng Node/npm (`npm run build`). Nếu có kế hoạch chuyển đổi sang Edge Runtime, cần lưu ý không dùng `fs`, `path` hay các Node APIs.
