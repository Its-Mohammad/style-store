import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AccountProfile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    updateProfile({
      name,
      email,
      phone,
    });

    setMessage("اطلاعات حساب با موفقیت ذخیره شد.");
  }

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-2xl font-bold">اطلاعات حساب</h2>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-bold text-white">
            نام و نام خانوادگی
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm outline-none focus:border-white/30"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-white">ایمیل</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm outline-none focus:border-white/30"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-white">شماره تماس</label>
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm outline-none focus:border-white/30"
          />
        </div>

        <div className="md:col-span-2">
          <button className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-neutral-950">
            ذخیره تغییرات
          </button>
        </div>
      </form>

      {message && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-neutral-300">
          {message}
        </div>
      )}
    </div>
  );
}

export default AccountProfile;
