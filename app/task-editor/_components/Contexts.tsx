import { createContext, Dispatch, SetStateAction } from 'react'

interface formContext {
  ref: React.RefObject<HTMLFormElement> | null
  isDirty: boolean
}

export const FormContext = createContext<null | formContext>(null)
