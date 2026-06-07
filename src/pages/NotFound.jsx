import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-bold text-neutral-400">404</p>
      <h1 className="mt-3 text-5xl font-bold">صفحه پیدا نشد</h1>
      <p className="mt-4 max-w-md text-neutral-400">
        مسیری که وارد کردی وجود ندارد یا حذف شده است.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-neutral-950"
      >
        برگشت به خانه
      </Link>
    </div>
  )
}

export default NotFound