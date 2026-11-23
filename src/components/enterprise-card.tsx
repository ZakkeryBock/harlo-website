import { ArrowBadge } from "./platform";
import { Check } from "./ui";

/** The dark, full-width card under a pricing row for operations past the top tier. */
export function EnterpriseCard({
  n,
  unit,
  body,
  perks,
  href,
}: {
  n: string;
  unit: string;
  body: string;
  perks: string[];
  href: string;
}) {
  return (
    <a href={href} className="group on-pine relative mt-5 block overflow-hidden rounded-3xl bg-pine p-7 text-on-pine-muted sm:p-10">
      <div aria-hidden="true" className="ike-field pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-rust/25 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
      <div className="relative grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-14">
        <div>
          <p className="text-[clamp(3.25rem,2.2rem+2.4vw,4.5rem)] leading-none font-extrabold tracking-[-0.05em] whitespace-nowrap text-white">
            {n}
          </p>
          <p className="mt-2 font-semibold text-rust-light">{unit}</p>
        </div>
        <div>
          <p className="text-2xl font-extrabold tracking-tight text-white">Enterprise</p>
          <p className="mt-2 max-w-lg text-on-pine">{body}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {perks.map((x) => (
              <li
                key={x}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-on-pine"
              >
                <Check className="size-3.5 text-rust-light" />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex lg:w-36 lg:justify-end">
          <ArrowBadge label="Talk to us" dark />
        </div>
      </div>
    </a>
  );
}
