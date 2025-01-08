import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './context/AppContext.tsx'
import AppThemeProvider from './theme/AppTheme.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
        <AppProvider>
            <App />
        </AppProvider>
    </AppThemeProvider>
   </StrictMode>,
)
