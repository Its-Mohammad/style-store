import { Link } from "react-router-dom";
import { products } from "../data/products";
import { useWishlist } from "../context/WishlistContext";
import ProductGrid from "../components/product/ProductGrid";

function AccountWishlist() {
  const { wishlistItems } = useWishlist();

  const wishlistProducts = products.filter((product) =>
    wishlistItems.includes(product.id),
  );

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
      <div>
        <p className="text-sm font-bold text-neutral-500">Wishlist</p>
        <h2 className="mt-2 text-2xl font-bold">علاقه‌مندی‌ها</h2>
      </div>

      {wishlistProducts.length > 0 ? (
        <div className="mt-6">
          <ProductGrid products={wishlistProducts} align="start" />
        </div>
      ) : (
        <div className="mt-6 rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.02] p-6 text-center">
          <h3 className="text-xl font-bold">لیست علاقه‌مندی‌ها خالی است</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-neutral-400">
            محصولاتی که دوست داری را با آیکن قلب ذخیره کن تا بعدا سریع‌تر
            پیدایشان کنی.
          </p>
          <Link
            to="/products"
            className="mt-5 inline-flex rounded-2xl bg-white px-6 py-3 text-sm font-bold text-neutral-950"
          >
            دیدن محصولات
          </Link>
        </div>
      )}
    </div>
  );
}

export default AccountWishlist;
