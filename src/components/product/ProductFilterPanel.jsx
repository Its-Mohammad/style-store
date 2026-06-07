import { cloneElement, isValidElement, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

function ProductFilterPanel({ children, resultCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const mobileChildren = isValidElement(children)
    ? cloneElement(children, { showHeader: false })
    : children;

  return (
    <>
      <div className="mb-5 flex items-center justify-between gap-4 lg:hidden">
        <p className="text-sm text-neutral-400">{resultCount} محصول پیدا شد</p>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/30 hover:bg-white/10"
        >
          <SlidersHorizontal size={17} />
          فیلترها
        </button>
      </div>

      <div className="hidden lg:block">{children}</div>

      {isOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            aria-label="بستن فیلترها"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/70"
          />

          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[2rem] border-t border-white/10 bg-neutral-950 p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">فیلترها</h2>

              <button
                type="button"
                aria-label="بستن"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 text-neutral-300"
              >
                <X size={18} />
              </button>
            </div>

            {mobileChildren}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-neutral-950"
            >
              نمایش نتیجه‌ها
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductFilterPanel;
