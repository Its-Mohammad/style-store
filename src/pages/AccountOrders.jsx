import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import { getStoredOrders } from "../utils/ordersStorage";

function AccountOrders() {
  const [orders] = useState(getStoredOrders);

  const orderCount = useMemo(() => orders.length, [orders]);

  if (orderCount === 0) {
    return (
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 text-center">
        <p className="text-sm font-bold text-neutral-500">Orders</p>
        <h2 className="mt-2 text-2xl font-bold">هنوز سفارشی ثبت نشده</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-neutral-400">
          بعد از ثبت سفارش، جزئیات خریدت اینجا نمایش داده می‌شود.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-bold text-neutral-950"
        >
          شروع خرید
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold text-neutral-500">Orders</p>
          <h2 className="mt-2 text-2xl font-bold">سفارش‌های من</h2>
        </div>
        <span className="text-sm text-neutral-500">{orderCount} سفارش</span>
      </div>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <p className="text-sm text-neutral-500">شماره سفارش</p>
                <p className="mt-1 font-bold">{order.id}</p>
              </div>

              <div>
                <p className="text-sm text-neutral-500">تاریخ</p>
                <p className="mt-1 font-bold">{order.date}</p>
              </div>

              <div>
                <p className="text-sm text-neutral-500">وضعیت</p>
                <p className="mt-1 font-bold text-green-400">{order.status}</p>
              </div>

              <div>
                <p className="text-sm text-neutral-500">مبلغ</p>
                <p className="mt-1 font-bold">{formatPrice(order.total)}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
              <div className="flex -space-x-3 space-x-reverse">
                {order.items.slice(0, 4).map((item) => (
                  <img
                    key={item.cartItemId}
                    src={`${item.image}?auto=format&fit=crop&w=120&q=70`}
                    alt={item.title}
                    className="h-12 w-12 rounded-2xl border-2 border-neutral-950 object-cover"
                  />
                ))}
              </div>

              <Link
                to={`/account/orders/${order.id}`}
                className="rounded-2xl bg-white px-5 py-2.5 text-center text-sm font-bold text-neutral-950"
              >
                مشاهده جزئیات
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AccountOrders;
