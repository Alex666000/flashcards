import {
    CreateDeckArgs,
    CreateDeckResponse,
    GetDeckById,
    GetDecksArgs,
    GetDecksResponse,
} from '@/entities/Decks/model/types/decks-api.types'
import { baseApi } from '@/shared/api/base-api'

const decksApi = baseApi.injectEndpoints({
    // пишем эндпоинты = запросы
    endpoints: (builder) => {
        return {
            // 1 параметр возвращаемое значение
            createDeck: builder.mutation<CreateDeckResponse, CreateDeckArgs>({
                invalidatesTags: ['Deck'],
                query: (arg) => {
                    return {
                        body: arg,
                        method: 'POST',
                        url: `v1/decks`,
                    }
                },
            }),
            // запрашиваем одну конкретную колоду по её id ури параметру - достанем его на ui useParams() из урла
            getDeckById: builder.query<GetDeckById, string>({
                query: (id) => `v1/decks/${id}`,
            }),
            // либо квери запросы либо мутации: принимает возвращаемое значение сервером или аргумент
            getDecks: builder.query<GetDecksResponse, Partial<GetDecksArgs> | void>({
                // 2 - потом когда делаем get запрос мы пишем providesTags и указываем этот тэг
                // это говорит о том что если данные меняются перевызови этот get запрос: getDecks
                // работает так — когда я делаю мутацию запускается invalidatesTags: ['Deck']
                // и get следит и смотрит если этот запрос мутация инвалидировалась — данные обновились он сам запросит новые данные и вручную не надо обновлять.
                // то есть после нажатия на кнопку создания автоматом пошел второй еще плюсом get запрос
                providesTags: ['Deck'],
                query: (arg) => ({
                    // возвращаем объект
                    method: 'GET', // в get запросах явно можно не писать эту строку, а в мутациях надо обязательно название метода писать
                    params: arg ?? {}, // если null или undefined то выведет {}
                    url: `v1/decks`,
                }),
            }),
        }
    },
})

// Делаем запрос за данными: формируется хуки автоматически по названию эндпоинта
export const {
    useCreateDeckMutation,
    useGetDeckByIdQuery,
    useGetDecksQuery,
    useLazyGetDecksQuery,
} = decksApi

/*
- endpoints: (builder) => { } - фабрика, возвращаем объект - у билдера 2 метода квери и мутации: 1 параметр возвращаемое значение с эндпоинта,
вторым параметром  наши аргументы
 */
