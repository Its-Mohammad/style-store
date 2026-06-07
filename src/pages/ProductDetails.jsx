import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Heart,
  RotateCcw,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { products } from "../data/products";
import { formatPrice } from "../utils/formatPrice";
import { getRelatedProducts } from "../utils/getRelatedProducts";
import ProductGrid from "../components/product/ProductGrid";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getColorValue } from "../utils/colorMap";

const categoryLabels = {
  men: "مردانه",
  women: "زنانه",
  kids: "بچگانه",
};

const subcategoryLabels = {
  shoes: "کفش",
  shirts: "پوشاک بالاتنه",
  pants: "شلوار",
  sunglasses: "عینک",
  coats: "کت و مانتو",
  dresses: "پیراهن",
  bags: "کیف",
  sets: "ست لباس",
  clothes: "لباس",
  accessories: "اکسسوری",
};

function getProductDescription(product) {
  const label = subcategoryLabels[product.subcategory] || "محصول";

  return `${product.title} از کالکشن ${categoryLabels[product.category] || "MODE"} برای استفاده روزمره طراحی شده؛ انتخابی مناسب برای استایل تمیز، راحت و قابل ترکیب با آیتم‌های مختلف کمد. این ${label} با تمرکز روی فرم، راحتی و ظاهر مینیمال انتخاب شده تا هم برای خرید روزانه مناسب باشد و هم برای موقعیت‌های نیمه‌رسمی.`;
}

function getMaterial(product) {
  if (product.subcategory === "shoes") {
    return "رویه مقاوم، زیره منعطف، مناسب استفاده روزمره";
  }

  if (product.subcategory === "bags") {
    return "چرم مصنوعی با کیفیت، آستر داخلی، یراق فلزی";
  }

  if (product.subcategory === "sunglasses") {
    return "فریم سبک، لنز دودی، مناسب استفاده روزمره";
  }

  if (product.category === "kids") {
    return "پارچه نرم و ضد حساسیت، مناسب تحرک کودک";
  }

  return "پارچه لطیف، دوخت تمیز، مناسب استفاده روزمره";
}

function getFit(product) {
  if (product.tags?.includes("oversize")) return "آزاد و اورسایز";
  if (product.subcategory === "pants") return "راسته با آزادی مناسب";
  if (product.subcategory === "coats") return "نیمه آزاد";
  if (product.subcategory === "shoes") return "استاندارد";
  return "معمولی";
}

