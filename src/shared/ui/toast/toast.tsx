import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export const Toast = () => (
  <ToastContainer
    autoClose={3000}
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
