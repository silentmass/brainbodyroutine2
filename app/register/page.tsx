import RegisterForm from '@/app/ui/login/register-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register'
}

export default function Page () {
  return <RegisterForm />
}
