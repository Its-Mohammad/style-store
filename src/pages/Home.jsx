import { Link } from "react-router-dom";
import {
  CheckCircle,
  Headphones,
  PackageCheck,
  RotateCcw,
  Sparkles,
  Truck,
} from "lucide-react";
import { products } from "../data/products";
import ProductGrid from "../components/product/ProductGrid";

const brandClaims = [
  {
    icon: Sparkles,
    title: "انتخاب‌های دست‌چین",
    desc: "محصولات قبل از نمایش از نظر تصویر، رنگ، سایز و کاربرد روزمره بررسی می‌شوند.",
  },
  {
    icon: Truck,
    title: "ارسال سراسری",
    desc: "ارسال به شهرهای مختلف با مسیر پیگیری سفارش و زمان‌بندی شفاف.",
  },
  {
    icon: RotateCcw,
    title: "بازگشت کالا",
    desc: "اگر سایز یا رنگ مناسب نبود، فرایند مرجوعی ساده و قابل پیگیری است.",
  },
  {
    icon: Headphones,
    title: "پشتیبانی خرید",
    desc: "برای انتخاب سایز، پیگیری سفارش و سوال محصول، پشتیبانی همراه کاربر است.",
  },
];

const categoryHighlights = [
  {
    title: "مردانه",
    desc: "پوشاک و کفش روزمره",
    to: "/men",
    productId: 3,
  },
  {
    title: "زنانه",
    desc: "آیتم‌های شهری و مینیمال",
    to: "/women",
    productId: 6,
  },
  {
    title: "بچگانه",
    desc: "لباس و کفش راحت کودک",
    to: "/kids",
    productId: 9,
  },
];

const styleCollections = [
  {
    title: "هودی و بالاپوش مردانه",
    desc: "محصولات واقعی دسته مردانه برای استایل راحت و روزمره.",
    to: "/men/shirts",
    cta: "دیدن این دسته",
    productId: 2,
  },
  {
    title: "کت و مانتو زنانه",
    desc: "دسته واقعی محصولات زنانه برای ترکیب‌های مرتب و شهری.",
    to: "/women/coats",
    cta: "مشاهده محصولات",
    productId: 5,
  },
  {
    title: "عینک مردانه",
    desc: "اکسسوری واقعی فروشگاه برای کامل‌تر کردن ست‌های ساده.",
    to: "/men/sunglasses",
    cta: "دیدن عینک‌ها",
    productId: 4,
  },
];

const heroSpotlightProducts = [
  { label: "جدید", productId: 2 },
  { label: "تخفیف", productId: 1 },
  { label: "منتخب", productId: 5 },
];

const seoFaqs = [
  {
    question: "چطور سایز مناسب را انتخاب کنم؟",
    answer:
      "در صفحه هر محصول سایزهای موجود مشخص است و از بخش راهنمای سایز می‌توانی قبل از خرید اندازه مناسب را دقیق‌تر بررسی کنی.",
  },
  {
    question: "محصولات تخفیف‌دار کجا هستند؟",
    answer:
      "همه آیتم‌هایی که تخفیف فعال دارند در صفحه تخفیف‌ها جمع شده‌اند و از هدر یا بخش تخفیف‌های منتخب صفحه اصلی قابل دسترسی هستند.",
  },
  {
    question: "برای خرید روزمره چه محصولاتی مناسب‌ترند؟",
    answer:
      "آیتم‌های مینیمال، کتانی، هودی، شلوار کارگو و اکسسوری‌های ساده انتخاب‌های مناسب‌تری برای ست‌های روزمره و شهری هستند.",
  },
  {
    question: "چطور سفارش را پیگیری کنم؟",
    answer:
      "بعد از ثبت سفارش، از بخش حساب کاربری و سفارش‌ها می‌توانی وضعیت آماده‌سازی و ارسال را بررسی کنی.",
  },
];

