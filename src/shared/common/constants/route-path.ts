export const ROUTES = {
    cards: '/cards',
    check_email: '/check-email',
    decks: '/decks',
    error: '/404',
    id: '/:id',
    learn: '/learn',
    main: '/',
    new_password: '/new-password/:token',
    profile: '/profile',
    recover_password: '/recover-password',
    signIn: '/sign-in',
    singUp: '/sign-up',
    verify: '/confirm-email/:code',
} as const

/*
Находятся в shared так как родительские слои используют, нельзя хранить в др.слоях
 */
