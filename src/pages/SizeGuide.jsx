import { useState } from "react";
import { Ruler } from "lucide-react";

const tabs = ["مردانه", "زنانه", "بچگانه"];

const tables = {
  مردانه: {
    headers: ["سایز", "دور سینه", "دور کمر", "دور باسن", "قد پیشنهادی"],
    rows: [
      ["S", "۸۶-۹۰", "۷۴-۷۸", "۹۰-۹۴", "۱۷۰-۱۷۸"],
      ["M", "۹۰-۹۶", "۷۸-۸۴", "۹۴-۱۰۰", "۱۷۶-۱۸۲"],
      ["L", "۹۶-۱۰۲", "۸۴-۹۰", "۱۰۰-۱۰۶", "۱۸۰-۱۸۶"],
      ["XL", "۱۰۲-۱۱۰", "۹۰-۹۸", "۱۰۶-۱۱۴", "۱۸۴-۱۹۰"],
    ],
  },
  زنانه: {
    headers: ["سایز", "دور سینه", "دور کمر", "دور باسن", "قد پیشنهادی"],
    rows: [
      ["S", "۸۰-۸۴", "۶۴-۶۸", "۸۸-۹۲", "۱۵۸-۱۶۴"],
      ["M", "۸۴-۹۰", "۶۸-۷۴", "۹۲-۹۸", "۱۶۲-۱۶۸"],
      ["L", "۹۰-۹۶", "۷۴-۸۰", "۹۸-۱۰۴", "۱۶۶-۱۷۲"],
      ["XL", "۹۶-۱۰۴", "۸۰-۸۸", "۱۰۴-۱۱۲", "۱۶۸-۱۷۴"],
    ],
  },
  بچگانه: {
    headers: ["سایز", "سن", "قد", "دور سینه", "دور کمر"],
    rows: [
      ["4Y", "۳-۴", "۹۸-۱۰۴", "۵۶-۵۸", "۵۲-۵۴"],
      ["6Y", "۵-۶", "۱۱۰-۱۱۶", "۶۱-۶۴", "۵۶-۵۸"],
      ["8Y", "۷-۸", "۱۲۲-۱۲۸", "۶۵-۶۸", "۵۸-۶۱"],
      ["10Y", "۹-۱۰", "۱۳۴-۱۴۰", "۶۹-۷۲", "۶۱-۶۴"],
    ],
  },
};

const tips = [
  {
    title: "متر را آزاد نگه دار",
    desc: "متر نباید خیلی سفت یا خیلی شل دور بدن قرار بگیرد.",
  },
  {
    title: "بین دو سایز",
    desc: "برای لباس‌های آزادتر سایز بزرگ‌تر و برای فیت جذب سایز کوچک‌تر را انتخاب کن.",
  },
  {
    title: "مدل محصول مهم است",
    desc: "هودی اورسایز، کت و شلوار جذب ممکن است الگوی سایزبندی متفاوتی داشته باشند.",
  },
];

function SizeGuide() {
  const [activeTab, setActiveTab] = useState("مردانه");
  const table = tables[activeTab];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 text-right sm:px-6 lg:py-14">
      <div>
        <p className="text-sm font-bold text-neutral-500">Size Guide</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
          راهنمای سایز
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-8 text-neutral-400 sm:text-base">
          برای انتخاب سایز مناسب، اندازه‌های بدن را با جدول زیر مقایسه کن.
          اندازه‌ها بر حسب سانتی‌متر هستند.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-end gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
              activeTab === tab
                ? "bg-white text-neutral-950"
                : "border border-white/10 text-neutral-300 hover:bg-white/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-white/[0.03]">
        <table className="w-full min-w-[680px] text-right text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.04]">
              {table.headers.map((header) => (
                <th key={header} className="px-5 py-4 font-bold text-white">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row[0]} className="border-b border-white/10 last:border-0">
                {row.map((cell, index) => (
                  <td
                    key={cell}
                    className={`px-5 py-4 ${
                      index === 0 ? "font-bold text-white" : "text-neutral-300"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {tips.map((tip) => (
          <article
            key={tip.title}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
          >
            <Ruler className="h-10 w-10 rounded-2xl bg-white/10 p-2" />
            <h2 className="mt-4 font-bold">{tip.title}</h2>
            <p className="mt-2 text-sm leading-7 text-neutral-400">
              {tip.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SizeGuide;
