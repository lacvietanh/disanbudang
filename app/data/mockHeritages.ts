import type { Heritage } from '~/types'

export const MOCK_HERITAGES: Heritage[] = [
  {
    id: 'hrt-001',
    slug: 'chien-khu-d-bu-dang',
    title: 'Chiến Khu Đ Bù Đăng',
    subtitle: 'Căn cứ cách mạng anh hùng giữa đại ngàn',
    category: 'lich-su',
    period: 'khang-chien',
    year: '1945–1975',
    coverImage: '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp',
    gallery: [
      {
        src: '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp',
        alt: 'Rừng Chiến Khu Đ',
        caption: 'Cánh rừng nguyên sinh nơi từng che giấu hàng nghìn chiến sĩ cách mạng',
        photographer: 'Lê Văn Thành',
      },
      {
        src: '/images/heritage/danh-thang/thien-nhien-lg.webp',
        alt: 'Rừng già Bù Đăng',
        caption: 'Những cánh rừng già hàng trăm năm tuổi trong vùng chiến khu',
        photographer: 'Nguyễn Hữu Phúc',
      },
      {
        src: '/images/heritage/danh-thang/bu-lach-lg.webp',
        alt: 'Đường mòn chiến khu',
        caption: 'Những con đường mòn lịch sử trong rừng Chiến Khu Đ',
      },
    ],
    coordinates: { lat: 11.8234, lng: 107.1456 },
    shortDescription:
      'Chiến Khu Đ là một trong những căn cứ cách mạng quan trọng nhất của miền Đông Nam Bộ trong hai cuộc kháng chiến chống Pháp và chống Mỹ. Những cánh rừng già bất khuất của Bù Đăng đã che chở, nuôi dưỡng hàng nghìn chiến sĩ cách mạng.',
    longStory: `Giữa đại ngàn Bù Đăng, những cánh rừng già ngút ngàn từng là chứng nhân của một trang sử hào hùng. Chiến Khu Đ — cái tên gắn liền với tinh thần kiên trung bất khuất của nhân dân miền Đông Nam Bộ — trải dài qua các huyện Bù Đăng, Bù Đốp, Đồng Phú thuộc tỉnh Bình Phước ngày nay.

Từ năm 1945, khi tiếng súng kháng chiến chống Pháp vang lên, vùng rừng núi Bù Đăng đã trở thành nơi che chở cho các lực lượng cách mạng. Địa hình hiểm trở với những cánh rừng nguyên sinh dày đặc, những con suối chằng chịt, những ngọn đồi cao vừa là lợi thế che giấu căn cứ, vừa là nỗi khổ của kẻ thù khi cố tìm vào.

Trong thời kỳ chống Mỹ, Chiến Khu Đ đóng vai trò như "thủ đô kháng chiến" của toàn miền Đông. Đây là nơi đặt các cơ quan đầu não của cuộc kháng chiến — từ Khu ủy Miền Đông, đến các đơn vị chủ lực, các xưởng quân khí, bệnh viện dã chiến, trường học cách mạng...

Nhân dân Bù Đăng — đặc biệt là đồng bào S'tiêng và M'nông — đã không quản ngại gian khó, một lòng nuôi giấu, bảo vệ chiến sĩ. Họ cung cấp lương thực, thuốc men, thông tin tình báo; con trai họ tham gia dân quân du kích; con gái họ tải đạn, chuyển thương. Mối quan hệ máu thịt giữa quân và dân đã làm nên sức mạnh của Chiến Khu Đ.`,
    quickFacts: [
      { label: 'Diện tích', value: 'Hơn 100.000 ha rừng', icon: 'mdi:map-outline' },
      { label: 'Thời kỳ hoạt động', value: '1945 – 1975', icon: 'mdi:calendar-range' },
      { label: 'Đã được công nhận', value: 'Di tích Quốc gia đặc biệt', icon: 'mdi:medal' },
      { label: 'Dân tộc đồng hành', value: 'S\'tiêng, M\'nông, Kinh', icon: 'mdi:account-group' },
      { label: 'Khoảng cách TP.HCM', value: 'Khoảng 180 km', icon: 'mdi:map-marker-distance' },
      { label: 'Địa hình', value: 'Rừng nguyên sinh, đồi núi', icon: 'mdi:terrain' },
    ],
    timeline: [
      {
        year: '1945',
        title: 'Khởi nghĩa Tháng Tám',
        description: 'Vùng rừng Bù Đăng bắt đầu được chọn là căn cứ địa của lực lượng kháng chiến chống Pháp.',
      },
      {
        year: '1950',
        title: 'Chiến Khu Đ hình thành',
        description: 'Chiến Khu Đ chính thức được thành lập, trở thành trung tâm chỉ đạo kháng chiến toàn miền Đông.',
      },
      {
        year: '1960',
        title: 'Mặt trận Giải phóng',
        description: 'Chiến Khu Đ là nơi đặt trụ sở của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam.',
      },
      {
        year: '1968',
        title: 'Mậu Thân 1968',
        description: 'Các đơn vị xuất phát từ Chiến Khu Đ tham gia cuộc Tổng tiến công và nổi dậy.',
      },
      {
        year: '1975',
        title: 'Ngày toàn thắng',
        description: 'Các cánh quân từ Chiến Khu Đ tiến vào giải phóng Sài Gòn, kết thúc 30 năm kháng chiến.',
      },
      {
        year: '2015',
        title: 'Di tích Quốc gia',
        description: 'Chiến Khu Đ được công nhận là Di tích Lịch sử Quốc gia đặc biệt.',
      },
    ],
    audio: {
      id: 'aud-001',
      title: 'Ký Ức Chiến Khu Đ',
      narrator: 'Thầy Nguyễn Văn Hùng',
      narratorRole: 'Nhà nghiên cứu lịch sử địa phương',
      duration: 285,
      url: '/audio/chien-khu-d.mp3',
      transcript: 'Những cánh rừng già Bù Đăng đã từng che giấu...',
      coverImage: '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp',
    },
    relatedIds: ['hrt-003', 'hrt-005'],
    tags: ['cách mạng', 'lịch sử', 'kháng chiến', 'rừng', 'căn cứ địa', 'bình phước'],
    references: [
      'Ban Tuyên giáo Tỉnh ủy Bình Phước (2020). Lịch sử Đảng bộ tỉnh Bình Phước.',
      'Viện Lịch sử Quân sự Việt Nam (2015). Chiến Khu Đ trong hai cuộc kháng chiến.',
    ],
    featured: true,
    status: 'published',
    publishedAt: '2024-01-15',
    viewCount: 3420,
  },
  {
    id: 'hrt-002',
    slug: 'thac-mo-bu-dang',
    title: 'Thác Mơ Bù Đăng',
    subtitle: 'Viên ngọc xanh giữa đại ngàn Đông Nam Bộ',
    category: 'danh-thang',
    period: 'hien-dai',
    year: 'Địa danh lâu đời',
    coverImage: '/images/heritage/danh-thang/thac-dung-lg.webp',
    gallery: [
      {
        src: '/images/heritage/danh-thang/thac-dung-lg.webp',
        alt: 'Thác Mơ',
        caption: 'Thác Mơ hùng vĩ với dòng nước trắng xóa giữa đại ngàn xanh thẳm',
      },
      {
        src: '/images/heritage/danh-thang/thien-nhien-lg.webp',
        alt: 'Hồ Thác Mơ ban đêm',
        caption: 'Mặt hồ Thác Mơ lung linh dưới ánh trăng',
      },
      {
        src: '/images/heritage/danh-thang/bu-lach-lg.webp',
        alt: 'Thiên nhiên Thác Mơ',
        caption: 'Hệ sinh thái phong phú xung quanh khu vực Thác Mơ',
      },
    ],
    coordinates: { lat: 11.7891, lng: 107.0234 },
    shortDescription:
      'Thác Mơ là thắng cảnh thiên nhiên nổi tiếng của huyện Bù Đăng, nơi dòng nước trong xanh từ thượng nguồn đổ xuống tạo thành những tầng thác hùng vĩ giữa rừng già nguyên sinh.',
    longStory: `Ẩn mình giữa những cánh rừng nguyên sinh của Bù Đăng, Thác Mơ hiện ra như một giấc mơ của thiên nhiên. Dòng nước trong vắt từ thượng nguồn đổ xuống qua nhiều tầng đá, tạo nên những màn trắng xóa tinh khiết, tiếng nước chảy rì rào như bản nhạc ru hồn người lữ khách.

Người S'tiêng địa phương từ bao đời nay xem Thác Mơ là nơi linh thiêng. Theo truyền thuyết, nàng Mơ — một cô gái S'tiêng xinh đẹp và tài giỏi — đã hóa thành dòng thác để bảo vệ buôn làng khỏi thiên tai. Chính vì vậy, trước mỗi mùa vụ, người dân thường tổ chức lễ cúng thác để cầu mưa thuận gió hòa, mùa màng bội thu.

Hệ sinh thái quanh Thác Mơ vô cùng phong phú. Những cánh rừng già bao quanh là nơi trú ngụ của nhiều loài động thực vật quý hiếm — từ những cây gỗ quý tuổi thọ hàng trăm năm, đến các loài chim đặc hữu, côn trùng nhiệt đới đa dạng.`,
    quickFacts: [
      { label: 'Độ cao thác', value: '15–20 mét', icon: 'mdi:arrow-up-bold' },
      { label: 'Diện tích mặt hồ', value: 'Hơn 640 ha', icon: 'mdi:waves' },
      { label: 'Loại rừng', value: 'Rừng nguyên sinh nhiệt đới', icon: 'mdi:tree' },
      { label: 'Thời điểm đẹp nhất', value: 'Tháng 6 – tháng 11', icon: 'mdi:weather-rainy' },
      { label: 'Khoảng cách thị trấn', value: '25 km', icon: 'mdi:map-marker-distance' },
    ],
    timeline: [
      {
        year: 'Hàng thế kỷ trước',
        title: 'Địa danh của người S\'tiêng',
        description: 'Người S\'tiêng gọi thác là "Dak Mơ" — nguồn nước của ước mơ và sự sống.',
      },
      {
        year: '1975',
        title: 'Khám phá lại',
        description: 'Sau ngày thống nhất, các đoàn khảo sát bắt đầu ghi chép và bảo tồn danh thắng.',
      },
      {
        year: '2010',
        title: 'Khu du lịch sinh thái',
        description: 'Thác Mơ được đầu tư xây dựng trở thành điểm du lịch sinh thái hấp dẫn.',
      },
    ],
    audio: {
      id: 'aud-002',
      title: 'Huyền Thoại Nàng Mơ',
      narrator: 'Em Trần Thị Lan Anh',
      narratorRole: 'Học sinh lớp 8, Trường THCS Bù Đăng',
      duration: 198,
      url: '/audio/thac-mo.mp3',
      coverImage: '/images/heritage/danh-thang/thac-dung-lg.webp',
    },
    relatedIds: ['hrt-004'],
    tags: ['thiên nhiên', 'thác nước', 'rừng nguyên sinh', 'sinh thái', 'S\'tiêng'],
    references: [
      'Sở Văn hóa Thể thao và Du lịch Bình Phước (2022). Danh thắng Bình Phước.',
    ],
    featured: true,
    status: 'published',
    publishedAt: '2024-02-01',
    viewCount: 2180,
  },
  {
    id: 'hrt-003',
    slug: 'le-hoi-cong-chieng-stieng',
    title: 'Lễ Hội Cồng Chiêng S\'tiêng',
    subtitle: 'Linh hồn âm nhạc của núi rừng Tây Nguyên',
    category: 'van-hoa-phi-vat-the',
    period: 'hien-dai',
    year: 'Lâu đời',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-lg.webp',
    gallery: [
      {
        src: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-lg.webp',
        alt: 'Lễ hội cồng chiêng',
        caption: 'Cồng chiêng vang lên trong đêm lễ hội truyền thống',
      },
      {
        src: '/images/heritage/van-hoa-phi-vat-the/van-hoa-stieng-lg.webp',
        alt: 'Múa truyền thống',
        caption: 'Điệu múa truyền thống S\'tiêng quanh đống lửa lễ hội',
      },
    ],
    coordinates: { lat: 11.8012, lng: 107.1876 },
    shortDescription:
      'Lễ hội Cồng Chiêng là linh hồn văn hóa của người S\'tiêng Bù Đăng — một di sản âm nhạc phi vật thể quý báu được UNESCO công nhận, phản ánh mối quan hệ thiêng liêng giữa con người và vũ trụ.',
    longStory: `Trong không gian huyền ảo của đêm rừng Bù Đăng, tiếng cồng chiêng vang lên trầm hùng, lan tỏa khắp núi đồi như tiếng gọi của tổ tiên. Đây không đơn thuần là âm nhạc — đây là ngôn ngữ linh thiêng kết nối người sống với thần linh, kết nối con người với thiên nhiên và vũ trụ.

Người S'tiêng quan niệm rằng mỗi bộ cồng chiêng đều có linh hồn — "Yang Ching" — được truyền từ đời này sang đời khác. Chúng không được bán hay đem ra ngoài làng khi chưa được thần cho phép. Mỗi dịp lễ hội — từ lễ mừng lúa mới, lễ đầy tháng, lễ bỏ mả, đến lễ cầu mưa — cồng chiêng đều xuất hiện như người dẫn đường tâm linh.`,
    quickFacts: [
      { label: 'Số chiêng trong một bộ', value: '6–12 chiếc', icon: 'mdi:circle-multiple' },
      { label: 'UNESCO công nhận', value: 'Năm 2005', icon: 'mdi:earth' },
      { label: 'Người biểu diễn', value: 'Cộng đồng S\'tiêng', icon: 'mdi:account-group' },
      { label: 'Dịp tổ chức', value: 'Lễ hội nông nghiệp, tang lễ, cưới hỏi', icon: 'mdi:calendar-star' },
    ],
    timeline: [
      { year: 'Hàng thế kỷ', title: 'Ra đời', description: 'Cồng chiêng gắn liền với đời sống tâm linh người S\'tiêng từ thuở hồng hoang.' },
      { year: '2005', title: 'UNESCO vinh danh', description: 'Không gian văn hóa cồng chiêng Tây Nguyên được UNESCO công nhận là Di sản phi vật thể nhân loại.' },
    ],
    audio: {
      id: 'aud-003',
      title: 'Tiếng Cồng Chiêng Núi Rừng',
      narrator: 'Già làng Điểu Minh',
      narratorRole: 'Nghệ nhân ưu tú cồng chiêng S\'tiêng',
      duration: 324,
      url: '/audio/cong-chieng.mp3',
      coverImage: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-lg.webp',
    },
    relatedIds: ['hrt-001', 'hrt-004'],
    tags: ['cồng chiêng', 'âm nhạc', 'S\'tiêng', 'UNESCO', 'phi vật thể', 'lễ hội'],
    references: [
      'UNESCO (2005). Không gian văn hóa cồng chiêng Tây Nguyên — Hồ sơ công nhận.',
    ],
    featured: true,
    status: 'published',
    publishedAt: '2024-02-15',
    viewCount: 1876,
  },
  {
    id: 'hrt-004',
    slug: 'nha-dai-truyen-thong-stieng',
    title: 'Nhà Dài Truyền Thống S\'tiêng',
    subtitle: 'Kiến trúc cộng đồng độc đáo trên cao nguyên',
    category: 'doi-song-cong-dong',
    period: 'hien-dai',
    year: 'Kiến trúc lâu đời',
    coverImage: '/images/heritage/doi-song-cong-dong/nha-dai-lg.webp',
    gallery: [
      {
        src: '/images/heritage/doi-song-cong-dong/nha-dai-lg.webp',
        alt: 'Nhà dài S\'tiêng',
        caption: 'Nhà dài truyền thống — không gian cộng đồng linh thiêng',
      },
    ],
    coordinates: { lat: 11.8345, lng: 107.2012 },
    shortDescription:
      'Nhà dài của người S\'tiêng không chỉ là nơi cư trú mà còn là trung tâm sinh hoạt văn hóa cộng đồng, nơi diễn ra các nghi lễ quan trọng và lưu giữ truyền thống của cả một dòng tộc.',
    longStory: `Nhà dài S'tiêng — "Nhar" trong tiếng bản địa — là một công trình kiến trúc cộng đồng độc đáo, có thể dài tới 100 mét, đủ chỗ cho cả một đại gia đình nhiều thế hệ cùng sinh sống.

Mỗi gian trong nhà dài thuộc về một gia đình nhỏ, nhưng không gian sinh hoạt chung — bếp lửa giữa nhà, sàn rộng nơi tổ chức lễ hội — là của cả cộng đồng. Đây là hiện thân của triết lý "cộng đồng trước, cá nhân sau" của người S'tiêng.`,
    quickFacts: [
      { label: 'Chiều dài tối đa', value: 'Lên đến 100 mét', icon: 'mdi:ruler' },
      { label: 'Vật liệu', value: 'Tre, nứa, lá cọ, gỗ rừng', icon: 'mdi:leaf' },
      { label: 'Số hộ gia đình', value: '5–15 hộ', icon: 'mdi:home-group' },
    ],
    timeline: [
      { year: 'Hàng thế kỷ', title: 'Hình thành', description: 'Kiến trúc nhà dài ra đời từ nhu cầu cộng đồng sinh sống tập thể.' },
      { year: 'Hiện tại', title: 'Bảo tồn', description: 'Chính quyền và cộng đồng nỗ lực bảo tồn và phục dựng nhà dài truyền thống.' },
    ],
    relatedIds: ['hrt-003', 'hrt-002'],
    tags: ['kiến trúc', 'nhà dài', 'S\'tiêng', 'cộng đồng', 'truyền thống'],
    references: [],
    featured: false,
    status: 'published',
    publishedAt: '2024-03-01',
    viewCount: 1234,
  },
  {
    id: 'hrt-005',
    slug: 'di-tich-nha-giao-truyen-thong-bu-dang',
    title: 'Di Tích Nhà Giáo Truyền Thống Bù Đăng',
    subtitle: 'Ngôi trường đầu tiên của vùng đất kháng chiến',
    category: 'giao-duc-truyen-thong',
    period: 'khang-chien',
    year: '1950–1975',
    coverImage: '/images/heritage/lich-su/soc-bom-bo-lg.webp',
    gallery: [
      {
        src: '/images/heritage/lich-su/soc-bom-bo-lg.webp',
        alt: 'Di tích nhà giáo',
        caption: 'Nơi lưu giữ ký ức về những lớp học giữa rừng',
      },
    ],
    coordinates: { lat: 11.7654, lng: 107.1678 },
    shortDescription:
      'Trong những năm tháng kháng chiến gian khổ, giữa đại ngàn Bù Đăng vẫn vang lên tiếng đánh vần của trẻ em. Những lớp học giữa rừng là minh chứng cho ý chí sắt đá của một thế hệ "vừa cầm súng vừa cầm bút".',
    longStory: `Giữa bom đạn và gian khổ của chiến tranh, những người thầy cách mạng đã không để con chữ tắt lịm. Các lớp học giữa rừng Bù Đăng — đôi khi chỉ là một mảnh lán tre, tấm bảng đen ghép từ vỏ cây — đã đào tạo cả một thế hệ trẻ em mang trong mình vừa kiến thức, vừa lý tưởng cách mạng.

Học sinh thời ấy ban ngày học chữ, ban đêm có thể phải di chuyển tránh giặc. Sách giáo khoa là những tờ giấy viết tay, dụng cụ học tập đơn sơ đến mức... mực viết đôi khi được chiết xuất từ than củi. Thế nhưng, tỷ lệ biết chữ trong vùng căn cứ luôn tăng, chứng minh một triết lý giáo dục cách mạng: tri thức là vũ khí sắc bén nhất.`,
    quickFacts: [
      { label: 'Thời kỳ hoạt động', value: '1950 – 1975', icon: 'mdi:calendar-range' },
      { label: 'Loại hình', value: 'Lớp học kháng chiến', icon: 'mdi:school' },
      { label: 'Học sinh đào tạo', value: 'Hàng nghìn em', icon: 'mdi:account-school' },
    ],
    timeline: [
      { year: '1950', title: 'Lớp học đầu tiên', description: 'Những lớp học đầu tiên được mở giữa rừng Bù Đăng.' },
      { year: '1975', title: 'Kết thúc kháng chiến', description: 'Học sinh trường kháng chiến trở thành nòng cốt xây dựng quê hương.' },
    ],
    relatedIds: ['hrt-001'],
    tags: ['giáo dục', 'kháng chiến', 'trường học', 'lịch sử', 'cách mạng'],
    references: [],
    featured: false,
    status: 'published',
    publishedAt: '2024-03-15',
    viewCount: 876,
  },
  {
    id: 'hrt-006',
    slug: 'rung-nguyen-sinh-bu-dang',
    title: 'Rừng Nguyên Sinh Bù Đăng',
    subtitle: 'Kho báu sinh thái của Đông Nam Bộ',
    category: 'danh-thang',
    period: 'hien-dai',
    year: 'Hàng triệu năm',
    coverImage: '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp',
    gallery: [
      {
        src: '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp',
        alt: 'Rừng nguyên sinh Bù Đăng',
        caption: 'Những cánh rừng nguyên sinh hàng triệu năm tuổi của Bù Đăng',
      },
      {
        src: '/images/heritage/danh-thang/thien-nhien-lg.webp',
        alt: 'Tán rừng',
        caption: 'Tán rừng già che phủ bầu trời như một mái vòm thiên nhiên',
      },
    ],
    coordinates: { lat: 11.8567, lng: 107.0789 },
    shortDescription:
      'Bù Đăng sở hữu một trong những diện tích rừng nguyên sinh lớn nhất còn sót lại ở Đông Nam Bộ — kho báu đa dạng sinh học vô giá với hàng trăm loài động thực vật quý hiếm.',
    longStory: `Đặt chân vào rừng già Bù Đăng là bước vào một thế giới khác — nơi ánh mặt trời lọc qua tán lá tạo thành những vệt sáng huyền ảo, nơi tiếng chim hót và tiếng suối chảy là âm thanh duy nhất, nơi không khí trong lành đến mức từng hơi thở như được gột rửa.

Hệ sinh thái rừng nguyên sinh Bù Đăng được các nhà khoa học đánh giá là một trong những "hot spot" đa dạng sinh học của khu vực. Hàng trăm loài cây gỗ quý, từ gỗ Lim, Sến, Táu đến những loài thực vật đặc hữu chỉ tìm thấy ở Đông Nam Bộ. Các loài động vật như Vượn đen má hung, Khỉ đuôi lợn, Gà tiền mặt đỏ... đang được bảo vệ trong vùng lõi rừng này.`,
    quickFacts: [
      { label: 'Diện tích rừng', value: 'Hơn 50.000 ha', icon: 'mdi:pine-tree' },
      { label: 'Loài thực vật', value: 'Hơn 800 loài', icon: 'mdi:leaf' },
      { label: 'Loài động vật', value: 'Hơn 300 loài', icon: 'mdi:paw' },
      { label: 'Loài quý hiếm', value: 'Hơn 50 loài nguy cấp', icon: 'mdi:alert-decagram' },
    ],
    timeline: [
      { year: 'Triệu năm', title: 'Hình thành', description: 'Rừng nhiệt đới hình thành qua hàng triệu năm tiến hóa.' },
      { year: '2000', title: 'Khu bảo tồn', description: 'Vùng rừng nguyên sinh được quy hoạch bảo tồn nghiêm ngặt.' },
    ],
    relatedIds: ['hrt-002'],
    tags: ['rừng nguyên sinh', 'sinh thái', 'đa dạng sinh học', 'bảo tồn', 'thiên nhiên'],
    references: [],
    featured: false,
    status: 'published',
    publishedAt: '2024-04-01',
    viewCount: 1567,
  },
  {
    id: 'hrt-007',
    slug: 'lang-nghe-det-tho-cam-stieng',
    title: 'Làng Nghề Dệt Thổ Cẩm S\'tiêng',
    subtitle: 'Bảo tàng sắc màu dệt bằng tay và trái tim',
    category: 'doi-song-cong-dong',
    period: 'hien-dai',
    year: 'Hàng thế kỷ',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/van-hoa-stieng-lg.webp',
    gallery: [
      {
        src: '/images/heritage/van-hoa-phi-vat-the/van-hoa-stieng-lg.webp',
        alt: 'Thổ cẩm S\'tiêng',
        caption: 'Những tấm thổ cẩm rực rỡ được dệt bằng đôi tay khéo léo của phụ nữ S\'tiêng',
      },
    ],
    coordinates: { lat: 11.7923, lng: 107.2234 },
    shortDescription:
      'Nghề dệt thổ cẩm của người phụ nữ S\'tiêng là di sản thủ công mỹ nghệ quý báu — mỗi tấm vải là một tác phẩm nghệ thuật độc đáo, kể chuyện về cuộc sống, thiên nhiên và tâm hồn người bản địa.',
    longStory: `Trong làng S'tiêng ở Bù Đăng, tiếng khung cửi lách cách từ sáng đến chiều là âm thanh thân thuộc nhất. Những người phụ nữ, từ lúc còn nhỏ đã được bà, được mẹ dạy cách cầm kim, cách chọn chỉ, cách tạo ra những hoa văn độc đáo trên tấm vải thổ cẩm.

Mỗi hoa văn trên thổ cẩm S'tiêng đều mang ý nghĩa riêng: hình rồng tượng trưng cho sức mạnh, hình chim ngụ ý tự do, hình cây rừng là biểu tượng của sự sống và trường tồn. Màu sắc chủ đạo — đỏ, đen, vàng — được chiết xuất từ thực vật tự nhiên trong rừng.`,
    quickFacts: [
      { label: 'Nghệ nhân còn truyền nghề', value: 'Hơn 50 người', icon: 'mdi:account-star' },
      { label: 'Thời gian dệt một tấm', value: '2–4 tuần', icon: 'mdi:clock-outline' },
      { label: 'Hoa văn truyền thống', value: 'Hơn 20 mẫu', icon: 'mdi:palette' },
    ],
    timeline: [
      { year: 'Hàng thế kỷ', title: 'Hình thành nghề', description: 'Nghề dệt thổ cẩm hình thành từ nhu cầu may trang phục và trao đổi hàng hóa.' },
      { year: 'Hiện tại', title: 'Phục hồi', description: 'Chương trình bảo tồn làng nghề giúp nghề dệt thổ cẩm được hồi sinh.' },
    ],
    relatedIds: ['hrt-003', 'hrt-004'],
    tags: ['thổ cẩm', 'dệt', 'làng nghề', 'S\'tiêng', 'thủ công', 'phụ nữ'],
    references: [],
    featured: false,
    status: 'published',
    publishedAt: '2024-04-15',
    viewCount: 1023,
  },
  {
    id: 'hrt-008',
    slug: 'le-hoi-mung-lua-moi-mnong',
    title: 'Lễ Hội Mừng Lúa Mới M\'nông',
    subtitle: 'Lời tạ ơn của đất trời và mùa vàng bội thu',
    category: 'van-hoa-phi-vat-the',
    period: 'hien-dai',
    year: 'Hàng thế kỷ',
    coverImage: '/images/heritage/van-hoa-phi-vat-the/di-san-ban-dia-lg.webp',
    gallery: [
      {
        src: '/images/heritage/van-hoa-phi-vat-the/di-san-ban-dia-lg.webp',
        alt: 'Lễ hội mừng lúa mới',
        caption: 'Lễ hội Mừng Lúa Mới — nghi lễ tạ ơn thần linh và tổ tiên',
      },
    ],
    coordinates: { lat: 11.8123, lng: 107.1345 },
    shortDescription:
      'Lễ hội Mừng Lúa Mới của người M\'nông là nghi lễ nông nghiệp thiêng liêng nhất trong năm — dịp cộng đồng tụ họp, dâng cúng thần linh, tạ ơn đất trời và cầu mong mùa màng tươi tốt.',
    longStory: `Khi những bông lúa nếp đầu tiên bắt đầu ngả vàng trên nương rẫy, người M'nông Bù Đăng bắt đầu chuẩn bị cho một trong những lễ hội quan trọng nhất trong năm — Lễ Mừng Lúa Mới, hay "N'droh Nri" trong tiếng M'nông.

Lễ hội kéo dài từ 3 đến 7 ngày, tùy theo điều kiện của từng buôn làng. Nghi thức bắt đầu bằng lễ cúng thần lúa tại rẫy, do già làng và thầy cúng thực hiện. Tiếp theo là lễ rước lúa về nhà kho — một đoàn rước đầy màu sắc với tiếng cồng chiêng vang lừng, trang phục truyền thống rực rỡ.

Phần hội là không gian văn hóa sôi động: các điệu múa truyền thống, thi đấu thể thao dân gian, trình diễn nhạc cụ, và đặc biệt là cùng nhau thưởng thức rượu cần — loại rượu ủ từ gạo nếp theo công thức bí truyền, được uống chung bằng những chiếc cần trúc dài trong không khí ấm áp tình thân.`,
    quickFacts: [
      { label: 'Thời điểm tổ chức', value: 'Tháng 10 – 12 (sau thu hoạch)', icon: 'mdi:calendar' },
      { label: 'Thời gian', value: '3 – 7 ngày', icon: 'mdi:clock-check' },
      { label: 'Dân tộc tổ chức', value: 'M\'nông', icon: 'mdi:account-group' },
      { label: 'Điểm nhấn', value: 'Rượu cần, cồng chiêng, múa truyền thống', icon: 'mdi:star' },
    ],
    timeline: [
      { year: 'Hàng thế kỷ', title: 'Hình thành', description: 'Lễ hội gắn với nền kinh tế nông nghiệp nương rẫy của người M\'nông.' },
      { year: 'Hiện tại', title: 'Bảo tồn và phát huy', description: 'Lễ hội được đưa vào danh mục Di sản văn hóa phi vật thể cấp tỉnh.' },
    ],
    relatedIds: ['hrt-003', 'hrt-007'],
    tags: ['lễ hội', 'M\'nông', 'lúa mới', 'nông nghiệp', 'rượu cần', 'cộng đồng'],
    references: [],
    featured: false,
    status: 'published',
    publishedAt: '2024-05-01',
    viewCount: 987,
  },
]

export const getFeaturedHeritages = () => MOCK_HERITAGES.filter((h) => h.featured)
export const getHeritageBySlug = (slug: string) => MOCK_HERITAGES.find((h) => h.slug === slug)
export const getHeritageById = (id: string) => MOCK_HERITAGES.find((h) => h.id === id)
export const getHeritagesByCategory = (category: string) =>
  MOCK_HERITAGES.filter((h) => h.category === category)
