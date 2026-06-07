import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

function Cart() {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-bold text-neutral-500">Your Cart</p>
        <h1 className="mt-3 text-4xl font-bold md:text-6xl">
          سبد خرید خالی است
        </h1>
        <p className="mt-5 max-w-md text-neutral-400">
          هنوز محصولی به سبد خرید اضافه نکردی. از کالکشن‌ها دیدن کن و آیتم مورد
          علاقه‌ات را انتخاب کن.
        </p>
        <Link
          to="/products"
          className="mt-8 rounded-2xl bg-white px-7 py-4 text-sm font-bold text-neutral-950 transition hover:bg-neutral-200"
        >
          شروع خرید
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold text-neutral-500">Your Cart</p>
          <h1 className="mt-2 text-4xl font-bold md:text-6xl">سبد خرید</h1>
        </div>

        <button
          onClick={clearCart}
          className="w-fit rounded-2xl border border-white/10 px-5 py-3 text-sm font-bold text-neutral-300 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
        >
          خالی کردن سبد خرید
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {cartItems.map((item) => {
            const finalPrice =
              item.discount > 0
                ? item.price - (item.price * item.discount) / 100
                : item.price;

            return (
              <article
                key={item.cartItemId}
                className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[140px_1fr]"
              >
                <Link
                  to={`/product/${item.productId}`}
                  className="overflow-hidden rounded-[1.5rem] bg-neutral-900"
                >
                  <div className="aspect-square">
                    <img
                      src={`${item.image}?auto=format&fit=crop&w=400&q=80`}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>

                <div className="flex flex-col justify-between gap-5">
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                        {item.brand}
                      </p>

                      <Link
                        to={`/product/${item.productId}`}
                        className="mt-2 block text-xl font-bold transition hover:text-neutral-300"
                      >
                        {item.title}
                      </Link>

                      <div className="mt-3 flex flex-wrap gap-2 text-sm text-neutral-400">
                        <span className="rounded-2xl bg-white/10 px-3 py-1">
                          رنگ: {item.color}
                        </span>
                        <span className="rounded-2xl bg-white/10 px-3 py-1">
                          سایز: {item.size}
                        </span>
                      </div>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="font-bold">{formatPrice(finalPrice)}</p>

                      {item.discount > 0 && (
                        <p className="mt-1 text-sm text-neutral-500 line-through">
                          {formatPrice(item.price)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 p-1">
                      <button
                        onClick={() => decreaseQuantity(item.cartItemId)}
                        className="flex h-9 w-9 items-center justify-center rounded-2xl text-lg transition hover:bg-white hover:text-neutral-950"
                      >
                        -
                      </button>

                      <span className="min-w-8 text-center text-sm font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.cartItemId)}
                        className="flex h-9 w-9 items-center justify-center rounded-2xl text-lg transition hover:bg-white hover:text-neutral-950"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-sm font-bold text-neutral-500 transition hover:text-red-300"
                    >
                      حذف محصول
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 lg:sticky lg:top-28">
          <h2 className="text-2xl font-bold">خلاصه سفارش</h2>

          <div className="mt-6 space-y-4 border-b border-white/10 pb-6">
            <div className="flex items-center justify-between text-sm text-neutral-400">
              <span>جمع محصولات</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-neutral-400">
              <span>ارسال</span>
              <span>رایگان</span>
            </div>

            <div className="flex items-center justify-between text-sm text-neutral-400">
              <span>مالیات</span>
              <span>محاسبه در پرداخت</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="font-bold">مبلغ قابل پرداخت</span>
            <span className="text-2xl font-bold">{formatPrice(cartTotal)}</span>
          </div>

          <Link
            to="/checkout"
            className="mt-8 block w-full rounded-2xl bg-white px-6 py-4 text-center text-sm font-bold text-neutral-950 transition hover:bg-neutral-200"
          >
            ادامه فرایند پرداخت
          </Link>

          <Link
            to="/products"
            className="mt-4 block text-center text-sm font-bold text-neutral-400 transition hover:text-white"
          >
            ادامه خرید
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default Cart;
