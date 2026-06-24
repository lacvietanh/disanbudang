import type { Heritage } from '~/types'

export const MOCK_HERITAGES: Heritage[] = [
  {
    id: 'hrt-001',
    slug: 'chien-khu-d-bu-dang',
    title: 'Chiến Khu Đ Bù Đăng',
    subtitle: 'Nơi đại ngàn trở thành thành lũy',
    category: 'lich-su',
    period: 'khang-chien',
    year: '1945–1975',
    coverImage: '/images/heritage/Img disanbudang/chien khu D.png',
    gallery: [
      {
        src: '/images/heritage/Img disanbudang/chien khu D.png',
        alt: 'Rừng Chiến Khu Đ',
        caption: 'Cánh rừng nguyên sinh nơi từng che giấu hàng nghìn chiến sĩ cách mạng',
        photographer: 'Lê Văn Thành',
      },
      {
        src: '/images/heritage/Img disanbudang/rung-chien-khu-d.png',
        alt: 'Rừng già Bù Đăng',
        caption: 'Những cánh rừng già hàng trăm năm tuổi trong vùng chiến khu',
        photographer: 'Nguyễn Hữu Phúc',
      },
    ],
    coordinates: { lat: 11.264902, lng: 106.987597 },
    shortDescription:
      'Chiến Khu Đ là một trong những hệ thống căn cứ kháng chiến oai hùng nhất của miền Đông Nam Bộ. Nơi địa hình hiểm trở và tán rừng dày đặc đã trở thành tấm áo giáp tự nhiên che chở cho lực lượng cách mạng suốt hai cuộc kháng chiến.',
    longStory: `Giữa những cánh rừng già trải dài về phía đông tỉnh, có một vùng đất mà người dân vẫn quen gọi bằng cái tên giản dị nhưng đầy tự hào: Chiến Khu Đ. Đây không phải một địa danh đơn lẻ, mà là cả một hệ thống căn cứ kháng chiến trải rộng qua nhiều cánh rừng, nơi địa hình hiểm trở và tán rừng dày đặc đã trở thành tấm áo giáp tự nhiên che chở cho lực lượng cách mạng suốt hai cuộc kháng chiến.

Người dân Bù Đăng kể lại, những năm tháng ấy, rừng không chỉ là nơi trú ẩn mà còn là người bạn đồng hành. Mỗi gốc cây, mỗi con suối đều có thể trở thành điểm liên lạc, kho lương thực bí mật, hay nơi giấu quân khi địch càn quét. Chính sự gắn bó giữa con người và rừng đã làm nên sức sống bền bỉ của căn cứ địa này — một sức sống mà không bom đạn nào dập tắt được.

Trong ký ức của những người từng sống và chiến đấu nơi đây, Chiến Khu Đ gắn liền với hình ảnh những đoàn người gùi gạo, tải đạn xuyên đêm qua những con dốc dựng đứng, những lớp học dã chiến dựng tạm dưới tán rừng để trẻ em không phải gián đoạn việc học ngay giữa thời chiến. Đó là một giai đoạn gian khổ nhưng cũng là minh chứng sống động cho tinh thần "vừa kháng chiến vừa kiến quốc" của một thế hệ.

Ngày nay, dấu tích của Chiến Khu Đ vẫn còn hiện diện qua những cánh rừng được bảo tồn, qua lời kể của các nhân chứng lịch sử, và qua những trang sử được học sinh các trường trên địa bàn dày công sưu tầm, ghi chép lại. Việc số hóa và lưu giữ những câu chuyện này không chỉ là cách tri ân quá khứ, mà còn là lời nhắc nhở cho thế hệ hôm nay về cái giá của hòa bình.`,
    quickFacts: [
      { label: 'Giai đoạn lịch sử', value: '1945–1975', icon: 'mdi:calendar-range' },
      { label: 'Loại hình di tích', value: 'Lịch sử cách mạng', icon: 'mdi:medal' },
      { label: 'Tình trạng bảo tồn', value: 'Di tích cấp Quốc gia đặc biệt', icon: 'mdi:shield-check' },
      { label: 'Địa hình', value: 'Rừng nguyên sinh, đồi núi hiểm trở', icon: 'mdi:terrain' },
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
        year: '1975',
        title: 'Ngày toàn thắng',
        description: 'Các cánh quân từ Chiến Khu Đ tiến vào giải phóng Sài Gòn, kết thúc 30 năm kháng chiến.',
      },
    ],
    audio: {
      id: 'aud-001',
      title: 'Ký ức từ rừng già',
      narrator: 'Nguyễn Xuân Kiệt / cộng đồng địa phương',
      narratorRole: 'Thuyết minh viên dự án',
      duration: 240,
      url: '/audio/chien-khu-d.mp3',
      coverImage: '/images/heritage/Img disanbudang/chien khu D.png',
    },
    video: {
      title: 'Phim tư liệu hào hùng Chiến Khu Đ Bù Đăng',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    relatedIds: ['hrt-005', 'hrt-006'],
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
    coverImage: '/images/heritage/Img disanbudang/thac-mo-dong-nai.png',
    gallery: [
      {
        src: '/images/heritage/Img disanbudang/thac-mo-dong-nai.png',
        alt: 'Mặt hồ Thác Mơ',
        caption: 'Hồ Thác Mơ lộng gió lung linh dưới ánh trăng',
      },
    ],
    coordinates: { lat: 11.8578, lng: 107.0192 },
    shortDescription:
      'Thác Mơ là thắng cảnh thiên nhiên nổi tiếng của Xã Bù Đăng, nơi dòng nước trong xanh từ thượng nguồn đổ xuống tạo thành những hồ nước thơ mộng giữa đại ngàn nguyên sinh.',
    longStory: `Ẩn mình giữa những cánh rừng nguyên sinh của Bù Đăng, Thác Mơ hiện ra như một giấc mơ của thiên nhiên. Dòng nước trong vắt từ thượng nguồn đổ xuống qua nhiều tầng đá, tạo nên những màn nước tung bọt trắng xóa tinh khiết, tiếng nước chảy rì rào như bản nhạc ru hồn người lữ khách.

Người S'tiêng địa phương từ bao đời nay xem Thác Mơ là nơi linh thiêng. Theo truyền thuyết, nàng Mơ — một cô gái S'tiêng xinh đẹp và tài giỏi — đã hóa thành dòng thác để bảo vệ buôn làng khỏi thiên tai. Chính vì vậy, trước mỗi mùa vụ, người dân thường tổ chức lễ cúng thác để cầu mưa thuận gió hòa, mùa màng bội thu.

Hệ sinh thái quanh Thác Mơ vô cùng phong phú. Những cánh rừng già bao quanh là nơi trú ngụ của nhiều loài động thực vật quý hiếm — từ những cây gỗ quý tuổi thọ hàng trăm năm, đến các loài chim đặc hữu, côn trùng nhiệt đới đa dạng.`,
    quickFacts: [
      { label: 'Độ cao thác', value: '15–20 mét', icon: 'mdi:arrow-up-bold' },
      { label: 'Diện tích mặt hồ', value: 'Hơn 640 ha', icon: 'mdi:waves' },
      { label: 'Loại rừng', value: 'Rừng nguyên sinh nhiệt đới', icon: 'mdi:tree' },
      { label: 'Thời điểm đẹp nhất', value: 'Tháng 6 – tháng 11', icon: 'mdi:weather-rainy' },
    ],
    timeline: [
      {
        year: 'Hàng thế kỷ trước',
        title: 'Địa danh của người S\'tiêng',
        description: 'Người S\'tiêng gọi thác là "Dak Mơ" — nguồn nước của ước mơ và sự sống.',
      },
      {
        year: '2010',
        title: 'Khu du lịch sinh thái',
        description: 'Thác Mơ được đầu tư bảo tồn và trở thành điểm du lịch sinh thái hấp dẫn.',
      },
    ],
    audio: {
      id: 'aud-002',
      title: 'Huyền Thoại Nàng Mơ',
      narrator: 'Em Trần Thị Lan Anh',
      narratorRole: 'Học sinh lớp 8, Trường THCS Bù Đăng',
      duration: 198,
      url: '/audio/thac-mo.mp3',
      coverImage: '/images/heritage/Img disanbudang/thac-mo-dong-nai.png',
    },
    relatedIds: ['hrt-010', 'hrt-006'],
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
    coverImage: '/images/heritage/Img disanbudang/Cong chieng.jpg',
    gallery: [
      {
        src: '/images/heritage/Img disanbudang/Cong chieng.jpg',
        alt: 'Lễ hội cồng chiêng',
        caption: 'Cồng chiêng vang lên trong đêm lễ hội truyền thống',
      },
    ],
    coordinates: { lat: 11.8382, lng: 107.1955 },
    shortDescription:
      'Lễ hội Cồng Chiêng là linh hồn văn hóa của người S\'tiêng Bù Đăng — một di sản âm nhạc phi vật thể quý báu được UNESCO vinh danh, phản ánh mối quan hệ thiêng liêng giữa con người và vũ trụ.',
    longStory: `Trong không gian huyền ảo của đêm rừng Bù Đăng, tiếng cồng chiêng vang lên trầm hùng, lan tỏa khắp núi đồi như tiếng gọi của tổ tiên. Đây không đơn thuần là âm nhạc — đây là ngôn ngữ linh thiêng kết nối người sống với thần linh, kết nối con người với thiên nhiên và vũ trụ.

Người S'tiêng quan niệm rằng mỗi bộ cồng chiêng đều có linh hồn — "Yang Ching" — được truyền từ đời này sang đời khác. Chúng không được bán hay đem ra ngoài làng khi chưa được thần cho phép. Mỗi dịp lễ hội — từ lễ mừng lúa mới, lễ đầy tháng, lễ bỏ mả, đến lễ cầu mưa — cồng chiêng đều xuất hiện như người dẫn đường tâm linh.`,
    quickFacts: [
      { label: 'Số chiêng trong một bộ', value: '6–12 chiếc', icon: 'mdi:circle-multiple' },
      { label: 'UNESCO công nhận', value: 'Năm 2005', icon: 'mdi:earth' },
      { label: 'Người biểu diễn', value: 'Cộng đồng S\'tiêng', icon: 'mdi:account-group' },
    ],
    timeline: [
      { year: 'Hàng thế kỷ', title: 'Ra đời', description: 'Cồng chiêng gắn liền với đời sống tâm linh người S\'tiêng từ thuở hồng hoang.' },
      { year: '2005', title: 'UNESCO vinh danh', description: 'Không gian văn hóa cồng chiêng Tây Nguyên được UNESCO công nhận là Di sản phi vật thể nhân loại.' },
    ],
    audio: {
      id: 'aud-003',
      title: 'Tiếng Cồng Chiêng Núi Rừng',
      narrator: 'Già làng Điểu Đố',
      narratorRole: 'Nghệ nhân ưu tú cồng chiêng S\'tiêng Bù Đăng',
      duration: 324,
      url: '/audio/cong-chieng.mp3',
      coverImage: '/images/heritage/Img disanbudang/Cong chieng.jpg',
    },
    relatedIds: ['hrt-004', 'hrt-007'],
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
    coverImage: '/images/heritage/Img disanbudang/Nha Dai Truyen Thong.png',
    gallery: [
      {
        src: '/images/heritage/Img disanbudang/Nha Dai Truyen Thong.png',
        alt: 'Nhà dài S\'tiêng',
        caption: 'Nhà dài truyền thống — không gian cộng đồng linh thiêng',
      },
    ],
    coordinates: { lat: 11.8372, lng: 107.1940 },
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
    relatedIds: ['hrt-003', 'hrt-007'],
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
    coverImage: '/images/heritage/lich-su/nha-giao-truyen-thong-lg.webp',
    gallery: [
      {
        src: '/images/heritage/lich-su/nha-giao-truyen-thong-lg.webp',
        alt: 'Di tích nhà giáo',
        caption: 'Nơi lưu giữ ký ức về những lớp học giữa rừng',
      },
    ],
    coordinates: { lat: 11.7692, lng: 107.2372 },
    shortDescription:
      'Trong những năm tháng kháng chiến gian khổ, giữa đại ngàn Bù Đăng vẫn vang lên tiếng đánh vần của trẻ em. Những lớp học giữa rừng là minh chứng cho ý chí sắt đá của một thế hệ "vừa cầm súng vừa cầm bút".',
    longStory: `Giữa bom đạn và gian khổ của chiến tranh, những người thầy cách mạng đã không để con chữ tắt lịm. Các lớp học giữa rừng Bù Đăng — đôi khi chỉ là một mảnh lán tre, tấm bảng đen ghép từ vỏ cây — đã đào tạo cả một thế hệ trẻ em mang trong mình vừa kiến thức, vừa lý tưởng cách mạng.

Học sinh thời ấy ban ngày học chữ, ban đêm có thể phải di chuyển tránh giặc. Sách giáo khoa là những tờ giấy viết tay, dụng cụ học tập đơn sơ đến mức... mực viết đôi khi được chiết xuất từ than củi. Thế nhưng, tỷ lệ biết chữ trong vùng căn cứ luôn tăng, chứng minh một triết lý giáo dục cách mạng: tri thức là vũ khí sắc bén nhất.`,
    quickFacts: [
      { label: 'Thời kỳ hoạt động', value: '1950 – 1975', icon: 'mdi:calendar-range' },
      { label: 'Loại hình di tích', value: 'Lớp học kháng chiến', icon: 'mdi:school' },
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
    coverImage: '/images/heritage/Img disanbudang/Khu Bao Ton 2.jpg',
    gallery: [
      {
        src: '/images/heritage/Img disanbudang/Khu Bao Ton 2.jpg',
        alt: 'Rừng nguyên sinh Bù Đăng',
        caption: 'Những cánh rừng nguyên sinh hàng triệu năm tuổi của Bù Đăng',
      },
    ],
    coordinates: { lat: 11.9000, lng: 107.0850 },
    shortDescription:
      'Bù Đăng sở hữu một trong những diện tích rừng nguyên sinh lớn nhất còn sót lại ở Đông Nam Bộ — kho báu đa dạng sinh học vô giá với hàng trăm loài động thực vật quý hiếm.',
    longStory: `Đặt chân vào rừng già Bù Đăng là bước vào một thế giới khác — nơi ánh mặt trời lọc qua tán lá tạo thành những vệt sáng huyền ảo, nơi tiếng chim hót và tiếng suối chảy là âm thanh duy nhất, nơi không khí trong lành đến mức từng hơi thở như được gột rửa.

Hệ sinh thái rừng nguyên sinh Bù Đăng được các nhà khoa học đánh giá là một trong những "hot spot" đa dạng sinh học của khu vực. Hàng trăm loài cây gỗ quý, từ gỗ Lim, Sến, Táu đến những loài thực vật đặc hữu chỉ tìm thấy ở Đông Nam Bộ. Các loài động vật như Vượn đen má hung, Khỉ đuôi lợn, Gà tiền mặt đỏ... đang được bảo vệ trong vùng lõi rừng này.`,
    quickFacts: [
      { label: 'Diện tích rừng', value: 'Hơn 50.000 ha', icon: 'mdi:pine-tree' },
      { label: 'Loài thực vật', value: 'Hơn 800 loài', icon: 'mdi:leaf' },
      { label: 'Loài động vật', value: 'Hơn 300 loài', icon: 'mdi:paw' },
    ],
    timeline: [
      { year: 'Triệu năm', title: 'Hình thành', description: 'Rừng nhiệt đới hình thành qua hàng triệu năm tiến hóa.' },
      { year: '2000', title: 'Khu bảo tồn', description: 'Vùng rừng nguyên sinh được quy hoạch bảo tồn nghiêm ngặt.' },
    ],
    relatedIds: ['hrt-002', 'hrt-009'],
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
    coverImage: '/images/heritage/Img disanbudang/hoa van tho cam stieng.png',
    gallery: [
      {
        src: '/images/heritage/Img disanbudang/hoa van tho cam stieng.png',
        alt: 'Thổ cẩm S\'tiêng',
        caption: 'Những tấm thổ cẩm rực rỡ được dệt bằng đôi tay khéo léo của phụ nữ S\'tiêng',
      },
    ],
    coordinates: { lat: 11.9709, lng: 107.2319 },
    shortDescription:
      'Nghề dệt thổ cẩm của người phụ nữ S\'tiêng là di sản thủ công mỹ nghệ quý báu — mỗi tấm vải là một tác phẩm nghệ thuật độc đáo, kể chuyện về cuộc sống, thiên nhiên và tâm hồn người bản địa.',
    longStory: `Trong làng S'tiêng ở Bù Đăng, tiếng khung cửi lách cách từ sáng đến chiều là âm thanh thân thuộc nhất. Những người phụ nữ, từ lúc còn nhỏ đã được bà, được mẹ dạy cách cầm kim, cách chọn chỉ, cách tạo ra những hoa văn độc đáo trên tấm vải thổ cẩm.

Mỗi hoa văn trên thổ cẩm S'tiêng đều mang ý nghĩa riêng: hình rồng tượng trưng cho sức mạnh, hình chim ngụ ý tự do, hình cây rừng là biểu tượng của sự sống và trường tồn. Màu sắc chủ đạo — đỏ, đen, vàng — được chiết xuất từ thực vật tự nhiên trong rừng.`,
    quickFacts: [
      { label: 'Nghệ nhân truyền nghề', value: 'Hơn 50 người', icon: 'mdi:account-star' },
      { label: 'Thời gian dệt', value: '2–4 tuần / tấm', icon: 'mdi:clock-outline' },
      { label: 'Hoa văn cổ truyền', value: 'Hơn 20 mẫu', icon: 'mdi:palette' },
    ],
    timeline: [
      { year: 'Hàng thế kỷ', title: 'Hình thành nghề', description: 'Nghề dệt thổ cẩm hình thành từ nhu cầu may trang phục và trao đổi hàng hóa.' },
      { year: 'Hiện tại', title: 'Bảo tồn làng nghề', description: 'Chương trình bảo tồn quốc gia giúp phục hồi và giữ lửa nghề dệt thổ cẩm.' },
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
    coverImage: '/images/heritage/Img disanbudang/le hoi mung lua moi.png',
    gallery: [
      {
        src: '/images/heritage/Img disanbudang/le hoi mung lua moi.png',
        alt: 'Lễ hội mừng lúa mới',
        caption: 'Lễ hội Mừng Lúa Mới — nghi lễ tạ ơn thần linh và tổ tiên',
      },
    ],
    coordinates: { lat: 11.8500, lng: 107.3200 },
    shortDescription:
      'Lễ hội Mừng Lúa Mới của người M\'nông là nghi lễ nông nghiệp thiêng liêng nhất trong năm — dịp cộng đồng tụ họp, dâng cúng thần linh, tạ ơn đất trời và cầu mong mùa màng tươi tốt.',
    longStory: `Khi những bông lúa nếp đầu tiên bắt đầu ngả vàng trên nương rẫy, người M'nông Bù Đăng bắt đầu chuẩn bị cho một trong những lễ hội quan trọng nhất trong năm — Lễ Mừng Lúa Mới, hay "N'droh Nri" trong tiếng M'nông.

Lễ hội kéo dài từ 3 đến 7 ngày, tùy theo điều kiện của từng buôn làng. Nghi thức bắt đầu bằng lễ cúng thần lúa tại rẫy, do già làng và thầy cúng thực hiện. Tiếp theo là lễ rước lúa về nhà kho — một đoàn rước đầy màu sắc với tiếng cồng chiêng vang lừng, trang phục truyền thống rực rỡ.

Phần hội là không gian văn hóa sôi động: các điệu múa truyền thống, thi đấu thể thao dân gian, trình diễn nhạc cụ, và đặc biệt là cùng nhau thưởng thức rượu cần — loại rượu ủ từ gạo nếp theo công thức bí truyền, được uống chung bằng những chiếc cần trúc dài trong không khí ấm áp tình thân.`,
    quickFacts: [
      { label: 'Thời điểm tổ chức', value: 'Tháng 10 – 12 hàng năm', icon: 'mdi:calendar' },
      { label: 'Thời gian lễ', value: '3 – 7 ngày', icon: 'mdi:clock-check' },
      { label: 'Dân tộc chủ thể', value: 'Người M\'nông', icon: 'mdi:account-group' },
    ],
    timeline: [
      { year: 'Hàng thế kỷ', title: 'Hình thành', description: 'Lễ hội gắn với nền kinh tế nông nghiệp nương rẫy của người M\'nông.' },
      { year: 'Hiện tại', title: 'Bảo tồn và phát huy', description: 'Lễ hội được đưa vào danh mục Di sản văn hóa phi vật thể địa phương.' },
    ],
    relatedIds: ['hrt-003', 'hrt-007'],
    tags: ['lễ hội', 'M\'nông', 'lúa mới', 'nông nghiệp', 'rượu cần', 'cộng đồng'],
    references: [],
    featured: false,
    status: 'published',
    publishedAt: '2024-05-01',
    viewCount: 987,
  },
  {
    id: 'hrt-009',
    slug: 'trang-co-bu-lach',
    title: 'Trảng Cỏ Bù Lạch',
    subtitle: 'Thảo nguyên xanh mát bên hồ nước huyền thoại',
    category: 'danh-thang',
    period: 'hien-dai',
    year: 'Thắng cảnh tự nhiên',
    coverImage: '/images/heritage/Img disanbudang/Trang co Bu Lach.png',
    gallery: [
      {
        src: '/images/heritage/Img disanbudang/Trang co Bu Lach.png',
        alt: 'Trảng cỏ Bù Lạch',
        caption: 'Cánh đồng cỏ xanh mướt trải rộng quanh lòng hồ tự nhiên mát rượi',
      },
    ],
    coordinates: { lat: 11.8064, lng: 107.3552 },
    shortDescription:
      'Trảng cỏ Bù Lạch là một danh thắng thiên nhiên độc đáo bậc nhất Bình Phước, nổi bật với trảng cỏ xanh mướt rộng gần 140 ha ôm trọn lòng hồ nước ngọt trong lành giữa rừng già.',
    longStory: `Nằm cách thị trấn Đức Phong khoảng 20 km, Trảng cỏ Bù Lạch hiện lên như một thảo nguyên hoang sơ kỳ vĩ giữa lòng đại ngàn Bù Đăng. Điểm độc đáo hiếm nơi nào có được là sự kết hợp hài hòa giữa rừng nguyên sinh bao bọc, trảng cỏ xanh mướt tự nhiên và hồ nước ngọt phẳng lặng ở trung tâm trảng cỏ.

Trảng cỏ Bù Lạch rộng hơn 140 ha, bao gồm hơn 20 trảng cỏ lớn nhỏ khác nhau. Cỏ ở đây là loại cỏ kim mọc tự nhiên, dai và mịn, quanh năm giữ một màu xanh mướt dịu mắt. Bao quanh trảng cỏ là những khu rừng nguyên sinh rậm rạp với thảm thực vật đa dạng, tạo nên một bức tường thành thiên nhiên kiên cố bảo vệ thảo nguyên nhỏ bé này.

Người dân bản địa S'tiêng từ ngàn đời nay lưu truyền nhiều truyền thuyết linh thiêng về hồ nước Bù Lạch. Họ coi hồ là gương thần của trời đất, cung cấp sinh khí và nguồn nước mát nuôi dưỡng buôn làng. Trảng cỏ Bù Lạch ngày nay là điểm đến lý tưởng cho những ai yêu thiên nhiên hoang sơ, muốn cắm trại dã ngoại và tìm hiểu cuộc sống mộc mạc của đồng bào dân tộc thiểu số địa phương.`,
    quickFacts: [
      { label: 'Diện tích trảng cỏ', value: 'Hơn 140 ha', icon: 'mdi:map-outline' },
      { label: 'Điểm nhấn cảnh quan', value: 'Hồ nước ngọt tự nhiên', icon: 'mdi:waves' },
      { label: 'Hệ sinh thái', value: 'Bao quanh bởi rừng già nguyên sinh', icon: 'mdi:tree' },
      { label: 'Khoảng cách trung tâm', value: 'Khoảng 20 km', icon: 'mdi:map-marker-distance' },
    ],
    timeline: [
      { year: 'Hàng ngàn năm', title: 'Kiến tạo tự nhiên', description: 'Trảng cỏ và hồ nước hình thành do quá trình kiến tạo địa chất kỳ thú.' },
      { year: '2015', title: 'Xếp hạng danh thắng', description: 'Được quy hoạch và bảo tồn nghiêm ngặt để phát triển du lịch sinh thái bền vững.' },
    ],
    relatedIds: ['hrt-006', 'hrt-002'],
    tags: ['trảng cỏ', 'bù lạch', 'danh thắng', 'cắm trại', 'sinh thái', 'hồ tự nhiên'],
    references: [
      'Sở Văn hóa Thể thao và Du lịch Bình Phước. Cổng thông tin du lịch Bù Lạch.',
    ],
    featured: true,
    status: 'published',
    publishedAt: '2024-05-15',
    viewCount: 2980,
  },
  {
    id: 'hrt-010',
    slug: 'thac-dung-bu-dang',
    title: 'Thác Đứng Bù Đăng',
    subtitle: 'Bản hùng ca nước đổ bên những khối đá kỳ vĩ',
    category: 'danh-thang',
    period: 'hien-dai',
    year: 'Thắng cảnh thiên nhiên',
    coverImage: '/images/heritage/Img disanbudang/Thac Dung.png',
    gallery: [
      {
        src: '/images/heritage/Img disanbudang/Thac Dung.png',
        alt: 'Thác Đứng cuồn cuộn đổ xuống',
        caption: 'Những dòng nước trắng xóa cuồn cuộn đổ qua khối đá hình trụ lục lăng',
      },
    ],
    coordinates: { lat: 11.7790, lng: 107.2150 },
    shortDescription:
      'Thác Đứng là một thắng cảnh thiên nhiên kỳ thú nằm trên dòng suối Đăk Wuar, nổi tiếng với bức tường đá bazan cột lục lăng thẳng đứng và dòng nước đổ cuồn cuộn đầy oai hùng.',
    longStory: `Nằm ẩn mình giữa những đồi bơ và rẫy điều của xã Đoàn Kết, Thác Đứng được ví như một kiệt tác kiến trúc của bàn tay tạo hóa. Điểm thu hút nhất của ngọn thác này chính là các khối đá hình trụ lục lăng thẳng đứng xếp khít nhau bên lòng thác — một dạng địa chất bazan cột tương tự như Ghềnh Đá Đĩa Phú Yên hay thác Gành Đá ở Tây Nguyên.

Vào mùa mưa, dòng suối Đăk Wuar cuồn cuộn đổ nước từ độ cao gần 6 mét qua vách đá đứng, tạo nên những màn sương nước mờ ảo bao phủ khắp thung lũng. Tiếng thác đổ ầm vang từ xa nghe như tiếng gầm oai vệ của núi rừng đại ngàn.

Đến mùa khô, dòng thác trở nên hiền hòa hơn, hé lộ rõ nét những bãi đá cổ hình thù độc đáo dưới lòng suối. Du khách có thể dễ dàng đi bộ trên các tảng đá khổng lồ, ngắm nhìn dòng nước len lỏi qua từng kẽ đá và tận hưởng không khí dịu mát, trong lành của thiên nhiên hoang sơ. Thác Đứng là một di sản thiên nhiên quý báu đang được địa phương gìn giữ và phát triển du lịch thân thiện với môi trường.`,
    quickFacts: [
      { label: 'Độ cao vách thác', value: 'Khoảng 4 - 6 mét', icon: 'mdi:arrow-up-bold' },
      { label: 'Cấu trúc địa chất', value: 'Bazalt dạng cột lục lăng đứng', icon: 'mdi:terrain' },
      { label: 'Dòng suối nguồn', value: 'Dòng Đăk Wuar', icon: 'mdi:water' },
    ],
    timeline: [
      { year: 'Triệu năm trước', title: 'Hoạt động phun trào', description: 'Các dòng dung nham bazan nguội đi tạo thành cấu trúc cột độc đáo.' },
      { year: '2013', title: 'Công nhận di tích', description: 'Được công nhận là Di tích Danh lam thắng cảnh cấp tỉnh.' },
    ],
    relatedIds: ['hrt-002', 'hrt-006'],
    tags: ['thác đứng', 'thác nước', 'bazan cột', 'danh thắng', 'suối Đăk Wuar'],
    references: [
      'Bảo tàng tỉnh Bình Phước. Hồ sơ di tích Thác Đứng.',
    ],
    featured: false,
    status: 'published',
    publishedAt: '2024-05-20',
    viewCount: 1650,
  },
  {
    id: 'hrt-011',
    slug: 'khu-bao-ton-soc-bom-bo',
    title: 'Khu Bảo Tồn Sóc Bom Bo',
    subtitle: 'Nơi nhịp chày giã gạo đi vào huyền thoại cách mạng',
    category: 'lich-su',
    period: 'khang-chien',
    year: '1965–1975',
    coverImage: '/images/heritage/lich-su/soc-bom-bo-lg.webp',
        gallery: [
      {
        src: '/images/heritage/lich-su/soc-bom-bo-lg.webp',
        alt: 'Giã gạo tại Sóc Bom Bo',
        caption: 'Khu di tích lịch sử Sóc Bom Bo tái hiện cảnh giã gạo nuôi quân',
      },
      {
        src: '/images/heritage/Bombo/h.png',
        alt: 'Lễ công bố di sản tại sóc Bom Bo',
        caption: 'Lễ công bố Quyết định công nhận di sản văn hóa phi vật thể quốc gia tại khu bảo tồn',
      },
      {
        src: '/images/heritage/Bombo/TAN08183.jpg',
        alt: 'Trang phục truyền thống S\'tiêng Bù Đăng',
        caption: 'Đồng bào S\'tiêng trong trang phục thổ cẩm truyền thống biểu diễn cồng chiêng',
      },
      {
        src: '/images/heritage/Bombo/TAN08194.jpg',
        alt: 'Nghệ thuật cồng chiêng Sóc Bom Bo',
        caption: 'Các thế hệ nghệ nhân S\'tiêng giữ gìn nhịp chiêng cồng truyền thống',
      },
      {
        src: '/images/heritage/Bombo/TAN08196.jpg',
        alt: 'Đồng bào S\'tiêng sóc Bom Bo',
        caption: 'Giao lưu văn hóa cồng chiêng và sinh hoạt cộng đồng tại nhà dài',
      },
      {
        src: '/images/heritage/Bombo/TAN08217.jpg',
        alt: 'Cộng đồng S\'tiêng tại sóc Bom Bo',
        caption: 'Các hoạt động biểu diễn nhạc cụ truyền thống của đồng bào',
      },
      {
        src: '/images/heritage/Bombo/TAN08220.jpg',
        alt: 'Nghệ nhân S\'tiêng truyền dạy cồng chiêng',
        caption: 'Nghệ nhân lớn tuổi hướng dẫn thanh thiếu niên sóc Bom Bo thực hành nhạc cụ dân tộc',
      },
    ],
    coordinates: { lat: 11.8382, lng: 107.1955 },
    shortDescription:
      'Sóc Bom Bo là địa danh lịch sử nổi tiếng, biểu tượng cho lòng yêu nước và sự đoàn kết keo sơn của đồng bào S\'tiêng đối với bộ đội giải phóng quân thông qua nhịp chày giã gạo nuôi quân thâu đêm.',
    longStory: `Nhắc đến Bù Đăng, không ai không biết đến Sóc Bom Bo — địa danh lịch sử gắn liền với câu hát nổi tiếng "Tiếng chày trên Sóc Bom Bo" của nhạc sĩ Xuân Hồng. Trong những năm tháng chiến tranh chống Mỹ cứu nước ác liệt nhất, người dân Sóc Bom Bo đã một lòng đi theo cách mạng, cống hiến hết sức người, sức của cho cuộc kháng chiến.

Năm 1965, để chuẩn bị lương thực cho chiến dịch Phước Long - Đồng Xoài, toàn bộ già trẻ, trai gái Sóc Bom Bo đã tình nguyện tập trung ngày đêm đốt đuốc, giã gạo nuôi quân. Dưới ánh đuốc lồ ô bập bùng, tiếng chày giã gạo nhịp nhàng vang vọng khắp núi rừng, trở thành bản nhạc cách mạng đi cùng năm tháng.

Ngày nay, Khu bảo tồn văn hóa dân tộc Sóc Bom Bo đã được xây dựng khang trang trên địa bàn xã Bình Minh. Nơi đây lưu giữ và trưng bày hàng trăm hiện vật lịch sử quý báu, bao gồm bộ chày cối giã gạo năm xưa, những chiếc gùi tải đạn, và các nhạc cụ truyền thống của người S'tiêng. Du khách đến đây sẽ được trải nghiệm giã gạo cối chày gỗ thực tế, nghe biểu diễn cồng chiêng bên bếp lửa và thưởng thức hương vị rượu cần nồng nàn.`,
    quickFacts: [
      { label: 'Thời kỳ hoạt động', value: 'Chiến dịch kháng chiến (1965)', icon: 'mdi:calendar-star' },
      { label: 'Dân tộc chủ thể', value: 'Đồng bào S\'tiêng Bù Đăng', icon: 'mdi:account-group' },
      { label: 'Vị trí hiện tại', value: 'Xã Bình Minh, Xã Bù Đăng', icon: 'mdi:map-marker' },
      { label: 'Đặc sản di sản', value: 'Văn hóa ẩm thực rượu cần, cơm lam', icon: 'mdi:food-variant' },
    ],
    timeline: [
      { year: '1965', title: 'Đêm giã gạo huyền thoại', description: 'Đồng bào S\'tiêng nổi lửa giã gạo xuyên đêm phục vụ chiến dịch lớn.' },
      { year: '1975', title: 'Góp phần giải phóng', description: 'Ghi nhận những đóng góp to lớn của sóc Bom Bo trong ngày toàn thắng.' },
      { year: '2010', title: 'Xây dựng khu bảo tồn', description: 'Khu bảo tồn văn hóa chính thức được phục dựng và đưa vào đón khách tham quan.' },
    ],
    audio: {
      id: 'aud-011',
      title: 'Huyền thoại nhịp chày Bom Bo',
      narrator: 'Già làng Điểu Lên',
      narratorRole: 'Nhân chứng lịch sử tại Sóc Bom Bo',
      duration: 310,
      url: '/audio/soc-bom-bo.mp3',
      coverImage: '/images/heritage/lich-su/soc-bom-bo-lg.webp',
    },
    video: {
      title: 'Phim tư liệu Sóc Bom Bo những năm tháng kháng chiến',
      url: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    relatedIds: ['hrt-003', 'hrt-001'],
    tags: ['sóc bom bo', 'giã gạo', 'S\'tiêng', 'kháng chiến', 'di tích lịch sử'],
    references: [
      'Ủy ban nhân dân Xã Bù Đăng. Kỷ yếu di tích lịch sử Sóc Bom Bo.',
    ],
    featured: true,
    status: 'published',
    publishedAt: '2024-05-25',
    viewCount: 4210,
  },
]

export const getFeaturedHeritages = () => MOCK_HERITAGES.filter((h) => h.featured)
export const getHeritageBySlug = (slug: string) => MOCK_HERITAGES.find((h) => h.slug === slug)
export const getHeritageById = (id: string) => MOCK_HERITAGES.find((h) => h.id === id)
export const getHeritagesByCategory = (category: string) =>
  MOCK_HERITAGES.filter((h) => h.category === category)
