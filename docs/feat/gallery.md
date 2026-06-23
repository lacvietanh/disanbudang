# Triển Lãm Ảnh Số (Digital Gallery)

Không gian trưng bày hình ảnh chất lượng cao về di sản, con người và thiên nhiên Bù Đăng. 
Tuân thủ nguyên tắc **SOLID (Single Responsibility Principle)**: Gallery chỉ thuần tuý phục vụ lưu trữ và hiển thị Ảnh Di Sản ở dạng MVP tinh gọn và hiệu quả.

## 1. Cấu trúc Giao diện
- **Lưới Masonry:** Hiển thị ảnh nghệ thuật với tỷ lệ nguyên bản (Landscape/Portrait) mà không bị cắt xén, tối ưu không gian thị giác.
- **Lightbox Chuyên Nghiệp:** Khung xem ảnh toàn màn hình với hiệu ứng làm mờ (backdrop-blur) và hiển thị metadata đi kèm.

## 2. Tính năng Lõi (MVP, Efficient)
- **Đa Ngôn Ngữ Tối Giản (Vi/En):** Tích hợp chuyển đổi nội dung thẻ `alt` (mô tả ảnh) ngay tại trang, phục vụ cả du khách Việt và quốc tế mà không cần cài đặt cả hệ thống i18n cồng kềnh.
- **Hiệu suất (Progressive Loading):** Sử dụng ảnh placeholder làm mờ (Blurhash) trong quá trình tải ảnh chất lượng cao (hiệu ứng `opacity-0` sang `opacity-100`).
- **Bộ Lọc & Tìm Kiếm:** Lọc ảnh theo danh mục (Lịch sử, Danh thắng...) và tìm kiếm theo tiêu đề hoặc vị trí địa lý.
- **Metadata Bổ Sung:** Trích xuất màu chủ đạo (Dominant Color), đính kèm nguồn ảnh chính thống và nút tải ảnh gốc trực tiếp (Download).
