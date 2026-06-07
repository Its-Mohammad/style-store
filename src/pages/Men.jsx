import { useMemo, useState } from "react";
import { products } from "../data/products";
import { categories } from "../data/categories";
import ProductGrid from "../components/product/ProductGrid";
import ProductFilters from "../components/product/ProductFilters";
import { filterAndSortProducts } from "../utils/filterProducts";
import {
  getAvailableColors,
  getAvailableSizes,
} from "../utils/getProductOptions";
import ProductFilterPanel from "../components/product/ProductFilterPanel";

function Men() {
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const menCategory = categories.find((category) => category.id === "men");

  const menProducts = useMemo(() => {
    return products.filter((product) => product.category === "men");
  }, []);

  const availableColors = useMemo(() => {
    return getAvailableColors(menProducts);
  }, [menProducts]);

  const availableSizes = useMemo(() => {
    return getAvailableSizes(menProducts);
  }, [menProducts]);

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(menProducts, {
      selectedSubcategory,
      selectedColor,
      selectedSize,
      onlyDiscounted,
      minPrice,
      maxPrice,
      sortBy,
    });
  }, [
    menProducts,
    selectedSubcategory,
    selectedColor,
    selectedSize,
    onlyDiscounted,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  function clearFilters() {
    setSelectedSubcategory("");
    setSelectedColor("");
    setSelectedSize("");
    setOnlyDiscounted(false);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-bold text-neutral-500">Men Collection</p>

        <h1 className="mt-2 text-4xl font-bold md:text-5xl">پوشاک مردانه</h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-400">
          انتخابی از لباس‌ها، کفش‌ها و آیتم‌های ضروری برای استایل روزمره و
          خیابانی مردانه.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <ProductFilterPanel resultCount={filteredProducts.length}>
          <ProductFilters
            categories={menCategory.subcategories}
            selectedSubcategory={selectedSubcategory}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onlyDiscounted={onlyDiscounted}
            minPrice={minPrice}
            maxPrice={maxPrice}
            sortBy={sortBy}
            availableColors={availableColors}
            availableSizes={availableSizes}
            onSubcategoryChange={setSelectedSubcategory}
            onColorChange={setSelectedColor}
            onSizeChange={setSelectedSize}
            onDiscountChange={setOnlyDiscounted}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onSortChange={setSortBy}
            onClearFilters={clearFilters}
            resultCount={filteredProducts.length}
          />
        </ProductFilterPanel>

        <div>
          <div className="mb-5 hidden items-center justify-between gap-4 lg:flex">
            <p className="text-sm text-neutral-400">
              {filteredProducts.length} محصول پیدا شد
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 text-center">
              <h2 className="text-2xl font-bold">محصولی پیدا نشد</h2>
              <p className="mt-3 text-neutral-400">
                فیلترها رو تغییر بده تا محصولات بیشتری ببینی.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Men;
