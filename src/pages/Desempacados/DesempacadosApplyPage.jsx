import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { applyDesempacados } from '../../services/desempacados.service'
import desempacadosLogo from '../../assets/programs/DESEMPACA2_LOGO_transparente.png'
import './DesempacadosPage.css'

export default function DesempacadosApplyPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    social_links: '',
    motivation: '',
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
      await applyDesempacados({
        full_name: form.full_name,
        email: form.email,
        social_links: form.social_links || undefined,
        motivation: form.motivation,
      })
      setSuccess(true)
      setTimeout(() => navigate('/desempacados'), 3000)
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
          <div style={styles.successIcon}>🎙️</div>
          <h2 style={styles.title}>¡Postulación enviada!</h2>
          <p style={styles.subtitle}>
            Tu postulación fue recibida. El equipo de Desempacados se pondrá
            en contacto contigo si eres seleccionado.
          </p>
          <p style={styles.redirect}>Redirigiendo al programa...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.header}>
          <img src={desempacadosLogo} alt="Desempacados" style={styles.logo} />
          <h2 style={styles.title}>Quiero ser entrevistado</h2>
          <p style={styles.subtitle}>
            Cuéntanos quién eres y por qué mereces ser el próximo invitado
            de Desempacados.
          </p>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>

          <div style={styles.field}>
            <label style={styles.label}>Nombre completo *</label>
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Tu nombre completo"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Correo electrónico *</label>
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
            <label style={styles.label}>
              Redes sociales <span style={styles.optional}>(opcional)</span>
            </label>
            <input
              type="text"
              name="social_links"
              value={form.social_links}
              onChange={handleChange}
              style={styles.input}
              placeholder="@tuusuario en Twitter, Instagram, TikTok..."
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>¿Por qué quieres ser entrevistado? *</label>
            <textarea
              name="motivation"
              value={form.motivation}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Cuéntanos tu historia, qué te hace único y por qué el público debería conocerte."
              rows={5}
              required
            />
          </div>

          <div style={styles.actions}>
            <Link to="/desempacados" style={styles.btnSecondary}>
              Cancelar
            </Link>
            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? 'Enviando...' : '🎙️ Enviar postulación'}
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
    backgroundColor: '#c8860a',
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