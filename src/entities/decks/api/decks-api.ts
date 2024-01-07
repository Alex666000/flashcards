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
            // возвращать нам бэкенд на создание не будет ничего " 201 - Created"
            createDeck: builder.mutation<CreateDeckResponse, CreateDeckArgs>({
                invalidatesTags: ['Deck'],
                query: (arg) => {
                    return {
                        body: arg,
                        method: 'POST', // в мутациях (изменение данных на сервере) обязательно указываем метод
                        url: `v1/decks`,
                    }
                },
            }),
            // УРИ ПАРАМЕТРЫ: запрашиваем одну конкретную колоду по её id ури параметру - достанем его на ui useParams() из урла
            // void - не может быть так как id внутри GetDeckByIdArgs - обязательный параметр
            getDeckById: builder.query<GetDeckById, string>({
                query: (id) => {
                    return {
                        url: `v1/decks/${id}`,
                    }
                },
            }),
            // либо квери запросы либо мутации: принимает возвращаемое значение сервером или аргумент
            // void - когда могут быть не обязательные параметры значит что может не быть никаких параметров  чтобы на UI при вызове хука не ругался ТС
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
                    params: arg ?? {}, // "оператор нулевого слияния": если null или undefined то выведет {} -- пропустит false или ' '
                    url: `v1/decks`,
                }),
            }),
        }
    },
})

// Делаем запрос за данными: формируется хуки автоматически по названию эндпоинта
// Хуки дергаем на Ui они вернут данные которые мы отрисуем - useEffect() не нужен на UI где в тулките мы диспатчили бы санку - а тут
// об этом не думаем, в decks и News вызываем хук, и он проверит при вызове хука: есть ли у него валидные закешированные данные - если они не протухли он их
// достанет из кеша, если протухли данные сделает запрос - в каждом компоненте data берется из кеша который хранится на сервере а не в глобальном стейте
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
