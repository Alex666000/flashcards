import { Provider } from 'react-redux'

import { Router } from '@/app/providers/router/router'
import { store } from '@/shared/api/store'

// const user = {
//     email: 'bogdanov777000@mail.ru',
//     photo: { alt: 'userPhoto', src: 'src/shared/assets/images/user.png' },
//     userName: 'Sasha',
// }

export function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}

/*

 */
