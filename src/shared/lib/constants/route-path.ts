export const ROUTES = {
  cards: '/cards',
  checkEmail: '/check-email',
  createNewPassword: '/create-new-password',
  decks: '/decks',
  learn: '/learn-card',
  notFoundPage: '/not-found-page',
  profile: '/profile',
  recoverPassword: '/recover-password',
  signIn: '/sign-in',
  singUp: '/sign-up',
  verifyEmail: '/confirm-email/:code',
} as const

/*
Находятся в shared так как родительские слои используют, нельзя хранить в др.слоях
 */
