import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashboardTopbar from "../dashboard/DashboardTopbar";
import useGetUser from "../../hooks/api/useGetUser";
import useUserStore from "../../store/user.store";
import { Suspense, useEffect, useState } from "react";

const DashboardLayout = () => {
  const { data } = useGetUser();
  const store = useUserStore();
  const userData = data?.data.data;
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    store.setUser(userData);
  }, [userData]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Suspense
              fallback={
                <div className="animate-pulse text-sm text-gray-400">
                  Yuklanmoqda...
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
