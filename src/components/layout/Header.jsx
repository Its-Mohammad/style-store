import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { categories } from "../../data/categories";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import SearchDialog from "../common/SearchDialog";

const mainNavExtraLinks = [
  { label: "جدیدترین‌ها", to: "/new" },
  { label: "تماس با ما", to: "/contact" },
  { label: "درباره ما", to: "/about" },
];

function Header() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, user } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
    setOpenMobileCategory(null);
  }

  function openSearch() {
    closeMobileMenu();
    setIsSearchOpen(true);
  }

  function toggleMobileCategory(categoryId) {
    setOpenMobileCategory((currentCategory) =>
      currentCategory === categoryId ? null : categoryId,
    );
  }

  const sharedProps = {
    cartCount,
    wishlistCount,
    isAuthenticated,
    user,
    openSearch,
    closeMobileMenu,
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/90 backdrop-blur-xl">
        <ClassicHeader {...sharedProps} />

        <MobileHeader
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          isAuthenticated={isAuthenticated}
          isMobileMenuOpen={isMobileMenuOpen}
          openMobileCategory={openMobileCategory}
          openSearch={openSearch}
          closeMobileMenu={closeMobileMenu}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          toggleMobileCategory={toggleMobileCategory}
        />
      </header>

      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

function ClassicHeader(props) {
  return (
    <div className="mx-auto hidden h-20 max-w-7xl grid-cols-[190px_minmax(0,1fr)_260px] items-center px-6 lg:grid xl:grid-cols-[230px_minmax(0,1fr)_280px]">
      <Brand className="col-start-1 row-start-1 justify-self-start" />
      <MainNav className="col-start-2 row-start-1 max-w-full justify-self-center rounded-full border border-white/10 bg-white/[0.03] p-1" />
      <div className="col-start-3 row-start-1 justify-self-end">
        <HeaderActions {...props} compactSearch />
      </div>
    </div>
  );
}

function Brand({ className = "" }) {
  return (
    <Link to="/" dir="ltr" className={`text-2xl font-bold tracking-tight ${className}`}>
      MODE<span className="text-neutral-500">.</span>
    </Link>
  );
}

function MainNav({ className = "", itemClassName = "rounded-full" }) {
  return (
    <nav className={className}>
      <div className="flex items-center gap-1 whitespace-nowrap">
        {categories.map((category) => (
          <div key={category.id} className="group relative">
            <NavLink
              to={category.path}
              className={({ isActive }) =>
                `block ${itemClassName} px-3 py-2.5 text-xs font-bold transition 2xl:px-5 2xl:text-sm ${
                  isActive
                    ? "bg-white text-neutral-950"
                    : "text-neutral-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {category.title}
            </NavLink>

            <div className="invisible absolute right-1/2 top-full z-50 w-64 translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
              <div className="rounded-3xl border border-white/10 bg-neutral-900 p-3 shadow-2xl">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    to={`${category.path}/${subcategory.slug}`}
                    className="block rounded-2xl px-4 py-3 text-right text-sm text-neutral-300 transition hover:bg-white/10 hover:text-white"
                  >
                    {subcategory.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}

        {mainNavExtraLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block ${itemClassName} px-3 py-2.5 text-xs font-bold transition 2xl:px-5 2xl:text-sm ${
                isActive
                  ? "bg-white text-neutral-950"
                  : "text-neutral-400 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}

        <NavLink
          to="/sale"
          className={({ isActive }) =>
            `block ${itemClassName} px-3 py-2.5 text-xs font-bold transition 2xl:px-5 2xl:text-sm ${
              isActive
                ? "bg-red-500 text-white"
                : "text-red-300 hover:bg-red-500/10"
            }`
          }
        >
          تخفیف‌ها
        </NavLink>
      </div>
    </nav>
  );
}

function HeaderActions({
  cartCount,
  wishlistCount,
  isAuthenticated,
  user,
  openSearch,
  compactSearch = false,
  hideSearch = false,
}) {
  const iconButtonClass =
    "relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-neutral-300 transition hover:border-white/30 hover:bg-white/10 hover:text-white";

  return (
    <div className="flex items-center gap-2">
      {!hideSearch && (
        <button
          type="button"
          onClick={openSearch}
          aria-label="جستجو"
          title="جستجو"
          className={`flex h-11 items-center justify-center rounded-full border border-white/10 text-sm font-bold text-neutral-400 transition hover:border-white/30 hover:bg-white/10 hover:text-white ${
            compactSearch ? "w-11 xl:w-32 xl:justify-between xl:px-4" : "w-11"
          }`}
        >
          <Search size={18} />
          {compactSearch && <span className="hidden xl:inline">جستجو</span>}
        </button>
      )}

      <Link
        to="/wishlist"
        aria-label="علاقه‌مندی‌ها"
        title="علاقه‌مندی‌ها"
        className={iconButtonClass}
      >
        <Heart size={19} />
        {wishlistCount > 0 && (
          <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-neutral-950">
            {wishlistCount}
          </span>
        )}
      </Link>

      <Link
        to="/cart"
        aria-label="سبد خرید"
        title="سبد خرید"
        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-950 transition hover:bg-neutral-200"
      >
        <ShoppingBag size={19} />
        {cartCount > 0 && (
          <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {cartCount}
          </span>
        )}
      </Link>

      <Link
        to={isAuthenticated ? "/account" : "/login"}
        aria-label={isAuthenticated ? "پنل کاربری" : "ورود"}
        title={isAuthenticated ? user?.name : "ورود"}
        className={iconButtonClass}
      >
        <User size={19} />
      </Link>
    </div>
  );
}

function MobileHeader({
  cartCount,
  wishlistCount,
  isAuthenticated,
  isMobileMenuOpen,
  openMobileCategory,
  openSearch,
  closeMobileMenu,
  setIsMobileMenuOpen,
  toggleMobileCategory,
}) {
  return (
    <>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Brand />

          <button
            type="button"
            aria-label="باز کردن منو"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-neutral-300"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="جستجو"
            onClick={openSearch}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-neutral-300"
          >
            <Search size={18} />
          </button>

          <Link
            to="/cart"
            aria-label="سبد خرید"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-950"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-white/10 bg-neutral-950 lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="mb-4 grid grid-cols-2 gap-2">
              <Link
                to="/wishlist"
                onClick={closeMobileMenu}
                className="relative flex h-11 items-center justify-center rounded-2xl border border-white/10 text-neutral-300"
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-neutral-950">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to={isAuthenticated ? "/account" : "/login"}
                onClick={closeMobileMenu}
                className="flex h-11 items-center justify-center rounded-2xl border border-white/10 text-neutral-300"
              >
                <User size={18} />
              </Link>
            </div>

            <nav className="space-y-2">
              {categories.map((category) => {
                const isOpen = openMobileCategory === category.id;

                return (
                  <div
                    key={category.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                  >
                    <button
                      type="button"
                      onClick={() => toggleMobileCategory(category.id)}
                      className="flex w-full items-center justify-between px-4 py-4 text-right text-sm font-bold text-white"
                    >
                      <ChevronDown
                        size={18}
                        className={`transition ${isOpen ? "rotate-180" : ""}`}
                      />
                      <span>{category.title}</span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-white/10 p-2">
                        <Link
                          to={category.path}
                          onClick={closeMobileMenu}
                          className="block rounded-xl px-4 py-3 text-right text-sm font-bold text-neutral-300 transition hover:bg-white/10 hover:text-white"
                        >
                          همه محصولات {category.title}
                        </Link>

                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.id}
                            to={`${category.path}/${subcategory.slug}`}
                            onClick={closeMobileMenu}
                            className="block rounded-xl px-4 py-3 text-right text-sm text-neutral-400 transition hover:bg-white/10 hover:text-white"
                          >
                            {subcategory.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {mainNavExtraLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-right text-sm font-bold text-neutral-300"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/sale"
                onClick={closeMobileMenu}
                className="block rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-4 text-right text-sm font-bold text-red-300"
              >
                تخفیف‌ها
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
