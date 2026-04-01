import { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const loading = false
  const isAdmin = user?.role === 'admin'

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