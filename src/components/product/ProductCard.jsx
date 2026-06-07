import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import { getColorValue } from "../../utils/colorMap";

function ProductCard({ product }) {
  const hasDiscount = product.discount > 0;

  const finalPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/4.6] overflow-hidden bg-neutral-900">
          <img
            src={`${product.image}?auto=format&fit=crop&w=700&q=80`}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute right-3 top-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="rounded-2xl bg-white px-2.5 py-1 text-[10px] font-bold text-neutral-950">
                جدید
              </span>
            )}

            {hasDiscount && (
              <span className="rounded-2xl bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white">
                {product.discount}٪ تخفیف
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2.5 p-3.5 sm:p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                {product.brand}
              </p>

              <h3 className="mt-1.5 min-h-10 text-sm leading-5 text-white sm:min-h-12 sm:text-base sm:leading-6">
                {product.title}
              </h3>
            </div>

            <span className="shrink-0 rounded-2xl bg-white/10 px-2.5 py-1 text-xs text-neutral-300">
              ★ {product.rating}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-white">
              {formatPrice(finalPrice)}
            </p>

            {hasDiscount && (
              <p className="text-xs text-neutral-500 line-through">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color}
                  title={color}
                  className="h-3.5 w-3.5 rounded-2xl border border-white/20"
                  style={{ backgroundColor: getColorValue(color) }}
                />
              ))}

              {product.colors.length > 4 && (
                <span className="text-[10px] text-neutral-500">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-400">
              {product.sizes.length} سایز
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
