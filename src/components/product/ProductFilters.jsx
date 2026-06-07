import { formatPrice } from "../../utils/formatPrice";
import { ChevronDown } from "lucide-react";

function ProductFilters({
  categoryOptions = [],
  selectedCategory = "",
  categories,
  selectedSubcategory,
  selectedColor,
  selectedSize,
  onlyDiscounted,
  minPrice,
  maxPrice,
  sortBy,
  availableColors,
  availableSizes,
  showHeader = true,
  showCategoryFilter = false,
  showSubcategoryFilter = true,
  showDiscountFilter = true,
  onCategoryChange,
  onSubcategoryChange,
  onColorChange,
  onSizeChange,
  onDiscountChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSortChange,
  onClearFilters,
  resultCount,
}) {
  return (
    <aside className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 lg:sticky lg:top-28">
      {showHeader && (
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold">فیلترها</h2>

          <button
            type="button"
            onClick={onClearFilters}
            className="text-sm font-bold text-neutral-500 transition hover:text-white"
          >
            پاک کردن
          </button>
        </div>
      )}

      <div className={`${showHeader ? "mt-5 " : ""}space-y-5`}>
        {typeof resultCount === "number" && (
          <p className="rounded-2xl bg-white/[0.04] px-4 py-3 text-sm text-neutral-300 lg:hidden">
            {resultCount} محصول پیدا شد
          </p>
        )}

        <div>
          <label className="text-sm font-bold text-white">مرتب‌سازی</label>

          <div className="relative mt-3">
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              className="w-full appearance-none rounded-2xl border border-white/10 bg-neutral-950 pt-2 pb-4 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white/30"
            >
              <option value="newest">جدیدترین</option>
              <option value="price-low">ارزان‌ترین</option>
              <option value="price-high">گران‌ترین</option>
              <option value="discount">بیشترین تخفیف</option>
              <option value="rating">بیشترین امتیاز</option>
            </select>
            <ChevronDown
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
          </div>
        </div>

        {showCategoryFilter && categoryOptions?.length > 0 && (
          <div>
            <label className="text-sm font-bold text-white">دسته‌بندی</label>

            <div className="relative mt-3">
              <select
                value={selectedCategory}
                onChange={(event) => onCategoryChange(event.target.value)}
                className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-neutral-950 px-4 pb-3 pt-2 text-sm text-white outline-none transition focus:border-white/30"
              >
                <option value="">همه دسته‌ها</option>
                {categoryOptions.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
            </div>
          </div>
        )}

        {showSubcategoryFilter && categories?.length > 0 && (
          <div>
            <label className="text-sm font-bold text-white">زیردسته</label>

            <div className="relative mt-3">
              <select
                value={selectedSubcategory}
                onChange={(event) => onSubcategoryChange(event.target.value)}
                className="w-full appearance-none rounded-2xl border border-white/10 bg-neutral-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white/30"
              >
                <option value="">همه زیردسته‌ها</option>
                {categories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.slug}>
                    {subcategory.title}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-bold text-white">بازه قیمت</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <label className="block">
              <span className="text-xs text-neutral-500">از</span>
              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(event) => onMinPriceChange(event.target.value)}
                className="mt-1 h-11 w-full rounded-2xl border border-white/10 bg-neutral-950 px-3 text-sm outline-none focus:border-white/30"
                placeholder="0"
              />
            </label>

            <label className="block">
              <span className="text-xs text-neutral-500">تا</span>
              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) => onMaxPriceChange(event.target.value)}
                className="mt-1 h-11 w-full rounded-2xl border border-white/10 bg-neutral-950 px-3 text-sm outline-none focus:border-white/30"
                placeholder="مثلا 3000000"
              />
            </label>
          </div>

          {(minPrice || maxPrice) && (
            <p className="mt-2 text-xs leading-6 text-neutral-500">
              {minPrice ? `از ${formatPrice(Number(minPrice))}` : "از هر قیمت"}{" "}
              تا {maxPrice ? formatPrice(Number(maxPrice)) : "بدون محدودیت"}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-bold text-white">رنگ</label>

          <div className="relative mt-3">
            <select
              value={selectedColor}
              onChange={(event) => onColorChange(event.target.value)}
              className="w-full appearance-none rounded-2xl border border-white/10 bg-neutral-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white/30"
            >
              <option value="">همه رنگ‌ها</option>
              {availableColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <ChevronDown
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-white">سایز</label>

          <div className="relative mt-3">
            <select
              value={selectedSize}
              onChange={(event) => onSizeChange(event.target.value)}
              className="w-full appearance-none rounded-2xl border border-white/10 bg-neutral-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white/30"
            >
              <option value="">همه سایزها</option>
              {availableSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <ChevronDown
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
          </div>
        </div>

        {showDiscountFilter && (
          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="text-sm font-bold text-white">
              فقط تخفیف‌دارها
            </span>

            <input
              type="checkbox"
              checked={onlyDiscounted}
              onChange={(event) => onDiscountChange(event.target.checked)}
              className="h-4 w-4 accent-white"
            />
          </label>
        )}
      </div>
    </aside>
  );
}

export default ProductFilters;
