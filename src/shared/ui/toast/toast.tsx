import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

/**
 * Toast - уведомления, всплывашка
 * autoClose={4000}: время через которое уведомление автоматически закроется.
 * position={'top-center'}: Место на экране, где будут отображаться уведомления. В данном случае, уведомления будут появляться в верхней части центра.
 * theme={'colored'}: Устанавливает тему для уведомлений.
 * closeOnClick: Определяет, будет ли уведомление закрыто при клике на него. Если true, то уведомление закроется при клике
 * draggable: Указывает, можно ли перемещать уведомление мышью. Если true, то уведомление можно перемещать.
 * hideProgressBar: Определяет, будет ли скрыт прогресс-бар, отображающий оставшееся время до автоматического закрытия уведомления.
 * newestOnTop: Если true, то новые уведомления будут отображаться сверху, а не снизу
 * pauseOnFocusLoss: Указывает, будет ли автоматическое закрытие уведомления при потере фокуса с уведомления.
 * pauseOnHover: Определяет, будет ли автоматическое закрытие уведомления при наведении курсора.
 * position: Задает позицию, в которой будут отображаться уведомления. Например, 'top-center' означает верхняя часть центра.
 * rtl: Если true, то уведомления будут отображаться справа налево (для языков справа налево).
 */
export const Toast = () => (
    <ToastContainer
        autoClose={5000}
        closeOnClick
        containerId={'common'}
        draggable
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        position={'bottom-left'}
        rtl={false}
        theme={'dark'}
    />
)