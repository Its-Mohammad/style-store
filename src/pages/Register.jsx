import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const result = register(name, email, password)

    setMessage(result.message)

    if (result.success) {
      navigate('/account')
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm font-bold text-neutral-500">Register</p>

        <h1 className="mt-2 text-3xl font-bold">
          ساخت حساب کاربری
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-bold text-white">
              نام و نام خانوادگی
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm outline-none transition focus:border-white/30"
              placeholder="مثلاً محمد بابایی"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-white">
              ایمیل
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm outline-none transition focus:border-white/30"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-white">
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm outline-none transition focus:border-white/30"
              placeholder="حداقل ۸ کاراکتر"
            />
          </div>

          {message && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-neutral-300">
              {message}
            </div>
          )}

          <button className="w-full rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-neutral-950 transition hover:bg-neutral-200">
            ثبت‌نام
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-neutral-400">
          قبلاً حساب ساختی؟{' '}
          <Link to="/login" className="font-bold text-white">
            وارد شو
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register