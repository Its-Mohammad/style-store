import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import { getStoredOrderById } from "../utils/ordersStorage";

function AccountOrderDetails() {
  const { orderId } = useParams();
  const order = getStoredOrderById(orderId);

  if (!order) {
    return (
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 text-center">
        <p className="text-sm font-bold text-neutral-500">Order Details</p>
        <h2 className="mt-2 text-2xl font-bold">سفارش پیدا نشد</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-neutral-400">
          ممکن است سفارش از حافظه مرورگر پاک شده باشد.
        </p>
        <Link
          to="/account/orders"
          className="mt-6 inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-bold text-neutral-950"
        >
          بازگشت به سفارش‌ها
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm font-bold text-neutral-500">Order Details</p>
            <h2 className="mt-2 text-2xl font-bold">سفارش {order.id}</h2>
            <p className="mt-2 text-sm text-neutral-400">
              ثبت شده در {order.date}
            </p>
          </div>

          <span className="w-fit rounded-2xl bg-green-500/10 px-4 py-2 text-sm font-bold text-green-300">
            {order.status}
          </span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/[0.04] p-4">
            <p className="text-sm text-neutral-500">مبلغ کل</p>
            <p className="mt-2 text-xl font-bold">{formatPrice(order.total)}</p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] p-4">
            <p className="text-sm text-neutral-500">تعداد کالا</p>
            <p className="mt-2 text-xl font-bold">
              {order.items.reduce((sum, item) => sum + item.quantity, 0)} عدد
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] p-4">
            <p className="text-sm text-neutral-500">روش پرداخت</p>
            <p className="mt-2 text-xl font-bold">نمونه</p>
          </div>
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <h3 className="text-xl font-bold">آدرس ارسال</h3>
        <div className="mt-4 rounded-2xl bg-white/[0.04] p-4 text-sm leading-7 text-neutral-300">
          <p className="font-bold text-white">{order.customer.fullName}</p>
          <p className="mt-1">{order.customer.phone}</p>
          <p className="mt-1">
            {order.customer.city}، {order.customer.address}
          </p>
          {order.customer.postalCode && (
            <p className="mt-1 text-neutral-500">
              کد پستی: {order.customer.postalCode}
            </p>
          )}
          {order.customer.note && (
            <p className="mt-3 border-t border-white/10 pt-3 text-neutral-400">
              توضیحات: {order.customer.note}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <h3 className="text-xl font-bold">محصولات سفارش</h3>

        <div className="mt-5 space-y-3">
          {order.items.map((item) => (
            <article
              key={item.cartItemId}
              className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:grid-cols-[96px_1fr]"
            >
              <Link
                to={`/product/${item.productId}`}
                className="block overflow-hidden rounded-2xl bg-neutral-900"
              >
                <img
                  src={`${item.image}?auto=format&fit=crop&w=220&q=80`}
                  alt={item.title}
                  className="aspect-square w-full object-cover"
                />
              </Link>

              <div className="flex flex-col justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                    {item.brand}
                  </p>
                  <Link
                    to={`/product/${item.productId}`}
                    className="mt-1 block text-lg font-bold hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-2 text-sm text-neutral-400">
                    رنگ {item.color} - سایز {item.size} - {item.quantity} عدد
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-bold">
                    {formatPrice(item.finalPrice * item.quantity)}
                  </span>
                  {item.discount > 0 && (
                    <span className="text-sm text-neutral-500 line-through">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccountOrderDetails;
