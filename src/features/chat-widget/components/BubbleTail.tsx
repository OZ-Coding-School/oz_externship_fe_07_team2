type BubbleTailProps = {
  color: string
}

export default function BubbleTail({ color }: BubbleTailProps) {
  return (
    <>
      {/* tail shadow (bottom-only look) */}
      <span className="absolute top-5 -left-5 h-0 w-0 translate-y-1.5 border-t-12 border-r-20 border-b-12 border-t-transparent border-r-black/15 border-b-transparent blur-[1.5px]" />

      {/* main tail (sharp triangle) */}
      <span
        className="absolute top-5 -left-5 z-10 h-0 w-0 border-t-14 border-r-24 border-b-12 border-t-transparent border-b-transparent"
        style={{ borderRightColor: color }}
      />
    </>
  )
}
