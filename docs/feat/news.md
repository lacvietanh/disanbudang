# Tin Tức & Sự Kiện (News)

Hệ thống cung cấp thông tin thời sự, các lễ hội sắp diễn ra hoặc tiến độ cập nhật của dự án.

## 1. Kiến trúc (Tĩnh - No CMS)
Theo nguyên tắc tối giản cho MVP, hiện tại hệ thống tin tức được thiết kế dưới dạng **Vue tĩnh (Static Vue components)** tại thư mục `app/pages/news/`.
- Không phụ thuộc vào Database hay Nuxt Content.
- Code trực tiếp nội dung bài viết vào mã nguồn.

## 2. Lợi ích
- Hiệu suất siêu cao (Tải trang gần như tức thì do là HTML tĩnh hoàn toàn).
- Hoạt động ổn định, không lo bảo trì Server/API.
- Phù hợp cho giai đoạn đầu khi số lượng bản tin còn ít.
