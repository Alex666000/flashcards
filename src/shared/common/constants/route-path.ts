export const PATH = {
    CARDS: '/cards',
    CHECK_EMAIL: '/check-email',
    DECKS: '/decks',
    ERROR: '/404',
    ID: '/:id',
    LEARN: '/learn',
    MAIN: '/',
    NEW_PASSWORD: '/new-password/:token',
    PASSWORD_RECOVERY: '/password-recovery',
    PROFILE: '/profile',
    SING_IN: '/sign-in',
    SING_UP: '/sign-up',
    VERIFY: '/confirm-email/:code',
} as const

/*
Находятся в shared так как родительские слои используют, нельзя хранить в др.слоях
 */
