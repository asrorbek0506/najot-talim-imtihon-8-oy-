import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import AdminTopbar from "../admin/AdminTopbar";
import { adminNav } from "../../data/admin-nav.data";

const getTitle = (pathname: string) => {
  for (const group of adminNav) {
    const exact = group.items.find((item) => item.path === pathname);
    if (exact) return exact.label;
  }

  if (pathname.startsWith("/admin/courses/new")) return "Yangi kurs yaratish";
  if (pathname.startsWith("/admin/courses/")) return "Kursni tahrirlash";
  if (pathname.startsWith("/admin/students/new"))
    return "Yangi talaba qo'shish";
  if (pathname.startsWith("/admin/students/")) return "Talaba profili";
  if (pathname.startsWith("/admin/instructors/new"))
    return "Yangi o'qituvchi qo'shish";
  if (pathname.startsWith("/admin/instructors/")) return "O'qituvchi profili";
  if (pathname.startsWith("/admin/payments/")) return "To'lov tafsiloti";
  if (pathname.startsWith("/admin/blog/comments"))
    return "Izohlar moderatsiyasi";
  if (pathname.startsWith("/admin/blog/new")) return "Yangi maqola";
  if (pathname.startsWith("/admin/blog/")) return "Maqolani tahrirlash";

  return "Admin panel";
};

const AdminLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar title={getTitle(pathname)} />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
