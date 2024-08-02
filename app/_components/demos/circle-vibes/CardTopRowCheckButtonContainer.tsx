export default function CardTopRowCheckButtonContainer ({
  children = undefined
}: {
  children?: React.ReactNode
}) {
  return (
    <div className='absolute flex w-[50px] h-[50px] -top-[16px] left-[46px]'>
      {children && children}
    </div>
  )
}
