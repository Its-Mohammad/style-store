function getFinalPrice(product) {
  if (product.discount > 0) {
    return product.price - (product.price * product.discount) / 100
  }

  return product.price
}

export function filterAndSortProducts(products, filters) {
  const {
    selectedSubcategory,
    selectedCategory,
    selectedColor,
    selectedSize,
    onlyDiscounted,
    minPrice,
    maxPrice,
    sortBy,
  } = filters

  let result = [...products]

  if (selectedCategory) {
    result = result.filter((product) => product.category === selectedCategory)
  }

  if (selectedSubcategory) {
    result = result.filter(
      (product) => product.subcategory === selectedSubcategory
    )
  }

  if (selectedColor) {
    result = result.filter((product) =>
      product.colors.includes(selectedColor)
    )
  }

  if (selectedSize) {
    result = result.filter((product) =>
      product.sizes.includes(selectedSize)
    )
  }

  if (onlyDiscounted) {
    result = result.filter((product) => product.discount > 0)
  }

  if (minPrice) {
    result = result.filter((product) => getFinalPrice(product) >= Number(minPrice))
  }

  if (maxPrice) {
    result = result.filter((product) => getFinalPrice(product) <= Number(maxPrice))
  }

  if (sortBy === 'price-low') {
    result.sort((a, b) => getFinalPrice(a) - getFinalPrice(b))
  }

  if (sortBy === 'price-high') {
    result.sort((a, b) => getFinalPrice(b) - getFinalPrice(a))
  }

  if (sortBy === 'discount') {
    result.sort((a, b) => b.discount - a.discount)
  }

  if (sortBy === 'rating') {
    result.sort((a, b) => b.rating - a.rating)
  }

  if (sortBy === 'newest') {
    result.sort((a, b) => b.id - a.id)
  }

  return result
}
