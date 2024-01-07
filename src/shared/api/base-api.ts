import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// baseApi - для одной апишке для одного baseUrl -- если бы делали несколько апишек несколько микросервисов то несколько апишек бы делали
// на 1 апишку 1 createApi делаем!!!
// в идеале надо было назвать ни baseApi (так назвали в учебных целях),а flashCardsApi - packsApi, decksApi - это будут не отдельные апи
// а будут отдельные части этого baseApi

export const baseApi = createApi({
    // навороченный fetch свой от РТК (подключать аксиос сюда не надо) - объект baseQuery как инстанс аксиоса
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.flashcards.andrii.es', // берется из доке - Базовый URL - к базовому урлу будем прикреплять наши эндпоинты
        credentials: 'include', // то же самое что и withCredentials = true в аксиосе - тк будут токены авторизационные в куках у нас в проекте..
        // специальный метод будет выполняться на каждом запросе и он будет цеплять специальные хедеры для получения доступа к апишке без авторизации
        // бэкенд будет видеть нас как авторизованного юзера
        // если в будущем надо добавить хедеры к каждому запросу то так делаем то что хотим
        prepareHeaders: (headers) => {
            // чтобы сеичас не ломалась авторизация
            // Благодаря такой строке как анонимный пользователь можем создавать колоды будучи не авторизованным - временная заглушка
            // в своем проекте потом удалить
            headers.append('x-auth-skip', 'true') // append() - добавить, прикрепить
        },
    }),
    // описание эндпоинтов запросов к серверу - приписка к базовому урлу - внутри пишем или квреи (для GET) или мутации для остальных CRUD
    endpoints: () => ({}),
    reducerPath: 'baseApi', // имя редюсера которое будем ложить в store - его имя увидим в девтулзах

    // 1 - объявляем в base-api, а не конкретной апишке сущности:
    tagTypes: ['Deck'], // чтобы подгружать новые обновленные данные надо сделать: в нашей апишке
    // обьявить тэги на которые мы будем реагировать — зарезервируем  тэги на которые потом наш РТК
    // может ссылаться - назовем Deck
})

/*
- слайс 1 раз пишется и больше не трогается
- импорт идет из реакта: import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' (чтобы хуки автогенерировались..)
- baseApi не забыть подключить в store

 */
