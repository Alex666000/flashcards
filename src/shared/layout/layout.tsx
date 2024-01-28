import { Outlet } from 'react-router-dom'

import { Header } from '@/widgets/header/header'

/** Layout - убираем дублирующиеся слой - например Header, одинаковый на всех страницах,
 только иконки у него меняются на др.страницах по макету смотри...
 ___________________________________________________________________________________________________
 * Layout -общая обёртка, главный карскас (макет) приложения, на котором будут основаны все страницы
 * (в других проетах состоит из страниц с Сайдбаром, Хедером, Контентом..), она будет отрисовываться
 * всегда, в рамках этой обёртки Outlet-а можем динамически, что-то менять:
 * _________________________________________________________________________________________________
 * Outlet - куда хочу вставить всё остальное кроме Хедера - т.к он одинаков на всех страницах,
 чтобы его не дублировать делаем Layout -- каркас всего приложения
 */
export const Layout = () => {
    return (
        <>
            {/* <Header отрисуется всегда /> */}
            <Header />
            {/* В Outlet - пойдет все дочернее содержимое - в промежуток между хедером и футером*/}
            <Outlet />
            {/* <Footer /> */}
        </>
    )
}
