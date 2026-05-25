import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Loader from '../shared/Loader'

export default function ProtectedRoute({ adminOnly = false }) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) return <Loader />
  if (!user) return <Navigate to="/login" />
  if (adminOnly && !isAdmin) return <Navigate to="/" />
  return <Outlet />
}