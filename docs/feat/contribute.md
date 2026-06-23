# Đóng Góp Cộng Đồng (Contribute)

Tính năng mang tinh thần "Crowdsourcing" (Đám đông xây dựng), cho phép mọi người dân, nhà nghiên cứu và học sinh cùng đóng góp tư liệu văn hoá địa phương vào bảo tàng số chung.

## 1. Mục đích
Dự án không chỉ là công sức của một cá nhân, mà là một không gian mở để cộng đồng bảo tồn câu chuyện của chính mình. Người dùng có thể gửi: văn bản, hình ảnh, câu chuyện truyền miệng.

## 2. Luồng hoạt động hiện tại (Frontend)
- Cổng thông tin công khai (`/contribute`) với form tiếp nhận thông tin từ người dùng.
- Dữ liệu gửi đi sẽ chờ duyệt (Pending) chứ không hiển thị ngay ra công chúng.

## 3. Kiến trúc tương lai (Admin & Auth)
> *Lưu ý: Luồng Admin hiện đang được thảo luận và sẽ có tài liệu kiến trúc riêng.*
- **Xác thực:** Sẽ tích hợp Google Auth (OAuth) để định danh người gửi, chống spam.
- **Quy trình duyệt (Moderation):** Admin có quyền Review (Đọc) -> Edit (Sửa lỗi chính tả) -> Approve (Đăng tải) hoặc Reject (Từ chối).
