import { NavLink } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { dashboardNav } from "../../data/dashboard.data";
import useUserStore from "../../store/user.store";
import useLogout from "../../hooks/api/useLogout";

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const DashboardSidebar = ({
  isOpen = false,
  onClose,
}: DashboardSidebarProps) => {
  const user = useUserStore((state) => state.user);
  const { logout } = useLogout();

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 -translate-x-full flex-col border-r border-gray-100 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : ""
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-x-2.5 border-b border-gray-100 px-6">
          <div className="flex items-center gap-x-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <Icon.graduationCap />
            </span>
            <span className="text-base font-semibold">O'quv Markaz</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 lg:hidden"
            aria-label="Menyuni yopish"
          >
            <Icon.x />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
          {dashboardNav.map((group) => (
            <div key={group.title}>
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const IconComponent = Icon[item.icon];
                  return item.path === "#" ? (
                    <a
                      key={item.label}
                      href="#"
                      onClick={onClose}
                      className="flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    >
                      <IconComponent />
                      {item.label}
                    </a>
                  ) : (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      end
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      <IconComponent />
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-x-3 border-t border-gray-100 px-4 py-4">
          <img
            src={user?.avatarUrl || "https://i.pravatar.cc/80?img=11"}
            alt={user ? `${user.firstName} ${user.lastName}` : "Talaba"}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user ? `${user.firstName} ${user.lastName}` : "Talaba"}
            </p>
            <p className="text-xs text-gray-400">Online talaba</p>
          </div>
          <button
            onClick={() => logout()}
            className="text-gray-400 transition-colors hover:text-gray-700"
            aria-label="Chiqish"
          >
            <Icon.logout />
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
