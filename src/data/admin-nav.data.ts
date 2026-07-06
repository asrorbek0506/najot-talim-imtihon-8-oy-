import type { AdminNavGroup } from "../types/admin.type";

export const adminNav: AdminNavGroup[] = [
  {
    title: "Umumiy",
    items: [{ label: "Dashboard", icon: "home", path: "/admin" }],
  },
  {
    title: "Ta'lim boshqaruvi",
    items: [
      { label: "Kurslar", icon: "book", path: "/admin/courses" },
      { label: "Talabalar", icon: "users", path: "/admin/students" },
      {
        label: "O'qituvchilar",
        icon: "graduationCap",
        path: "/admin/instructors",
      },
      { label: "Yozilishlar", icon: "checkSquare", path: "/admin/enrollments" },
      { label: "Sertifikatlar", icon: "award", path: "/admin/certificates" },
    ],
  },
  {
    title: "Moliya",
    items: [
      { label: "To'lovlar", icon: "creditCard", path: "/admin/payments" },
    ],
  },
  {
    title: "Kontent",
    items: [
      { label: "Sharhlar", icon: "star", path: "/admin/reviews" },
      { label: "Blog", icon: "layers", path: "/admin/blog" },
      { label: "Murojaatlar", icon: "mail", path: "/admin/contact" },
    ],
  },
];
