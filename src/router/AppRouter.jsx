import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// Páginas públicas
import HomePage from '../pages/home/HomePage'
import ChickboxingPage from '../pages/Chickboxing/ChickboxingPage'
import DesempacadosPage from '../pages/Desempacados/DesempacadosPage'
import MasAllaPage from '../pages/MasAlla/MasAllaPage'
import GoldenFeatherPage from '../pages/GoldenFeather/GoldenFeatherPage'
import KanatPage from '../pages/Kanat/KanatPage'

// Auth
import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'

// Páginas protegidas (requieren login)
import ChickboxingApplyPage from '../pages/Chickboxing/ChickboxingApplyPage'
import DesempacadosApplyPage from '../pages/Desempacados/DesempacadosApplyPage'

import ProtectedRoute from '../components/shared/ProtectedRoute'

// Admin
import AdminPage from '../pages/Admin/AdminPage'

export default function AppRouter() {
  return (
    <Routes>

      {/* Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/chickboxing" element={<ChickboxingPage />} />
      <Route path="/desempacados" element={<DesempacadosPage />} />
      <Route path="/mas-alla-del-polliseo" element={<MasAllaPage />} />
      <Route path="/golden-feather" element={<GoldenFeatherPage />} />
      <Route path="/kanat" element={<KanatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />

      {/* Requieren login */}
      <Route element={<ProtectedRoute />}>
        <Route path="/chickboxing/postular" element={<ChickboxingApplyPage />} />
        <Route path="/desempacados/postular" element={<DesempacadosApplyPage />} />
      </Route>

      {/* Solo admin */}
      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/admin/*" element={<AdminPage />} />
      </Route>

    </Routes>
  )
}