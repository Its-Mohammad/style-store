import { Link } from 'react-router-dom'

function CategoryChips({ category }) {
  return (
    <div className="mb-10 flex flex-wrap gap-3">
      {category.subcategories.map((subcategory) => (
        <Link
          key={subcategory.id}
          to={`${category.path}/${subcategory.slug}`}
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-neutral-300 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
        >
          {subcategory.title}
        </Link>
      ))}
    </div>
  )
}

export default CategoryChips 