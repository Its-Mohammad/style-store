import ProductGrid from "../components/product/ProductGrid";
import { products } from "../data/products";

function Products() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 text-right sm:px-6 lg:py-14">
      <div className="mb-10">
        <p className="text-sm font-bold text-neutral-500">All Products</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
          همه محصولات
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-neutral-400 sm:text-base">
          تمام محصولات موجود در فروشگاه MODE، شامل پوشاک مردانه، زنانه،
          بچگانه، کفش و اکسسوری.
        </p>
      </div>

      <ProductGrid products={products} align="start" />
    </section>
  );
}

export default Products;
