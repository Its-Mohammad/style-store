export function getAvailableColors(products) {
  const colors = products.flatMap((product) => product.colors)

  return [...new Set(colors)]
}

export function getAvailableSizes(products) {
  const sizes = products.flatMap((product) => product.sizes)

  return [...new Set(sizes)]
}