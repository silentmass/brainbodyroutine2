import RouterReplaceUrlDemo from '@/app/_components/demos/RouterReplaceUrlDemo'

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <div>
        <RouterReplaceUrlDemo />
      </div>
      <div>{children}</div>
    </div>
  )
}
