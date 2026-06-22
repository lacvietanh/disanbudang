import type { CommunityPost, NewsArticle, Event } from '~/types'

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-001',
    type: 'story',
    title: 'Ông nội tôi và những đêm cồng chiêng',
    excerpt: 'Mỗi lần nghe tiếng cồng chiêng vang lên, tôi lại nhớ đến ông nội — người đã dạy tôi rằng mỗi nhịp chiêng là một lời kể về tổ tiên, về đất rừng, về những gì không bao giờ được phép quên.',
    content: `Ông nội tôi — già làng Điểu Minh — năm nay đã bước sang tuổi 78. Dù mái tóc đã bạc phơ như mây ngàn và những nếp nhăn hằn sâu trên khuôn mặt, đôi tay ông vẫn vô cùng rắn rỏi mỗi khi cầm dùi gõ chiêng. Tiếng chiêng của ông không chỉ vang vọng khắp căn nhà sàn mà như thấm sâu vào lòng đất, đánh thức linh hồn của đại ngàn Bù Đăng hùng vĩ.

Tôi lớn lên trong những đêm hội buôn làng, nơi ánh lửa bập bùng soi rõ những gương mặt rạng rỡ của người S'tiêng. Khi ấy, ông nội thường gọi tôi lại gần, chỉ vào chiếc chiêng cổ treo trang trọng trên vách nứa và bảo: "Cháu ơi, chiếc chiêng này có linh hồn. Khi tiếng chiêng cất lên, tổ tiên đang lắng nghe và trò chuyện với chúng ta. Nhịp chiêng nhanh là niềm vui ngày mùa, nhịp chậm dãi là nỗi nhớ người xưa. Người S'tiêng mình dù đi đâu cũng không được quên tiếng chiêng."

Tôi nhớ nhất đêm hội Mừng lúa mới năm tôi học lớp 8. Đêm đó trời lộng gió, cả buôn làng quây quần bên đống lửa lớn. Ông nội cùng những người cao niên trong làng bước vào vòng xoang. Tiếng chiêng bắt đầu trầm hùng, vang vọng như tiếng sấm từ đỉnh núi cao, rồi chuyển dần sang nhịp điệu rộn rã, thôi thúc. Cả đất trời như hòa làm một. Từ những nhịp gõ thô sơ thuở bé được ông cầm tay uốn nắn, tôi đã hiểu thế nào là sợi dây vô hình kết nối các thế hệ thông qua âm nhạc di sản này.

Giờ đây, khi xã hội ngày càng hiện đại, lớp trẻ trong buôn thích nghe nhạc trẻ hơn. Nhưng với tôi, tiếng cồng chiêng của ông nội vẫn là âm thanh đẹp nhất. Nó nhắc nhở tôi về nguồn cội, về niềm tự hào là một người con của vùng đất Bù Đăng đầy nắng gió.`,
    coverImage: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-md.webp',
    author: {
      id: 'author-001',
      name: 'Điểu Thị Lan',
      role: 'Học sinh',
      school: 'THPT Bù Đăng',
      grade: 'Lớp 11',
    },
    heritageId: 'hrt-003',
    tags: ['cồng chiêng', 'ký ức', 'ông nội', 'S\'tiêng'],
    likes: 234,
    featured: true,
    publishedAt: '2024-05-10',
  },
  {
    id: 'post-002',
    type: 'artwork',
    title: 'Rừng Chiến Khu trong mắt em',
    excerpt: 'Bức tranh màu nước của em Nguyễn Văn Hùng — vẽ lại cảnh tượng những chiến sĩ băng rừng trong đêm, ánh trăng lọt qua tán lá rừng già.',
    content: `Bức tranh "Rừng Chiến Khu trong mắt em" được thực hiện bằng chất liệu màu nước trên giấy vẽ khổ A3, là kết quả của chuyến đi thực tế của em Nguyễn Văn Hùng cùng các bạn học sinh trường THCS Bù Đăng tới Khu di tích lịch sử Căn cứ nửa lon - Chiến Khu Đ huyền thoại.

Hùng chia sẻ: "Khi đứng dưới những tán cây cổ thụ hàng trăm năm tuổi, lắng nghe tiếng chim kêu và gió xào xạc, em như cảm nhận được những gian khổ nhưng vô cùng anh dũng của thế hệ cha ông đi trước. Em muốn vẽ lại một đêm hành quân của các chiến sĩ giải phóng quân."

Trong bức tranh, tác giả nhí đã khéo léo sử dụng các tông màu xanh lục đậm, đen và xanh lam để tái hiện sự huyền bí, sâu thẳm của rừng già Nam Bộ. Điểm nhấn của tác phẩm là những tia sáng trăng dịu mát len lỏi qua từng kẽ lá, rọi xuống con đường mòn nhỏ. Bóng dáng đoàn quân gùi đồ trên lưng lấp ló xa xa, tạo nên cảm giác hào hùng nhưng cũng rất đỗi bình dị, yên ả.

Bức tranh không chỉ thể hiện năng khiếu hội họa xuất sắc của một học sinh lớp 8 mà còn là tình yêu quê hương đất nước, lòng biết ơn sâu sắc đối với những người đã ngã xuống vì nền độc lập của tổ quốc trên mảnh đất Bù Đăng lịch sử này. Tác phẩm đã đạt giải Nhất tại Hội thi vẽ tranh "Di sản quê hương em" năm học vừa qua.`,
    coverImage: '/images/heritage/danh-thang/rung-nguyen-sinh-md.webp',
    author: {
      id: 'author-002',
      name: 'Nguyễn Văn Hùng',
      role: 'Học sinh',
      school: 'THCS Bù Đăng',
      grade: 'Lớp 8',
    },
    heritageId: 'hrt-001',
    tags: ['tranh vẽ', 'chiến khu', 'nghệ thuật', 'học sinh'],
    likes: 189,
    featured: false,
    publishedAt: '2024-05-12',
  },
  {
    id: 'post-003',
    type: 'memory',
    title: 'Ba tôi kể chuyện về những ngày tải đạn',
    excerpt: 'Ba tôi năm nay 65 tuổi. Khi còn 15 tuổi, ông đã cùng các bạn thiếu nhi đội mũ tai bèo, gùi đạn qua rừng Chiến Khu Đ. Đây là câu chuyện của ông, qua lời kể của tôi.',
    content: `Ba tôi — ông Trần Văn Nam — năm nay đã ngoài sáu mươi. Mỗi khi rảnh rỗi hoặc có dịp con cháu quây quần, ba lại lấy chiếc nón tai bèo cũ kỹ từ trong tủ kính ra, ngắm nghía rồi kể lại những kỷ niệm hào hùng của thời thanh xuân cống hiến cho cách mạng tại vùng căn cứ kháng chiến Bù Đăng.

Vào những năm 1970, khi mới chỉ là một cậu thiếu niên 15 tuổi, ba tôi cùng nhiều bạn bè đồng trang lứa trong buôn đã tình nguyện tham gia vào đội du kích địa phương. Nhiệm vụ chính của đội quân tóc măng non lúc bấy giờ là gùi lương thực, tải đạn dược và dẫn đường cho các chiến sĩ qua những cánh rừng rậm rạp của Chiến Khu Đ.

"Hồi đó rừng thiêng nước độc, vắt nhiều vô kể, bom đạn dội xuống bất cứ lúc nào," ba tôi kể, mắt hướng về phía những cánh rừng xa xăm. "Mỗi đứa trẻ tụi ba lúc đó gùi trên lưng chiếc gùi tre nặng gần bằng trọng lượng cơ thể mình. Ban ngày thì ẩn nấp dưới hầm nứa, ban đêm mới dám tranh thủ đi. Những đêm không trăng, tụi ba phải cài lá cây phát quang lên mũ của người đi trước để bám đuôi nhau bước đi trong tĩnh lặng."

Ba nhớ nhất lần cả đội bị trực thăng địch càn quét. Trong khoảnh khắc ngàn cân treo sợi tóc, ba đã nhanh trí ôm chiếc gùi đạn nhảy xuống một hốc cây lớn bị cháy xém, lấy cành lá che lên. Nhờ sự gan dạ và may mắn đó, chuyến hàng đã cập bến an toàn, kịp thời cung cấp đạn dược cho trận đánh then chốt của sư đoàn.

Những câu chuyện của ba không có trong sách giáo khoa một cách chi tiết như vậy. Đó là lịch sử sống, là ký ức được viết bằng mồ hôi, xương máu và lòng quả cảm của thế hệ đi trước để vùng đất Bù Đăng hôm nay mãi mãi xanh tươi.`,
    coverImage: '/images/heritage/lich-su/chien-khu-d-md.webp',
    author: {
      id: 'author-003',
      name: 'Trần Quốc Toàn',
      role: 'Người dân địa phương',
      school: '',
    },
    heritageId: 'hrt-001',
    tags: ['ký ức', 'kháng chiến', 'gia đình', 'tải đạn'],
    likes: 312,
    featured: false,
    publishedAt: '2024-05-08',
  },
  {
    id: 'post-004',
    type: 'photo',
    title: 'Buổi sáng ở Thác Mơ',
    excerpt: 'Sương mù buổi sáng ở Thác Mơ tạo nên một khung cảnh huyền ảo như chốn thần tiên. Tôi đã dậy từ 5 giờ sáng để chụp được khoảnh khắc này.',
    content: `Thác Mơ Bù Đăng vốn nổi tiếng với vẻ đẹp hoang sơ, hùng vĩ của vùng đất Tây Nguyên. Nhưng để cảm nhận được trọn vẹn phần hồn thơ mộng, huyền ảo của ngọn thác này thì có lẽ phải ghé thăm vào lúc bình minh, khi những giọt sương mai còn đang ôm lấy cành cây ngọn cỏ.

Để bắt được khoảnh khắc sương mù bảng lảng bao phủ dòng thác, tôi đã phải chuẩn bị máy ảnh từ đêm hôm trước và xuất phát từ lúc 4h30 sáng. Khi đến nơi, xung quanh vẫn là một màn đêm tĩnh mịch, chỉ có tiếng nước đổ rì rầm từ trên cao vọng lại như bản nhạc của núi rừng.

Khoảng 5h15, những tia sáng đầu tiên của ngày mới bắt đầu hé lộ ở chân trời phía đông. Làn sương trắng muốt, dày đặc bốc lên từ mặt hồ dưới chân thác, gặp nắng sớm tạo nên những dải màu lấp lánh như cầu vồng mờ ảo. Những ngọn tre, tán lá rừng già hiện lên mập mờ trong làn khói nước, vẽ nên bức tranh sơn thủy hữu tình vô cùng ấn tượng.

Bức ảnh này tôi chụp bằng máy ảnh cơ, phơi sáng khoảng 2 giây để dòng nước trông mềm mại như dải lụa trắng vắt qua sườn núi. Qua tác phẩm này, tôi hy vọng bạn bè muôn phương sẽ biết đến nhiều hơn một địa điểm du lịch sinh thái tuyệt vời và hoang sơ tại huyện Bù Đăng của chúng ta.`,
    coverImage: '/images/heritage/danh-thang/thien-nhien-md.webp',
    author: {
      id: 'author-004',
      name: 'Lê Minh Tâm',
      role: 'Nhiếp ảnh gia nghiệp dư',
    },
    heritageId: 'hrt-002',
    tags: ['nhiếp ảnh', 'thác mơ', 'thiên nhiên', 'sương mù'],
    likes: 445,
    featured: false,
    publishedAt: '2024-05-15',
  },
  {
    id: 'post-005',
    type: 'research',
    title: 'Tìm hiểu hoa văn thổ cẩm S\'tiêng — Nghiên cứu của nhóm học sinh lớp 9',
    excerpt: 'Chúng em đã dành 3 tháng gặp gỡ các nghệ nhân, ghi chép hơn 20 mẫu hoa văn thổ cẩm truyền thống. Đây là kết quả nghiên cứu của nhóm chúng em về ý nghĩa của từng hoa văn.',
    content: `Nghề dệt thổ cẩm của đồng bào dân tộc S'tiêng tại Bù Đăng là một di sản văn hóa phi vật thể vô cùng độc đáo. Tuy nhiên, cùng với thời gian, số lượng nghệ nhân biết dệt và hiểu ý nghĩa của các hoa văn đang ngày một ít đi. Nhận thức được điều đó, nhóm học sinh lớp 9A trường THCS Minh Hưng đã thực hiện đề tài nghiên cứu trải nghiệm sáng tạo về chủ đề này dưới sự hướng dẫn của giáo viên Lịch sử địa phương.

Trong suốt 3 tháng ròng rã, cứ vào dịp cuối tuần, nhóm chúng em lại lặn lội đến các buôn làng xa xôi như buôn Bù Bông, Bù Sa để gặp gỡ các nghệ nhân dệt thổ cẩm. Chúng em đã chụp ảnh, vẽ lại và ghi chép tỉ mỉ hơn 20 mẫu hoa văn cổ truyền.

Kết quả nghiên cứu cho thấy, hoa văn thổ cẩm S'tiêng chủ yếu mang tính đối xứng, phản ánh thế giới quan sinh động của cư dân bản địa về vũ trụ và thiên nhiên.
- Hình thoi chéo biểu tượng cho hạt gạo, hạt bắp — mong ước về sự no đủ.
- Hình răng cưa dọc theo viền vải đại diện cho những dãy núi đồi trập trùng bảo bọc buôn làng.
- Các họa tiết cách điệu hình con chim, con rùa thể hiện sự hòa hợp tuyệt đối giữa con người với muôn thú xung quanh.

Nghiên cứu này không chỉ giúp nhóm hiểu rõ hơn về văn hóa truyền thống của quê hương mà còn đề xuất một số giải pháp thiết thực nhằm ứng dụng hoa văn S'tiêng vào các sản phẩm thời trang hiện đại để giới trẻ tiếp cận dễ dàng hơn.`,
    coverImage: '/images/heritage/van-hoa-phi-vat-the/di-san-ban-dia-md.webp',
    author: {
      id: 'author-005',
      name: 'Nhóm HS Lớp 9A',
      role: 'Học sinh',
      school: 'THCS Minh Hưng',
      grade: 'Lớp 9',
    },
    heritageId: 'hrt-007',
    tags: ['nghiên cứu', 'thổ cẩm', 'hoa văn', 'học sinh', 'S\'tiêng'],
    likes: 156,
    featured: false,
    publishedAt: '2024-04-20',
  },
  {
    id: 'post-006',
    type: 'story',
    title: 'Mùa lúa mới và tiếng cười của buôn làng',
    excerpt: 'Năm nào cũng vậy, khi lúa nếp bắt đầu vàng trên nương, cả buôn làng tôi lại rộn ràng chuẩn bị cho lễ hội. Đó là thời điểm mà mọi lo toan của cuộc sống đều được gác lại.',
    content: `Lễ hội Mừng lúa mới (hay còn gọi là Lễ hội đâm trâu tạ ơn tổ tiên) là ngày hội lớn nhất trong năm của cộng đồng người M'nông sinh sống tại vùng cao Bù Đăng. Khi những cơn mưa cuối mùa dứt hẳn, để lại bầu trời trong xanh cao vời vợi, cũng là lúc lúa nếp trên nương chín vàng rực, trĩu hạt. Cả buôn làng rộn rã bước vào một mùa thu hoạch đầy phấn khởi.

Từ tờ mờ sáng, tiếng chày giã gạo đã vang lên khắp buôn. Các bà, các chị trong trang phục thổ cẩm đẹp nhất nhanh tay giã những hạt nếp mới để đồ xôi, làm bánh nếp nướng thơm lừng cả một góc rừng. Thanh niên trai tráng thì chuẩn bị cọc nêu trang trí sặc sỡ và những ché rượu cần thơm ngon nhất đã được ủ kỹ từ nhiều tháng trước.

Tối đến, khi đống lửa trung tâm buôn làng được đốt lên, già làng làm lễ cúng thần lúa, thần rừng cầu mong cho mưa thuận gió hòa, buôn làng bình an khỏe mạnh. Ngay sau đó, tiếng cồng chiêng ngân vang réo rắt báo hiệu hội vui bắt đầu. Mọi người cầm tay nhau tạo thành vòng xoang lớn xung quanh ngọn lửa, uống rượu cần và cùng nhảy múa theo nhịp chiêng.

Những nụ cười giòn giã của trẻ thơ hòa cùng tiếng nói chuyện rôm rả của các cụ già tạo nên một không khí ấm cúng, gắn kết bền chặt. Với người M'nông, mùa lúa mới không chỉ là thành quả lao động vất vả mà còn là dịp để gia đình sum họp, thắt chặt tình đoàn kết cộng đồng buôn làng bền bỉ qua năm tháng.`,
    coverImage: '/images/heritage/van-hoa-phi-vat-the/van-hoa-stieng-md.webp',
    author: {
      id: 'author-006',
      name: 'Thị Hoa',
      role: 'Phụ nữ cộng đồng M\'nông',
    },
    heritageId: 'hrt-008',
    tags: ['lúa mới', 'lễ hội', 'M\'nông', 'buôn làng', 'truyền thống'],
    likes: 278,
    featured: false,
    publishedAt: '2024-04-25',
  },
]

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'news-001',
    slug: 'festival-di-san-bu-dang-2026',
    title: 'Festival Di Sản Bù Đăng 2026: "Đại Ngàn Thức Giấc"',
    subtitle: 'Sự kiện văn hóa lớn nhất huyện Bù Đăng trong năm',
    excerpt: 'Festival Di Sản Bù Đăng 2026 với chủ đề "Đại Ngàn Thức Giấc" sẽ quy tụ hàng chục nghệ nhân, cộng đồng dân tộc và du khách trong suốt 3 ngày trải nghiệm văn hóa đặc sắc.',
    content: `Festival Di Sản Bù Đăng 2026 với chủ đề "Đại Ngàn Thức Giấc" sẽ chính thức khai mạc vào tháng 11 năm nay tại trung tâm huyện Bù Đăng. Đây là sự kiện quy mô lớn nhất trong năm nhằm kỷ niệm và giới thiệu các di sản văn hóa, lịch sử và thắng cảnh thiên nhiên của địa phương tới bạn bè cả nước.

Trong suốt 3 ngày diễn ra lễ hội, du khách sẽ được hòa mình vào không gian trải nghiệm văn hóa vô cùng độc đáo:
- Đêm nhạc hội cồng chiêng S'tiêng bên lửa trại bập bùng với sự tham gia của các nghệ nhân cao tuổi và các đội thanh thiếu niên địa phương.
- Hội thi giã gạo truyền thống tái hiện không khí oai hùng của đêm giã gạo nuôi quân tại sóc Bom Bo năm xưa.
- Không gian văn hóa ẩm thực giới thiệu các món ăn đặc sắc như cơm lam suối, thịt nướng ống tre, rượu cần ủ bằng men lá rừng truyền thống.
- Các gian hàng giới thiệu thổ cẩm dệt tay tinh xảo của đồng bào S'tiêng, M'nông.

Ban Tổ chức kỳ vọng lễ hội sẽ thu hút hơn 10.000 lượt khách tham quan trực tiếp và trực tuyến, góp phần thúc đẩy du lịch sinh thái bền vững cho huyện Bù Đăng.`,
    coverImage: '/images/heritage/van-hoa-phi-vat-the/cong-chieng-lg.webp',
    category: 'su-kien',
    author: 'Ban Tổ Chức Festival',
    publishedAt: '2026-09-15',
    readTime: 5,
    featured: true,
    tags: ['festival', 'sự kiện', 'văn hóa', '2026'],
  },
  {
    id: 'news-002',
    slug: 'cong-chieng-stieng-vao-truong-hoc',
    title: 'Cồng Chiêng S\'tiêng Vào Trường Học: Dự Án Giáo Dục Di Sản',
    subtitle: 'Học sinh 5 trường THCS tại Bù Đăng được học đánh cồng chiêng',
    excerpt: 'Dự án đưa nghệ nhân cồng chiêng vào trường học đang được triển khai thí điểm tại 5 trường THCS trên địa bàn huyện Bù Đăng, mở ra hướng mới trong giáo dục di sản văn hóa.',
    content: `Nhằm bảo tồn bản sắc văn hóa phi vật thể của địa phương, Phòng Giáo dục và Đào tạo huyện Bù Đăng đã chính thức khởi động dự án đưa nghệ thuật trình diễn cồng chiêng S'tiêng vào chương trình giáo dục ngoại khóa tại 5 trường THCS điểm trên địa bàn.

Dự án có sự đồng hành mật thiết của các già làng và nghệ nhân cồng chiêng ưu tú tại địa phương. Các em học sinh sẽ được học:
- Cách cầm dùi, cách gõ và giữ nhịp chiêng theo đúng giai điệu cổ truyền.
- Ý nghĩa lịch sử và tâm linh của bộ cồng chiêng trong đời sống tinh thần của đồng bào dân tộc S'tiêng.
- Kỹ năng diễn xướng xoang múa phụ họa xung quanh dàn nhạc cồng chiêng.

Thầy Nguyễn Văn Hải, trưởng phòng GD&ĐT huyện, cho biết: "Dự án không chỉ giúp các em học sinh có thêm sân chơi bổ ích mà quan trọng hơn là khơi dậy lòng tự hào về di sản văn hóa quê hương trong lòng thế hệ trẻ, tạo lực lượng kế thừa gìn giữ bản sắc dân tộc."`,
    coverImage: '/images/heritage/van-hoa-phi-vat-the/van-hoa-stieng-lg.webp',
    category: 'hoat-dong',
    author: 'Phòng GD&ĐT Bù Đăng',
    publishedAt: '2026-08-20',
    readTime: 4,
    featured: true,
    tags: ['giáo dục', 'cồng chiêng', 'trường học', 'di sản'],
  },
  {
    id: 'news-003',
    slug: 'so-hoa-chi-tiet-chien-khu-d',
    title: 'Số Hóa Chi Tiết Chiến Khu Đ: Bảo Tàng 3D Sắp Ra Mắt',
    subtitle: 'Dự án số hóa di tích với công nghệ 3D scanning và VR',
    excerpt: 'UBND huyện Bù Đăng phối hợp với Đại học Quốc gia TP.HCM thực hiện dự án số hóa toàn diện Chiến Khu Đ — tạo ra bảo tàng 3D trực tuyến đầu tiên về di tích lịch sử quốc gia.',
    content: `Trong nỗ lực ứng dụng chuyển đổi số vào hoạt động bảo tồn lịch sử, UBND huyện Bù Đăng đã phối hợp cùng nhóm chuyên gia Đại học Quốc gia TP.HCM hoàn thành giai đoạn 1 của dự án số hóa 3D toàn diện Khu di tích lịch sử Căn cứ nửa lon - Chiến Khu Đ.

Dự án áp dụng công nghệ quét 3D scanner cầm tay và chụp ảnh hồng ngoại độ phân giải cao để dựng lại toàn bộ cấu trúc địa hình rừng, hầm trú ẩn, phòng họp dã chiến và các hiện vật lịch sử tại di tích. 

Khi hệ thống chính thức chạy thử nghiệm vào quý tới, người xem trên toàn thế giới chỉ cần truy cập trang web là có thể:
- Thực hiện chuyến tham quan ảo VR 360 độ quanh cánh rừng chiến khu.
- Tương tác xoay 3 chiều xem chi tiết từng chiếc gùi, cối giã gạo, hay mảnh bom chiến tranh được trưng bày.
- Nghe các đoạn âm thanh thuyết minh lịch sử tự động bằng cả tiếng Việt và tiếng Anh.

Đây được coi là bước ngoặt quan trọng giúp quảng bá lịch sử cách mạng của Bù Đăng đến gần hơn với độc giả và du khách trẻ trong nước và quốc tế.`,
    coverImage: '/images/heritage/danh-thang/rung-nguyen-sinh-lg.webp',
    category: 'tin-tuc',
    author: 'Ban Quản lý Di tích',
    publishedAt: '2026-07-10',
    readTime: 6,
    featured: false,
    tags: ['số hóa', 'chiến khu đ', 'công nghệ', '3D', 'VR'],
  },
  {
    id: 'news-004',
    slug: 'hoi-thao-bao-ton-nha-dai-stieng',
    title: 'Hội Thảo Bảo Tồn Nhà Dài S\'tiêng: Kiến Trúc Không Được Lãng Quên',
    subtitle: 'Chuyên gia và cộng đồng cùng tìm hướng bảo tồn nhà dài truyền thống',
    excerpt: 'Hội thảo khoa học về bảo tồn nhà dài S\'tiêng quy tụ hơn 50 chuyên gia kiến trúc, nhân học và đại diện cộng đồng để cùng thảo luận về chiến lược bảo tồn và phát huy giá trị.',
    content: `Vừa qua, tại Khu bảo tồn văn hóa dân tộc Sóc Bom Bo đã diễn ra hội thảo khoa học "Bảo tồn nhà dài truyền thống của người S'tiêng Bù Đăng trong đời sống hiện đại". Hội thảo do Viện Khoa học Xã hội Nam Bộ phối hợp cùng Sở Văn hóa tỉnh tổ chức.

Hội thảo quy tụ hơn 50 nhà nghiên cứu kiến trúc, nhân học cùng đông đảo các nghệ nhân, già làng đại diện cho cộng đồng các buôn sóc tại Bù Đăng. Các đại biểu đã tập trung làm rõ:
- Thực trạng suy giảm số lượng nhà dài truyền thống do đô thị hóa và sự thay đổi về nhu cầu cư trú của người dân.
- Các giải pháp vật liệu thay thế bền vững để phục dựng nhà dài mà vẫn giữ nguyên hồn cốt kiến trúc tre nứa lá.
- Hướng đi kết hợp bảo tồn nhà dài gắn với phát triển mô hình du lịch homestay cộng đồng nhằm tạo sinh kế bền vững cho đồng bào.

Hội thảo đã thông qua bản khuyến nghị gửi Ủy ban nhân dân tỉnh nhằm cấp kinh phí khẩn cấp để tu bổ, bảo tồn 3 ngôi nhà dài cổ tiêu biểu trên địa bàn huyện trong giai đoạn 2026-2027.`,
    coverImage: '/images/heritage/doi-song-cong-dong/nha-dai-lg.webp',
    category: 'nghien-cuu',
    author: 'Viện Khoa học Xã hội Nam Bộ',
    publishedAt: '2026-06-05',
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

