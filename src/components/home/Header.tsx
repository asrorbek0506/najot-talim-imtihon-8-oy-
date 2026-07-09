import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../../data/home.data";
import useUserStore from "../../store/user.store";
import { Icon } from "../ui/Icon";
import ProfileDropdown from "../ui/ProfileDropdown";

const Header = () => {
  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isAuthenticated);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-x-2.5"
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Icon.graduationCap />
          </span>
          <span className="text-base font-semibold">O'quv Markaz</span>
        </Link>

        <nav className="hidden items-center gap-x-1 lg:flex">
          {navLinks.map((link) =>
            link.path === "#" ? (
              <a
                key={link.label}
                href="#"
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-x-3 sm:gap-x-4">
          <button className="hidden items-center gap-x-1.5 text-sm font-medium text-gray-600 sm:flex">
            <span className="text-base">🌐</span> O'zbek
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="hidden items-center gap-x-4 lg:flex">
            {isLoggedIn ? (
              <ProfileDropdown
                name={user ? `${user.firstName} ${user.lastName}` : undefined}
                email={user?.email}
              />
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Kirish
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Ro'yxatdan o'tish
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((open) => !open)}
            className="flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-50 lg:hidden"
            aria-label={mobileOpen ? "Menyuni yopish" : "Menyuni ochish"}
          >
            {mobileOpen ? <Icon.x /> : <Icon.menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-y-1">
            {navLinks.map((link) =>
              link.path === "#" ? (
                <a
                  key={link.label}
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3.5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3.5 py-2.5 text-sm font-medium ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="mt-4 border-t border-gray-100 pt-4">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-x-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <img
                  src={user?.avatarUrl || "https://i.pravatar.cc/40"}
                  alt={user?.firstName}
                  className="h-8 w-8 rounded-full object-cover"
                />
                {user ? `${user.firstName} ${user.lastName}` : "Profil"}
              </Link>
            ) : (
              <div className="flex flex-col gap-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-gray-200 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Kirish
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-blue-600 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  Ro'yxatdan o'tish
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
