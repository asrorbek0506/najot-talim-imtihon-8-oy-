import type {
  ActiveCourse,
  Certificate,
  ContinueLearning,
  CourseResult,
  DashboardNavGroup,
  DashboardStat,
  MyCourse,
  PaymentRecord,
  RecommendedCourse,
  WeekDay,
} from "../types/dashboard.type";

export const dashboardNav: DashboardNavGroup[] = [
  {
    title: "Online ta'lim",
    items: [
      { label: "Dashboard", icon: "home", path: "/dashboard" },
      { label: "Mening kurslarim", icon: "book", path: "/dashboard/courses" },
      { label: "Progress", icon: "barChart", path: "/dashboard/results" },
      {
        label: "Sertifikatlarim",
        icon: "award",
        path: "/dashboard/certificates",
      },
    ],
  },
  {
    title: "Hisob",
    items: [
      { label: "Profil", icon: "user", path: "/dashboard/profile" },
      {
        label: "Xarid tarixi",
        icon: "creditCard",
        path: "/dashboard/payments",
      },
      {
        label: "Faol sessiyalar",
        icon: "settings",
        path: "/dashboard/settings",
      },
    ],
  },
];

export const continueLearning: ContinueLearning = {
  courseId: "react-js-asoslari",
  image:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=60",
  title: "React.js — zamonaviy frontend",
  module: "Modul 4 · 12-dars: useState va useEffect hooklari",
  completedLessons: 14,
  totalLessons: 32,
  progress: 62,
};

export const dashboardStats: DashboardStat[] = [
  {
    value: "3",
    label: "Faol online kurslar",
    icon: "book",
    color: "bg-blue-50 text-blue-600",
  },
  {
    value: "47",
    label: "O'rganilgan soat",
    icon: "clock",
    color: "bg-orange-50 text-orange-500",
    trend: "+4s",
  },
  {
    value: "2",
    label: "Tugallangan",
    icon: "checkSquare",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    value: "2",
    label: "Sertifikatlar",
    icon: "award",
    color: "bg-purple-50 text-purple-600",
  },
];

export const activeCourses: ActiveCourse[] = [
  {
    courseId: "react-js-asoslari",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=60",
    category: "Frontend",
    categoryColor: "text-blue-600",
    title: "React.js — zamonaviy frontend",
    teacher: "Akmal Karimov",
    teacherPhoto: "https://i.pravatar.cc/40?img=12",
    completedLessons: 14,
    totalLessons: 32,
    progress: 62,
    progressColor: "bg-blue-600",
  },
  {
    courseId: "python-dasturchilik",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=600&q=60",
    category: "Dasturlash",
    categoryColor: "text-orange-500",
    title: "Python asoslari",
    teacher: "Dilnoza Yusupova",
    teacherPhoto: "https://i.pravatar.cc/40?img=45",
    completedLessons: 8,
    totalLessons: 24,
    progress: 33,
    progressColor: "bg-orange-400",
  },
  {
    courseId: "ux-ui-dizayn",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=60",
    category: "Dizayn",
    categoryColor: "text-purple-600",
    title: "UX/UI dizayn asoslari",
    teacher: "Sardor Aliyev",
    teacherPhoto: "https://i.pravatar.cc/40?img=33",
    completedLessons: 19,
    totalLessons: 20,
    progress: 95,
    progressColor: "bg-emerald-500",
  },
  {
    courseId: "raqamli-marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=60",
    category: "Marketing",
    categoryColor: "text-rose-500",
    title: "SMM va raqamli marketing",
    teacher: "Madina Rashidova",
    teacherPhoto: "https://i.pravatar.cc/40?img=47",
    completedLessons: 3,
    totalLessons: 18,
    progress: 17,
    progressColor: "bg-orange-400",
  },
];

export const weekDays: WeekDay[] = [
  { label: "Du", status: "done" },
  { label: "Se", status: "done" },
  { label: "Cho", status: "done" },
  { label: "Pa", status: "done" },
  { label: "Ju", status: "today", value: "5" },
  { label: "Sh", status: "upcoming" },
  { label: "Ya", status: "upcoming" },
];

export const recommendedCourses: RecommendedCourse[] = [
  {
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=60",
    category: "Frontend",
    categoryColor: "text-blue-600",
    title: "TypeScript chuqur",
    lessons: 32,
    hours: 18,
  },
  {
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=60",
    category: "Backend",
    categoryColor: "text-emerald-600",
    title: "Node.js va Express",
    lessons: 40,
    hours: 24,
  },
  {
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=60",
    category: "Dizayn",
    categoryColor: "text-purple-600",
    title: "Figma bilan prototiplash",
    lessons: 26,
    hours: 14,
  },
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=60",
    category: "Data",
    categoryColor: "text-cyan-600",
    title: "SQL va ma'lumotlar bazasi",
    lessons: 22,
    hours: 12,
  },
];

