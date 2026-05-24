// RegisterPage.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import api from '../../services/api'

export default function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)
    try {
      await api.post('/auth/register', {
        name: form.username,
        email: form.email,
        password: form.password,
      })
      // Registro exitoso, ahora hacemos login automático
      const loginRes = await api.post('/auth/login', {
        email: form.email,
        password: form.password,
      })
      login(loginRes.data.token, loginRes.data.user)
      navigate('/')
    } catch (err) {
    setError(err.response?.data?.error || 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Crear cuenta</h2>
        <p style={styles.subtitle}>Únete a la comunidad de TWL Networks</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              style={styles.input}
              placeholder="tunombre"
              required
            />
          </div>
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
          <div style={styles.field}>
            <label style={styles.label}>Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        <p style={styles.footer}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={styles.link}>Inicia sesión aquí</Link>
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