# Tài Liệu Dự Án: Di Sản Bù Đăng

Chào mừng đến với hệ thống tài liệu của dự án Di Sản Bù Đăng. Hệ thống tài liệu này được cấu trúc theo chuẩn **Aki-RULE**, chia thành các phân hệ chính để dễ dàng tra cứu và bảo trì.

## 🎯 Mục lục

### 1. Tính năng (Features)
Mô tả về các tính năng nghiệp vụ, logic và các hệ thống cốt lõi tương tác với người dùng.
- **Core Features:** Các tài liệu mô tả chi tiết từng tính năng của hệ thống.
  - [Di Sản (Heritage Models)](./feat/heritage.md)
  - [Bản đồ Tương tác & GPS](./feat/map.md)
  - [Audio Guide](./feat/audio-guide.md)
  - [Trò chơi hoá (Gamification)](./feat/gamification.md)
  - [Triển Lãm Ảnh Số (Gallery)](./feat/gallery.md)
  - [Dịch Vụ Du Lịch (Tourism MVP)](./feat/tourism.md)
  - [Cơ Hội Đầu Tư (Invest MVP)](./feat/invest.md)
  - [Góc Học Đường](./feat/school.md)
  - [Tin Tức (News)](./feat/news.md)
  - [Đóng Góp Cộng Đồng](./feat/contribute.md)

### 2. Kiến trúc (Architecture)
Mô tả các quyết định kỹ thuật, stack công nghệ, quản lý trạng thái và cấu trúc mã nguồn.
- [Tech Stack Overview](./arch/tech-stack.md): Tổng quan về Nuxt 4, Pinia, và các quyết định kiến trúc khác.

### 3. Kế hoạch (Plans)
Nơi lưu trữ các kế hoạch triển khai đã chốt hoặc đang thực hiện.
- [Standardize Docs Plan](./plan/PLAN-001-standardize-docs.md): Kế hoạch chuẩn hoá tài liệu đợt 1.

### 4. Báo cáo (Reports)
- [Báo Cáo Nghiên Cứu Dự Án](./BAO_CAO_DU_AN.md): Bản báo cáo nghiên cứu dự án chi tiết, chính thức và chuẩn xác về mặt công nghệ và tính năng.

---
> **Lưu ý cho Developer/AI:** Mọi thay đổi về tính năng lớn hoặc kiến trúc mới đều phải được cập nhật tương ứng vào thư mục `docs/feat/` hoặc `docs/arch/`. Không tạo thêm các top-level directory trừ khi các thư mục hiện tại (`feat`, `arch`, `plan`, `ref`) không còn phù hợp.

