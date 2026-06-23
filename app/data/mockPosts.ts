import type { CommunityPost, NewsArticle, Event } from '~/types'

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-001',
    type: 'story',
    title: 'Ông nội tôi và những đêm cồng chiêng',
    excerpt: 'Mỗi lần nghe tiếng cồng chiêng vang lên, tôi lại nhớ ông nội — người đã nói với tôi rằng mỗi nhịp chiêng là một lời kể về tổ tiên. Ông tôi năm nay 78 tuổi, tóc bạc nhưng tay gõ chiêng vẫn còn rất rắn rỏi.',
    content: `Ông nội tôi — già làng Điểu Minh — năm nay 78 tuổi. Mỗi khi có lễ hội, ông lại lấy chiếc chiêng cổ từ vách nứa xuống và gõ đều. Ông hay bảo: "Chiêng này có linh hồn. Khi tiếng chiêng cất lên, tổ tiên đang lắng nghe."

Tôi nhớ nhất đêm hội Mừng lúa mới năm tôi học lớp 8. Cả buôn quây quần bên lửa, tiếng chiêng vang như sấm rồi chuyển sang nhịp điệu rộn rã. Từ đó tôi hiểu — tiếng chiêng không phải âm nhạc, đó là sợi dây kết nối các thế hệ.`,
    coverImage: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp',
    author: {
      id: 'author-001',
      name: 'Điểu Thị Lan',
      role: 'Học sinh',
      school: 'THPT Bù Đăng',
      grade: 'Lớp 11',
    },
    heritageId: 'hrt-003',
    tags: ['cồng chiêng', 'ký ức', 'S\'tiêng'],
    viewCount: 234,
    featured: true,
    publishedAt: '2024-05-10',
  },
  {
    id: 'post-002',
    type: 'artwork',
    title: 'Rừng Chiến Khu trong mắt em',
    excerpt: 'Sau chuyến thực tế tại Chiến Khu Đ, em Nguyễn Văn Hùng vẽ lại cảnh đoàn quân băng rừng trong đêm. Tác phẩm đạt giải Nhất cuộc thi vẽ "Di sản quê hương em".',
    content: `Sau chuyến đi thực tế đến Khu di tích Chiến Khu Đ, em muốn vẽ lại một đêm hành quân. Em dùng màu nước, tông xanh lục đậm và đen để tái hiện rừng già. Điểm nhấn là những tia trăng xuyên tán lá, rọi xuống con đường mòn.

Khi đứng dưới những cây cổ thụ trăm năm tuổi, em cảm nhận được gian khổ của thế hệ cha ông. Bức tranh này là lời cảm ơn của em gửi đến họ.`,
    coverImage: '/images/heritage/danh-thang/rung-nguyen-sinh-md.webp',
    author: {
      id: 'author-002',
      name: 'Nguyễn Văn Hùng',
      role: 'Học sinh',
      school: 'THCS Bù Đăng',
      grade: 'Lớp 8',
    },
    heritageId: 'hrt-001',
    tags: ['tranh vẽ', 'chiến khu', 'học sinh'],
    viewCount: 189,
    featured: false,
    publishedAt: '2024-05-12',
  },
  {
    id: 'post-003',
    type: 'memory',
    title: 'Ba tôi kể chuyện những ngày tải đạn',
    excerpt: 'Ba tôi 65 tuổi. Năm 15 tuổi ông gùi đạn xuyên rừng Chiến Khu Đ ban đêm, ban ngày trốn trong hầm nứa. Mỗi lần kể, ông lấy chiếc nón tai bèo cũ từ trong tủ ra, nhìn và lại kể.',
    content: `Ba tôi — ông Trần Văn Nam — khi còn 15 tuổi đã tham gia gùi lương thực, tải đạn cho bộ đội qua rừng Chiến Khu Đ.

"Hồi đó ban ngày nằm hầm, ban đêm mới dám đi. Mỗi đứa gùi trên lưng nặng gần bằng trọng lượng cơ thể mình." Ba tôi kể, mắt hướng về phía rừng xa.

Những câu chuyện đó không có trong sách giáo khoa. Đó là lịch sử sống được viết bằng mồ hôi và lòng can đảm.`,
    coverImage: '/images/heritage/lich-su/chien-khu-d-md.webp',
    author: {
      id: 'author-003',
      name: 'Trần Quốc Toàn',
      role: 'Người dân địa phương',
      school: '',
    },
    heritageId: 'hrt-001',
    tags: ['ký ức', 'kháng chiến', 'gia đình'],
    viewCount: 312,
    featured: false,
    publishedAt: '2024-05-08',
  },
  {
    id: 'post-004',
    type: 'photo',
    title: 'Buổi sáng sương mù ở Thác Mơ',
    excerpt: 'Tôi dậy từ 4h30 sáng để chụp khoảnh khắc sương bảng lảng trên mặt hồ Thác Mơ. Khi ánh bình minh đầu tiên hé lộ, cả thung lũng như chìm trong lụa trắng.',
    content: `Đến Thác Mơ lúc bình minh, trước khi mặt trời lên.

Khoảng 5h15, làn sương từ mặt hồ bốc lên gặp nắng sớm tạo thành những dải màu lấp lánh. Tôi phơi sáng 2 giây để dòng nước trông mềm mại như dải lụa trắng.

Nếu bạn muốn thấy Thác Mơ đẹp nhất, hãy đến sớm nhé.`,
    coverImage: '/images/heritage/danh-thang/thien-nhien-md.webp',
    author: {
      id: 'author-004',
      name: 'Lê Minh Tâm',
      role: 'Nhiếp ảnh gia nghiệp dư',
    },
    heritageId: 'hrt-002',
    tags: ['nhiếp ảnh', 'thác mơ', 'thiên nhiên'],
    viewCount: 445,
    featured: false,
    publishedAt: '2024-05-15',
  },
  {
    id: 'post-005',
    type: 'research',
    title: 'Hoa văn thổ cẩm S\'tiêng — Nghiên cứu học sinh lớp 9',
    excerpt: 'Trong 3 tháng, nhóm chúng em đến các buôn làng gặp nghệ nhân, ghi chép hơn 20 mẫu hoa văn. Hình thoi chéo = hạt gạo. Hình răng cưa = dãy núi. Mỗi hoa văn là một câu chuyện.',
    content: `Nhóm học sinh lớp 9A trường THCS Minh Hưng dành 3 tháng cuối tuần đến buôn Bù Bông, Bù Sa để ghi chép hoa văn thổ cẩm S'tiêng.

Phát hiện thú vị:
- Hình thoi chéo = hạt gạo, mong cầu no đủ
- Hình răng cưa = dãy núi bảo vệ buôn làng
- Hình con chim = tự do và hoà hợp thiên nhiên

Các màu sắc đều được chiết xuất từ thực vật tự nhiên trong rừng. Nghề này đang dần mai một — chỉ còn hơn 50 nghệ nhân biết dệt.`,
    coverImage: '/images/heritage/van-hoa-phi-vat-the/di-san-ban-dia-md.webp',
    author: {
      id: 'author-005',
      name: 'Nhóm HS Lớp 9A',
      role: 'Học sinh',
      school: 'THCS Minh Hưng',
      grade: 'Lớp 9',
    },
    heritageId: 'hrt-007',
    tags: ['nghiên cứu', 'thổ cẩm', 'hoa văn', 'học sinh'],
    viewCount: 156,
    featured: false,
    publishedAt: '2024-04-20',
  },
  {
    id: 'post-006',
    type: 'story',
    title: 'Mùa lúa mới và tiếng cười buôn làng',
    excerpt: 'Khi lúa nếp chín vàng, cả buôn M\'nông rộn ràng chuẩn bị lễ hội. Tiếng chày giã gạo từ tờ mờ sáng, mùi xôi nếp thơm lừng, rồi đến đêm — cồng chiêng vang và mọi người cùng nhảy múa bên lửa trại.',
    content: `Lễ Mừng Lúa Mới của người M'nông Bù Đăng bắt đầu từ tờ mờ sáng với tiếng chày giã gạo vang khắp buôn.

Tối đến, già làng làm lễ cúng thần lúa rồi tiếng cồng chiêng cất lên. Mọi người cầm tay tạo thành vòng xoang quanh lửa, uống rượu cần và nhảy múa.

Với người M'nông, đây không chỉ là thành quả lao động — đây là lúc cả cộng đồng nhắc nhau về sợi dây gắn kết bền bỉ qua năm tháng.`,
    coverImage: '/images/heritage/van-hoa-phi-vat-the/van-hoa-stieng-md.webp',
    author: {
      id: 'author-006',
      name: 'Thị Hoa',
      role: 'Phụ nữ cộng đồng M\'nông',
    },
    heritageId: 'hrt-008',
    tags: ['lúa mới', 'lễ hội', 'M\'nông', 'buôn làng'],
    viewCount: 278,
    featured: false,
    publishedAt: '2024-04-25',
  },
]

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'news-001',
    slug: 'festival-di-san-bu-dang-2025',
    title: 'Festival Di Sản Bù Đăng 2025: "Đại Ngàn Thức Giấc"',
    subtitle: 'Sự kiện văn hóa lớn nhất huyện Bù Đăng trong năm',
    excerpt: 'Festival Di Sản Bù Đăng 2025 với chủ đề "Đại Ngàn Thức Giấc" đã quy tụ hàng chục nghệ nhân, cộng đồng dân tộc và du khách trong suốt 3 ngày trải nghiệm văn hóa đặc sắc.',
    content: `Festival Di Sản Bù Đăng 2025 với chủ đề "Đại Ngàn Thức Giấc" đã chính thức khai mạc vào tháng 11 tại trung tâm huyện Bù Đăng. Đây là sự kiện quy mô lớn nhất trong năm nhằm kỷ niệm và giới thiệu các di sản văn hóa, lịch sử và thắng cảnh thiên nhiên của địa phương tới bạn bè cả nước.

Trong suốt 3 ngày diễn ra lễ hội, du khách đã được hòa mình vào không gian trải nghiệm văn hóa vô cùng độc đáo:
- Đêm nhạc hội cồng chiêng S'tiêng bên lửa trại bập bùng với sự tham gia của các nghệ nhân cao tuổi.
- Hội thi giã gạo truyền thống tái hiện không khí oai hùng của đêm giã gạo nuôi quân tại sóc Bom Bo năm xưa.
- Không gian văn hóa ẩm thực: cơm lam suối, thịt nướng ống tre, rượu cần truyền thống.

Lễ hội thu hút hơn 8.000 lượt khách tham quan, góp phần thúc đẩy du lịch sinh thái bền vững cho huyện.`,
    coverImage: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-lg.webp',
    category: 'su-kien',
    author: 'Ban Tổ Chức Festival',
    publishedAt: '2025-11-05',
    readTime: 5,
    featured: true,
    tags: ['festival', 'sự kiện', 'văn hóa', '2025'],
  },
  {
    id: 'news-002',
    slug: 'cong-chieng-stieng-vao-truong-hoc',
    title: 'Cồng Chiêng S\'tiêng Vào Trường Học: Dự Án Giáo Dục Di Sản',
    subtitle: 'Học sinh 5 trường THCS tại Bù Đăng được học đánh cồng chiêng',
    excerpt: 'Dự án đưa nghệ nhân cồng chiêng vào trường học đang được triển khai thí điểm tại 5 trường THCS trên địa bàn huyện Bù Đăng, mở ra hướng mới trong giáo dục di sản văn hóa.',
    content: `Nhằm bảo tồn bản sắc văn hóa phi vật thể, Phòng Giáo dục và Đào tạo huyện Bù Đăng đã chính thức khởi động dự án đưa nghệ thuật trình diễn cồng chiêng S'tiêng vào chương trình giáo dục ngoại khóa tại 5 trường THCS điểm.

Dự án có sự đồng hành của các già làng và nghệ nhân cồng chiêng ưu tú. Các em học sinh sẽ được học:
- Cách cầm dùi, gõ và giữ nhịp chiêng theo đúng giai điệu cổ truyền.
- Ý nghĩa lịch sử và tâm linh của bộ cồng chiêng trong đời sống người S'tiêng.
- Kỹ năng diễn xướng xoang múa phụ họa.

Đây là bước tiến quan trọng trong việc trao truyền di sản cho thế hệ trẻ.`,
    coverImage: '/images/heritage/van-hoa-phi-vat-the/van-hoa-stieng-lg.webp',
    category: 'hoat-dong',
    author: 'Phòng GD&ĐT Bù Đăng',
    publishedAt: '2025-08-20',
    readTime: 4,
    featured: true,
    tags: ['giáo dục', 'cồng chiêng', 'trường học', 'di sản'],
  },
  {
    id: 'news-003',
    slug: 'so-hoa-chi-tiet-chien-khu-d',
    title: 'Khởi Động Số Hóa Chiến Khu Đ: Bảo Tàng Số Trực Tuyến',
    subtitle: 'Dự án số hóa di tích với công nghệ 3D scanning',
    excerpt: 'UBND huyện Bù Đăng phối hợp với các chuyên gia thực hiện dự án số hóa Chiến Khu Đ — lưu trữ vĩnh viễn ký ức lịch sử cho thế hệ hôm nay và mai sau.',
    content: `Trong nỗ lực ứng dụng chuyển đổi số vào bảo tồn lịch sử, UBND huyện Bù Đăng đã khởi động dự án số hóa Khu di tích lịch sử Chiến Khu Đ.

Dự án sử dụng công nghệ quét 3D và chụp ảnh độ phân giải cao để dựng lại toàn bộ cấu trúc địa hình, hầm trú ẩn và các hiện vật lịch sử tại di tích.

Khi hoàn thành, du khách toàn thế giới có thể tham quan ảo 360 độ, xem chi tiết từng hiện vật và nghe thuyết minh lịch sử ngay trên trình duyệt web.`,
    coverImage: '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp',
    category: 'tin-tuc',
    author: 'Ban Quản lý Di tích',
    publishedAt: '2025-06-10',
    readTime: 6,
    featured: false,
    tags: ['số hóa', 'chiến khu đ', 'công nghệ', '3D'],
  },
  {
    id: 'news-004',
    slug: 'hoi-thao-bao-ton-nha-dai-stieng',
    title: 'Hội Thảo Bảo Tồn Nhà Dài S\'tiêng: Kiến Trúc Không Được Lãng Quên',
    subtitle: 'Chuyên gia và cộng đồng cùng tìm hướng bảo tồn nhà dài truyền thống',
    excerpt: 'Hội thảo khoa học quy tụ hơn 50 chuyên gia kiến trúc, nhân học và đại diện cộng đồng để thảo luận về chiến lược bảo tồn nhà dài S\'tiêng.',
    content: `Tại Khu bảo tồn văn hóa dân tộc Sóc Bom Bo đã diễn ra hội thảo khoa học "Bảo tồn nhà dài truyền thống của người S'tiêng Bù Đăng trong đời sống hiện đại".

Hội thảo quy tụ hơn 50 nhà nghiên cứu kiến trúc, nhân học cùng đông đảo già làng đại diện các buôn sóc. Các đại biểu đã thảo luận về:
- Thực trạng suy giảm nhà dài do đô thị hóa.
- Giải pháp vật liệu thay thế bền vững giữ nguyên hồn cốt kiến trúc.
- Hướng gắn bảo tồn nhà dài với phát triển du lịch homestay cộng đồng.

Hội thảo thông qua bản khuyến nghị cấp kinh phí khẩn cấp tu bổ 3 ngôi nhà dài cổ tiêu biểu.`,
    coverImage: '/images/heritage/doi-song-cong-dong/nha-dai-lg.webp',
    category: 'nghien-cuu',
    author: 'Viện Khoa học Xã hội Nam Bộ',
    publishedAt: '2025-04-05',
    readTime: 7,
    featured: false,
    tags: ['hội thảo', 'nhà dài', 'S\'tiêng', 'bảo tồn', 'kiến trúc'],
  },
]

