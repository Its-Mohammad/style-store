import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getStoredOrders } from "../utils/ordersStorage";

function AccountDashboard() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const orderCount = getStoredOrders().length;

  return (
    <div className="space-y-6">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-2xl font-bold">خلاصه حساب</h2>

        <p className="mt-3 text-neutral-400">
          از این بخش می‌تونی سفارش‌ها، اطلاعات حساب، آدرس‌ها و علاقه‌مندی‌هات
          رو مدیریت کنی.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm text-neutral-500">سفارش‌ها</p>
          <p className="mt-2 text-3xl font-bold">{orderCount}</p>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm text-neutral-500">سبد خرید</p>
          <p className="mt-2 text-3xl font-bold">{cartCount}</p>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm text-neutral-500">علاقه‌مندی‌ها</p>
          <p className="mt-2 text-3xl font-bold">{wishlistCount}</p>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
        <h3 className="text-xl font-bold">دسترسی سریع</h3>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/account/profile"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-neutral-950"
          >
            ویرایش پروفایل
          </Link>

          <Link
            to="/account/orders"
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
          >
            مشاهده سفارش‌ها
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccountDashboard;
