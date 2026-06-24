# Nhật Ký Thay Đổi: Cập Nhật Hình Ảnh Chất Lượng Cao & Tối Ưu Hóa Trải Nghiệm (UI/UX)

Dưới đây là chi tiết các thay đổi đã được thực hiện để nâng cao chất lượng hiển thị hình ảnh và giải quyết triệt để các vết xước trải nghiệm người dùng trên website **Di Sản Bù Đăng**.

---

## 1. Bản Đồ Ánh Xạ Hình Ảnh Chất Lượng Cao

Toàn bộ các tệp dữ liệu Mock (`mockHeritages.ts` và `mockPosts.ts`) đã được cập nhật đường dẫn đến các hình ảnh chất lượng cao gốc (PNG, JPG) nằm trong thư mục `/images/heritage/Img disanbudang/` để loại bỏ hiện tượng bể hình, mờ nhòe:

### 1.1 Chi Tiết Thay Đổi Trong Thư Viện Di Sản (`mockHeritages.ts`):
*   **Chiến Khu Đ Bù Đăng (`hrt-001`):**
    *   Ảnh bìa (coverImage) được cập nhật sang `/images/heritage/Img disanbudang/chien khu D.png`.
    *   Ảnh bộ sưu tập (gallery) được cập nhật sang `/images/heritage/Img disanbudang/chien khu D.png` và `/images/heritage/Img disanbudang/rung-chien-khu-d.png`.
    *   Ảnh thuyết minh âm thanh (audio.coverImage) đồng bộ sang `/images/heritage/Img disanbudang/chien khu D.png`.
*   **Thác Mơ Bù Đăng (`hrt-002`):**
    *   Ảnh bìa và bộ sưu tập được cập nhật sang `/images/heritage/Img disanbudang/thac-mo-dong-nai.png` (sắc nét, độ phân giải cao).
*   **Lễ Hội Cồng Chiêng S'tiêng (`hrt-003`):**
    *   Ảnh bìa, bộ sưu tập và thuyết minh âm thanh được cập nhật sang `/images/heritage/Img disanbudang/Cong chieng.jpg` (2.7 MB, màu sắc chân thực).
*   **Nhà Dài Truyền Thống S'tiêng (`hrt-004`):**
    *   Ảnh bìa và bộ sưu tập được cập nhật sang `/images/heritage/Img disanbudang/Nha Dai Truyen Thong.png`.
*   **Rừng Nguyên Sinh Bù Đăng (`hrt-006`):**
    *   Ảnh bìa và bộ sưu tập được cập nhật sang `/images/heritage/Img disanbudang/Khu Bao Ton 2.jpg` (2.9 MB, đại ngàn xanh ngút ngàn).
*   **Làng Nghề Dệt Thổ Cẩm S'tiêng (`hrt-007`):**
    *   Ảnh bìa và bộ sưu tập được cập nhật sang `/images/heritage/Img disanbudang/hoa van tho cam stieng.png`.
*   **Lễ Hội Mừng Lúa Mới M'nông (`hrt-008`):**
    *   Ảnh bìa và bộ sưu tập được cập nhật sang `/images/heritage/Img disanbudang/le hoi mung lua moi.png`.
*   **Trảng Cỏ Bù Lạch (`hrt-009`):**
    *   Ảnh bìa và bộ sưu tập được cập nhật sang `/images/heritage/Img disanbudang/Trang co Bu Lach.png`.
*   **Thác Đứng Bù Đăng (`hrt-010`):**
    *   Ảnh bìa và bộ sưu tập được cập nhật sang `/images/heritage/Img disanbudang/Thac Dung.png`.

