// Схемы сущностей Арр
import { baseApi } from '@/shared/api/base-api'

export interface StateSchema {
    // counter: CounterSchema;
    [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>
    //
    // // Асинхронные редюсеры
    // loginForm?: Types;
    // profile?: ProfileSchema;
    // articleDetails?: ArticleDetailsSchema;
    // addCommentForm?: AddCommentFormSchema;
    // articlesPage?: ArticlesPageSchema;
    // articleDetailsPage?: ArticleDetailsPageSchema;
}
