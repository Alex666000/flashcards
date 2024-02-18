// getMe() + userData
export type UserAuthDataResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

// login
export type LoginBodyArgs = {
  email: string
  password: string
  rememberMe?: boolean
}

export type LoginDataResponse = {
  accessToken: string
}

export type UpdateProfileFormData = FormData

// register args
export type SignUpArgs = Omit<LoginBodyArgs, 'rememberMe'> & { name?: string }

export type RecoverPasswordBodyArgs = {
  email: string
  html?: string
  subject?: string
}
