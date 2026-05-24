import { createContext, useState, useEffect } from 'react'
import { getProfile } from '../services/auth.service'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const isAdmin = user?.role === 'admin'

  // Al arrancar la app, verificar si hay token guardado
  useEffect(() => {
    const token = localStorage.getItem('twl_token')

    if (!token) {
      // No hay token, no hay nada que verificar
      setLoading(false)
      return
    }

    // Hay token, verificar que sigue siendo válido
    getProfile()
      .then(res => {
        setUser(res.data)
      })
      .catch(() => {
        // Token expirado o inválido, limpiarlo
        localStorage.removeItem('twl_token')
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const login = (token, userData) => {
    localStorage.setItem('twl_token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('twl_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  )
}