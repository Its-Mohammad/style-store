import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import { getStoredAddresses } from "../utils/addressesStorage";
import { saveStoredOrder } from "../utils/ordersStorage";

const initialForm = {
  fullName: "",
  phone: "",
  city: "",
  address: "",
  postalCode: "",
  note: "",
};

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [savedAddresses] = useState(getStoredAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [orderCode, setOrderCode] = useState("");

  const payableTotal = useMemo(() => cartTotal, [cartTotal]);

  function getFinalPrice(item) {
    if (item.discount > 0) {
      return item.price - (item.price * item.discount) / 100;
    }

    return item.price;
  }

  function updateField(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function applySavedAddress(address) {
    setSelectedAddressId(address.id);
    setForm((currentForm) => ({
      ...currentForm,
      fullName: address.receiver,
      phone: address.phone,
      city: address.city,
      address: address.address,
      postalCode: address.postalCode || "",
    }));
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.fullName || !form.phone || !form.city || !form.address) {
      setError("نام، موبایل، شهر و آدرس را کامل وارد کن.");
      return;
    }

    const nextOrderCode = `MODE-${Date.now().toString().slice(-6)}`;

    saveStoredOrder({
      id: nextOrderCode,
      date: new Intl.DateTimeFormat("fa-IR").format(new Date()),
      status: "در حال بررسی",
      total: payableTotal,
      addressId: selectedAddressId || null,
      customer: { ...form },
      items: cartItems.map((item) => ({
        cartItemId: item.cartItemId,
        productId: item.productId,
        title: item.title,
        brand: item.brand,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
        finalPrice: getFinalPrice(item),
        image: item.image,
      })),
    });

    setError("");
    setOrderCode(nextOrderCode);
    clearCart();
  }

  if (orderCode) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6">
        <p className="text-sm font-bold text-green-400">سفارش ثبت شد</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-6xl">
          خریدت با موفقیت ثبت شد
        </h1>
        <p className="mt-5 max-w-md text-neutral-400">
          کد پیگیری سفارش:{" "}
          <span className="font-bold text-white">{orderCode}</span>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/account/orders"
            className="rounded-2xl bg-white px-7 py-4 text-sm font-bold text-neutral-950 transition hover:bg-neutral-200"
          >
            مشاهده سفارش
          </Link>
          <Link
            to="/products"
            className="rounded-2xl border border-white/10 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6">
        <p className="text-sm font-bold text-neutral-500">پرداخت</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-6xl">
          سبد خریدت خالی است
        </h1>
        <p className="mt-5 max-w-md text-sm leading-7 text-neutral-400">
          برای ثبت سفارش، اول یک محصول به سبد خرید اضافه کن.
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
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
      <div className="mb-8">
        <p className="text-sm font-bold text-neutral-500">Checkout</p>
        <h1 className="mt-2 text-3xl font-bold md:text-5xl">
          تکمیل اطلاعات ارسال
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 sm:p-6"
        >
          {savedAddresses.length > 0 && (
            <div className="mb-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-bold text-white">
                  انتخاب از آدرس‌های ذخیره‌شده
                </h2>
                <Link
                  to="/account/addresses"
                  className="text-xs font-bold text-neutral-400 hover:text-white"
                >
                  مدیریت آدرس‌ها
                </Link>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {savedAddresses.map((address) => (
                  <button
                    key={address.id}
                    type="button"
                    onClick={() => applySavedAddress(address)}
                    className={`rounded-2xl border p-3 text-right text-sm transition ${
                      selectedAddressId === address.id
                        ? "border-white bg-white text-neutral-950"
                        : "border-white/10 bg-neutral-950 text-neutral-300 hover:border-white/30"
                    }`}
                  >
                    <span className="block font-bold">{address.receiver}</span>
                    <span className="mt-1 block truncate">
                      {address.city}، {address.address}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-white">
                نام و نام خانوادگی
              </span>
              <input
                name="fullName"
                value={form.fullName}
                onChange={updateField}
                className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 text-right text-sm outline-none transition focus:border-white/30"
                placeholder="مثلا محمد رضایی"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-white">شماره موبایل</span>
              <input
                name="phone"
                value={form.phone}
                onChange={updateField}
                className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 text-right text-sm outline-none transition focus:border-white/30"
                placeholder="09123456789"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-white">شهر</span>
              <input
                name="city"
                value={form.city}
                onChange={updateField}
                className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 text-right text-sm outline-none transition focus:border-white/30"
                placeholder="تهران"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-white">کد پستی</span>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={updateField}
                className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 text-right text-sm outline-none transition focus:border-white/30"
                placeholder="اختیاری"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="text-sm font-bold text-white">آدرس کامل</span>
            <textarea
              name="address"
              value={form.address}
              onChange={updateField}
              rows={4}
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-right text-sm leading-7 outline-none transition focus:border-white/30"
              placeholder="خیابان، کوچه، پلاک، واحد"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-bold text-white">توضیحات سفارش</span>
            <textarea
              name="note"
              value={form.note}
              onChange={updateField}
              rows={3}
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-right text-sm leading-7 outline-none transition focus:border-white/30"
              placeholder="اختیاری"
            />
          </label>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300">
              {error}
            </div>
          )}

          <button className="mt-6 w-full rounded-2xl bg-white px-6 py-4 text-sm font-bold text-neutral-950 transition hover:bg-neutral-200">
            ثبت سفارش
          </button>
        </form>

        <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 lg:sticky lg:top-28">
          <h2 className="text-2xl font-bold">خلاصه سفارش</h2>

          <div className="mt-5 space-y-3 border-b border-white/10 pb-5">
            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="min-w-0 text-neutral-400">
                  {item.title} × {item.quantity}
                </span>
                <span className="shrink-0 font-bold text-white">
                  {formatPrice(getFinalPrice(item) * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="font-bold text-neutral-300">
              مبلغ قابل پرداخت
            </span>
            <span className="text-2xl font-bold">
              {formatPrice(payableTotal)}
            </span>
          </div>

          <p className="mt-4 rounded-2xl bg-white/[0.04] px-4 py-3 text-sm leading-7 text-neutral-400">
            این پرداخت فعلا نمونه است و به درگاه بانکی وصل نیست.
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
