import type { FaqItem } from "@/types/assessment";

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-6">
      <div className="mt-10 rounded-xl border border-white/[0.06] bg-surface/50 p-6 sm:p-8">
        <h2 className="mb-6 font-heading text-xl font-semibold text-indigo-400">
          Frequently Asked Questions
        </h2>
        <dl className="space-y-5">
          {items.map((item) => (
            <div
              key={item.question}
              className="border-b border-white/[0.04] pb-5 last:border-0 last:pb-0"
            >
              <dt className="text-[0.95rem] font-medium leading-7 text-foreground">
                {item.question}
              </dt>
              <dd className="mt-2 text-[0.88rem] leading-7 text-foreground/60">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
