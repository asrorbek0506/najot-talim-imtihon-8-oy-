import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import AdminTopbar from "../admin/AdminTopbar";
import { adminNav } from "../../data/admin.data";

const getTitle = (pathname: string) => {
  const exact = adminNav.find((item) => item.path === pathname);
  if (exact) return exact.label;

  if (pathname.startsWith("/admin/students/new"))
    return "Yangi talaba qo'shish";
  if (pathname.startsWith("/admin/students/")) return "Talaba profili";
  if (pathname.startsWith("/admin/groups/new")) return "Yangi guruh yaratish";
  if (pathname.startsWith("/admin/groups/")) return "Guruh tafsilotlari";

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
