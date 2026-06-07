import { useMemo, useState } from 'react'
import { products } from '../data/products'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilters from '../components/product/ProductFilters'
import { filterAndSortProducts } from '../utils/filterProducts'
import {
  getAvailableColors,
  getAvailableSizes,
} from '../utils/getProductOptions'
import ProductFilterPanel from '../components/product/ProductFilterPanel'

function Sale() {
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('discount')

  const saleProducts = useMemo(() => {
    return products.filter((product) => product.discount > 0)
  }, [])

  const availableColors = useMemo(() => {
    return getAvailableColors(saleProducts)
  }, [saleProducts])

  const availableSizes = useMemo(() => {
    return getAvailableSizes(saleProducts)
  }, [saleProducts])

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(saleProducts, {
      selectedSubcategory: '',
      selectedColor,
      selectedSize,
      onlyDiscounted: false,
      minPrice,
      maxPrice,
      sortBy,
    })
  }, [saleProducts, selectedColor, selectedSize, minPrice, maxPrice, sortBy])

  function clearFilters() {
    setSelectedColor('')
    setSelectedSize('')
    setMinPrice('')
    setMaxPrice('')
    setSortBy('discount')
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-bold text-red-400">Limited Offers</p>

        <h1 className="mt-2 text-4xl font-bold md:text-5xl">
          تخفیف‌های ویژه
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-400">
          بهترین آیتم‌های فصل با قیمت کمتر؛ قبل از تمام شدن سایزها انتخاب کن.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <ProductFilterPanel resultCount={filteredProducts.length}>
          <ProductFilters
            categories={[]}
            selectedSubcategory=""
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onlyDiscounted={false}
            minPrice={minPrice}
            maxPrice={maxPrice}
            sortBy={sortBy}
            availableColors={availableColors}
            availableSizes={availableSizes}
            onSubcategoryChange={() => {}}
            onColorChange={setSelectedColor}
            onSizeChange={setSelectedSize}
            onDiscountChange={() => {}}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
            onSortChange={setSortBy}
            onClearFilters={clearFilters}
            showDiscountFilter={false}
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
              <h2 className="text-2xl font-bold">
                محصولی پیدا نشد
              </h2>
              <p className="mt-3 text-neutral-400">
                فیلترها رو تغییر بده تا محصولات بیشتری ببینی.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Sale
