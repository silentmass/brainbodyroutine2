export const DragIcon = ({
  width = 8,
  height = 8,
  className
}: {
  width: number
  height: number
  className: string
}) => {
  const r = (width / 8) * 1
  const rx = width / 2
  const ry = height / 3
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <circle cx={0.5 * rx} cy={0.5 * ry} r={r} />
      <circle cx={0.5 * rx} cy={1.5 * ry} r={r} />
      <circle cx={0.5 * rx} cy={2.5 * ry} r={r} />
      <circle cx={1.5 * rx} cy={0.5 * ry} r={r} />
      <circle cx={1.5 * rx} cy={1.5 * ry} r={r} />
      <circle cx={1.5 * rx} cy={2.5 * ry} r={r} />
    </svg>
  )
}
