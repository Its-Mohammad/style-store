import { Link } from "react-router-dom";
import { Camera, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

const shopLinks = [
  { label: "مردانه", to: "/men" },
  { label: "زنانه", to: "/women" },
  { label: "بچگانه", to: "/kids" },
  { label: "تخفیف‌ها", to: "/sale" },
];

const supportLinks = [
  { label: "ارسال سفارش", to: "/shipping" },
  { label: "بازگشت کالا", to: "/returns" },
  { label: "راهنمای سایز", to: "/size-guide" },
  { label: "تماس با ما", to: "/contact" },
];

const legalLinks = [
  { label: "حریم خصوصی", to: "/privacy" },
  { label: "شرایط استفاده", to: "/terms" },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(event) {
    event.preventDefault();

    if (email.trim()) {
      setSubscribed(true);
    }
  }

  return (
    <footer className="border-t border-white/10 bg-neutral-950 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div
          dir="rtl"
          className="grid gap-8 text-right lg:grid-cols-[1.2fr_0.75fr_0.75fr_1.15fr]"
        >
          <div>
            <Link to="/" dir="ltr" className="inline-block text-2xl font-bold">
              MODE<span className="text-neutral-500">.</span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-7 text-neutral-400">
              فروشگاه پوشاک برای خرید روزمره، استایل خیابانی و آیتم‌های
              کاربردی. تجربه خرید ساده، سریع و مناسب کاربر فارسی.
            </p>

            <div className="mt-5 space-y-2 text-sm text-neutral-400">
              <p className="flex items-center justify-start gap-2">
                <MapPin size={16} className="shrink-0" />
                <span>تهران، ولیعصر، بالاتر از میدان ونک</span>
              </p>

              <p className="flex items-center justify-start gap-2">
                <Phone size={16} className="shrink-0" />
                <span dir="ltr">021-91234567</span>
              </p>

              <p className="flex items-center justify-start gap-2">
                <Mail size={16} className="shrink-0" />
                <span dir="ltr">support@mode.ir</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold">خرید</h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
              {shopLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold">پشتیبانی</h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold">عضویت در خبرنامه</h4>
            <p className="mt-3 text-sm leading-7 text-neutral-400">
              پیشنهادهای ویژه، موجود شدن سایزها و تخفیف‌های فصلی را زودتر
              دریافت کن.
            </p>

            {subscribed ? (
              <div className="mt-4 rounded-2xl border border-green-400/20 bg-green-500/10 px-4 py-3 text-sm font-bold text-green-300">
                عضویت انجام شد. ممنون از همراهی‌ات.
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                dir="ltr"
                className="mt-4 flex overflow-hidden rounded-full border border-white/10 bg-white/[0.03]"
              >
                <button
                  type="submit"
                  aria-label="عضویت"
                  className="flex h-12 w-14 shrink-0 items-center justify-center bg-white text-neutral-950 transition hover:bg-neutral-200"
                >
                  <Send size={17} />
                </button>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="ایمیل شما"
                  required
                  className="h-12 min-w-0 flex-1 bg-transparent px-4 text-right text-sm outline-none placeholder:text-neutral-500"
                />
              </form>
            )}

            <div className="mt-5 flex justify-start gap-2">
              <a
                href="#"
                aria-label="اینستاگرام"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-300 transition hover:bg-white/10 hover:text-white"
              >
                <Camera size={18} />
              </a>
              <a
                href="#"
                aria-label="تلگرام"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-300 transition hover:bg-white/10 hover:text-white"
              >
                <Send size={17} />
              </a>
            </div>
          </div>
        </div>

        <div
          dir="rtl"
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row"
        >
          <p>© ۱۴۰۵ MODE. تمام حقوق محفوظ است.</p>

          <div className="flex flex-wrap justify-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="transition hover:text-neutral-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
