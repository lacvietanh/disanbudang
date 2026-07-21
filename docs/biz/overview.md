# Business Backbone: Di Sản Đồng Nai

Xương sống định vị và mô hình kinh doanh của dự án. Mọi doc `feat/`, `arch/`, `plan/` đụng tới định
hướng sản phẩm hoặc tiền phải tham chiếu về đây; khi code intent và doc này lệch nhau, doc này thắng
— cần đối chiếu lại hoặc escalate lên chủ dự án.

## 1. Định vị (Identity)

- **Tên thương hiệu**: Bảo Tàng Số Di Sản Bù Đăng — Thành Phố Đồng Nai (`disanbudang.com`).
- **Tagline**: Bảo Tàng Số Thành Phố Đồng Nai.
- **Bản chất sản phẩm**: bảo tàng số phi lợi nhuận về văn hoá S'Tiêng/M'Nông tại khu vực Bù Đăng cũ,
  nay thuộc Thành Phố Đồng Nai — không phải sản phẩm thương mại thuần tuý.
- **Đối tượng**: du khách, học sinh/nhà trường, cộng đồng đóng góp nội dung, và (thứ cấp) nhà đầu
  tư/doanh nghiệp quan tâm vùng cao nguyên Đồng Nai.

## 2. Mô hình giá trị (USP)

Bảo tàng số **không thu phí người xem**. Giá trị kinh tế đến từ việc biến traffic văn hoá thành hai
luồng phái sinh (xem chi tiết ở từng doc `feat/`):

- [Cơ Hội Đầu Tư (Invest)](../feat/invest.md) — chuyển traffic văn hoá thành cơ hội kinh tế địa
  phương: nông nghiệp công nghệ cao, du lịch sinh thái, hạ tầng, công nghiệp. Định hướng MVP: thông
  tin cô đọng + liên hệ nhanh tại `/invest`.
- [Dịch Vụ Du Lịch (Tourism)](../feat/tourism.md) — mở rộng từ "bảo tàng thuần túy" sang "hệ sinh
  thái du lịch": danh bạ điện tử (Directory) cho lưu trú, ẩm thực, đặc sản, tour tại `/tourism`.

## 3. Roadmap kinh doanh

- **Giai đoạn hiện tại**: MVP Directory (Invest + Tourism) — không giao dịch/thanh toán trong sản
  phẩm, chỉ kết nối thông tin và liên hệ.
- **Giai đoạn kế tiếp**: xem `docs/plan/` cho các kế hoạch triển khai đã chốt hoặc đang thực hiện;
  quyết định mở rộng monetize (booking, giao dịch trực tuyến...) phải ghi lại trong `docs/plan/`
  trước khi thực thi, theo `RULE-design-core`/`RULE-docs`.

## 4. Ràng buộc khi thay đổi

- Không đưa quảng cáo/thương mại hoá lấn át trải nghiệm văn hoá cốt lõi (bảo tàng luôn là sản phẩm
  chính, Invest/Tourism là lớp phái sinh).
- Mọi thay đổi định vị thương hiệu (tên, tagline, phạm vi địa lý) phải đồng bộ với `CLAUDE.md` §1 và
  `docs/arch/system.md`.
