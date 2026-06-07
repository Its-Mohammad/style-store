import { Link } from "react-router-dom";
import {
  CheckCircle,
  Headphones,
  PackageCheck,
  RotateCcw,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "انتخاب مرتب و کاربردی",
    desc: "محصولات بر اساس استفاده روزمره، کیفیت تصویر، ترکیب رنگ و هماهنگی با استایل شهری انتخاب می‌شوند.",
  },
  {
    icon: ShieldCheck,
    title: "خرید قابل اعتماد",
    desc: "قیمت، رنگ، سایز، وضعیت موجودی و مسیر خرید باید شفاف باشد تا کاربر با اطمینان تصمیم بگیرد.",
  },
  {
    icon: PackageCheck,
    title: "آماده برای خرید واقعی",
    desc: "صفحه محصول، سبد خرید، پرداخت نمونه، سفارش‌ها و پیگیری حساب کاربری مثل یک فروشگاه واقعی طراحی شده‌اند.",
  },
];

const stats = [
  { value: "۹+", label: "گروه محصول فعال" },
  { value: "۴", label: "مسیر اصلی خرید" },
  { value: "۲۴h", label: "زمان پاسخ‌گویی" },
  { value: "RTL", label: "طراحی فارسی" },
];

const shoppingSteps = [
  {
    title: "انتخاب محصول",
    desc: "کاربر از صفحه محصولات، دسته‌بندی‌ها، جدیدترین‌ها یا تخفیف‌ها وارد محصول می‌شود.",
  },
  {
    title: "بررسی جزئیات",
    desc: "عکس، رنگ، سایز، قیمت، توضیحات و راهنمای سایز قبل از افزودن به سبد دیده می‌شود.",
  },
  {
    title: "ثبت سفارش",
    desc: "سبد خرید، آدرس، خلاصه سفارش و ذخیره سفارش در حساب کاربری مسیر را کامل می‌کنند.",
  },
];

const serviceItems = [
  {
    icon: Truck,
    title: "ارسال شفاف",
    desc: "کاربر قبل از خرید مسیر کلی ارسال و پیگیری سفارش را می‌بیند.",
  },
  {
    icon: RotateCcw,
    title: "بازگشت کالا",
    desc: "شرایط مرجوعی و تعویض سایز در صفحات راهنما قابل دسترس است.",
  },
  {
    icon: Ruler,
    title: "راهنمای سایز",
    desc: "برای کم شدن خطای خرید، صفحه راهنمای سایز و بخش سایز محصول آماده شده است.",
  },
  {
    icon: Headphones,
    title: "پشتیبانی خرید",
    desc: "فرم تماس و اطلاعات پشتیبانی برای سوال محصول و پیگیری سفارش وجود دارد.",
  },
];

function About() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 text-right sm:px-6 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-stretch">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-bold text-neutral-500">About MODE</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            درباره MODE
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-neutral-400 sm:text-base">
            MODE یک فروشگاه آنلاین پوشاک، کفش و اکسسوری است که تمرکزش روی
            خرید سریع، چیدمان فارسی، اطلاعات شفاف محصول و انتخاب‌های مناسب
            برای استفاده روزمره است. هدف این صفحه این است که کاربر بداند با چه
            فروشگاهی طرف است و مسیر خریدش از کجا شروع می‌شود.
          </p>

          <div className="mt-7 flex flex-wrap justify-end gap-3">
            <Link
              to="/products"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-neutral-950 transition hover:bg-neutral-200"
            >
              دیدن محصولات
            </Link>
            <Link
              to="/contact"
              className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              تماس با پشتیبانی
            </Link>
          </div>
        </div>

        <aside
          dir="rtl"
          className="rounded-[2rem] border border-white/10 bg-neutral-900/70 p-6"
        >
          <div className="flex items-start gap-3 text-right">
            <CheckCircle className="h-11 w-11 shrink-0 rounded-2xl bg-white/10 p-2 text-green-400" />
            <div>
              <p className="font-bold">هدف فروشگاه</p>
              <p className="mt-2 text-sm leading-7 text-neutral-400">
                کمک به انتخاب سریع‌تر محصول، با نمایش واضح عکس، قیمت، سایز،
                رنگ، شرایط ارسال و مسیرهای واقعی خرید.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-xl font-bold text-white">{item.value}</p>
                <p className="mt-1 text-xs leading-6 text-neutral-400">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {values.map((item) => (
          <article
            key={item.title}
            dir="rtl"
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 text-right"
          >
            <item.icon className="h-10 w-10 rounded-2xl bg-white/10 p-2" />
            <h2 className="mt-4 text-xl font-bold">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-400">
              {item.desc}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-sm font-bold text-neutral-500">Shopping Flow</p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            مسیر خرید در MODE
          </h2>

          <div className="mt-6 space-y-3">
            {shoppingSteps.map((step, index) => (
              <article
                key={step.title}
                className="rounded-2xl border border-white/10 bg-neutral-950/60 p-4"
              >
                <div className="flex items-start justify-end gap-3">
                  <div>
                    <h3 className="font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-400">
                      {step.desc}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-bold text-neutral-950">
                    {index + 1}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-sm font-bold text-neutral-500">Services</p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            چیزهایی که خرید را مطمئن‌تر می‌کند
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {serviceItems.map((item) => (
              <article
                key={item.title}
                dir="rtl"
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-neutral-950/60 p-4 text-right"
              >
                <item.icon className="h-10 w-10 shrink-0 rounded-xl bg-white/10 p-2" />
                <div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-neutral-400">
                    {item.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default About;
