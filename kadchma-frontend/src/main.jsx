import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import App from './App.jsx'
import EmbedDashboard from './components/embed/EmbedDashboard.jsx'
import ResetPassword from './components/pages/ResetPassword.jsx'
import './styles/tokens.css'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public embed route — no auth, no shell */}
          <Route path="/embed/dashboard" element={<EmbedDashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Everything else goes through the normal auth + shell flow */}
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
