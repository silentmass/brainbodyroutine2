'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { initialState } from '@/app/_components/response-state'
import { DeleteButton } from '@/app/ui/form-components/buttons'
import { ListDescription, ListDescriptionBase } from '@/app/lib/definitions'

export function DeleteListDescription ({
  description,
  formActionFun
}: {
  description: ListDescription | ListDescriptionBase
  formActionFun: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
}) {
  if ('id' in description && description.id !== undefined) {
    const { pending } = useFormStatus()

    const deleteListDescriptionWithId = formActionFun.bind(
      null,
      `${description.id}`
    )
    const [state, formAction] = useFormState(
      deleteListDescriptionWithId,
      initialState
    )

    return (
      <form
        name='deleteListDescriptionForm'
        id='deleteListDescriptionForm'
        action={formAction}
        className='flex h-full w-full justify-center items-center'
      >
        <DeleteButton ariaDisabled={pending} classNameIcon='' />
      </form>
    )
  } else {
    return (
      <form
        name='deleteListDescriptionForm'
        id='deleteListDescriptionForm'
        className='flex h-full w-full justify-center items-center'
      >
        <DeleteButton ariaDisabled={true} classNameIcon='' />
      </form>
    )
  }
}
