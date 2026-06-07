import { useMemo, useState } from "react";
import ProductGrid from "../components/product/ProductGrid";
import ProductFilterPanel from "../components/product/ProductFilterPanel";
import ProductFilters from "../components/product/ProductFilters";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { filterAndSortProducts } from "../utils/filterProducts";
import {
  getAvailableColors,
  getAvailableSizes,
} from "../utils/getProductOptions";

function NewArrivals() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const newProducts = useMemo(() => {
    return products.filter((product) => product.isNew);
  }, []);

  const selectedCategoryData = categories.find(
    (category) => category.id === selectedCategory,
  );

  const subcategoryOptions = selectedCategoryData?.subcategories ?? [];

  const optionBaseProducts = useMemo(() => {
    return newProducts.filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      if (selectedSubcategory && product.subcategory !== selectedSubcategory) {
        return false;
      }

      return true;
    });
  }, [newProducts, selectedCategory, selectedSubcategory]);

  const availableColors = useMemo(() => {
    return getAvailableColors(optionBaseProducts);
  }, [optionBaseProducts]);

  const availableSizes = useMemo(() => {
    return getAvailableSizes(optionBaseProducts);
  }, [optionBaseProducts]);

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(newProducts, {
      selectedCategory,
      selectedSubcategory,
      selectedColor,
      selectedSize,
      onlyDiscounted,
      minPrice,
      maxPrice,
      sortBy,
    });
  }, [
    newProducts,
    selectedCategory,
    selectedSubcategory,
    selectedColor,
    selectedSize,
    onlyDiscounted,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  function handleCategoryChange(categoryId) {
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
  }

  function clearFilters() {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSelectedColor("");
    setSelectedSize("");
    setOnlyDiscounted(false);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 text-right">
      <div className="mb-10">
        <p className="text-sm font-bold text-neutral-500">New Arrivals</p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">جدیدترین‌ها</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-400">
          تازه‌ترین محصولاتی که به مجموعه فروشگاه اضافه شده‌اند؛ با امکان
          فیلتر بر اساس دسته، رنگ، سایز، قیمت و تخفیف.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <ProductFilterPanel resultCount={filteredProducts.length}>
          <ProductFilters
            categoryOptions={categories}
            selectedCategory={selectedCategory}
            categories={subcategoryOptions}
            selectedSubcategory={selectedSubcategory}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onlyDiscounted={onlyDiscounted}
            minPrice={minPrice}
            maxPrice={maxPrice}
            sortBy={sortBy}
            availableColors={availableColors}
            availableSizes={availableSizes}
            showCategoryFilter
            showSubcategoryFilter={Boolean(selectedCategory)}
            onCategoryChange={handleCategoryChange}
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
                فیلترها را تغییر بده تا محصولات بیشتری ببینی.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
