import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Browser>
    <App />
    </Browser>
  </StrictMode>,
)
