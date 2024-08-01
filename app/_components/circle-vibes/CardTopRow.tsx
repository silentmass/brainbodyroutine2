export default function CardTopRow ({
  children = undefined
}: {
  children?: React.ReactNode
}) {
  return (
    <div className='relative flex w-full h-[34px]'>{children && children}</div>
  )
}
