export function getRelatedProducts(currentProduct, allProducts, limit = 4) {
  return allProducts
    .filter((product) => product.id !== currentProduct.id)
    .map((product) => {
      let score = 0

      if (product.category === currentProduct.category) {
        score += 3
      }

      if (product.subcategory === currentProduct.subcategory) {
        score += 5
      }

      const sharedTags = product.tags.filter((tag) =>
        currentProduct.tags.includes(tag)
      )

      score += sharedTags.length * 2

      return {
        ...product,
        similarityScore: score,
      }
    })
    .filter((product) => product.similarityScore > 0)
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, limit)
}