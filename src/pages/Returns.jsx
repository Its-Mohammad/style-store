import { Link } from "react-router-dom";
import { CheckCircle, Phone, RefreshCw, XCircle } from "lucide-react";

const steps = [
  "ثبت درخواست بازگشت",
  "ارسال کالا با بسته‌بندی اصلی",
  "بررسی سلامت کالا",
  "تعویض یا بازگشت وجه",
];

const acceptable = [
  "کمتر از ۷ روز از دریافت سفارش گذشته باشد",
  "کالا استفاده نشده و آسیب ندیده باشد",
  "تگ، برچسب و بسته‌بندی اصلی موجود باشد",
  "فاکتور یا کد سفارش قابل ارائه باشد",
];

const rejected = [
  "کالای شسته‌شده یا استفاده‌شده",
  "کالای بدون تگ یا بسته‌بندی",
  "لباس زیر به دلیل مسائل بهداشتی",
  "آسیب‌دیدگی ایجادشده توسط مشتری",
];

function Returns() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 text-right sm:px-6 lg:py-14">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-8">
        <RefreshCw className="h-12 w-12 rounded-2xl bg-white/10 p-3" />
        <p className="mt-6 text-sm font-bold text-neutral-500">Returns</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
          بازگشت کالا
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-neutral-400 sm:text-base">
          اگر سایز، رنگ یا مدل کالا مناسب نبود، تا ۷ روز فرصت داری درخواست
          بازگشت یا تعویض ثبت کنی. کالا باید سالم و در وضعیت اولیه باشد.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <article
            key={step}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-neutral-950">
              {index + 1}
            </span>
            <h2 className="mt-4 font-bold">{step}</h2>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
          <h2 className="flex items-center justify-end gap-2 text-xl font-bold">
            شرایط قابل قبول
            <CheckCircle className="text-green-400" size={20} />
          </h2>
          <ul className="mt-5 space-y-3">
            {acceptable.map((item) => (
              <li
                key={item}
                className="flex items-start justify-end gap-2 text-sm leading-7 text-neutral-400"
              >
                <span>{item}</span>
                <CheckCircle className="mt-1 shrink-0 text-green-400" size={16} />
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
          <h2 className="flex items-center justify-end gap-2 text-xl font-bold">
            موارد غیرقابل بازگشت
            <XCircle className="text-red-400" size={20} />
          </h2>
          <ul className="mt-5 space-y-3">
            {rejected.map((item) => (
              <li
                key={item}
                className="flex items-start justify-end gap-2 text-sm leading-7 text-neutral-400"
              >
                <span>{item}</span>
                <XCircle className="mt-1 shrink-0 text-red-400" size={16} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-bold">درخواست بازگشت داری؟</p>
          <p className="mt-1 text-sm text-neutral-400">
            از صفحه سفارش‌ها یا از طریق پشتیبانی درخواستت را ثبت کن.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/account/orders"
            className="rounded-full bg-white px-6 py-3 text-sm font-bold text-neutral-950"
          >
            سفارش‌های من
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-bold text-white"
          >
            تماس با ما
            <Phone size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Returns;