function Home() {
  const featuredProducts = products.slice(0, 5);
  const saleProducts = products.filter((product) => product.discount > 0);
  const newProducts = products.filter((product) => product.isNew).slice(0, 5);
  const heroProduct =
    products.find((product) => product.id === 2) ?? products[0];

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-5 lg:py-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 lg:h-[calc(100svh-132px)] lg:max-h-[540px] lg:min-h-[430px]">
          <img
            src={`${heroProduct.image}?auto=format&fit=crop&w=1600&q=90`}
            alt={heroProduct.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/45 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          <div className="relative min-h-[620px] p-4 sm:p-5 lg:h-full lg:min-h-0 lg:p-6">
            <div className="relative z-10 flex items-end justify-end pt-[332px] text-right lg:absolute lg:bottom-6 lg:left-6 lg:w-[min(620px,calc(100%-420px))] lg:pt-0">
              <div className="max-w-xl rounded-[1.75rem] border border-white/10 bg-neutral-950/50 p-5 backdrop-blur-md sm:p-6">
                <p className="text-xs font-bold uppercase text-neutral-400">
                  NEW SEASON EDIT
                </p>
                <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
                  انتخاب سریع‌تر برای استایل امروز
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-8 text-neutral-300">
                  تازه‌ترین آیتم‌ها و پیشنهادهای فعال فروشگاه، بدون تکرار
                  دسته‌بندی‌ها.
                </p>

                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <Link
                    to="/new"
                    className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-neutral-950 transition hover:bg-neutral-200"
                  >
                    جدیدترین‌ها
                  </Link>

                  <Link
                    to="/sale"
                    className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:border-white/40"
                  >
                    تخفیف‌ها
                  </Link>
                </div>
              </div>
            </div>

            <aside className="absolute right-4 top-4 z-10 w-[calc(100%-2rem)] rounded-[1.75rem] border border-white/10 bg-neutral-950/65 p-4 text-right backdrop-blur-md sm:right-5 sm:top-5 sm:w-[360px] lg:right-6 lg:top-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <Link
                  to="/products"
                  className="text-xs font-bold text-neutral-400 transition hover:text-white"
                >
                  مشاهده همه
                </Link>
                <p className="text-sm font-bold text-white">منتخب امروز</p>
              </div>

              <div className="space-y-3">
                {heroSpotlightProducts.map((item) => {
                  const product =
                    products.find(
                      (productItem) => productItem.id === item.productId,
                    ) ??
                    heroProduct;

                  return (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="group grid grid-cols-[72px_1fr] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:bg-white/[0.08]"
                    >
                      <div className="aspect-square overflow-hidden bg-neutral-900">
                        <img
                          src={`${product.image}?auto=format&fit=crop&w=300&q=80`}
                          alt={product.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-[11px] font-bold text-neutral-500">
                          {item.label}
                        </p>
                        <h2 className="mt-1 line-clamp-2 text-sm font-bold leading-6 text-white">
                          {product.title}
                        </h2>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-7 text-right">
          <div>
            <p className="text-xs font-bold uppercase text-neutral-500">
              Shop By Category
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">
              دسته‌بندی‌ها
            </h2>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {categoryHighlights.map((category) => {
            const product =
              products.find((item) => item.id === category.productId) ??
              products[0];

            return (
              <Link
                key={category.title}
                to={category.to}
                className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900"
              >
                <div className="aspect-[4/4.1] overflow-hidden sm:aspect-[16/9] lg:aspect-[4/3.6]">
                  <img
                    src={`${product.image}?auto=format&fit=crop&w=900&q=85`}
                    alt={category.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-right">
                  <h3 className="text-2xl font-bold text-white">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-300">
                    {category.desc}
                  </p>
                  <span className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold text-neutral-950">
                    مشاهده محصولات
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold text-neutral-500">
              Featured Products
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-4xl">
              انتخاب‌های ویژه
            </h2>
          </div>

          <Link
            to="/products"
            className="text-sm font-bold text-neutral-400 transition hover:text-white"
          >
            مشاهده همه محصولات
          </Link>
        </div>

        <ProductGrid
          products={featuredProducts}
          variant="scroll"
          fillDesktop
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] lg:grid-cols-[1fr_1fr]">
          <div className="p-6 text-right sm:p-8 lg:p-10">
            <p className="text-sm font-bold text-neutral-500">New In Store</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight md:text-4xl">
              تازه‌های فروشگاه
            </h2>
            <p className="mt-5 text-sm leading-8 text-neutral-400 sm:text-base">
              آخرین محصولاتی که به فروشگاه اضافه شده‌اند؛ با فیلتر کامل در
              صفحه جدیدترین‌ها.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                to="/new"
                className="flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-bold text-neutral-950"
              >
                دیدن جدیدترین‌ها
              </Link>
              <Link
                to="/size-guide"
                className="flex items-center justify-center rounded-2xl border border-white/15 px-6 py-4 text-sm font-bold text-white"
              >
                راهنمای سایز
              </Link>
            </div>

            <div className="mt-7 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs font-bold text-neutral-500">
                آخرین اضافه‌شده‌ها
              </p>
              <div className="mt-3 space-y-2">
                {newProducts.slice(0, 3).map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-neutral-950/60 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    <span className="text-neutral-500">مشاهده</span>
                    <span>{product.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {newProducts.slice(0, 2).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group relative min-h-[360px] overflow-hidden bg-neutral-900 lg:min-h-[460px]"
              >
                <img
                  src={`${product.image}?auto=format&fit=crop&w=700&q=80`}
                  alt={product.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-4 text-right text-sm font-bold text-white">
                  {product.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold text-neutral-500">
              Real Shopping Paths
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-4xl">
              مسیرهای واقعی خرید
            </h2>
          </div>

          <div className="flex items-center justify-end gap-2 text-sm font-bold text-neutral-400">
            انتخاب پیشنهادی MODE
            <CheckCircle size={17} className="text-green-400" />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {styleCollections.map((collection) => {
            const product =
              products.find((item) => item.id === collection.productId) ??
              products[0];

            return (
              <article
                key={collection.title}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
              >
                <Link to={collection.to} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      src={`${product.image}?auto=format&fit=crop&w=900&q=85`}
                      alt={collection.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-right">
                      <h3 className="text-2xl font-bold text-white">
                        {collection.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-neutral-300">
                        {collection.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 p-5">
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-neutral-950">
                      {collection.cta}
                    </span>
                    <div className="flex items-center justify-end gap-2 text-xs font-bold text-neutral-500">
                      <PackageCheck size={16} />
                      آماده خرید
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-4 sm:p-8 md:p-12">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold text-red-400">Limited Sale</p>
              <h2 className="mt-2 text-2xl font-bold md:text-4xl">
                تخفیف‌های منتخب
              </h2>
            </div>

            <Link
              to="/sale"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-neutral-950 transition hover:bg-neutral-200"
            >
              رفتن به تخفیف‌ها
            </Link>
          </div>

          <ProductGrid
            products={saleProducts.slice(0, 5)}
            variant="scroll"
            bleed={false}
            fillDesktop
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-8 rounded-[2.5rem] border border-white/10 bg-neutral-900/50 p-6 text-right sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <p className="text-sm font-bold text-neutral-500">MODE Guide</p>
            <h2 className="mt-3 text-2xl font-bold leading-tight md:text-4xl">
              فروشگاه اینترنتی پوشاک برای خرید سریع‌تر و مطمئن‌تر
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-8 text-neutral-400 sm:text-base">
              <p>
                در MODE می‌توانی پوشاک مردانه، پوشاک زنانه، لباس بچگانه، کفش
                و اکسسوری را بر اساس دسته‌بندی، رنگ، سایز، تخفیف و جدیدترین
                محصولات بررسی کنی.
              </p>
              <p>
                صفحه اصلی کمک می‌کند مسیر مناسب خودت را سریع پیدا کنی و قبل از
                خرید، اطلاعات لازم درباره سایز، ارسال، مرجوعی و دسته‌بندی‌ها را
                ببینی.
              </p>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              {brandClaims.map((claim) => (
                <article
                  key={claim.title}
                  className="flex items-start justify-end gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {claim.title}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-neutral-400">
                      {claim.desc}
                    </p>
                  </div>
                  <claim.icon className="h-9 w-9 shrink-0 rounded-xl bg-white/10 p-2 text-white" />
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {seoFaqs.map((item) => (
              <article
                key={item.question}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="font-bold text-white">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-400">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
