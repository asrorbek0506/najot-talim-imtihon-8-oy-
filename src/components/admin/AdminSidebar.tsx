import { NavLink } from "react-router-dom";
import { Icon } from "../ui/Icon";
import { adminNav } from "../../data/admin-nav.data";
import useUserStore from "../../store/user.store";
import useLogout from "../../hooks/api/useLogout";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AdminSidebar = ({ isOpen = false, onClose }: AdminSidebarProps) => {
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
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 -translate-x-full flex-col border-r border-slate-800 bg-slate-900 text-slate-300 transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : ""
        }`}
      >
        <div className="flex h-16 items-center justify-between gap-x-2.5 border-b border-slate-800 px-6">
          <div className="flex items-center gap-x-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Icon.graduationCap />
            </span>
            <div>
              <span className="block text-sm font-semibold text-white">
                O'quv Markaz
              </span>
              <span className="block text-xs text-slate-500">Admin panel</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white lg:hidden"
            aria-label="Menyuni yopish"
          >
            <Icon.x />
          </button>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-6">
          {adminNav.map((group) => (
            <div key={group.title}>
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-slate-600">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const IconComponent = Icon[item.icon];
                  return (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      end={item.path === "/admin"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
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

        <div className="flex items-center gap-x-3 border-t border-slate-800 px-4 py-4">
          <img
            src={user?.avatarUrl || "https://i.pravatar.cc/80?img=68"}
            alt={user ? `${user.firstName} ${user.lastName}` : "Administrator"}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-semibold text-white">
              {user ? `${user.firstName} ${user.lastName}` : "Administrator"}
            </p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
          <button
            onClick={() => logout()}
            className="text-slate-500 transition-colors hover:text-white"
            aria-label="Chiqish"
          >
            <Icon.logout />
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
