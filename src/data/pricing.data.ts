import type { ComparisonRow, PricingPlan } from "../types/pricing.type";

export const pricingPlans: PricingPlan[] = [
  {
    name: "Boshlang'ich",
    price: "490 000",
    period: "oy",
    desc: "Bitta yo'nalishni chuqur o'rganmoqchi bo'lganlar uchun.",
    features: [
      "1 ta kursga to'liq kirish",
      "Video darslar va materiallar",
      "Guruh chatiga a'zolik",
      "Kurs oxirida sertifikat",
      "Email orqali qo'llab-quvvatlash",
    ],
  },
  {
    name: "Standart",
    price: "890 000",
    period: "oy",
    desc: "Bir nechta yo'nalishni birga o'rganmoqchi bo'lganlar uchun.",
    popular: true,
    features: [
      "3 tagacha kursga kirish",
      "Video darslar va materiallar",
      "Amaliy loyihalar va fikr-mulohaza",
      "Guruh va shaxsiy mentor chatlari",
      "Kurs oxirida sertifikat",
      "Ish bilan ta'minlashda yordam",
      "Ustuvor qo'llab-quvvatlash",
    ],
  },
  {
    name: "Premium",
    price: "1 500 000",
    period: "oy",
    desc: "Tezkor karyera o'zgarishini xohlaydiganlar uchun to'liq paket.",
    features: [
      "Barcha kurslarga cheksiz kirish",
      "Shaxsiy mentor bilan haftalik uchrashuv",
      "CV va portfolio tayyorlashda yordam",
      "Intervyuga tayyorgarlik mashg'ulotlari",
      "100+ hamkor kompaniyaga tavsiyanoma",
      "Umrbod materiallardan foydalanish",
      "24/7 qo'llab-quvvatlash",
    ],
  },
];

export const comparisonRows: ComparisonRow[] = [
  {
    feature: "Kurslar soni",
    starter: "1 ta",
    standard: "3 tagacha",
    premium: "Cheksiz",
  },
  { feature: "Video darslar", starter: true, standard: true, premium: true },
  {
    feature: "Amaliy loyihalar",
    starter: false,
    standard: true,
    premium: true,
  },
  { feature: "Shaxsiy mentor", starter: false, standard: false, premium: true },
  { feature: "Sertifikat", starter: true, standard: true, premium: true },
  {
    feature: "Ish bilan ta'minlash",
    starter: false,
    standard: true,
    premium: true,
  },
  {
    feature: "CV/Portfolio yordami",
    starter: false,
    standard: false,
    premium: true,
  },
  {
    feature: "Qo'llab-quvvatlash",
    starter: "Email",
    standard: "Chat",
    premium: "24/7",
  },
];

export const paymentMethods: string[] = [
  "Payme",
  "Click",
  "Uzum Bank",
  "Bank o'tkazmasi",
  "Naqd pul",
];
