import { CountUp } from "@/components/motion/count-up"
import type { Dictionary } from "@/i18n/dictionaries/fr"

function StatsRow({ stats }: { stats: Dictionary["home"]["intro"]["stats"] }) {
  return (
    <dl
      data-slot="stats-row"
      className="flex items-start justify-between gap-x-4"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse gap-1">
          <dt className="max-w-28 text-sm leading-snug text-muted-foreground">
            {stat.label}
          </dt>
          <dd className="font-display text-[clamp(3rem,5vw,4.5rem)] leading-none whitespace-nowrap">
            <CountUp value={stat.value} suffix={stat.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  )
}

export { StatsRow }
