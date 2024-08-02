import { Metadata } from 'next'
import { FormButton } from './ui/form-components/buttons'
import Link from 'next/link'
import BasicTextButton from './_components/demos/circle-vibes/BasicTextButton'

export const metadata: Metadata = {
  title: 'Brain Body Routine App'
}

export default function Home () {
  return (
    <div className='flex flex-col w-full h-full justify-start p-6'>
      <div className='flex h-1/6 '></div>
      <div className='flex flex-col gap-12 justify-center items-center'>
        <h1>{`Brain-Body Routine`}</h1>
        <h2>
          {`Action templates and ideas ranging from super easy to extremely
          challenging to build complete wellness.`}
        </h2>
        <p>
          {`The pillars of well-being include Brain, Body, Recovery, Social
          interaction, Reflection, and Nutrition.`}
        </p>
        <div className='flex flex-col gap-6 items-center'>
          <div className='flex flex-col items-center justify-center'>
            <p>{`Let's start with`}</p>
            <BasicTextButton href={'/tasks/filter'} ariaLabel='Go to Tasks'>
              Tasks
            </BasicTextButton>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p>{`Start advertizing`}</p>
            <BasicTextButton href={'/task-editor'} ariaLabel='Go to Ads Editor'>
              Ads Editor
            </BasicTextButton>
          </div>
        </div>
      </div>
    </div>
  )
}
