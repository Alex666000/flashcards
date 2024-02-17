export const ROUTES = {
  cards: '/cards',
  checkEmail: '/check-email',
  createNewPassword: '/create-new-password-page',
  decks: '/decks',
  learn: '/learn-card',
  profile: '/profile',
  recoverPassword: '/recover-password',
  signIn: '/sign-in',
  singUp: '/sign-up',
  verify: '/confirm-email/:code',
} as const

/*
Находятся в shared так как родительские слои используют, нельзя хранить в др.слоях
 */
