import type { Milestone, TeamMember, ValueItem } from "../types/about.type";

export const milestones: Milestone[] = [
  {
    year: "2015",
    title: "Tashkil topdik",
    desc: "Toshkentda kichik bir sinf xonasida ilk dasturlash kursimizni boshladik.",
  },
  {
    year: "2017",
    title: "Yangi yo'nalishlar",
    desc: "Dizayn va mobil dasturlash yo'nalishlari qo'shildi, talabalar soni 500 dan oshdi.",
  },
  {
    year: "2019",
    title: "Onlayn platforma",
    desc: "O'z onlayn ta'lim platformamizni ishga tushirdik va butun O'zbekiston bo'ylab talabalarni qabul qila boshladik.",
  },
  {
    year: "2022",
    title: "Hamkorlik dasturi",
    desc: "100 dan ortiq IT kompaniya bilan hamkorlik o'rnatib, bitiruvchilarni ishga joylashtirish dasturini yo'lga qo'ydik.",
  },
  {
    year: "2026",
    title: "5000+ bitiruvchi",
    desc: "Bugungi kunda 5000 dan ortiq bitiruvchimiz mahalliy va xalqaro kompaniyalarda faoliyat yuritmoqda.",
  },
];

export const values: ValueItem[] = [
  {
    icon: "award",
    title: "Sifat",
    desc: "Har bir kurs dasturi sanoat mutaxassislari bilan birgalikda ishlab chiqiladi.",
  },
  {
    icon: "users",
    title: "Hamjamiyat",
    desc: "Talabalarimiz nafaqat bilim, balki qo'llab-quvvatlovchi hamjamiyat ham topishadi.",
  },
  {
    icon: "trendingUp",
    title: "Natija",
    desc: "Bizning maqsadimiz — sizni real ish o'rniga tayyorlash, shunchaki sertifikat berish emas.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    photo: "https://i.pravatar.cc/200?img=68",
    name: "Jahongir Yusupov",
    role: "Asoschi va CEO",
  },
  {
    photo: "https://i.pravatar.cc/200?img=32",
    name: "Feruza Qodirova",
    role: "Ta'lim direktori",
  },
  {
    photo: "https://i.pravatar.cc/200?img=59",
    name: "Akmal Karimov",
    role: "Bosh dasturlash o'qituvchisi",
  },
  {
    photo: "https://i.pravatar.cc/200?img=44",
    name: "Zilola Ahmedova",
    role: "Karyera bo'yicha maslahatchi",
  },
];