export const MOCK_EVENTS: Event[] = [
  {
    id: 'event-001',
    title: 'Festival Di Sản Bù Đăng 2026',
    description: 'Ba ngày hội tụ di sản — trải nghiệm văn hóa, âm nhạc và ẩm thực truyền thống S\'tiêng, M\'nông.',
    location: 'Trung tâm Văn hóa Huyện Bù Đăng',
    startDate: '2026-11-01',
    endDate: '2026-11-03',
    type: 'su-kien',
    isOnline: false,
  },
  {
    id: 'event-002',
    title: 'Triển Lãm Ảnh "Ánh Sáng Đại Ngàn"',
    description: 'Triển lãm 120 tác phẩm nhiếp ảnh về thiên nhiên, con người và di sản Bù Đăng.',
    location: 'Nhà Văn hóa Huyện & Trực tuyến',
    startDate: '2026-10-15',
    endDate: '2026-10-30',
    type: 'trien-lam',
    isOnline: true,
  },
  {
    id: 'event-003',
    title: 'Ngày Hội Di Sản Trường Học',
    description: 'Học sinh các trường THCS, THPT trình bày nghiên cứu, tranh vẽ và dự án về di sản Bù Đăng.',
    location: 'Các trường học trên địa bàn huyện',
    startDate: '2026-09-20',
    type: 'hoat-dong-truong-hoc',
    isOnline: false,
  },
]
