const terms = [
  {
    title: "ثبت سفارش",
    text: "ثبت سفارش به معنی تایید اطلاعات کالا، قیمت، آدرس و قوانین ارسال و بازگشت است.",
  },
  {
    title: "قیمت و موجودی",
    text: "قیمت‌ها و موجودی محصولات ممکن است تغییر کند. ملاک سفارش، اطلاعات نمایش‌داده‌شده هنگام ثبت نهایی است.",
  },
  {
    title: "پرداخت",
    text: "در نسخه فعلی پروژه، پرداخت نمونه است. در نسخه واقعی باید پرداخت از طریق درگاه معتبر بانکی انجام شود.",
  },
  {
    title: "بازگشت کالا",
    text: "بازگشت کالا طبق شرایط اعلام‌شده در صفحه بازگشت کالا انجام می‌شود و سلامت محصول باید تایید شود.",
  },
];

function Terms() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 text-right sm:px-6 lg:py-14">
      <p className="text-sm font-bold text-neutral-500">Terms</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
        شرایط استفاده
      </h1>
      <p className="mt-5 max-w-2xl text-sm leading-8 text-neutral-400 sm:text-base">
        استفاده از فروشگاه MODE به معنی پذیرش قوانین خرید، ارسال، پرداخت و
        بازگشت کالا است.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {terms.map((term) => (
          <article
            key={term.title}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
          >
            <h2 className="text-xl font-bold">{term.title}</h2>
            <p className="mt-3 text-sm leading-8 text-neutral-400">
              {term.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Terms;
