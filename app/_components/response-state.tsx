import { Struct } from 'next/dist/compiled/superstruct'

export interface InitialState {
  message: string
  redirectTo: string | null
  responseDuration: number | null
  errors: string | null
  token: string | null
  state: string | null
}

export const initialState: InitialState = {
  message: '',
  redirectTo: null,
  responseDuration: 0,
  errors: null,
  token: null,
  state: null
}
