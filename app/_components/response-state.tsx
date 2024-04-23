export interface InitialState {
  message: string
  redirectTo: string | null
  responseDuration: number | null
  errors: string | null
}

export const initialState: InitialState = {
  message: '',
  redirectTo: null,
  responseDuration: 0,
  errors: null
}
