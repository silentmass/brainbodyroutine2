export default function ButtonContainer ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col items-center justify-center gap-2 bg-accent-2 p-1 rounded-[12px] transition-all ease-in-out delay-150'>
      {children}
    </div>
  )
}
