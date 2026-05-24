import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { applyChicken } from '../../services/chickboxing.service'
import cbcLogo from '../../assets/programs/new_logo_CBC.png'
import './ChickboxingPage.css'

export default function ChickboxingApplyPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    backstory: '',
    description: '',
    image_url: '',
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await applyChicken({
        name: form.name,
        backstory: form.backstory,
        description: form.description,
        image_url: form.image_url || undefined,
      })
      setSuccess(true)
      setTimeout(() => navigate('/chickboxing'), 3000)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al enviar la postulación')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.successIcon}>🐔</div>
          <h2 style={styles.title}>¡Postulación enviada!</h2>
          <p style={styles.subtitle}>
            Tu pollo ha sido registrado. El equipo de TWL Networks revisará su candidatura.
          </p>
          <p style={styles.redirect}>Redirigiendo al campeonato...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.header}>
          <img src={cbcLogo} alt="Chickboxing Championship" style={styles.logo} />
          <h2 style={styles.title}>Postular un pollo</h2>
          <p style={styles.subtitle}>
            Completa el formulario con la información de tu contendiente.
            Necesitas estar registrado para participar.
          </p>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>

          <div style={styles.field}>
            <label style={styles.label}>Nombre del pollo *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Ej: Thunder Cluck"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Historia de fondo *</label>
            <textarea
              name="backstory"
              value={form.backstory}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="¿De dónde viene tu pollo? ¿Qué lo llevó al ring?"
              rows={4}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Descripción general *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Describe las habilidades, estilo de pelea y características de tu pollo."
              rows={4}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>URL de imagen <span style={styles.optional}>(opcional)</span></label>
            <input
              type="url"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              style={styles.input}
              placeholder="https://..."
            />
          </div>

          <div style={styles.actions}>
            <Link to="/chickboxing" style={styles.btnSecondary}>
              Cancelar
            </Link>
            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? 'Enviando...' : '🐔 Postular mi pollo'}
            </button>
          </div>

        </form>
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
    maxWidth: '540px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  logo: {
    height: '80px',
    objectFit: 'contain',
    marginBottom: '1rem',
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
    lineHeight: '1.5',
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
  optional: {
    color: '#555c6e',
    fontWeight: '400',
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
  textarea: {
    backgroundColor: '#0b0c12',
    border: '1px solid #1a1a2e',
    borderRadius: '4px',
    padding: '0.7rem 1rem',
    color: '#ffffff',
    fontSize: '0.95rem',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    lineHeight: '1.5',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  btn: {
    flex: 1,
    backgroundColor: '#ff0000',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: 'transparent',
    color: '#8d96ab',
    border: '1px solid #1a1a2e',
    borderRadius: '4px',
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
  },
  successIcon: {
    fontSize: '3rem',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  redirect: {
    color: '#555c6e',
    fontSize: '0.85rem',
    textAlign: 'center',
    marginTop: '1rem',
  },
}