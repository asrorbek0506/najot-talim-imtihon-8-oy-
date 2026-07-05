import type { Course } from "../types/course.type";

export const courseCategories: string[] = [
  "Barchasi",
  "Frontend",
  "Backend",
  "Dizayn",
  "Mobil",
  "Data Science",
  "DevOps",
  "Marketing",
];

export const courseLevels: string[] = [
  "Barchasi",
  "Boshlang'ich",
  "O'rta",
  "Yuqori",
];

export const courseSorts: string[] = [
  "Mashhurligi bo'yicha",
  "Arzonidan qimmatiga",
  "Qimmatidan arzoniga",
  "Reytingi bo'yicha",
];

export const courses: Course[] = [
  {
    id: "javascript-dasturlash",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=60",
    category: "Frontend",
    level: "Boshlang'ich",
    rating: "4.9",
    reviews: "312",
    title: "JavaScript dasturlash",
    desc: "Noldan boshlab darajagacha bo'lgan to'liq JavaScript kursi. ES6+, DOM, asinxron dasturlash.",
    longDesc:
      "Ushbu kurs dasturlashni noldan boshlamoqchi bo'lganlar uchun mo'ljallangan. Siz JavaScript tilining asoslaridan tortib zamonaviy ES6+ sintaksisigacha, DOM bilan ishlash, asinxron dasturlash (Promise, async/await) va real loyihalar yaratishni o'rganasiz. Kurs davomida 5 ta amaliy loyiha ustida ishlaysiz va portfolio shakllantirasiz.",
    teacher: "Akmal Karimov",
    teacherPhoto: "https://i.pravatar.cc/150?img=12",
    price: "490 000 so'm",
    oldPrice: "690 000 so'm",
    duration: "12 hafta",
    students: "540",
    language: "O'zbek tili",
    updatedAt: "2026-yil iyun",
    whatYouWillLearn: [
      "JavaScript sintaksisi va asosiy tushunchalar",
      "DOM bilan ishlash va voqealarni boshqarish",
      "ES6+: arrow function, destructuring, modules",
      "Asinxron dasturlash: Promise, async/await, fetch API",
      "Git va GitHub bilan ishlash",
      "5 ta amaliy loyiha yaratish",
    ],
    requirements: [
      "Kompyuter va internet aloqasi",
      "HTML/CSS bo'yicha boshlang'ich bilim tavsiya etiladi",
      "O'rganishga bo'lgan ishtiyoq",
    ],
    curriculum: [
      {
        title: "1-modul: Asoslar",
        duration: "2 hafta",
        lessons: [
          {
            title: "JavaScript nima va u qanday ishlaydi",
            duration: "18 daq",
            preview: true,
          },
          { title: "O'zgaruvchilar va ma'lumot turlari", duration: "24 daq" },
          { title: "Shart operatorlari va tsikllar", duration: "30 daq" },
          { title: "Funksiyalar", duration: "26 daq" },
        ],
      },
      {
        title: "2-modul: DOM va voqealar",
        duration: "3 hafta",
        lessons: [
          { title: "DOM daraxti bilan tanishuv", duration: "22 daq" },
          { title: "Elementlarni tanlash va o'zgartirish", duration: "28 daq" },
          { title: "Event listener'lar", duration: "20 daq" },
          { title: "Amaliy loyiha: To-Do ilova", duration: "45 daq" },
        ],
      },
      {
        title: "3-modul: Asinxron dasturlash",
        duration: "3 hafta",
        lessons: [
          { title: "Callback va Promise", duration: "32 daq" },
          { title: "Async/await", duration: "27 daq" },
          { title: "Fetch API bilan ishlash", duration: "30 daq" },
          { title: "Amaliy loyiha: Ob-havo ilovasi", duration: "50 daq" },
        ],
      },
      {
        title: "4-modul: Yakuniy loyiha",
        duration: "4 hafta",
        lessons: [
          { title: "Loyiha arxitekturasi", duration: "20 daq" },
          { title: "Loyihani qurish", duration: "60 daq" },
          { title: "Deploy qilish", duration: "25 daq" },
        ],
      },
    ],
    reviewsList: [
      {
        name: "Bobur Tojiev",
        photo: "https://i.pravatar.cc/100?img=11",
        rating: 5,
        date: "2026-yil may",
        text: "Kursni tugatganimdan keyin 2 hafta ichida ishga kirdim. O'qituvchi juda tushunarli tushuntiradi.",
      },
      {
        name: "Kamila Yusupova",
        photo: "https://i.pravatar.cc/100?img=25",
        rating: 5,
        date: "2026-yil aprel",
        text: "Amaliy loyihalar juda foydali bo'ldi, portfolio uchun ishlatyapman.",
      },
      {
        name: "Sardor Aliyev",
        photo: "https://i.pravatar.cc/100?img=51",
        rating: 4,
        date: "2026-yil mart",
        text: "Yaxshi kurs, lekin asinxron dasturlash qismi biroz tezroq o'tildi.",
      },
    ],
  },
  {
    id: "react-js-asoslari",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=60",
    category: "Frontend",
    level: "O'rta",
    rating: "4.8",
    reviews: "245",
    title: "React.js asoslari",
    desc: "Komponentlar asosida SPA yaratish, Hooks, Router, Context API va Redux bilan ishlash.",
    longDesc:
      "React.js — zamonaviy frontend dasturlashning eng talab qilinadigan kutubxonasi. Kursda siz komponentlar arxitekturasi, Hooks (useState, useEffect va boshqalar), React Router yordamida sahifalararo navigatsiya, Context API va Redux bilan holatni boshqarishni chuqur o'rganasiz.",
    teacher: "Nodira Yusupova",
    teacherPhoto: "https://i.pravatar.cc/150?img=47",
    price: "790 000 so'm",
    duration: "10 hafta",
    students: "280",
    language: "O'zbek tili",
    updatedAt: "2026-yil may",
    whatYouWillLearn: [
      "Komponentlar va JSX sintaksisi",
      "React Hooks: useState, useEffect, useRef, custom hooks",
      "React Router bilan navigatsiya",
      "Context API va Redux Toolkit",
      "API bilan ishlash (React Query)",
      "TypeScript bilan React",
    ],
    requirements: [
      "JavaScript bo'yicha o'rta darajadagi bilim",
      "HTML/CSS bilimi",
      "ES6+ sintaksisi bilan tanishlik",
    ],
    curriculum: [
      {
        title: "1-modul: React asoslari",
        duration: "2 hafta",
        lessons: [
          {
            title: "React nima va nima uchun kerak",
            duration: "20 daq",
            preview: true,
          },
          { title: "JSX sintaksisi", duration: "22 daq" },
          { title: "Komponentlar va props", duration: "28 daq" },
        ],
      },
      {
        title: "2-modul: Hooks",
        duration: "3 hafta",
        lessons: [
          { title: "useState va useEffect", duration: "30 daq" },
          { title: "useRef va useMemo", duration: "24 daq" },
          { title: "Custom hook yaratish", duration: "26 daq" },
        ],
      },
      {
        title: "3-modul: Routing va holat boshqaruvi",
        duration: "3 hafta",
        lessons: [
          { title: "React Router", duration: "25 daq" },
          { title: "Context API", duration: "22 daq" },
          { title: "Redux Toolkit", duration: "35 daq" },
        ],
      },
      {
        title: "4-modul: Yakuniy loyiha",
        duration: "2 hafta",
        lessons: [
          { title: "To'liq SPA loyihasi qurish", duration: "60 daq" },
          { title: "Deploy va optimallashtirish", duration: "28 daq" },
        ],
      },
    ],
    reviewsList: [
      {
        name: "Zilola Ahmedova",
        photo: "https://i.pravatar.cc/100?img=44",
        rating: 5,
        date: "2026-yil aprel",
        text: "React bo'yicha eng yaxshi kurs. Hooks qismi juda chuqur tushuntirilgan.",
      },
      {
        name: "Jamshid Nabiyev",
        photo: "https://i.pravatar.cc/100?img=8",
        rating: 5,
        date: "2026-yil fevral",
        text: "Amaliyot ko'p, nazariya kam — aynan shu kerak edi.",
      },
    ],
  },
  {
    id: "ux-ui-dizayn",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=60",
    category: "Dizayn",
    level: "Boshlang'ich",
    rating: "4.9",
    reviews: "198",
    title: "UX/UI dizayn",
    desc: "Figma, foydalanuvchi tadqiqoti, wireframe, prototip va portfolio yaratish.",
    longDesc:
      "Kursda siz foydalanuvchi tajribasi (UX) tadqiqotidan tortib, Figma'da yuqori aniqlikdagi interfeys (UI) dizayni yaratishgacha bo'lgan yo'lni bosib o'tasiz. Wireframe, prototiplash, dizayn tizimlari va portfolio tayyorlash kursning asosiy qismini tashkil qiladi.",
    teacher: "Madina Ergasheva",
    teacherPhoto: "https://i.pravatar.cc/150?img=45",
    price: "890 000 so'm",
    duration: "14 hafta",
    students: "320",
    language: "O'zbek tili",
    updatedAt: "2026-yil iyun",
    whatYouWillLearn: [
      "Foydalanuvchi tadqiqoti va persona yaratish",
      "Figma'da ishlash: komponentlar, auto-layout",
      "Wireframe va prototip yaratish",
      "Dizayn tizimlari (Design System)",
      "Portfolio tayyorlash va case study yozish",
    ],
    requirements: [
      "Maxsus dasturiy ta'minot talab qilinmaydi",
      "Estetik didga ega bo'lish tavsiya etiladi",
    ],
    curriculum: [
      {
        title: "1-modul: UX tadqiqoti",
        duration: "3 hafta",
        lessons: [
          { title: "UX/UI farqi nimada", duration: "18 daq", preview: true },
          { title: "Foydalanuvchi tadqiqoti usullari", duration: "26 daq" },
          { title: "Persona va user journey", duration: "24 daq" },
        ],
      },
      {
        title: "2-modul: Figma bilan ishlash",
        duration: "4 hafta",
        lessons: [
          { title: "Figma interfeysi bilan tanishuv", duration: "20 daq" },
          { title: "Auto-layout va komponentlar", duration: "30 daq" },
          { title: "Prototiplash", duration: "28 daq" },
        ],
      },
      {
        title: "3-modul: Dizayn tizimi",
        duration: "4 hafta",
        lessons: [
          { title: "Rang va tipografiya tizimi", duration: "25 daq" },
          { title: "Komponent kutubxonasi yaratish", duration: "35 daq" },
        ],
      },
      {
        title: "4-modul: Portfolio",
        duration: "3 hafta",
        lessons: [
          { title: "Case study yozish", duration: "22 daq" },
          { title: "Portfolio saytini tayyorlash", duration: "40 daq" },
        ],
      },
    ],
    reviewsList: [
      {
        name: "Zilola Ahmedova",
        photo: "https://i.pravatar.cc/100?img=44",
        rating: 5,
        date: "2026-yil mart",
        text: "UX/UI kursi mening hayotimni o'zgartirdi. Hozir xalqaro kompaniyada ishlayman.",
      },
    ],
  },
  {
    id: "python-dasturchilik",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=60",
    category: "Backend",
    level: "Boshlang'ich",
    rating: "4.7",
    reviews: "276",
    title: "Python dasturchilik",
    desc: "Asoslar, OOP, Django, REST API va ma'lumotlar bazalari bilan ishlash.",
    longDesc:
      "Python — o'rganish uchun eng qulay va ko'p qirrali dasturlash tili. Kursda siz til asoslaridan tortib, obyektga yo'naltirilgan dasturlash (OOP), Django framework yordamida veb-ilovalar va REST API yaratishni, shuningdek PostgreSQL bilan ishlashni o'rganasiz.",
    teacher: "Sherzod Rahimov",
    teacherPhoto: "https://i.pravatar.cc/150?img=33",
    price: "790 000 so'm",
    duration: "16 hafta",
    students: "680",
    language: "O'zbek tili",
    updatedAt: "2026-yil may",
    whatYouWillLearn: [
      "Python sintaksisi va ma'lumot tuzilmalari",
      "OOP: klass, meros, polimorfizm",
      "Django framework asoslari",
      "REST API yaratish (Django REST Framework)",
      "PostgreSQL bilan ishlash",
    ],
    requirements: [
      "Dasturlash bo'yicha oldindan bilim shart emas",
      "Mantiqiy fikrlash qobiliyati",
    ],
    curriculum: [
      {
        title: "1-modul: Python asoslari",
        duration: "4 hafta",
        lessons: [
          { title: "Python sintaksisi", duration: "20 daq", preview: true },
          {
            title: "Ma'lumot tuzilmalari: list, dict, set",
            duration: "28 daq",
          },
          { title: "Funksiyalar va modullar", duration: "24 daq" },
        ],
      },
      {
        title: "2-modul: OOP",
        duration: "4 hafta",
        lessons: [
          { title: "Klass va obyektlar", duration: "26 daq" },
          { title: "Meros va polimorfizm", duration: "30 daq" },
        ],
      },
      {
        title: "3-modul: Django",
        duration: "5 hafta",
        lessons: [
          { title: "Django loyihasini sozlash", duration: "22 daq" },
          { title: "Model va ORM", duration: "32 daq" },
          { title: "REST API yaratish", duration: "35 daq" },
        ],
      },
      {
        title: "4-modul: Yakuniy loyiha",
        duration: "3 hafta",
        lessons: [{ title: "To'liq backend loyihasi", duration: "60 daq" }],
      },
    ],
    reviewsList: [
      {
        name: "Rustam Olimov",
        photo: "https://i.pravatar.cc/100?img=15",
        rating: 5,
        date: "2026-yil aprel",
        text: "Python kursi juda yaxshi tashkillashtirilgan. Endi backend dasturchi bo'lib ishlayman.",
      },
    ],
  },
  {
    id: "flutter-mobil-ilovalar",
    image:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=800&q=60",
    category: "Mobil",
    level: "O'rta",
    rating: "4.8",
    reviews: "167",
    title: "Flutter mobil ilovalar",
    desc: "Dart tilida iOS va Android uchun cross-platform mobil ilovalar yaratish.",
    longDesc:
      "Flutter — bitta kod bazasidan iOS va Android uchun tezkor va chiroyli ilovalar yaratish imkonini beruvchi framework. Kursda Dart tili, widget arxitekturasi, state management (Provider, Riverpod) va Firebase bilan integratsiyani o'rganasiz.",
    teacher: "Otabek Salimov",
    teacherPhoto: "https://i.pravatar.cc/150?img=14",
    price: "990 000 so'm",
    duration: "12 hafta",
    students: "210",
    language: "O'zbek tili",
    updatedAt: "2026-yil iyun",
    whatYouWillLearn: [
      "Dart dasturlash tili",
      "Flutter widget arxitekturasi",
      "State management: Provider, Riverpod",
      "Firebase bilan integratsiya",
      "Play Store va App Store'ga chiqarish",
    ],
    requirements: [
      "Har qanday dasturlash tilida boshlang'ich tajriba tavsiya etiladi",
    ],
    curriculum: [
      {
        title: "1-modul: Dart va Flutter asoslari",
        duration: "3 hafta",
        lessons: [
          { title: "Dart tili asoslari", duration: "24 daq", preview: true },
          { title: "Widget nima va turlari", duration: "26 daq" },
        ],
      },
      {
        title: "2-modul: UI qurish",
        duration: "4 hafta",
        lessons: [
          { title: "Layout widget'lari", duration: "28 daq" },
          { title: "Navigatsiya va routing", duration: "24 daq" },
        ],
      },
      {
        title: "3-modul: State management",
        duration: "3 hafta",
        lessons: [{ title: "Provider va Riverpod", duration: "32 daq" }],
      },
      {
        title: "4-modul: Yakuniy loyiha",
        duration: "2 hafta",
        lessons: [{ title: "Ilovani do'konlarga joylash", duration: "30 daq" }],
      },
    ],
    reviewsList: [],
  },
  {
    id: "data-science-va-ml",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=60",
    category: "Data Science",
    level: "Yuqori",
    rating: "4.9",
    reviews: "134",
    title: "Data Science va ML",
    desc: "Pandas, NumPy, vizualizatsiya va Machine Learning asoslari Python tilida.",
    longDesc:
      "Ma'lumotlar tahlili va sun'iy intellekt sohasiga chuqur kirish. Pandas va NumPy bilan ma'lumotlarni qayta ishlash, Matplotlib/Seaborn bilan vizualizatsiya, so'ngra Scikit-learn yordamida Machine Learning modellarini qurishni o'rganasiz.",
    teacher: "Sevara Tursunova",
    teacherPhoto: "https://i.pravatar.cc/150?img=26",
    price: "1 200 000 so'm",
    duration: "18 hafta",
    students: "160",
    language: "O'zbek tili",
    updatedAt: "2026-yil may",
    whatYouWillLearn: [
      "Pandas va NumPy bilan ma'lumotlarni qayta ishlash",
      "Ma'lumotlarni vizualizatsiya qilish",
      "Machine Learning algoritmlari",
      "Model baholash va optimallashtirish",
    ],
    requirements: [
      "Python bo'yicha boshlang'ich bilim",
      "Matematika/statistika asoslari",
    ],
    curriculum: [
      {
        title: "1-modul: Ma'lumotlar bilan ishlash",
        duration: "5 hafta",
        lessons: [
          { title: "NumPy asoslari", duration: "26 daq", preview: true },
          { title: "Pandas bilan ma'lumot tahlili", duration: "34 daq" },
        ],
      },
      {
        title: "2-modul: Vizualizatsiya",
        duration: "3 hafta",
        lessons: [{ title: "Matplotlib va Seaborn", duration: "28 daq" }],
      },
      {
        title: "3-modul: Machine Learning",
        duration: "7 hafta",
        lessons: [
          { title: "Regressiya modellari", duration: "32 daq" },
          { title: "Klassifikatsiya algoritmlari", duration: "30 daq" },
        ],
      },
      {
        title: "4-modul: Yakuniy loyiha",
        duration: "3 hafta",
        lessons: [{ title: "To'liq ML loyihasi", duration: "60 daq" }],
      },
    ],
    reviewsList: [],
  },
  {
    id: "devops-muhandisi",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=60",
    category: "DevOps",
    level: "Yuqori",
    rating: "4.7",
    reviews: "112",
    title: "DevOps muhandisi",
    desc: "Linux, Docker, Kubernetes, CI/CD pipeline va AWS bulut infratuzilmasi.",
    longDesc:
      "DevOps — zamonaviy dasturiy ta'minotni yetkazib berish jarayonining ajralmas qismi. Kursda Linux buyruqlari, Docker konteynerlari, Kubernetes orkestratsiyasi, CI/CD pipeline'lar va AWS bulut xizmatlari bilan ishlashni chuqur o'rganasiz.",
    teacher: "Jasur Mahmudov",
    teacherPhoto: "https://i.pravatar.cc/150?img=53",
    price: "1 500 000 so'm",
    duration: "16 hafta",
    students: "112",
    language: "O'zbek tili",
    updatedAt: "2026-yil aprel",
    whatYouWillLearn: [
      "Linux administratsiyasi",
      "Docker va konteynerizatsiya",
      "Kubernetes orkestratsiyasi",
      "CI/CD pipeline qurish (GitHub Actions)",
      "AWS bulut infratuzilmasi",
    ],
    requirements: [
      "Backend yoki tizim administratori tajribasi tavsiya etiladi",
    ],
    curriculum: [
      {
        title: "1-modul: Linux va tarmoq",
        duration: "4 hafta",
        lessons: [
          { title: "Linux buyruqlari", duration: "28 daq", preview: true },
        ],
      },
      {
        title: "2-modul: Konteynerizatsiya",
        duration: "5 hafta",
        lessons: [
          { title: "Docker asoslari", duration: "30 daq" },
          { title: "Kubernetes orkestratsiyasi", duration: "36 daq" },
        ],
      },
      {
        title: "3-modul: CI/CD",
        duration: "4 hafta",
        lessons: [
          { title: "GitHub Actions bilan pipeline qurish", duration: "32 daq" },
        ],
      },
      {
        title: "4-modul: Bulut infratuzilmasi",
        duration: "3 hafta",
        lessons: [{ title: "AWS asosiy xizmatlari", duration: "34 daq" }],
      },
    ],
    reviewsList: [],
  },
  {
    id: "raqamli-marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=60",
    category: "Marketing",
    level: "Boshlang'ich",
    rating: "4.6",
    reviews: "203",
    title: "Raqamli marketing",
    desc: "SMM, kontent marketing, Google Ads, SEO va analitika asoslari.",
    longDesc:
      "Raqamli marketing kursida ijtimoiy tarmoqlarda targetli reklama, kontent strategiyasi, qidiruv tizimlarini optimallashtirish (SEO) va Google Ads orqali samarali reklama kampaniyalarini qurishni o'rganasiz.",
    teacher: "Dilorom Nazarova",
    teacherPhoto: "https://i.pravatar.cc/150?img=31",
    price: "690 000 so'm",
    duration: "8 hafta",
    students: "203",
    language: "O'zbek tili",
    updatedAt: "2026-yil iyun",
    whatYouWillLearn: [
      "SMM strategiyasi va kontent rejalashtirish",
      "Google Ads kampaniyalari",
      "SEO asoslari",
      "Analitika: Google Analytics",
    ],
    requirements: ["Maxsus bilim talab qilinmaydi"],
    curriculum: [
      {
        title: "1-modul: SMM asoslari",
        duration: "2 hafta",
        lessons: [
          {
            title: "Ijtimoiy tarmoqlar strategiyasi",
            duration: "20 daq",
            preview: true,
          },
        ],
      },
      {
        title: "2-modul: Google Ads",
        duration: "3 hafta",
        lessons: [{ title: "Kampaniya yaratish", duration: "28 daq" }],
      },
      {
        title: "3-modul: SEO",
        duration: "2 hafta",
        lessons: [{ title: "On-page va off-page SEO", duration: "26 daq" }],
      },
      {
        title: "4-modul: Analitika",
        duration: "1 hafta",
        lessons: [
          { title: "Google Analytics bilan ishlash", duration: "24 daq" },
        ],
      },
    ],
    reviewsList: [],
  },
];

export const getCourseById = (id: string): Course | undefined =>
  courses.find((course) => course.id === id);

export const getRelatedCourses = (course: Course, limit = 4): Course[] =>
  courses
    .filter((c) => c.id !== course.id && c.category === course.category)
    .slice(0, limit)
    .concat(
      courses.filter(
        (c) => c.id !== course.id && c.category !== course.category,
      ),
    )
    .slice(0, limit);
