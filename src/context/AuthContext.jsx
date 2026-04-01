// context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { getProfile } from '../services/auth.service';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('twl_token');
    if (token) {
      getProfile()
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('twl_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('twl_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('twl_token');
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}