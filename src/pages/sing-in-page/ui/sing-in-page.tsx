import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { LoginBodyArgs } from '@/features/auth'
import { useLoginMutation, useMeQuery } from '@/features/auth/api/auth.api'
import { LoginForm } from '@/features/forms'
import { ROUTES } from '@/shared/lib'
import { Page } from '@/shared/ui/page'

const SingInPage = () => {
  const { data: meAuthData } = useMeQuery()
  const [login] = useLoginMutation()

  const handleLoginFormDataSubmit = async (formData: LoginBodyArgs) => {
    await login(formData).unwrap()
    toast.success('You are successfully authorized', { containerId: 'common' })
  }

  if (meAuthData && !('success' in meAuthData)) {
    return <Navigate to={ROUTES.decks} />
  }

  return (
    <Page>
      <LoginForm onLoginFormDataSubmit={handleLoginFormDataSubmit} />
    </Page>
  )
}

export default SingInPage
