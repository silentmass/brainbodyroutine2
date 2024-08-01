'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export default function RouterReplaceUrlDemo () {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const buttons: { name: string }[] = useMemo(
    () =>
      [...new Array(10).fill(0)].map((entry, idx) => ({
        name: `Button ${idx}`
      })),
    []
  )
  const handleClick = (buttonName: string) => {
    console.log(buttonName)
    router.push(`/test-component/router-replace-url/${buttonName}`)
  }
  return (
    <ul className='group flex flex-col gap-2'>
      {[{ name: '' }, ...buttons].map(({ name }) => {
        return (
          <button
            key={`${name}`}
            className='bg-slate-400 hover:bg-slate-500 group-hover:bg-red-400'
            onMouseEnter={(ev: React.FormEvent<HTMLButtonElement>) => {
              ev.preventDefault()
              if (name === '') {
                return handleClick('')
              }
              return handleClick(name.split(' ')[1])
            }}
          >
            {name !== '' ? name : 'Home'}
          </button>
        )
      })}
    </ul>
  )
}
