import ReactDOM from 'react-dom/client'
import App from './App'
import { StoreProvider } from './app/store/StoreProvider'
import { ThemeProvider } from './app/theme'
import './app/styles/global.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(


  <StoreProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>

  </StoreProvider >

)
