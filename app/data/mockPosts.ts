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
    slug: 'le-cong-bo-di-san-det-tho-cam-mnong',
    title: 'Lễ Công Bố Di Sản Quốc Gia Nghề Dệt Thổ Cẩm Của Người M\'nông Bù Đăng',
    subtitle: 'Nghề dệt truyền thống tại các xã Đồng Nai, Thọ Sơn, Phú Sơn, Đắk Nhau được vinh danh là Di sản văn hóa phi vật thể quốc gia',
    excerpt: 'Tại Khu bảo tồn văn hóa dân tộc S\'tiêng sóc Bom Bo (Xã Bù Đăng), tỉnh Bình Phước đã trang trọng tổ chức Lễ công bố Quyết định ghi danh nghề dệt thổ cẩm của người M\'nông vào Danh mục Di sản văn hóa phi vật thể quốc gia.',
    content: `Sự kiện công bố tại Khu bảo tồn văn hóa dân tộc S'tiêng sóc Bom Bo (Xã Bù Đăng) là một cột mốc lịch sử trong công tác bảo tồn bản sắc văn hóa dân tộc thiểu số tại Bình Phước. Bộ Văn hóa, Thể thao và Du lịch trước đó đã ban hành Quyết định số 1838/QĐ-BVHTTDL chính thức công nhận "Nghề thủ công truyền thống dệt thổ cẩm của người M'nông" tại xã Bù Gia Mập (huyện Bù Gia Mập) và các xã Đồng Nai, Thọ Sơn, Phú Sơn, Đắk Nhau (Xã Bù Đăng) là Di sản văn hóa phi vật thể quốc gia.

Buổi lễ có sự góp mặt của các cấp lãnh đạo tỉnh Bình Phước, Xã Bù Đăng cùng đông đảo nghệ nhân M'nông, S'tiêng trong trang phục thổ cẩm rực rỡ truyền thống. Đây không chỉ là nghi thức trao bằng công nhận đơn thuần mà còn là dịp để cộng đồng tôn vinh bàn tay khéo léo, óc sáng tạo nghệ thuật độc đáo của những người mẹ, người chị đã bền bỉ dệt nên những dải màu đại ngàn suốt nhiều thế hệ qua.

**Bản sắc kết tinh trong từng sợi chỉ**

Đối với đồng bào M'nông Bù Đăng, thổ cẩm không đơn thuần là tấm vải may mặc thông thường. Đó là vật phẩm thiêng liêng gắn liền với đời sống tín ngưỡng và là thước đo sự thịnh vượng, sang trọng của mỗi gia đình. Thổ cẩm xuất hiện trong mọi nghi lễ quan trọng của đời người như lễ thổi tai cho trẻ sơ sinh, cưới hỏi, lễ mừng lúa mới, về nhà mới và lễ tiễn người quá cố.

Quy trình dệt thổ cẩm đòi hỏi sự kiên nhẫn phi thường và tri thức bản địa tích lũy qua nhiều đời. Người phụ nữ M'nông phải tự tay trồng bông, kéo sợi, sử dụng các loại lá, rễ và vỏ cây rừng để nhuộm màu tự nhiên: màu đen lấy từ lá cây chàm, màu đỏ lấy từ vỏ cây Krông, màu vàng từ củ nghệ... Các hoa văn trên vải như hình thoi chéo (hạt lúa), răng cưa (dãy núi), hình con chim hay dòng suối đều là những mã hóa độc đáo về nhân sinh quan hòa hợp giữa con người và thiên nhiên.

**Bài toán bảo tồn và hướng đi bền vững**

Nghề dệt thổ cẩm của người M'nông đang phải đối mặt với nguy cơ mai một trước làn sóng hiện đại hóa khi giới trẻ không còn mặn mà học nghề và sợi tổng hợp công nghiệp dần thay thế sợi tự nhiên nhuộm thủ công. 

Để giữ gìn di sản, UBND Xã Bù Đăng đã phối hợp với các ban ngành triển khai các hoạt động thiết thực: mở lớp truyền dạy dệt thổ cẩm cho thanh thiếu niên địa phương tại các xã Đồng Nai, Đắk Nhau; hỗ trợ kinh phí thu mua nguyên liệu cho nghệ nhân; đồng thời liên kết sản phẩm thổ cẩm với các tour du lịch sinh thái và văn hóa tại sóc Bom Bo và Trảng cỏ Bù Lạch nhằm tạo nguồn thu nhập ổn định cho bà con, đưa di sản sống lại bền vững trong đời sống hiện đại.`,
    coverImage: '/images/heritage/Bombo/h.png',
    category: 'su-kien',
    author: 'Báo Bình Phước',
    publishedAt: '2023-05-19',
    readTime: 6,
    featured: true,
    tags: ['dệt thổ cẩm', 'M\'nông', 'di sản quốc gia', 'sóc Bom Bo', 'Bù Đăng'],
  },
  {
    id: 'news-002',
    slug: 'ruou-can-stieng-di-san-quoc-gia',
    title: 'Kỹ Thuật Chế Biến Rượu Cần Của Người S\'tiêng: Bí Quyết Từ Men Lá Rừng',
    subtitle: 'Tìm hiểu tri thức dân gian độc đáo của di sản văn hóa phi vật thể quốc gia đầu tiên tại tỉnh Bình Phước',
    excerpt: 'Rượu cần của người S\'tiêng (Đ\'rắp S\'lung) được vinh danh là Di sản văn hóa phi vật thể quốc gia nhờ quy trình chế biến men rượu từ các loại lá và vỏ cây rừng vô cùng công phu và độc đáo.',
    content: `Theo Quyết định số 4597/QĐ-BVHTTDL của Bộ Văn hóa, Thể thao và Du lịch, "Tri thức dân gian, nghề thủ công truyền thống kỹ thuật chế biến rượu cần của người S'tiêng tỉnh Bình Phước" đã chính thức được ghi danh vào Danh mục Di sản văn hóa phi vật thể quốc gia. Đây là di sản văn hóa phi vật thể quốc gia đầu tiên của Bình Phước, khẳng định vị thế và giá trị văn hóa độc đáo của tri thức dân gian S'tiêng.

Rượu cần trong tiếng S'tiêng gọi là "Đ'rắp S'lung" hay "Rơ nơm Đ'rắp". Đây không chỉ là thức uống đơn thuần trong các dịp lễ tết mà còn là biểu tượng tinh thần đại diện cho lòng hiếu khách, văn hóa ứng xử cộng đồng và là nhịp cầu giao tiếp tâm linh giữa con người với các vị thần sông, thần núi, thần lúa.

**Bí quyết men lá độc nhất vô nhị**

Điểm mấu chốt tạo nên chất lượng và hương vị đặc trưng của rượu cần S'tiêng nằm ở bánh men rượu được làm hoàn toàn từ nguyên liệu rừng tự nhiên. Người S'tiêng không dùng men hóa học hay men công nghiệp mà tự đi tìm vỏ cây krông, rễ cây rừng cùng một số loại lá bản địa đặc trưng. Việc nhận biết và phối trộn đúng tỷ lệ các loại thảo mộc rừng đòi hỏi người làm rượu phải có kinh nghiệm lâu năm và một sự am hiểu tường tận về hệ sinh thái đại ngàn.

Vỏ và lá cây sau khi đem về được rửa sạch, giã nhỏ, phơi khô rồi trộn đều với bột gạo tẻ hoặc gạo nếp nương. Hỗn hợp này được nặn thành những bánh men tròn, ủ trong trấu ấm vài ngày cho đến khi lên men đều và dậy mùi thơm đặc trưng, sau đó tiếp tục phơi trên gác bếp để dùng dần. Nguyên liệu ủ rượu có thể là lúa, ngô, sắn hoặc bo bo. Tất cả được nấu chín, để nguội rồi trộn đều với bánh men rừng đã tán nhỏ, cho vào các ché (bình đất nung) bịt kín bằng lá chuối khô. Rượu được ủ ít nhất một tháng mới có thể dùng, ủ càng lâu thì nước rượu càng đậm đà, nồng nàn và ngọt giọng.

**Nghi thức uống rượu và tính gắn kết cộng đồng**

Uống rượu cần của người S'tiêng có những quy tắc rất trang trọng và thú vị. Khi tiếp khách quý, gia chủ sẽ đặt bình rượu cần ở vị trí trung tâm nhà dài hoặc cạnh cột nêu. Người uống dùng những chiếc cần (ống hút dài bằng trúc) cắm sâu vào đáy ché để hút dòng rượu nguyên chất. 

Đặc biệt, để đảm bảo sự công bằng và bày tỏ tình cảm quý mến giữa chủ và khách, người S'tiêng sử dụng một cành cây nhỏ khía vạch (gọi là Kê Nhệt Pê) đặt ngang miệng ché để đo mực nước đổ thêm vào bình. Khách hút rượu đến đâu, chủ nhà sẽ rót thêm nước lã vào đến đó theo đúng vạch đo, thể hiện tấm lòng chân thành, công minh, chia ngọt sẻ bùi cùng nhau.

Công tác bảo tồn di sản rượu cần S'tiêng hiện đang được chính quyền Xã Bù Đăng chú trọng bằng việc tổ chức các lớp tập huấn kỹ thuật làm men lá rừng cho thanh niên tại các buôn sóc xã Bình Minh, Bom Bo nhằm duy trì đúng hương vị truyền thống độc bản giữa nhịp sống hiện đại.`,
    coverImage: '/images/heritage/Bombo/TAN08220.jpg',
    category: 'nghien-cuu',
    author: 'Sở VHTT&DL Bình Phước',
    publishedAt: '2024-12-10',
    readTime: 8,
    featured: true,
    tags: ['rượu cần', 'S\'tiêng', 'di sản phi vật thể', 'tri thức dân gian', 'văn hóa ẩm thực'],
  },
  {
    id: 'news-003',
    slug: 'tieng-chay-gia-gao-soc-bom-bo',
    title: 'Tiếng Chày Giã Gạo Nuôi Quân Sóc Bom Bo: Từ Lịch Sử Đến Điểm Hẹn Di Sản',
    subtitle: 'Tìm hiểu huyền thoại cách mạng thời kháng chiến chống Mỹ và nỗ lực bảo tồn bản sắc văn hóa S\'tiêng tại Xã Bù Đăng',
    excerpt: 'Hình ảnh nhịp chày giã gạo thâu đêm dưới ánh đuốc lồ ô của đồng bào S\'tiêng sóc Bom Bo năm xưa phục vụ chiến trường đã đi vào lịch sử oai hùng của dân tộc. Ngày nay, nhịp điệu ấy vẫn vang lên đầy tự hào tại Khu bảo tồn văn hóa.',
    content: `Trong những năm tháng kháng chiến chống Mỹ cứu nước ác liệt (giai đoạn 1964 - 1965), phong trào đấu tranh cách mạng của quân và dân miền Nam đòi hỏi sự tiếp tế lương thực rất lớn, đặc biệt là chuẩn bị cho các chiến dịch quy mô lớn như chiến dịch Đồng Xoài. Hưởng ứng lời kêu gọi của cách mạng, đồng bào dân tộc S'tiêng tại sóc Bom Bo (nay thuộc xã Bình Minh, Xã Bù Đăng) đã có một quyết định lịch sử: đồng lòng giã gạo nuôi quân.

Vì ban ngày giặc càn quét bắn phá ác liệt, bà con trong sóc đã tập trung nổi lửa, đốt đuốc lồ ô giã gạo thâu đêm suốt sáng. Không phân biệt già trẻ trai gái, cả sóc Bom Bo vang lên tiếng chày đôi, chày ba nhịp nhàng nện xuống cối gỗ. Đồng bào sẵn sàng nhường cơm sẻ áo, đóng góp toàn bộ thóc, mì nương rẫy của gia đình mình để tiếp tế cho bộ đội chủ lực giải phóng miền Nam.

**Bài ca đi cùng năm tháng**

Hình ảnh đầy xúc động và khí thế cách mạng cuồn cuộn ấy của đồng bào S'tiêng đã trở thành nguồn cảm hứng vô tận để nhạc sĩ Xuân Hồng sáng tác nên ca khúc huyền thoại "Tiếng chày trên Sóc Bom Bo" vào năm 1965. Bài hát với giai điệu rộn ràng, vui tươi, khắc họa chân thực tinh thần kiên cường, yêu nước và tình nghĩa quân dân thắm thiết đã nhanh chóng lan tỏa khắp cả nước, đưa tên tuổi của sóc Bom Bo trở thành một biểu tượng oai hùng trong lòng người dân Việt Nam.

**Khu bảo tồn văn hóa Bom Bo ngày nay**

Sóc Bom Bo hôm nay đã được công nhận là Di tích lịch sử cấp quốc gia. Để giữ gìn và phát huy những giá trị lịch sử vô giá này, tỉnh Bình Phước đã xây dựng Khu bảo tồn văn hóa dân tộc S'tiêng sóc Bom Bo với quy mô rộng hơn 113 ha tại xã Bình Minh, Xã Bù Đăng.

Nơi đây hiện lưu giữ và trưng bày hàng trăm hiện vật gốc quý báu của thời chiến đấu gian khổ như bộ cối chày gỗ giã gạo năm xưa, những chiếc gùi tre tải lương thực, các loại vũ khí tự chế và tư liệu chiến tranh. Đặc biệt, khu bảo tồn còn sở hữu bộ cồng chiêng bằng đồng lớn nhất Việt Nam và hai ngôi nhà dài truyền thống được phục dựng nguyên bản bằng tranh, tre, nứa. Du khách đến đây không chỉ để tham quan di tích lịch sử, mà còn được trực tiếp trải nghiệm hoạt động giã gạo chày tay dưới ánh lửa, thưởng thức hương vị cơm lam, rượu cần và hòa mình vào vũ điệu cồng chiêng trầm hùng cùng đồng bào địa phương.`,
    coverImage: '/images/heritage/Bombo/TAN08183.jpg',
    category: 'tin-tuc',
    author: 'Khu Di tích Sóc Bom Bo',
    publishedAt: '2025-05-15',
    readTime: 7,
    featured: false,
    tags: ['sóc bom bo', 'giã gạo nuôi quân', 'lịch sử', 'S\'tiêng', 'kháng chiến'],
  },
  {
    id: 'news-004',
    slug: 'trang-co-bu-lach-ky-quan-thien-nhien',
    title: 'Trảng Cỏ Bù Lạch: Thảo Nguyên Xanh Giữa Lòng Đại Ngàn Bù Đăng',
    subtitle: 'Khám phá quần thể gần 500 ha trảng cỏ tự nhiên bao quanh hồ nước ngọt hoang sơ và bài toán phát triển du lịch sinh thái bền vững',
    excerpt: 'Nằm ẩn mình giữa những cánh rừng già nguyên sinh bạt ngàn của Xã Bù Đăng, Trảng cỏ Bù Lạch hiện lên như một bức tranh sơn thủy hữu tình độc nhất vô nhị với thảm cỏ xanh mướt tự nhiên chạy quanh lòng hồ mát rượi.',
    content: `Trảng cỏ Bù Lạch (hay còn gọi là trảng cỏ Bàu Lạch) tọa lạc tại xã Đồng Nai, Xã Bù Đăng, tỉnh Bình Phước là một danh thắng thiên nhiên kỳ thú bậc nhất của vùng đất Đông Nam Bộ. Khác biệt hoàn toàn với những cánh rừng già rậm rạp xung quanh, nơi đây mở ra một không gian thảo nguyên xanh mướt, rộng bao la với quần thể gồm khoảng 20 trảng cỏ lớn nhỏ khác nhau, trải rộng trên tổng diện tích gần 500 ha.

Điểm nhấn đắt giá nhất của trảng cỏ Bù Lạch là hồ nước ngọt tự nhiên trong vắt nằm ngay trung tâm trảng cỏ. Sự kết hợp hài hòa giữa thảm cỏ kim mịn màng mọc tự nhiên, mặt hồ phẳng lặng lộng gió và bức tường thành rừng nguyên sinh bạt ngàn bao bọc xung quanh tạo nên một bức tranh thiên nhiên tuyệt mỹ, mang lại cảm giác bình yên, hoang sơ hiếm có cho bất kỳ ai đặt chân đến.

**Huyền thoại hồ nước trong tâm thức người bản địa**

Khu vực xung quanh trảng cỏ Bù Lạch từ bao đời nay là địa bàn sinh sống lâu đời của các cộng đồng dân tộc M'nông, S'tiêng, Mạ. Người dân bản địa lưu truyền nhiều truyền thuyết linh thiêng về hồ nước Bàu Lạch. Họ tin rằng hồ nước là "mắt trời" soi bóng vạn vật, cung cấp sinh khí và nguồn nước mát vô tận nuôi dưỡng buôn làng giữa đại ngàn. Nơi đây cũng thường diễn ra các hoạt động kết bạn, giao lưu văn hóa cồng chiêng truyền thống của bà con các buôn làng vào mỗi dịp lễ hội.

**Hướng đi cho du lịch sinh thái bền vững**

Nhờ vẻ đẹp hoang sơ tự nhiên, Trảng cỏ Bù Lạch là địa điểm dã ngoại, cắm trại và chụp ảnh yêu thích của du khách trong và ngoài tỉnh Bình Phước. Tuy nhiên, hoạt động du lịch tại đây hiện tại hầu hết vẫn ở dạng tự phát, chưa có hạ tầng dịch vụ lưu trú chuyên nghiệp.

Vấn đề bảo vệ cảnh quan tự nhiên đang là thách thức lớn nhất tại danh thắng này. Do lượng khách cắm trại tự phát tăng cao, tình trạng xả rác bừa bãi sau mỗi buổi picnic đã gây ảnh hưởng tiêu cực đến môi trường sinh thái của trảng cỏ. Phòng Văn hóa - Thông tin Xã Bù Đăng cùng đoàn thanh niên địa phương đang đẩy mạnh các chiến dịch truyền thông "Du lịch xanh - Không để lại rác", hướng dẫn du khách nâng cao ý thức bảo vệ môi trường, mang rác thải về nơi quy định và tiến tới quy hoạch trảng cỏ thành khu du lịch sinh thái bền vững, giữ trọn vẹn vẻ đẹp nguyên sơ của thảo nguyên xanh Bù Đăng.`,
    coverImage: '/images/heritage/danh-thang/bu-lach-lg.webp',
    category: 'hoat-dong',
    author: 'Phòng Văn hóa - Thông tin Bù Đăng',
    publishedAt: '2025-06-02',
    readTime: 5,
    featured: false,
    tags: ['trảng cỏ bù lạch', 'cắm trại', 'du lịch sinh thái', 'bảo tồn thiên nhiên', 'Bù Đăng'],
  },
]
export const MOCK_EVENTS: Event[] = [
  {
    id: 'event-001',
    title: 'Festival Di Sản Bù Đăng 2026',
    description: 'Ba ngày hội tụ di sản — trải nghiệm văn hóa, âm nhạc và ẩm thực truyền thống S\'tiêng, M\'nông.',
    location: 'Trung tâm Văn hóa Xã Bù Đăng',
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
