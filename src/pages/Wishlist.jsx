import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { useWishlist } from '../context/WishlistContext'
import ProductGrid from '../components/product/ProductGrid'

function Wishlist() {
  const { wishlistItems } = useWishlist()

  const wishlistProducts = products.filter((product) =>
    wishlistItems.includes(product.id)
  )

  if (wishlistProducts.length === 0) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-bold text-neutral-500">
          Wishlist
        </p>

        <h1 className="mt-3 text-4xl font-bold md:text-5xl">
          علاقه‌مندی‌ها خالیه
        </h1>

        <p className="mt-5 max-w-md text-neutral-400">
          هنوز محصولی رو به علاقه‌مندی‌ها اضافه نکردی. محصول‌هایی که دوست داری رو ذخیره کن تا بعداً راحت‌تر پیداشون کنی.
        </p>

        <Link
          to="/products"
          className="mt-8 rounded-2xl bg-white px-7 py-4 text-sm font-bold text-neutral-950 transition hover:bg-neutral-200"
        >
          دیدن محصولات
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="text-sm font-bold text-neutral-500">
          Wishlist
        </p>

        <h1 className="mt-2 text-4xl font-bold md:text-5xl">
          علاقه‌مندی‌ها
        </h1>

        <p className="mt-4 max-w-2xl text-neutral-400">
          محصول‌هایی که ذخیره کردی اینجا نمایش داده می‌شن.
        </p>
      </div>

      <ProductGrid products={wishlistProducts} />
    </section>
  )
}

export default Wishlist
