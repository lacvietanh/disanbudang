# Kế hoạch Chuẩn hoá Tài liệu (Đã tối ưu theo METHOD-techbiz-optimizer)

*Lưu ý: Đây là bản snapshot của kế hoạch chuẩn hoá tài liệu (đã hoàn thành).*

Dựa trên toàn bộ bộ quy tắc **Aki-RULE** (bao gồm các phương pháp luận `METHOD-techbiz-optimizer.md`, `METHOD-flow-audit.md`, và `RULE-stack-akiNuxtCf.md`), kế hoạch này được thiết kế nhằm **giảm thiểu độ overthinking**, tập trung vào giá trị thực tế cốt lõi nhất: tạo ra cấu trúc tài liệu rõ ràng, dễ bảo trì, với số lượng file ít nhất có thể (Single source of truth).

## Real Goal & Simplest Viable Path

Mục tiêu cốt lõi: Thiết lập bộ khung tài liệu `docs/` chuẩn Aki để AI và con người dễ dàng định vị luồng và kiến trúc, mà không tạo ra gánh nặng bảo trì (maintenance burden) với quá nhiều file `.md` phân mảnh.

Thay vì tạo 10+ file cho từng tính năng nhỏ, chúng ta sẽ **gom nhóm (consolidate)** chúng lại thành các file canonical (chính thống) rõ ràng nhất.

## Proposed Changes & Execution

### 1. Master Index
- **`docs/index.md`**: Mục lục chính của dự án. Trỏ link đến tất cả các tài liệu bên dưới.

### 2. Features (Tính năng kinh doanh)
- **`docs/feat/core-features.md`**: Gom nhóm tất cả tính năng chính vào 1 file duy nhất (Heritage models, Interactive Map, Audio Guide, Quiz, School & Community).

### 3. Architecture (Kiến trúc kỹ thuật)
- **`docs/arch/tech-stack.md`**: Gom nhóm kiến trúc kỹ thuật (Nuxt 4, Pinia, Routing, Cloudflare rules).

### 4. Plans (Kế hoạch triển khai)
- **`docs/plan/PLAN-001-standardize-docs.md`**: Lưu trữ chính nội dung của kế hoạch chuẩn hoá tài liệu này vào đây để làm lịch sử đối chiếu.

### 5. Root Project
- **`README.md`**: Rút gọn tối đa: Chỉ để Tên dự án, giới thiệu siêu ngắn, cài đặt (install & run dev) và link trực tiếp đến `docs/index.md`.
