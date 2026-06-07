const sections = [
  {
    title: "اطلاعاتی که ذخیره می‌شود",
    text: "برای ثبت سفارش، اطلاعاتی مثل نام، شماره موبایل، آدرس، ایمیل و جزئیات خرید دریافت می‌شود.",
  },
  {
    title: "استفاده از اطلاعات",
    text: "اطلاعات فقط برای پردازش سفارش، ارسال کالا، پشتیبانی و بهتر کردن تجربه خرید استفاده می‌شود.",
  },
  {
    title: "حفظ امنیت",
    text: "در نسخه واقعی فروشگاه، داده‌ها باید روی سرور امن ذخیره شوند. در این پروژه تمرینی بخشی از داده‌ها روی مرورگر ذخیره می‌شود.",
  },
  {
    title: "ارتباط با پشتیبانی",
    text: "برای درخواست حذف یا اصلاح اطلاعات حساب، کاربر می‌تواند از صفحه تماس با ما اقدام کند.",
  },
];

function Privacy() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 text-right sm:px-6 lg:py-14">
      <p className="text-sm font-bold text-neutral-500">Privacy</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
        حریم خصوصی
      </h1>
      <p className="mt-5 max-w-2xl text-sm leading-8 text-neutral-400 sm:text-base">
        این صفحه توضیح می‌دهد MODE برای ثبت سفارش و پشتیبانی چه اطلاعاتی را
        دریافت می‌کند و چطور از آن استفاده می‌شود.
      </p>

      <div className="mt-8 space-y-4">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
          >
            <h2 className="text-xl font-bold">{section.title}</h2>
            <p className="mt-3 text-sm leading-8 text-neutral-400">
              {section.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Privacy;
