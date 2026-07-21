# Kế Hoạch Triển Khai: Init DB & Docs Refactor (jul12-init-db)

> **Trạng thái:** Đã hoàn thành (Phần Backend/Auth). Phần cấu trúc Docs đã bị thay thế (supersede) bởi kiến trúc `CLAUDE.md` mới.
Bản kế hoạch này giải quyết hai mục tiêu chính:
1. **Dọn dẹp và chuẩn hoá hệ thống tài liệu (Docs):** Gộp nguồn sự thật vào `README.md` để tuân thủ SRP, và tái bố trí tài liệu báo cáo.
2. **Khởi tạo Backend thực tế (Cloudflare D1 & Firebase):** Tập trung toàn lực hệ thống DB cho duy nhất tính năng "Đóng góp tư liệu" (Contribute), giữ các tính năng còn lại ở dạng dữ liệu tĩnh để bảo vệ giá trị cốt lõi. Đồng thời thiết lập Firebase Auth cho admin.

---

## I. Thay Đổi Hệ Thống Tài Liệu (Docs Refactor)

- `docs/PROJECT_MASTER.md` và `docs/BAO_CAO_DU_AN.md`: Đã được gộp vào `README.md` làm Single Source of Truth.
- Cả hai file trên trong thư mục `docs/` đã được xóa bỏ để dọn dẹp dự án.

## II. Khởi Tạo Firebase Auth & Trang Admin/Me

1. Thiết lập biến môi trường và Firebase Config trong `nuxt.config.ts`.
2. Khởi tạo plugin `plugins/firebase.client.ts` cho app.
3. Thiết lập Route Rules (SPA - `ssr: false`) cho `/admin/**` và `/me/**`.
4. Tạo trang tĩnh ban đầu cho `/admin` và `/me` sử dụng Firebase Auth. (Custom Claims sẽ do người dùng setup sau).

## III. Khởi Tạo Backend D1 (Chỉ dành cho Đóng Góp)

### 1. Cấu trúc Database (`schema.sql`)
Tạo file `schema.sql` ở thư mục gốc chứa bảng `contributions`:
```sql
DROP TABLE IF EXISTS contributions;
CREATE TABLE contributions (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- story, photo, document, memory, artwork, research
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  heritage_id TEXT, -- Có thể null nếu đóng góp di sản mới
  files_data TEXT, -- Dùng text string/JSON để chứa link nếu cần (tạm giữ đơn giản)
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2. File cấu hình `wrangler.toml`
Khởi tạo `wrangler.toml` để liên kết D1 database cho Nuxt/Nitro (Cloudflare Pages):
```toml
name = "disanbudang"
pages_build_output_dir = "dist"
compatibility_date = "2024-04-05"

[[d1_databases]]
binding = "DB"
database_name = "disanbudang-db"
database_id = "<your-d1-id>"
```

### 3. API Endpoint (`server/api/contribute.post.ts`)
Tạo endpoint để tiếp nhận dữ liệu từ Frontend:
- Validate input (bắt buộc có title, content, author_name).
- (Tương lai/khi triển khai production) Tích hợp Turnstile.
- Insert dữ liệu vào D1 thông qua context của Nitro (`hubDatabase()` hoặc trực tiếp từ `env.DB`).
- Trả về `{ ok: true }` nếu thành công.

### 4. Frontend (`app/pages/contribute/index.vue`)
Cập nhật phương thức `handleSubmit`:
- Sử dụng `$fetch('/api/contribute', { method: 'POST' })` thay cho `mailto:`.
- Xử lý trạng thái `pending` khi chờ lưu.
