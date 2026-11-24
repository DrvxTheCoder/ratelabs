/** Whether the page transition currently hides the page. */
let covered = false

export function setCovered(value: boolean) {
  covered = value
}

/** Seconds an entrance should wait so that it is not played under the cover. */
export function entranceDelay() {
  return covered ? 0.4 : 0
}
