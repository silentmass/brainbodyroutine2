export default function CardTopRowOpenButtonContainer ({
  children = undefined
}: {
  children?: React.ReactNode
}) {
  return (
    <div className='absolute flex w-[50px] h-[50px] -top-[16px] -left-[16px]'>
      {children && children}
    </div>
  )
}
