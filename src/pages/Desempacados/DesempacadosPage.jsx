import { Link } from 'react-router-dom'
import desempacadosLogo from '../../assets/programs/DESEMPACA2_LOGO_transparente.png'

export default function DesempacadosPage() {
  return (
    <div style={styles.page}>

      {/* HERO */}
      <section style={styles.hero}>
        <img src={desempacadosLogo} alt="Desempacados" style={styles.heroLogo} />
        <p style={styles.heroDesc}>
          El programa donde se descubre lo que hay dentro de los personajes
          más interesantes. Entrevistas únicas, historias reales y momentos
          que no te puedes perder.
        </p>
        <Link to="/desempacados/postular" style={styles.applyBtn}>
          Quiero ser entrevistado
        </Link>
      </section>

      {/* SOBRE EL PROGRAMA */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Sobre el programa</h2>
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>🎙️</span>
            <h3 style={styles.infoCardTitle}>Entrevistas auténticas</h3>
            <p style={styles.infoCardDesc}>
              Conversaciones profundas con personas que tienen historias
              únicas que contar.
            </p>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>📦</span>
            <h3 style={styles.infoCardTitle}>Se abre la caja</h3>
            <p style={styles.infoCardDesc}>
              Descubrimos lo que hay detrás de cada invitado, más allá
              de lo que todos ya conocen.
            </p>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoIcon}>🌐</span>
            <h3 style={styles.infoCardTitle}>Comunidad</h3>
            <p style={styles.infoCardDesc}>
              Los espectadores pueden postularse para ser el próximo
              invitado del programa.
            </p>
          </div>
        </div>
      </section>

      {/* POSTULACIÓN CTA */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaBox}>
          <h2 style={styles.ctaTitle}>¿Quieres aparecer en Desempacados?</h2>
          <p style={styles.ctaDesc}>
            Si tienes una historia que contar, postúlate. Necesitas una
            cuenta para enviar tu postulación.
          </p>
          <div style={styles.ctaBtns}>
            <Link to="/desempacados/postular" style={styles.ctaBtnPrimary}>
              Postularme ahora
            </Link>
            <Link to="/registro" style={styles.ctaBtnSecondary}>
              Crear cuenta
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

const styles = {
  page: {
    backgroundColor: '#0b0c12',
    minHeight: '100vh',
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4rem 2rem',
    textAlign: 'center',
    borderBottom: '1px solid #1a1a2e',
    background: 'linear-gradient(180deg, #1a1000 0%, #0b0c12 100%)',
  },
  heroLogo: {
    width: '300px',
    maxWidth: '85%',
    objectFit: 'contain',
    marginBottom: '1.5rem',
  },
  heroDesc: {
    color: '#8d96ab',
    fontSize: '1rem',
    maxWidth: '580px',
    lineHeight: '1.7',
    marginBottom: '2rem',
  },
  applyBtn: {
    textDecoration: 'none',
    backgroundColor: '#c8860a',
    color: '#ffffff',
    padding: '0.7rem 2rem',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '1rem',
  },
  section: {
    padding: '4rem 2rem',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: '1.6rem',
    fontWeight: '700',
    marginBottom: '2rem',
    borderLeft: '4px solid #c8860a',
    paddingLeft: '1rem',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  infoCard: {
    backgroundColor: '#111320',
    border: '1px solid #1a1a2e',
    borderRadius: '8px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  infoIcon: {
    fontSize: '2rem',
  },
  infoCardTitle: {
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '700',
  },
  infoCardDesc: {
    color: '#8d96ab',
    fontSize: '0.9rem',
    lineHeight: '1.6',
  },
  ctaSection: {
    padding: '2rem 2rem 4rem',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  ctaBox: {
    backgroundColor: '#111320',
    border: '1px solid #c8860a',
    borderRadius: '8px',
    padding: '3rem 2rem',
    textAlign: 'center',
  },
  ctaTitle: {
    color: '#ffffff',
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: '0.8rem',
  },
  ctaDesc: {
    color: '#8d96ab',
    fontSize: '0.95rem',
    marginBottom: '2rem',
    maxWidth: '500px',
    margin: '0 auto 2rem',
    lineHeight: '1.6',
  },
  ctaBtns: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaBtnPrimary: {
    textDecoration: 'none',
    backgroundColor: '#c8860a',
    color: '#ffffff',
    padding: '0.7rem 1.8rem',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '0.95rem',
  },
  ctaBtnSecondary: {
    textDecoration: 'none',
    color: '#8d96ab',
    border: '1px solid #8d96ab',
    padding: '0.7rem 1.8rem',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
}