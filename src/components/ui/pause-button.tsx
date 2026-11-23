import { IconButton } from "./icon-button"
import { PauseIcon, PlayIcon } from "./icons"

type PauseButtonProps = {
  paused: boolean
  labels: { pause: string; resume: string }
  onToggle: () => void
  className?: string
}

export function PauseButton({
  paused,
  labels,
  onToggle,
  className,
}: PauseButtonProps) {
  return (
    <IconButton
      ring
      label={paused ? labels.resume : labels.pause}
      onClick={onToggle}
      className={className}
    >
      {paused ? <PlayIcon /> : <PauseIcon />}
    </IconButton>
  )
}
