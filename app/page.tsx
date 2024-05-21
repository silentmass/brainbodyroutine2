import { Metadata } from 'next'
import { FormButton } from './ui/form-components/buttons'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Brain Body Routine App'
}

export default function Home () {
  return (
    <div className='flex flex-col w-full h-full justify-start'>
      <div className='flex h-1/6 '></div>
      <div className='flex flex-col gap-20 justify-center items-center'>
        <h1>Brain-Body Routine</h1>
        <h2>
          Action templates and ideas ranging from super easy to extremely
          challenging to build complete wellness.
        </h2>
        <p>
          The pillars of well-being include Brain, Body, Recovery, Social
          interaction, Reflection, and Nutrition.
        </p>
        <div className='flex gap-6 items-center'>
          <p>Let's start with</p>
          <Link href='/tasks/filter'>
            <FormButton type={undefined} ariaLabel='Go to Tasks' className=''>
              Tasks
            </FormButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
