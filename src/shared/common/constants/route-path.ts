export const PATH = {
    CARDS: '/cards',
    CHECK_EMAIL: '/check-email',
    DECKS: '/decks',
    ERROR: '/404',
    ID: '/:id',
    LEARN: '/learn',
    LOGIN: '/login',
    MAIN: '/',
    NEW_PASSWORD: '/new-password/:token',
    PASSWORD_RECOVERY: '/password-recovery',
    PROFILE: '/profile',
    REGISTRATION: '/registration',
    VERIFY: '/confirm-email/:code',
} as const

/*
Находятся в shared так как родительские слои используют, нельзя хранить в др.слоях
 */
