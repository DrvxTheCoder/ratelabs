import * as React from "react"

type WordRevealProps = {
  text: string
  /** Trailing words set in the brand colour. */
  accent?: string
}

/** Masked word-by-word entrance. CSS-only, so it plays before hydration. */
function WordReveal({ text, accent }: WordRevealProps) {
  const words = text.split(" ")
  const accentWords = accent?.split(" ") ?? []

  const renderWord = (word: string, index: number) => (
    <React.Fragment key={index}>
      <span className="word-reveal-word">
        <span style={{ "--word-index": index } as React.CSSProperties}>
          {word}
        </span>
      </span>{" "}
    </React.Fragment>
  )

  return (
    <>
      {words.map(renderWord)}
      <span className="text-brand">
        {accentWords.map((word, index) =>
          renderWord(word, words.length + index)
        )}
      </span>
    </>
  )
}

export { WordReveal }
