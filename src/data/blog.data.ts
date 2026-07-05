import type { BlogPost } from "../types/blog.type";

export const blogCategories: string[] = [
  "Barchasi",
  "Karyera",
  "Dasturlash",
  "Dizayn",
  "Ta'lim",
  "Yangiliklar",
];

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "2026-yilda-dasturchilik-karyerasini-qanday-boshlash-kerak",
    title: "2026-yilda dasturchilik karyerasini qanday boshlash kerak?",
    excerpt:
      "Noldan boshlab birinchi ish o'ringizgacha bo'lgan yo'lni bosqichma-bosqich rejalashtirish bo'yicha amaliy maslahatlar.",
    content: [
      "Dasturchilik sohasiga kirish istagan har bir inson uchun eng qiyin qism — qayerdan boshlashni bilish. Bugungi kunda son-sanoqsiz til, framework va yo'nalishlar mavjud, va bu tanlovni murakkablashtiradi.",
      "Birinchi qadam — o'zingiz uchun yo'nalish tanlash. Frontend, backend, mobil yoki data science — har birining o'ziga xos bozor talabi va o'rganish egri chizig'i bor. Yo'nalishni tanlaganingizdan so'ng, shu sohaning asosiy tili va vositalariga chuqur e'tibor qarating.",
      "Nazariyadan ko'ra amaliyotga ko'proq vaqt ajrating. Har bir yangi mavzuni o'rganganingizdan so'ng, kichik bo'lsa ham amaliy loyiha qiling. Bu bilim va tajribangizni mustahkamlaydi hamda portfolio yaratishga yordam beradi.",
      "Portfolio va GitHub profilingiz — sizning raqamli tashrif qog'ozingiz. Kamida 3-4 ta puxta ishlangan loyiha ish beruvchilar uchun ko'p narsani anglatadi.",
      "Va nihoyat, hamjamiyatga qo'shiling. Telegram guruhlari, meetup'lar va onlayn forumlar orqali tajribali dasturchilar bilan aloqa o'rnating — bu sizni tezroq o'stiradi.",
    ],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=60",
    category: "Karyera",
    author: "Akmal Karimov",
    authorPhoto: "https://i.pravatar.cc/100?img=12",
    authorRole: "Frontend o'qituvchi",
    date: "2026-yil 28-iyun",
    readTime: "6 daq",
  },
  {
    id: "post-2",
    slug: "react-va-vue-qaysi-birini-tanlash-kerak",
    title: "React va Vue: qaysi birini tanlash kerak?",
    excerpt:
      "Ikkala frontend kutubxonasining kuchli va zaif tomonlarini solishtirib, loyihangiz uchun to'g'ri tanlov qilishga yordam beramiz.",
    content: [
      "React va Vue — hozirgi kunda eng mashhur ikkita frontend kutubxona. Ikkalasi ham komponentlarga asoslangan arxitekturaga ega, lekin falsafasi va ekotizimi jihatidan farqlanadi.",
      "React — Meta tomonidan yaratilgan va katta ekotizimga ega. JSX sintaksisi JavaScript bilan chambarchas bog'liq bo'lib, moslashuvchanlikni ta'minlaydi. Katta kompaniyalar va murakkab loyihalarda ko'proq qo'llaniladi.",
      "Vue esa o'rganish uchun soddaroq va shablon (template) asosidagi sintaksisga ega. Kichik va o'rta loyihalar uchun tezroq natija berish imkonini beradi.",
      "Ish bozori nuqtai nazaridan React ancha ko'proq talab qilinadi, shuning uchun karyera boshlash uchun uni tanlash strategik jihatdan foydaliroq bo'lishi mumkin.",
    ],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1000&q=60",
    category: "Dasturlash",
    author: "Nodira Yusupova",
    authorPhoto: "https://i.pravatar.cc/100?img=47",
    authorRole: "React o'qituvchi",
    date: "2026-yil 20-iyun",
    readTime: "5 daq",
  },
  {
    id: "post-3",
    slug: "ux-dizaynerlar-uchun-2026-yil-trendlari",
    title: "UX dizaynerlar uchun 2026-yil trendlari",
    excerpt:
      "Minimalizmdan tortib AI-asoslangan personalizatsiyagacha — yil davomida kuzatilayotgan asosiy dizayn tendentsiyalari.",
    content: [
      "Har yili dizayn sohasi yangi tendentsiyalar bilan boyib boradi. 2026-yilda eng ko'zga tashlanadigan yo'nalishlardan biri — sun'iy intellekt yordamida shaxsiylashtirilgan interfeyslar.",
      "Minimalistik dizayn hamon o'z kuchini yo'qotmagan, biroq unga 'micro-interaction' — kichik animatsion elementlar qo'shilib, foydalanuvchi tajribasini yanada jonli qilmoqda.",
      "Qorong'i rejim (dark mode) endi standart holatga aylandi, dizaynerlar endi ikkala rejim uchun ham bir xil sifatli tajriba yaratishga e'tibor qaratmoqda.",
      "Bundan tashqari, ovozli interfeyslar va gest-asoslangan navigatsiya mobil ilovalarda tobora ko'proq qo'llanilmoqda.",
    ],
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=60",
    category: "Dizayn",
    author: "Madina Ergasheva",
    authorPhoto: "https://i.pravatar.cc/100?img=45",
    authorRole: "UX/UI o'qituvchi",
    date: "2026-yil 15-iyun",
    readTime: "4 daq",
  },
  {
    id: "post-4",
    slug: "online-va-offline-talim-qaysi-samaraliroq",
    title: "Online va offline ta'lim: qaysi biri samaraliroq?",
    excerpt:
      "Ikkala format ustunliklari va kamchiliklarini tahlil qilib, o'zingiz uchun eng mos formatni tanlashda yordam beramiz.",
    content: [
      "Ta'lim formatini tanlash ko'p jihatdan shaxsiy vaqt jadvali, o'rganish uslubi va maqsadlarga bog'liq. Online ta'lim moslashuvchanlik beradi — istalgan vaqtda, istalgan joydan o'rganish mumkin.",
      "Offline ta'lim esa jonli muloqot, tezkor fikr-mulohaza va guruh muhitida motivatsiya ustunligiga ega. Ko'pchilik uchun bu format intizomni saqlashda yordam beradi.",
      "Bizning kuzatishlarimizga ko'ra, eng samarali natija — ikkala formatni uyg'unlashtirgan gibrid yondashuvda kuzatiladi.",
    ],
    image:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1000&q=60",
    category: "Ta'lim",
    author: "Sherzod Rahimov",
    authorPhoto: "https://i.pravatar.cc/100?img=33",
    authorRole: "Backend o'qituvchi",
    date: "2026-yil 08-iyun",
    readTime: "5 daq",
  },
  {
    id: "post-5",
    slug: "oquv-markazimiz-yangi-flutter-kursini-ochdi",
    title: "O'quv markazimiz yangi Flutter kursini ochdi",
    excerpt:
      "Mobil dasturlash yo'nalishidagi talabni hisobga olib, Flutter bo'yicha yangi amaliy kursimizni e'lon qilamiz.",
    content: [
      "Mobil ilovalarga bo'lgan talab yildan-yilga ortib bormoqda. Shu sababli, biz Flutter framework asosida yangi kursimizni ishga tushirdik.",
      "Kurs davomida talabalar Dart tilini, widget arxitekturasini va real loyihalar yaratishni o'rganishadi. Kurs oxirida ilovani Play Store va App Store'ga chiqarish bo'yicha ham amaliy tajriba beriladi.",
      "Ro'yxatdan o'tish allaqachon boshlangan, o'rinlar soni cheklangan.",
    ],
    image:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1000&q=60",
    category: "Yangiliklar",
    author: "Otabek Salimov",
    authorPhoto: "https://i.pravatar.cc/100?img=14",
    authorRole: "Flutter o'qituvchi",
    date: "2026-yil 02-iyun",
    readTime: "3 daq",
  },
  {
    id: "post-6",
    slug: "portfolio-loyihalarini-qanday-tanlash-kerak",
    title: "Portfolio uchun loyihalarni qanday tanlash kerak?",
    excerpt:
      "Ish beruvchilarni jalb qiladigan portfolio yaratishning amaliy qoidalari va tez-tez uchraydigan xatolar.",
    content: [
      "Portfolio — bu sizning ko'nikmalaringizni namoyish etuvchi eng kuchli vositangiz. Lekin ko'p miqdordagi loyihadan ko'ra, sifatli va xilma-xil loyihalar to'plami muhimroq.",
      "Har bir loyihada muammoni qanday hal qilganingizni, qaysi texnologiyalardan foydalanganingizni va natijani aniq tushuntiring.",
      "Real hayotiy muammoni hal qiluvchi loyihalar, shablon (template) asosidagi ishlardan ko'ra ancha qadrlanadi.",
    ],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=60",
    category: "Karyera",
    author: "Sevara Tursunova",
    authorPhoto: "https://i.pravatar.cc/100?img=26",
    authorRole: "Data Science o'qituvchi",
    date: "2026-yil 25-may",
    readTime: "4 daq",
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);

export const getRelatedPosts = (post: BlogPost, limit = 3): BlogPost[] =>
  blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .concat(
      blogPosts.filter((p) => p.id !== post.id && p.category !== post.category),
    )
    .slice(0, limit);
