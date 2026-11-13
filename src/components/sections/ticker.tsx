import { Marquee } from "@/components/ui/marquee"

function Ticker({ items }: { items: string[] }) {
  return (
    <Marquee
      data-slot="ticker"
      duration={32}
      className="bg-brand py-4 text-brand-foreground [--marquee-gap:--spacing(8)]"
    >
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center gap-8 font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-none whitespace-nowrap"
        >
          {item}
          <svg
            aria-hidden
            viewBox="0 0 16 10"
            className="h-5 w-8 fill-current"
          >
            <path d="M0 0 8 3l8-3v7l-8 3-8-3z" />
          </svg>
        </span>
      ))}
    </Marquee>
  )
}

export { Ticker }
