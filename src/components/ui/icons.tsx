import type { ComponentProps } from "react"

type IconProps = ComponentProps<"svg">

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <Icon fill="var(--color-orange)" stroke="none" {...props}>
      <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
    </Icon>
  )
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Icon strokeWidth="2" {...props}>
      <path d="M7 17L17 7M8 7h9v9" />
    </Icon>
  )
}

export function ImageIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="M21 15l-5-5L5 21" />
    </Icon>
  )
}

export function PlayIcon(props: IconProps) {
  return (
    <Icon width="12" height="12" fill="currentColor" stroke="none" {...props}>
      <path d="M6 4l14 8-14 8z" />
    </Icon>
  )
}

export function PauseIcon(props: IconProps) {
  return (
    <Icon width="12" height="12" fill="currentColor" stroke="none" {...props}>
      <rect x="5" y="4" width="5" height="16" />
      <rect x="14" y="4" width="5" height="16" />
    </Icon>
  )
}

export function LongArrowLeftIcon(props: IconProps) {
  return (
    <Icon
      width="28"
      height="12"
      viewBox="0 0 28 12"
      strokeWidth="1.2"
      {...props}
    >
      <path d="M27 6H1M6 1L1 6l5 5" />
    </Icon>
  )
}

export function LongArrowRightIcon(props: IconProps) {
  return (
    <Icon
      width="28"
      height="12"
      viewBox="0 0 28 12"
      strokeWidth="1.2"
      {...props}
    >
      <path d="M1 6h26M22 1l5 5-5 5" />
    </Icon>
  )
}

export function QuoteIcon(props: IconProps) {
  return (
    <Icon
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="var(--color-orange)"
      stroke="none"
      {...props}
    >
      <path d="M0 22V12.5C0 5.4 4 1.2 10.5 0l1 2.8C7.9 4 6.4 6.3 6.2 9.5H11V22H0zm16 0V12.5C16 5.4 20 1.2 26.5 0l1 2.8C23.9 4 22.4 6.3 22.2 9.5H27V22H16z" />
    </Icon>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon width="20" height="20" {...props}>
      <path d="M3 8h18M3 16h18" />
    </Icon>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon width="20" height="20" {...props}>
      <path d="M5 5l14 14M19 5L5 19" />
    </Icon>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon width="16" height="16" {...props}>
      <path d="M6 9l6 6 6-6" />
    </Icon>
  )
}
