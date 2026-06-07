import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const accountLinks = [
  { title: "داشبورد", path: "/account" },
  { title: "پروفایل", path: "/account/profile" },
  { title: "سفارش‌ها", path: "/account/orders" },
  { title: "آدرس‌ها", path: "/account/addresses" },
  { title: "علاقه‌مندی‌ها", path: "/account/wishlist" },
];

function AccountLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-6 sm:mb-8">
        <p className="text-sm font-bold text-neutral-500">My Account</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl md:text-5xl">
          پنل کاربری
        </h1>
        <p className="mt-4 text-sm leading-7 text-neutral-400 sm:text-base">
          خوش اومدی، {user?.name || "کاربر"}.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
        <aside className="h-fit rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 lg:sticky lg:top-28">
          <div className="rounded-2xl bg-white/[0.04] p-4">
            <p className="text-sm font-bold text-white">{user?.name}</p>
            <p className="mt-1 break-all text-sm text-neutral-500">
              {user?.email}
            </p>
          </div>

          <nav className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:block lg:space-y-2 lg:overflow-visible lg:px-0 lg:pb-0">
            {accountLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/account"}
                className={({ isActive }) =>
                  `shrink-0 rounded-2xl px-4 py-3 text-sm font-bold transition lg:block ${
                    isActive
                      ? "bg-white text-neutral-950"
                      : "text-neutral-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 w-full rounded-2xl border border-red-400/20 px-4 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/10"
          >
            خروج از حساب
          </button>
        </aside>

        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default AccountLayout;
