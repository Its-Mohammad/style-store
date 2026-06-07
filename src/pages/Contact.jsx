import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const contactCards = [
  {
    icon: Phone,
    title: "تلفن پشتیبانی",
    value: "021-91234567",
    desc: "شنبه تا چهارشنبه، ۹ تا ۱۸",
  },
  {
    icon: Mail,
    title: "ایمیل",
    value: "support@mode.ir",
    desc: "پاسخ‌گویی تا ۲۴ ساعت کاری",
  },
  {
    icon: MapPin,
    title: "آدرس دفتر",
    value: "تهران، ولیعصر، بالاتر از میدان ونک",
    desc: "مراجعه حضوری با هماهنگی قبلی",
  },
  {
    icon: Clock,
    title: "ساعات کاری",
    value: "۹ تا ۱۸",
    desc: "پنجشنبه‌ها ۹ تا ۱۳",
  },
];

const subjects = [
  "پیگیری سفارش",
  "سوال درباره محصول",
  "بازگشت کالا",
  "مشکل حساب کاربری",
  "سایر موارد",
];

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 text-right sm:px-6 lg:py-14">
      <div>
        <p className="text-sm font-bold text-neutral-500">Contact</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
          تماس با ما
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-neutral-400 sm:text-base">
          برای پیگیری سفارش، سوال درباره محصول یا درخواست پشتیبانی، از فرم زیر
          استفاده کن یا با راه‌های ارتباطی MODE تماس بگیر.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-3">
          {contactCards.map((item) => (
            <article
              key={item.title}
              dir="rtl"
              className="flex items-start gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 text-right"
            >
              <item.icon className="h-10 w-10 shrink-0 rounded-2xl bg-white/10 p-2" />
              <div className="min-w-0">
                <p className="text-sm text-neutral-500">{item.title}</p>
                <p className="mt-1 font-bold">{item.value}</p>
                <p className="mt-1 text-sm text-neutral-400">{item.desc}</p>
              </div>
            </article>
          ))}
        </aside>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
          {submitted ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
              <p className="text-sm font-bold text-green-400">پیام ثبت شد</p>
              <h2 className="mt-2 text-2xl font-bold">
                پیام شما با موفقیت ارسال شد
              </h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-neutral-400">
                تیم پشتیبانی در اولین فرصت پاسخ می‌دهد.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-bold text-neutral-950"
              >
                ارسال پیام جدید
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold">فرم تماس</h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-bold">نام و نام خانوادگی</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={updateField}
                    required
                    className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 text-right text-sm outline-none focus:border-white/30"
                    placeholder="مثلا علی رضایی"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold">شماره موبایل</span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={updateField}
                    className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 text-right text-sm outline-none focus:border-white/30"
                    placeholder="09123456789"
                  />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="text-sm font-bold">ایمیل</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={updateField}
                  required
                  className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 text-right text-sm outline-none focus:border-white/30"
                  placeholder="name@example.com"
                />
              </label>

              <label className="mt-4 block">
                <span className="text-sm font-bold">موضوع</span>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={updateField}
                  required
                  className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 text-right text-sm outline-none focus:border-white/30"
                >
                  <option value="" disabled>
                    انتخاب موضوع
                  </option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mt-4 block">
                <span className="text-sm font-bold">متن پیام</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  required
                  rows={5}
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-right text-sm leading-7 outline-none focus:border-white/30"
                  placeholder="پیامت را اینجا بنویس..."
                />
              </label>

              <button className="mt-5 w-full rounded-full bg-white px-6 py-4 text-sm font-bold text-neutral-950">
                ارسال پیام
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
