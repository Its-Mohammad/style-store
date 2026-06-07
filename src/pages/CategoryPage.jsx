import { useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { categories } from '../data/categories'
import ProductGrid from '../components/product/ProductGrid'
import ProductFilters from '../components/product/ProductFilters'
import { filterAndSortProducts } from '../utils/filterProducts'
import {
  getAvailableColors,
  getAvailableSizes,
} from '../utils/getProductOptions'
import ProductFilterPanel from '../components/product/ProductFilterPanel'

function CategoryPage() {
  const { subcategory } = useParams()
  const location = useLocation()

  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [onlyDiscounted, setOnlyDiscounted] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const mainCategorySlug = location.pathname.split('/')[1]

  const mainCategory = categories.find(
    (category) => category.id === mainCategorySlug
  )

  const currentSubcategory = mainCategory?.subcategories.find(
    (item) => item.slug === subcategory
  )

  const baseProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.category === mainCategorySlug &&
        product.subcategory === subcategory
    )
  }, [mainCategorySlug, subcategory])

  const availableColors = useMemo(() => {
    return getAvailableColors(baseProducts)
  }, [baseProducts])

  const availableSizes = useMemo(() => {
    return getAvailableSizes(baseProducts)
  }, [baseProducts])

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(baseProducts, {
      selectedSubcategory: '',
      selectedColor,
      selectedSize,
      onlyDiscounted,
      minPrice,
      maxPrice,
      sortBy,
    })
  }, [
    baseProducts,
    selectedColor,
    selectedSize,
    onlyDiscounted,
    minPrice,
    maxPrice,
    sortBy,
  ])

  function clearFilters() {
    setSelectedColor('')
    setSelectedSize('')
    setOnlyDiscounted(false)
    setMinPrice('')
    setMaxPrice('')
    setSortBy('newest')
  }

  if (!mainCategory || !currentSubcategory) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-bold text-neutral-500">Category Not Found</p>

        <h1 className="mt-3 text-4xl font-bold">
          دسته‌بندی پیدا نشد
        </h1>

        <Link
          to="/"
          className="mt-8 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-neutral-950"
        >
          برگشت به خانه
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <Link to="/" className="transition hover:text-white">
            خانه
          </Link>

          <span>/</span>

          <Link to={mainCategory.path} className="transition hover:text-white">
            {mainCategory.title}
          </Link>

          <span>/</span>

          <span className="text-white">
            {currentSubcategory.title}
          </span>
        </div>

        <h1 className="mt-5 text-4xl font-bold md:text-5xl">
          {currentSubcategory.title}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-400">
          مشاهده محصولات مربوط به {currentSubcategory.title} از کالکشن {mainCategory.title}.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <ProductFilterPanel resultCount={filteredProducts.length}>
          <ProductFilters
            categories={[]}
            selectedSubcategory=""
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onlyDiscounted={onlyDiscounted}
            minPrice={minPrice}
            maxPrice={maxPrice}
            sortBy={sortBy}
            availableColors={availableColors}
            availableSizes={availableSizes}
            showSubcategoryFilter={false}
            showDiscountFilter={true}
            onSubcategoryChange={() => {}}
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

export default CategoryPage
