import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Homepage from '../homepage/homepage.jsx'
import APIDataProvider from '../api/APIDataProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <APIDataProvider>
        <Homepage />
      </APIDataProvider>
  </StrictMode>,
)
