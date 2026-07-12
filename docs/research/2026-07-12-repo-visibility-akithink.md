# Decision record — Repo visibility khi tích hợp backend (giai đoạn 2)

> Session `/akithink`, 2026-07-12. Quyết định: **giữ repo public**, kèm điều kiện cứng "hardening trước, endpoint sau".

## Bối cảnh

- Repo `disanbudang` (public tại `github.com/lacvietanh/disanbudang`) đang chuyển từ giai đoạn 1 (frontend thuần, Nuxt + Cloudflare Pages) sang giai đoạn 2: tích hợp backend **cùng repo** (Nitro server routes / Pages Functions).
- Phạm vi backend dự kiến: auth/tài khoản người dùng, ghi dữ liệu người dùng (D1/KV), proxy AI/API trả phí — và mở rộng dần.
- Cuộc thi còn **1–3 tháng** đến lúc chấm. Public không phải yêu cầu cuộc thi — là lựa chọn chủ động để khẳng định chất lượng code và tạo hiệu ứng lan truyền.
- Secrets đã quản lý chuẩn: env var ở Cloudflare Pages + GitHub Secrets, không nằm trong repo.

## Chuỗi mục tiêu

Tức thời: chốt public/private → Trung gian: (a) vận hành an toàn trong cửa sổ thi, (b) uy tín qua code công khai → **Tối thượng: khẳng định năng lực qua sản phẩm; repo public là bằng chứng.**

Xung đột giữa (a) và (b) là xung đột **thời điểm**, không phải bản chất: giá trị lan truyền đạt đỉnh *trong* cuộc thi; rủi ro phá hoại cũng tập trung *trong* cuộc thi.

## Quyết định

**Giữ public.** Điều kiện cứng: **không ship bất kỳ endpoint backend nào trước khi hoàn thành 4 chốt chặn:**

1. **Spend cap tuyệt đối** cho AI proxy (Cloudflare AI Gateway hoặc quota tự đếm trong KV) — rủi ro tốn tiền thật duy nhất.
2. **Turnstile + rate-limit** trên mọi endpoint ghi.
3. **Auth chuẩn qua provider** (không tự chế); validation server-side mọi input.
4. **Blast radius nhỏ**: D1 backup định kỳ; dữ liệu user tách khỏi content tĩnh.

## Lý do cốt lõi

- Private repo **không giấu được backend**: mọi endpoint, payload, flow đều lộ qua DevTools → Network tab của bất kỳ visitor nào. Attacker có chủ đích không cần đọc repo.
- Private chỉ mua *thời gian* trước bot scan cơ hội — không phải phòng tuyến. Nếu backend chỉ an toàn khi không ai đọc code, thì nó không an toàn.
- Nguy hiểm lớn nhất của private là **cảm giác an toàn giả** → nới lỏng kỷ luật hardening — chính là kịch bản inversion "muốn chắc chắn thất bại".
- Repo public buộc code được viết như thể luôn bị đọc; kỷ luật đó **chính là** thứ tạo uy tín — mục tiêu tối thượng và an toàn vận hành hội tụ về cùng một hành động.

## Phương án bị loại

| Phương án | Lý do loại |
|---|---|
| Private toàn phần | Không tăng an toàn thực chất (endpoint vẫn lộ qua Network tab); mất hiệu ứng lan truyền đúng lúc giá trị nhất; mất vĩnh viễn stars/watchers khi flip; tạo cảm giác an toàn giả. |
| Tách backend ra repo/Worker private riêng | Hợp lý về nguyên tắc nhưng kiến trúc đã chốt cùng repo; chi phí tách không xứng lợi ích khi hardening đầy đủ. |

## Điều kiện đảo chiều (assumptions cần theo dõi)

Flip private **tạm thời, ngay lập tức** (biện pháp khẩn cấp, không phải chiến lược) nếu:

- (a) Deadline buộc ship endpoint *trước khi* hoàn thành 4 chốt chặn, hoặc
- (b) Xảy ra incident phá hoại có chủ đích trong cửa sổ thi.

Lưu ý kỹ thuật: GitHub cho phép public↔private bất kỳ lúc nào, nhưng chuyển private **xoá vĩnh viễn** stars/watchers/forks liên kết.

## Pre-mortem đã cân nhắc

- *Public thất bại:* đối thủ đọc code, thấy AI proxy thiếu quota → script đốt ngân sách API, site chết đúng tuần chấm. → Bị chặn bởi chốt #1.
- *Private thất bại:* mất momentum công khai; mở lại repo sau thi thì sự chú ý đã nguội; vẫn bị tấn công qua endpoint công khai vì hardening bị xem nhẹ.
