import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'

import { StoreProvider } from './app/store/StoreProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(


  <StoreProvider>
    <App />
  </StoreProvider >

)
