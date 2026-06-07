import { useState } from "react";
import {
  getStoredAddresses,
  saveStoredAddresses,
} from "../utils/addressesStorage";

const emptyAddress = {
  receiver: "",
  phone: "",
  city: "",
  postalCode: "",
  address: "",
};

function AccountAddresses() {
  const [addresses, setAddresses] = useState(getStoredAddresses);
  const [form, setForm] = useState(emptyAddress);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const isEditing = Boolean(editingId);

  function persistAddresses(nextAddresses) {
    setAddresses(nextAddresses);
    saveStoredAddresses(nextAddresses);
  }

  function updateField(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(emptyAddress);
    setEditingId(null);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.receiver || !form.phone || !form.city || !form.address) {
      setError("نام گیرنده، موبایل، شهر و آدرس کامل را وارد کن.");
      return;
    }

    if (isEditing) {
      const nextAddresses = addresses.map((address) =>
        address.id === editingId ? { ...address, ...form } : address,
      );

      persistAddresses(nextAddresses);
      resetForm();
      return;
    }

    const nextAddress = {
      id: Date.now(),
      isDefault: addresses.length === 0,
      ...form,
    };

    persistAddresses([nextAddress, ...addresses]);
    resetForm();
  }

  function startEdit(address) {
    setEditingId(address.id);
    setForm({
      receiver: address.receiver,
      phone: address.phone,
      city: address.city,
      postalCode: address.postalCode || "",
      address: address.address,
    });
    setError("");
  }

  function removeAddress(addressId) {
    const nextAddresses = addresses.filter((address) => address.id !== addressId);

    if (nextAddresses.length > 0 && !nextAddresses.some((item) => item.isDefault)) {
      nextAddresses[0] = {
        ...nextAddresses[0],
        isDefault: true,
      };
    }

    persistAddresses(nextAddresses);

    if (editingId === addressId) {
      resetForm();
    }
  }

  function makeDefault(addressId) {
    const nextAddresses = addresses.map((address) => ({
      ...address,
      isDefault: address.id === addressId,
    }));

    persistAddresses(nextAddresses);
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm font-bold text-neutral-500">Addresses</p>
            <h2 className="mt-2 text-2xl font-bold">آدرس‌های من</h2>
            <p className="mt-2 text-sm leading-7 text-neutral-400">
              آدرس‌هایی که اینجا ذخیره می‌کنی در صفحه پرداخت قابل انتخاب هستند.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-bold text-white">نام گیرنده</span>
            <input
              name="receiver"
              value={form.receiver}
              onChange={updateField}
              className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 text-right text-sm outline-none focus:border-white/30"
              placeholder="مثلا محمد رضایی"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-white">شماره موبایل</span>
            <input
              name="phone"
              value={form.phone}
              onChange={updateField}
              className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 text-right text-sm outline-none focus:border-white/30"
              placeholder="09123456789"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-white">شهر</span>
            <input
              name="city"
              value={form.city}
              onChange={updateField}
              className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 text-right text-sm outline-none focus:border-white/30"
              placeholder="تهران"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-white">کد پستی</span>
            <input
              name="postalCode"
              value={form.postalCode}
              onChange={updateField}
              className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 text-right text-sm outline-none focus:border-white/30"
              placeholder="اختیاری"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm font-bold text-white">آدرس کامل</span>
            <textarea
              name="address"
              value={form.address}
              onChange={updateField}
              rows={4}
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-right text-sm leading-7 outline-none focus:border-white/30"
              placeholder="خیابان، کوچه، پلاک، واحد"
            />
          </label>

          {error && (
            <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300 md:col-span-2">
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-neutral-950">
              {isEditing ? "ذخیره ویرایش" : "افزودن آدرس"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-2xl border border-white/10 px-6 py-3 text-sm font-bold text-neutral-300"
              >
                انصراف
              </button>
            )}
          </div>
        </form>
      </div>

      {addresses.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/[0.02] p-6 text-center">
          <h3 className="text-xl font-bold">هنوز آدرسی ثبت نشده</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-neutral-400">
            اولین آدرس را از فرم بالا اضافه کن تا هنگام پرداخت سریع‌تر سفارش را
            ثبت کنی.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <article
              key={address.id}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold">{address.receiver}</h3>
                    {address.isDefault && (
                      <span className="rounded-2xl bg-white px-2.5 py-1 text-[11px] font-bold text-neutral-950">
                        پیش‌فرض
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-neutral-400">
                    {address.phone} - {address.city}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-neutral-300">
                {address.address}
              </p>

              {address.postalCode && (
                <p className="mt-2 text-sm text-neutral-500">
                  کد پستی: {address.postalCode}
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                {!address.isDefault && (
                  <button
                    type="button"
                    onClick={() => makeDefault(address.id)}
                    className="text-sm font-bold text-neutral-300 hover:text-white"
                  >
                    انتخاب پیش‌فرض
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => startEdit(address)}
                  className="text-sm font-bold text-neutral-300 hover:text-white"
                >
                  ویرایش
                </button>
                <button
                  type="button"
                  onClick={() => removeAddress(address.id)}
                  className="text-sm font-bold text-red-300"
                >
                  حذف
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default AccountAddresses;
