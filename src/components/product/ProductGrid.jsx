import ProductCard from "./ProductCard";

function ProductGrid({
  products,
  variant = "grid",
  bleed = true,
  align = "center",
  fillDesktop = false,
}) {
  const gridAlignClass =
    align === "start" ? "sm:justify-start" : "sm:justify-center";

  if (variant === "scroll") {
    const mobileScrollSpacing = bleed ? "-mx-6 px-6" : "px-0";
    const mobileItemWidth = bleed ? "w-[210px]" : "w-full";
    const desktopGridClass = fillDesktop
      ? "sm:grid sm:grid-cols-2 lg:grid-cols-5"
      : `sm:grid sm:grid-cols-[repeat(auto-fill,minmax(210px,210px))] ${gridAlignClass}`;

    return (
      <div
        className={`${mobileScrollSpacing} flex snap-x gap-3 overflow-x-auto pb-3 sm:mx-0 ${desktopGridClass} sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0`}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className={`${mobileItemWidth} shrink-0 snap-start sm:w-auto`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-2 gap-3 ${gridAlignClass} sm:gap-4 sm:grid-cols-[repeat(auto-fill,minmax(210px,210px))]`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
