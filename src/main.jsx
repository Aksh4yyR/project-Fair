import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextAPI from './contexts/ContextAPI.jsx'
import AuthContextAPI from './contexts/AuthContextAPI.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthContextAPI>
<ContextAPI>
<BrowserRouter>
      <App />
</BrowserRouter> 
</ContextAPI> 
</AuthContextAPI>
</StrictMode>,
)
