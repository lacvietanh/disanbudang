# Bản đồ Tương tác & Trải nghiệm Địa lý (Interactive Map)

Công cụ trực quan hóa vị trí địa lý của toàn bộ di sản và hỗ trợ du khách định hướng không gian tại Bù Đăng.

## 1. Công nghệ Lõi
- **Bản đồ:** Leaflet.js kết hợp với Vue-Leaflet để tối ưu hoá cho Vue 3.
- **Tiles:** Sử dụng bộ bản đồ nền nhẹ (Light map) để làm nổi bật các điểm di sản (marker).

## 2. Tính năng chính
- **Marker & Clustering:** Nhóm các điểm di sản ở gần nhau khi thu nhỏ bản đồ và tách ra khi phóng to. Mỗi marker hiển thị màu sắc và icon riêng biệt theo từng danh mục (Category).
- **Bộ lọc đa năng:** Lọc di sản trực tiếp trên bản đồ theo Phân loại (Category) và Thời kỳ (Period).
- **Tìm kiếm trực tiếp:** Khả năng tra cứu vị trí theo tên hoặc từ khóa.
- **Custom Popups (`MapPopupData`):** Hiển thị nhanh hình ảnh, tên và thông tin tóm tắt của di sản ngay trên giao diện bản đồ.
- **Định vị GPS (Locate Me):** Tích hợp HTML5 Geolocation API, cho phép hiển thị vị trí thực của người dùng trên bản đồ để hỗ trợ di chuyển (sử dụng cảnh báo bằng SweetAlert2).