export const myCourses: MyCourse[] = [
  {
    id: "mc-1",
    courseId: "react-js-asoslari",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=60",
    category: "Frontend",
    categoryColor: "text-blue-600",
    title: "React.js — zamonaviy frontend",
    teacher: "Akmal Karimov",
    teacherPhoto: "https://i.pravatar.cc/40?img=12",
    completedLessons: 14,
    totalLessons: 32,
    progress: 62,
    progressColor: "bg-blue-600",
    status: "active",
    lastActivity: "Bugun, 09:40",
  },
  {
    id: "mc-2",
    courseId: "python-dasturchilik",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=600&q=60",
    category: "Dasturlash",
    categoryColor: "text-orange-500",
    title: "Python asoslari",
    teacher: "Sherzod Rahimov",
    teacherPhoto: "https://i.pravatar.cc/40?img=33",
    completedLessons: 8,
    totalLessons: 24,
    progress: 33,
    progressColor: "bg-orange-400",
    status: "active",
    lastActivity: "Kecha, 18:20",
  },
  {
    id: "mc-3",
    courseId: "ux-ui-dizayn",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=60",
    category: "Dizayn",
    categoryColor: "text-purple-600",
    title: "UX/UI dizayn asoslari",
    teacher: "Madina Ergasheva",
    teacherPhoto: "https://i.pravatar.cc/40?img=45",
    completedLessons: 19,
    totalLessons: 20,
    progress: 95,
    progressColor: "bg-emerald-500",
    status: "active",
    lastActivity: "3 kun oldin",
  },
  {
    id: "mc-4",
    courseId: "raqamli-marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=60",
    category: "Marketing",
    categoryColor: "text-rose-500",
    title: "SMM va raqamli marketing",
    teacher: "Dilorom Nazarova",
    teacherPhoto: "https://i.pravatar.cc/40?img=31",
    completedLessons: 3,
    totalLessons: 18,
    progress: 17,
    progressColor: "bg-orange-400",
    status: "active",
    lastActivity: "1 hafta oldin",
  },
  {
    id: "mc-5",
    courseId: "javascript-dasturlash",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=60",
    category: "Frontend",
    categoryColor: "text-blue-600",
    title: "JavaScript dasturlash",
    teacher: "Akmal Karimov",
    teacherPhoto: "https://i.pravatar.cc/40?img=12",
    completedLessons: 24,
    totalLessons: 24,
    progress: 100,
    progressColor: "bg-emerald-500",
    status: "completed",
    lastActivity: "2026-yil fevral",
  },
  {
    id: "mc-6",
    courseId: "flutter-mobil-ilovalar",
    image:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=600&q=60",
    category: "Mobil",
    categoryColor: "text-cyan-600",
    title: "Flutter mobil ilovalar",
    teacher: "Otabek Salimov",
    teacherPhoto: "https://i.pravatar.cc/40?img=14",
    completedLessons: 18,
    totalLessons: 18,
    progress: 100,
    progressColor: "bg-emerald-500",
    status: "completed",
    lastActivity: "2026-yil yanvar",
  },
];

export const courseResults: CourseResult[] = [
  {
    id: "res-1",
    course: "React.js — zamonaviy frontend",
    teacher: "Akmal Karimov",
    testsCompleted: 9,
    totalTests: 14,
    averageScore: 84,
    lastTestDate: "2026-yil 28-iyun",
  },
  {
    id: "res-2",
    course: "Python asoslari",
    teacher: "Sherzod Rahimov",
    testsCompleted: 5,
    totalTests: 12,
    averageScore: 71,
    lastTestDate: "2026-yil 25-iyun",
  },
  {
    id: "res-3",
    course: "UX/UI dizayn asoslari",
    teacher: "Madina Ergasheva",
    testsCompleted: 10,
    totalTests: 10,
    averageScore: 92,
    lastTestDate: "2026-yil 20-iyun",
  },
  {
    id: "res-4",
    course: "SMM va raqamli marketing",
    teacher: "Dilorom Nazarova",
    testsCompleted: 2,
    totalTests: 8,
    averageScore: 65,
    lastTestDate: "2026-yil 12-iyun",
  },
  {
    id: "res-5",
    course: "JavaScript dasturlash",
    teacher: "Akmal Karimov",
    testsCompleted: 12,
    totalTests: 12,
    averageScore: 88,
    lastTestDate: "2026-yil 10-fevral",
  },
];

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    courseTitle: "JavaScript dasturlash",
    teacher: "Akmal Karimov",
    issuedAt: "2026-yil 12-fevral",
    certificateId: "OQM-JS-20260212-0142",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: "cert-2",
    courseTitle: "Flutter mobil ilovalar",
    teacher: "Otabek Salimov",
    issuedAt: "2026-yil 18-yanvar",
    certificateId: "OQM-FL-20260118-0098",
    image:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=600&q=60",
  },
];

export const paymentHistory: PaymentRecord[] = [
  {
    id: "pay-1",
    date: "2026-yil 01-iyun",
    course: "React.js — zamonaviy frontend",
    amount: "790 000 so'm",
    method: "Payme",
    status: "paid",
  },
  {
    id: "pay-2",
    date: "2026-yil 15-may",
    course: "Python asoslari",
    amount: "790 000 so'm",
    method: "Click",
    status: "paid",
  },
  {
    id: "pay-3",
    date: "2026-yil 01-may",
    course: "UX/UI dizayn asoslari",
    amount: "890 000 so'm",
    method: "Bank o'tkazmasi",
    status: "paid",
  },
  {
    id: "pay-4",
    date: "2026-yil 05-iyul",
    course: "SMM va raqamli marketing",
    amount: "690 000 so'm",
    method: "Payme",
    status: "pending",
  },
];
