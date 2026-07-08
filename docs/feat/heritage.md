# Hệ thống Di Sản (Heritage Models)

Hệ thống lưu trữ và phân loại cốt lõi các di sản của Thành Phố Đồng Nai. Đây là "Single source of truth" cho mọi nội dung văn hoá, lịch sử được trình bày trên dự án.

## 1. Cấu trúc Mô hình (`Heritage`)
- **`HeritageCategory`:** Phân loại theo loại hình:
  - Lịch sử (`lich-su`)
  - Danh thắng (`danh-thang`)
  - Văn hoá phi vật thể (`van-hoa-phi-vat-the`)
  - Đời sống cộng đồng (`doi-song-cong-dong`)
  - Giáo dục truyền thống (`giao-duc-truyen-thong`)
- **`HeritagePeriod`:** Phân loại theo thời kỳ:
  - Tiền sử, Phong kiến, Pháp thuộc, Kháng chiến, Hiện đại.

## 2. Thông tin chi tiết
Mỗi điểm di sản được thiết kế để chứa thông tin phong phú và đa chiều:
- **Tọa độ (`coordinates`):** Phục vụ cho bản đồ tương tác.
- **Thư viện ảnh (`gallery`):** Ảnh đặc tả cho riêng di sản đó.
- **Câu chuyện (`longStory`):** Bài viết chi tiết theo cấu trúc markdown.
- **Thông tin nhanh (`quickFacts`):** Những điểm nhấn tóm tắt dễ đọc.
- **Mốc thời gian (`timeline`):** Lịch sử phát triển hoặc các cột mốc quan trọng.
