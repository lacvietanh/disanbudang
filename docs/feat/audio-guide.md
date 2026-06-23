# Trình phát Âm thanh (Audio Guide)

Công cụ kể chuyện (Podcast/Thuyết minh) mang đến trải nghiệm thính giác sống động cho du khách. 

## 1. Công nghệ Lõi
- Sử dụng **Howler.js** để đảm bảo hiệu suất xử lý luồng âm thanh mượt mà trên trình duyệt.
- Quản lý trạng thái (State Management) bằng **Pinia** (`audioStore`), cho phép trình phát chạy ngầm liên tục khi người dùng chuyển trang.

## 2. Tính năng chính
- **Global Player:** Thanh phát nhạc toàn cục luôn hiện hữu.
- **Tích hợp bối cảnh:** Được nhúng trực tiếp vào các trang chi tiết di sản thông qua `heritageId`.
- **Hỗ trợ kịch bản (Transcript):** Tùy chọn hiển thị văn bản thuyết minh chạy song song với âm thanh.
