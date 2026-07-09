import { Icon } from "../ui/Icon";
import useUserStore from "../../store/user.store";

interface AdminTopbarProps {
  title: string;
  onMenuClick?: () => void;
}

const AdminTopbar = ({ title, onMenuClick }: AdminTopbarProps) => {
  const user = useUserStore((state) => state.user);
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-x-4 border-b border-gray-100 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button
        onClick={onMenuClick}
        className="flex items-center gap-x-2.5 text-gray-600 lg:hidden"
        aria-label="Menyu"
      >
        <Icon.menu />
      </button>

      <h1 className="text-base font-semibold text-gray-900">{title}</h1>

      <div className="mx-auto hidden w-full max-w-md items-center gap-x-2.5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-400 md:flex">
        <Icon.search />
        <input
          type="text"
          placeholder="Talaba, guruh yoki o'qituvchi qidirish..."
          className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-x-3 border-l border-gray-100 pl-4">
        <img
          src={user?.avatarUrl || "https://i.pravatar.cc/80?img=68"}
          alt={user ? `${user.firstName} ${user.lastName}` : "Administrator"}
          className="h-9 w-9 rounded-full object-cover"
        />
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-gray-900">
            {user ? `${user.firstName} ${user.lastName}` : "Administrator"}
          </p>
          <p className="text-xs text-gray-400">Administrator</p>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
