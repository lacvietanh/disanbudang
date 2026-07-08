# Tài Liệu Dự Án: Di Sản Bù Đăng

> **[PROJECT_MASTER.md](./PROJECT_MASTER.md) — Đọc file này TRƯỚC TIÊN.**
> Đây là nguồn sự thật tối thượng (Single Source of Truth) của toàn bộ dự án: mục tiêu, tech stack, kiến trúc, quy tắc phát triển và roadmap.

Hệ thống tài liệu này được cấu trúc theo chuẩn **Aki-RULE**, chia thành các phân hệ chính để dễ dàng tra cứu và bảo trì.

## 🎯 Mục lục

### 0. Master Document (Đọc Trước)
- [**PROJECT MASTER**](./PROJECT_MASTER.md): Nguồn sự thật tối thượng — tổng quan, tech stack, kiến trúc, quy tắc phát triển và roadmap đầy đủ.

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
- [Standardize Docs Plan (đã hoàn thành)](./plan/done/PLAN-001-standardize-docs.md): Kế hoạch chuẩn hoá tài liệu đợt 1.
- [Refactor theo Aki-RULE đợt 1](./plan/refactor-akirule-first.md): Kết quả rà soát toàn dự án theo bộ rule Aki-RULE và kế hoạch refactor ưu tiên P0/P1/P2.

### 4. Báo cáo (Reports)
- [Báo Cáo Nghiên Cứu Dự Án](./BAO_CAO_DU_AN.md): Bản báo cáo nghiên cứu dự án chi tiết, chính thức và chuẩn xác về mặt công nghệ và tính năng.

### 5. Hướng dẫn & Tài liệu phụ trợ (References)
- [Kịch Bản Thu Âm Audio Guide](./ref/audio-recording-guide.md): Hướng dẫn thuyết minh & kịch bản thu âm giọng đọc thực tế cho các điểm di sản (thay thế giọng AI hiện tại).

---
> **Lưu ý cho Developer/AI:** Mọi thay đổi về tính năng lớn hoặc kiến trúc mới đều phải được cập nhật tương ứng vào thư mục `docs/feat/` hoặc `docs/arch/`. Không tạo thêm các top-level directory trừ khi các thư mục hiện tại (`feat`, `arch`, `plan`, `ref`) không còn phù hợp.

