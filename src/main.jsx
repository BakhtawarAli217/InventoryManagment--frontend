import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoadingContextProvider from '../src/context/LoadingContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingContextProvider>
    <App />
    </LoadingContextProvider>
  </StrictMode>,
)
