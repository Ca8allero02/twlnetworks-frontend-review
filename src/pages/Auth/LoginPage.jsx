import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import api from '../../services/api'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await api.post('/auth/login', form)
      login(res.data.token, res.data.user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Correo o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Iniciar sesión</h2>
        <p style={styles.subtitle}>Bienvenido de vuelta a TWL Networks</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p style={styles.footer}>
          ¿No tienes cuenta?{' '}
          <Link to="/registro" style={styles.link}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    backgroundColor: '#0b0c12',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    backgroundColor: '#111320',
    border: '1px solid #1a1a2e',
    borderRadius: '8px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '420px',
  },
  title: {
    color: '#ffffff',
    fontSize: '1.6rem',
    fontWeight: '700',
    marginBottom: '0.4rem',
  },
  subtitle: {
    color: '#8d96ab',
    fontSize: '0.9rem',
    marginBottom: '1.8rem',
  },
  error: {
    backgroundColor: '#2a0000',
    border: '1px solid #ff0000',
    color: '#ff6b6b',
    padding: '0.7rem 1rem',
    borderRadius: '4px',
    fontSize: '0.88rem',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    color: '#8d96ab',
    fontSize: '0.88rem',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#0b0c12',
    border: '1px solid #1a1a2e',
    borderRadius: '4px',
    padding: '0.7rem 1rem',
    color: '#ffffff',
    fontSize: '0.95rem',
    outline: 'none',
  },
  btn: {
    backgroundColor: '#ff0000',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  footer: {
    color: '#8d96ab',
    fontSize: '0.88rem',
    textAlign: 'center',
    marginTop: '1.5rem',
  },
  link: {
    color: '#ff0000',
    textDecoration: 'none',
    fontWeight: '600',
  },
}