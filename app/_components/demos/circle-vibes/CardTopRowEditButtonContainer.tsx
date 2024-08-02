export default function CardTopRowEditButtonContainer ({
  children = undefined
}: {
  children?: React.ReactNode
}) {
  return (
    <div className='absolute flex w-[50px] min-h-[50px] -top-[16px] -right-[16px]'>
      {children && children}
    </div>
  )
}
