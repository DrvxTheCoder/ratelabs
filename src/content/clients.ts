export type ClientLogo = {
  src: string
  /** Intrinsic size of the file, in pixels. */
  width: number
  height: number
  /** Displayed height: set by eye, so that wide and tall logos weigh the same. */
  className: string
}

export type Client = {
  name: string
  /** Official logo. Until it exists, `name` is set as a text wordmark. */
  logo?: ClientLogo
  /** Type treatment of the text wordmark. */
  wordmark?: string
}

/** PLACEHOLDERS: permission to name each client is pending. */
export const clients: Client[] = [
  {
    name: "Senexus Group",
    logo: {
      src: "/images/client-logos/senexus.png",
      width: 1367,
      height: 344,
      className: "h-11",
    },
  },
  {
    name: "Touba Oil",
    logo: {
      src: "/images/client-logos/touba-oil.png",
      width: 1077,
      height: 234,
      className: "h-10",
    },
  },
  {
    name: "Touba Gaz",
    logo: {
      src: "/images/client-logos/touba-gaz.png",
      width: 1415,
      height: 527,
      className: "h-14",
    },
  },
  {
    name: "Connect'Interim",
    logo: {
      src: "/images/client-logos/connect-interim.png",
      width: 1492,
      height: 336,
      className: "h-11",
    },
  },
  {
    name: "IPM Tawfeikh",
    logo: {
      src: "/images/client-logos/ipm-tawfeikh.png",
      width: 2533,
      height: 472,
      className: "h-10",
    },
  },
]
