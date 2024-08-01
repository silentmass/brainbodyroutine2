import clsx from 'clsx'

export default function CardBottomRow ({
  children = undefined,
  isPaddingRight = false
}: {
  children?: React.ReactNode
  isPaddingRight?: boolean
}) {
  return (
    <div
      className={`flex w-full py-1 text-lg overflow-x-auto ${clsx({
        'pr-[38px]': isPaddingRight
      })}`}
    >
      {children && children}
    </div>
  )
}