### 1.2 Chi Tiết Thay Đổi Trong Ký Ức Cộng Đồng (`mockPosts.ts`):
*   Đồng bộ toàn bộ các ảnh bìa của bài đăng cộng đồng và tin tức liên quan sang các phiên bản chất lượng cao tương ứng:
    *   Ảnh cồng chiêng: `/images/heritage/Img disanbudang/Cong chieng.jpg`
    *   Ảnh rừng nguyên sinh: `/images/heritage/Img disanbudang/Khu Bao Ton 2.jpg`
    *   Ảnh chiến khu D: `/images/heritage/Img disanbudang/chien khu D.png`
    *   Ảnh thác mơ: `/images/heritage/Img disanbudang/thac-mo-dong-nai.png`
    *   Ảnh dệt thổ cẩm: `/images/heritage/Img disanbudang/hoa van tho cam stieng.png`
    *   Ảnh lễ mừng lúa mới: `/images/heritage/Img disanbudang/le hoi mung lua moi.png`
    *   Ảnh trảng cỏ Bù Lạch: `/images/heritage/Img disanbudang/Trang co Bu Lach.png`

---

## 2. Các Cải Tiến UI/UX Tinh Tế

### 2.1 Cập Nhật Trình Chiếu Ảnh Nổi Bật Trang Chủ (Hero Slideshow)
*   **Tệp chỉnh sửa:** `app/components/home/HeroSection.vue`
*   **Nội dung:** Thay đổi 5 slide nền chính thành 5 hình ảnh chất lượng cao xuất sắc nhất do người dùng yêu cầu:
    1.  *Văn Hóa Cồng Chiêng S'tiêng*
    2.  *Rừng Nguyên Sinh Bù Đăng*
    3.  *Nhà Dài Truyền Thống S'tiêng*
    4.  *Lễ Hội Mừng Lúa Mới M'nông*
    5.  *Thác Mơ Bù Đăng*

### 2.2 Thiết Kế Lại Bộ Chọn Sắp Xếp (Sort Dropdown) Thư Viện Cinematic
*   **Tệp chỉnh sửa:** `app/pages/library.vue`
*   **Nội dung:** Bọc bộ chọn `<select>` mặc định của trình duyệt vào một container tương đối (`relative flex items-center`), thiết lập thuộc tính `appearance-none` để ẩn bộ lọc mặc định và thêm biểu tượng chevron vàng (`mdi:chevron-down`) tuyệt đẹp. Cho giao diện nhất quán đồng bộ hoàn hảo với chủ đề Dark Mode của ứng dụng.

### 2.3 Cơ Chế Bảo Toàn Biểu Mẫu Đóng Góp (Form Draft Auto-Save)
*   **Tệp chỉnh sửa:** `app/pages/contribute/index.vue`
*   **Nội dung:** Tự động lắng nghe thay đổi thông tin (form inputs & loại hiến tặng) thông qua `watch` chiều sâu và lưu vào `sessionStorage` của trình duyệt. Dữ liệu sẽ tự động khôi phục lại khi người dùng truy cập trang hoặc tải lại trang vô tình. Dữ liệu sẽ bị xóa hoàn toàn khỏi cache khi form được gửi lên máy chủ thành công.

### 2.4 Cập Nhật Trình Chiếu Ảnh Nổi Bật Trang Giới Thiệu (About Page Hero Slideshow)
*   **Tệp chỉnh sửa:** `app/pages/about.vue`
*   **Nội dung:** Chuyển đổi phần Hero hình nền tĩnh thành 1 trình chiếu 3 hình ảnh di sản chất lượng cao chuyển đổi tuần tự:
    1.  `/images/heritage/Bombo/TAN08217.jpg`
    2.  `/images/heritage/lich-su/nha-giao-truyen-thong-md.webp`
    3.  `/images/heritage/Img disanbudang/chien khu D.png`

---

## 3. Xác Minh Chất Lượng
*   Đã chạy kiểm tra cú pháp và thực hiện đóng gói production thành công qua lệnh `npm run build` và `npm run generate`.
*   Không phát sinh bất kỳ lỗi runtime hay lỗi liên kết 404 nào đối với các đường dẫn hình ảnh mới.
