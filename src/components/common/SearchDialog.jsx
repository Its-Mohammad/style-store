import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { products } from "../../data/products";
import { formatPrice } from "../../utils/formatPrice";

function normalizeSearchText(value) {
  return String(value)
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\s+/g, " ")
    .trim();
}

function getProductSearchText(product) {
  return normalizeSearchText(
    [
      product.title,
      product.brand,
      product.category,
      product.subcategory,
      product.colors.join(" "),
      product.sizes.join(" "),
      product.tags.join(" "),
    ].join(" "),
  );
}

function SearchDialog({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  const results = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query);

    if (!normalizedQuery) {
      return products.slice(0, 6);
    }

    return products
      .filter((product) =>
        getProductSearchText(product).includes(normalizedQuery),
      )
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-black/75 px-4 py-6 backdrop-blur-sm sm:py-10">
      <button
        type="button"
        aria-label="بستن جستجو"
        onClick={handleClose}
        className="absolute inset-0 cursor-default"
      />

      <div className="relative mx-auto max-h-[88vh] max-w-2xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 p-3 sm:p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-neutral-950">
            <Search size={19} strokeWidth={2.2} />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجوی محصول، رنگ یا دسته"
            className="min-w-0 flex-1 bg-transparent text-right text-base font-bold text-white outline-none placeholder:text-sm placeholder:font-normal placeholder:text-neutral-500"
          />

          <button
            type="button"
            aria-label="بستن جستجو"
            onClick={handleClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 text-neutral-300 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[68vh] overflow-y-auto p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-bold text-white">
              {query ? "نتیجه جستجو" : "محصولات پیشنهادی"}
            </span>
            <span className="text-neutral-500">{results.length} محصول</span>
          </div>

          {results.length > 0 ? (
            <div className="space-y-2">
              {results.map((product) => {
                const hasDiscount = product.discount > 0;
                const finalPrice = hasDiscount
                  ? product.price - (product.price * product.discount) / 100
                  : product.price;

                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={handleClose}
                    className="grid grid-cols-[76px_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-2 transition hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <div className="aspect-square overflow-hidden rounded-xl bg-neutral-900">
                      <img
                        src={`${product.image}?auto=format&fit=crop&w=220&q=75`}
                        alt={product.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 py-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                        {product.brand}
                      </p>
                      <h3 className="mt-1 text-sm font-bold leading-6 text-white">
                        {product.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          {formatPrice(finalPrice)}
                        </span>
                        {hasDiscount && (
                          <span className="rounded-2xl bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                            {product.discount}٪ تخفیف
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-10 text-center">
              <p className="font-bold text-white">محصولی پیدا نشد</p>
              <p className="mt-2 text-sm leading-6 text-neutral-500">
                عبارت کوتاه‌تر یا نام دسته را امتحان کن.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchDialog;
