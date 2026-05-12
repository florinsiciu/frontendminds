import type { FaqItem } from "@/types/assessment";

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-6">
      <div className="border-t border-white/[0.06] pt-10">
        <h2 className="mb-6 font-heading text-2xl font-semibold text-foreground">
          Frequently Asked Questions
        </h2>
        <dl className="space-y-6">
          {items.map((item) => (
            <div key={item.question}>
              <dt className="text-[0.95rem] font-medium leading-7 text-foreground">
                {item.question}
              </dt>
              <dd className="mt-2 text-[0.9rem] leading-7 text-foreground/70">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