function ProductDetails() {
  const { id } = useParams();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [activeInfoTab, setActiveInfoTab] = useState("description");
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = products.find((item) => item.id === Number(id));

  const galleryImages = useMemo(() => {
    if (!product) return [];

    const images = [
      product.image,
      ...(product.gallery || []),
      ...(product.variants || []).map((variant) => variant.image),
    ].filter(Boolean);

    return [...new Set(images)];
  }, [product]);

  useEffect(() => {
    if (!product) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedColor(null);
    setSelectedSize(null);
    setSelectedImage(galleryImages[0] || product.image);
    setMessage("");
  }, [product, galleryImages]);

  if (!product) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-bold text-neutral-500">Product Not Found</p>
        <h1 className="mt-3 text-4xl font-bold">محصول پیدا نشد</h1>
        <p className="mt-4 max-w-md text-neutral-400">
          محصولی با این شناسه وجود ندارد یا ممکن است حذف شده باشد.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-neutral-950"
        >
          برگشت به خانه
        </Link>
      </section>
    );
  }

  const productIsInWishlist = isInWishlist(product.id);
  const hasDiscount = product.discount > 0;
  const finalPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price;
  const relatedProducts = getRelatedProducts(product, products, 4);
  const displayImage = selectedImage || galleryImages[0] || product.image;
  const currentImageIndex = Math.max(galleryImages.indexOf(displayImage), 0);
  const categoryLabel = categoryLabels[product.category] || product.category;
  const subcategoryLabel =
    subcategoryLabels[product.subcategory] || product.subcategory;

  const specs = [
    { label: "برند", value: product.brand },
    { label: "دسته‌بندی", value: `${categoryLabel} / ${subcategoryLabel}` },
    { label: "فرم", value: getFit(product) },
    { label: "جنس و ساخت", value: getMaterial(product) },
    { label: "کد محصول", value: `MODE-${product.id}` },
    { label: "وضعیت", value: "موجود در انبار" },
  ];

  function handleAddToCart() {
    if (!selectedColor) {
      setMessage("لطفا رنگ محصول را انتخاب کن.");
      return;
    }

    if (!selectedSize) {
      setMessage("لطفا سایز محصول را انتخاب کن.");
      return;
    }

    addToCart(product, selectedColor, selectedSize, displayImage);
    setMessage("محصول با موفقیت به سبد خرید اضافه شد.");
  }

  function showPreviousImage() {
    const previousIndex =
      currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;

    setSelectedImage(galleryImages[previousIndex]);
  }

  function showNextImage() {
    const nextIndex =
      currentImageIndex === galleryImages.length - 1 ? 0 : currentImageIndex + 1;

    setSelectedImage(galleryImages[nextIndex]);
  }

  return (
    <>
      <section className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:py-12">
        <div className="w-full">
          <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/3">
            <div className="relative aspect-[4/4.2] bg-neutral-900 sm:aspect-[4/3.8] lg:aspect-[4/3.6]">
              <img
                src={`${displayImage}?auto=format&fit=crop&w=1200&q=90`}
                alt={product.title}
                className="h-full w-full object-cover transition duration-500"
              />
              <div className="absolute right-5 top-5 flex flex-col gap-2">
                {product.isNew && (
                  <span className="rounded-2xl bg-white px-4 py-2 text-xs font-bold text-neutral-950">
                    جدید
                  </span>
                )}

                {hasDiscount && (
                  <span className="rounded-2xl bg-red-500 px-4 py-2 text-xs font-bold text-white">
                    {product.discount}٪ تخفیف
                  </span>
                )}
              </div>

              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="عکس قبلی"
                    onClick={showPreviousImage}
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <button
                    type="button"
                    aria-label="عکس بعدی"
                    onClick={showNextImage}
                    className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div
                    dir="ltr"
                    className="absolute bottom-4 left-1/2 rounded-full bg-black/45 px-3 py-1 text-xs font-bold text-white backdrop-blur"
                  >
                    {currentImageIndex + 1} / {galleryImages.length}
                  </div>
                </>
              )}
            </div>
          </div>

          {galleryImages.length > 1 && (
            <div className="-mx-4 mt-3 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-4 sm:px-0">
              {galleryImages.map((image, index) => {
                const isActive = displayImage === image;

                return (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`w-24 shrink-0 snap-start overflow-hidden rounded-2xl border transition sm:w-28 ${
                      isActive
                        ? "border-white"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="aspect-[4/3.2] bg-neutral-900 sm:aspect-square">
                      <img
                        src={`${image}?auto=format&fit=crop&w=500&q=80`}
                        alt={`${product.title} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-neutral-500 sm:text-sm">
            <Link to="/" className="transition hover:text-white">
              خانه
            </Link>
            <span>/</span>
            <Link
              to={`/${product.category}`}
              className="transition hover:text-white"
            >
              {categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-white">{product.title}</span>
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-500">
            {product.brand}
          </p>

          <h1 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl md:text-5xl">
            {product.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-2xl bg-white/10 px-4 py-2 text-sm text-neutral-300">
              <Star size={15} className="fill-white" />
              {product.rating}
            </span>

            <span className="text-sm text-neutral-500">
              کد محصول: MODE-{product.id}
            </span>
          </div>

          <p className="mt-5 text-sm leading-8 text-neutral-400 sm:text-base">
            {getProductDescription(product)}
          </p>

          <div className="mt-6 flex flex-wrap items-end gap-3 lg:mt-8">
            <p className="text-2xl font-bold md:text-3xl">
              {formatPrice(finalPrice)}
            </p>

            {hasDiscount && (
              <p className="pb-1 text-lg text-neutral-500 line-through">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white">رنگ</h2>
              {selectedColor && (
                <span className="text-sm text-neutral-500">{selectedColor}</span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color;

                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      const selectedVariant = product.variants?.find(
                        (variant) => variant.color === color,
                      );

                      setSelectedColor(color);
                      setSelectedImage(
                        selectedVariant?.image ||
                          galleryImages[0] ||
                          product.image,
                      );
                      setMessage("");
                    }}
                    title={color}
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition ${
                      isSelected
                        ? "border-white"
                        : "border-white/10 hover:border-white/40"
                    }`}
                  >
                    <span
                      className="h-8 w-8 rounded-2xl border border-black/10"
                      style={{ backgroundColor: getColorValue(color) }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white">سایز</h2>
              <Link
                to="/size-guide"
                className="text-sm font-bold text-neutral-400 transition hover:text-white"
              >
                راهنمای سایز
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {product.sizes.map((size) => {
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setMessage("");
                    }}
                    className={`flex h-11 min-w-11 items-center justify-center rounded-2xl border px-3 transition ${
                      isSelected
                        ? "border-white bg-white text-neutral-950"
                        : "border-white/10 hover:border-white/40"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 py-3.5 text-sm font-bold text-neutral-950 transition hover:bg-neutral-200 sm:w-auto"
            >
              افزودن به سبد خرید
              <ShoppingBag size={18} />
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl border px-8 py-3.5 text-sm font-bold transition sm:w-auto ${
                productIsInWishlist
                  ? "border-red-400/40 bg-red-500/10 text-red-300 hover:bg-red-500/15"
                  : "border-white/10 text-white hover:border-white/30 hover:bg-white/10"
              }`}
            >
              {productIsInWishlist
                ? "حذف از علاقه‌مندی‌ها"
                : "افزودن به علاقه‌مندی‌ها"}
              <Heart size={18} />
            </button>
          </div>

          {message && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/4 px-5 py-4 text-sm text-neutral-300">
              {message}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="grid gap-3 border-y border-white/10 py-5 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <Truck className="mt-1 shrink-0 text-neutral-300" size={20} />
            <div>
              <p className="text-sm font-bold text-white">ارسال سریع</p>
              <p className="mt-1 text-sm leading-6 text-neutral-500">
                تحویل سفارش بین ۲ تا ۴ روز کاری.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RotateCcw className="mt-1 shrink-0 text-neutral-300" size={20} />
            <div>
              <p className="text-sm font-bold text-white">بازگشت کالا</p>
              <p className="mt-1 text-sm leading-6 text-neutral-500">
                امکان مرجوعی تا ۷ روز پس از تحویل.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 shrink-0 text-neutral-300" size={20} />
            <div>
              <p className="text-sm font-bold text-white">خرید مطمئن</p>
              <p className="mt-1 text-sm leading-6 text-neutral-500">
                بررسی کیفیت قبل از ارسال سفارش.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/3 p-4 sm:p-5">
          <div className="flex gap-2 overflow-x-auto rounded-2xl bg-neutral-950/70 p-1">
            {[
              { id: "description", label: "توضیحات محصول" },
              { id: "specs", label: "مشخصات" },
              { id: "size", label: "راهنمای انتخاب سایز" },
            ].map((tab) => {
              const isActive = activeInfoTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveInfoTab(tab.id)}
                  className={`h-11 shrink-0 rounded-xl px-4 text-sm font-bold transition sm:px-5 ${
                    isActive
                      ? "bg-white text-neutral-950"
                      : "text-neutral-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 min-h-70">
            {activeInfoTab === "description" && (
              <div>
                <p className="text-sm font-bold text-neutral-500">
                  Description
                </p>
                <h2 className="mt-2 text-2xl font-bold">توضیحات محصول</h2>
                <p className="mt-4 max-w-4xl text-sm leading-8 text-neutral-400 sm:text-base">
                  {getProductDescription(product)}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "مناسب استفاده روزمره و استایل شهری",
                    "قابل ترکیب با آیتم‌های مینیمال و خیابانی",
                    "انتخاب‌شده از کالکشن جدید MODE",
                    "بسته‌بندی تمیز و آماده ارسال",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-2xl bg-white/3 px-4 py-3 text-sm text-neutral-300"
                    >
                      <CheckCircle
                        size={17}
                        className="shrink-0 text-green-400"
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeInfoTab === "specs" && (
              <div>
                <p className="text-sm font-bold text-neutral-500">Details</p>
                <h2 className="mt-2 text-2xl font-bold">مشخصات</h2>

                <div className="mt-5 grid gap-x-6 rounded-2xl border border-white/10 bg-white/2 p-4 sm:grid-cols-2">
                  {specs.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start justify-between gap-4 border-b border-white/10 py-4 text-sm last:border-0 sm:nth-last-2:border-0"
                    >
                      <span className="text-neutral-500">{item.label}</span>
                      <span className="text-left font-bold text-white">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeInfoTab === "size" && (
              <div>
                <div className="flex items-center gap-2">
                  <Ruler size={20} />
                  <h2 className="text-2xl font-bold">راهنمای انتخاب سایز</h2>
                </div>

                <p className="mt-4 max-w-3xl text-sm leading-8 text-neutral-400 sm:text-base">
                  اگر بین دو سایز هستی، برای فرم آزادتر سایز بزرگ‌تر را انتخاب
                  کن. برای انتخاب دقیق‌تر، اندازه‌های بدن را با جدول سایز مقایسه
                  کن و به فرم محصول هم توجه داشته باش.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    "برای کفش، اگر بین دو سایز هستی سایز بزرگ‌تر را انتخاب کن.",
                    "برای لباس‌های اورسایز، سایز معمول خودت کافی است.",
                    "برای لباس کودک، قد کودک از سن دقیق‌تر است.",
                  ].map((tip) => (
                    <div
                      key={tip}
                      className="rounded-2xl bg-white/3 p-4 text-sm leading-7 text-neutral-300"
                    >
                      {tip}
                    </div>
                  ))}
                </div>

                <Link
                  to="/size-guide"
                  className="mt-6 inline-flex rounded-2xl border border-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  مشاهده جدول سایز
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
          <div className="mb-10">
            <p className="text-sm font-bold text-neutral-500">
              پیشنهادهای مشابه
            </p>
            <h2 className="mt-2 text-2xl font-bold md:text-4xl">
              شاید این‌ها را هم دوست داشته باشی
            </h2>
          </div>

          <ProductGrid products={relatedProducts} align="start" />
        </section>
      )}
    </>
  );
}

export default ProductDetails;
