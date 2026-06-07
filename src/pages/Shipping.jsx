import { Link } from "react-router-dom";
import { Clock, MapPin, Phone, Truck } from "lucide-react";

const methods = [
  {
    title: "ارسال استاندارد",
    time: "۳ تا ۵ روز کاری",
    price: "۳۵٬۰۰۰ تومان",
    desc: "برای بیشتر شهرها و سفارش‌های روزمره مناسب است.",
  },
  {
    title: "ارسال سریع",
    time: "۱ تا ۲ روز کاری",
    price: "۶۵٬۰۰۰ تومان",
    desc: "فعلا برای تهران و چند شهر بزرگ فعال است.",
  },
  {
    title: "ارسال رایگان",
    time: "۳ تا ۷ روز کاری",
    price: "رایگان",
    desc: "برای سفارش‌های بالای ۲٬۵۰۰٬۰۰۰ تومان محاسبه می‌شود.",
  },
];

const steps = [
  "ثبت سفارش و انتخاب آدرس",
  "آماده‌سازی و کنترل کیفیت",
  "تحویل به شرکت حمل‌ونقل",
  "ارسال کد رهگیری برای مشتری",
];

function Shipping() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 text-right sm:px-6 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="text-sm font-bold text-neutral-500">Shipping</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            ارسال سفارش
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-neutral-400 sm:text-base">
            سفارش‌ها بعد از ثبت، بررسی و بسته‌بندی می‌شوند و با توجه به شهر
            مقصد از طریق پست، تیپاکس یا پیک شهری ارسال خواهند شد.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-end gap-3">
            <div>
              <p className="font-bold">پوشش ارسال</p>
              <p className="mt-1 text-sm text-neutral-400">
                ارسال به تمام استان‌های ایران
              </p>
            </div>
            <MapPin className="h-9 w-9 rounded-2xl bg-white/10 p-2" />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {methods.map((method) => (
          <article
            key={method.title}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
          >
            <Truck className="h-10 w-10 rounded-2xl bg-white/10 p-2" />
            <h2 className="mt-4 text-xl font-bold">{method.title}</h2>
            <p className="mt-3 flex items-center justify-end gap-2 text-sm text-neutral-400">
              {method.time}
              <Clock size={16} />
            </p>
            <p className="mt-2 font-bold">{method.price}</p>
            <p className="mt-3 text-sm leading-7 text-neutral-400">
              {method.desc}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xl font-bold">زمان پردازش</h2>
          <p className="mt-3 text-sm leading-7 text-neutral-400">
            سفارش‌هایی که تا ساعت ۱۴ ثبت شوند، همان روز وارد مرحله آماده‌سازی
            می‌شوند. سفارش‌های بعد از این ساعت، روز کاری بعد پردازش خواهند شد.
          </p>
        </aside>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xl font-bold">مراحل ارسال</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3"
              >
                <span className="text-sm text-neutral-300">{step}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-neutral-950">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-bold">برای پیگیری ارسال کمک می‌خوای؟</p>
          <p className="mt-1 text-sm text-neutral-400">
            کد سفارش را آماده داشته باش و با پشتیبانی تماس بگیر.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-neutral-950"
        >
          تماس با پشتیبانی
          <Phone size={16} />
        </Link>
      </div>
    </section>
  );
}

export default Shipping;
