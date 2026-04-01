import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import twlLogo from '../../assets/logos/TWL_NETWORKS_transp.png'
import cbcLogo from '../../assets/programs/new_logo_CBC.png'
import desempacadosLogo from '../../assets/programs/DESEMPACA2_LOGO_transparente.png'
import masAllaLogo from '../../assets/programs/LOGO_MAS_ALLA_DEL_POLLISEO.png'
import secarodLogo from '../../assets/sponsors/SECAROD_COSMETICS_TRANSBG.png'

const PROGRAMS = [
  {
    id: 1,
    name: 'Chickboxing Championship',
    description: 'El campeonato de boxeo más salvaje del mundo avícola. Conoce a los campeones y postula a tu pollo.',
    logo: cbcLogo,
    path: '/chickboxing',
    color: '#ff0000',
  },
  {
    id: 2,
    name: 'Desempacados',
    description: 'Entrevistas únicas donde se descubre lo que hay dentro de los personajes más interesantes.',
    logo: desempacadosLogo,
    path: '/desempacados',
    color: '#c8860a',
  },
  {
    id: 3,
    name: 'Más Allá del Polliseo',
    description: 'La vida detrás de cámaras de Rod Ruster: cultura geek, videojuegos y mucho más.',
    logo: masAllaLogo,
    path: '/mas-alla-del-polliseo',
    color: '#f5a000',
  },
]

const SPONSORS = [
  { name: 'Secarod Professional Cosmetics', logo: secarodLogo, url: null },
]

export default function HomePage() {
  const [streamingStatus, setStreamingStatus] = useState(null)
  const [loadingStream, setLoadingStream] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/streaming/status`)
      .then(res => res.json())
      .then(data => setStreamingStatus(data))
      .catch(() => setStreamingStatus(null))
      .finally(() => setLoadingStream(false))
  }, [])

  const isLive = streamingStatus && Object.values(streamingStatus).some(v => v?.live === true)

  return (
    <div style={styles.page}>

      {/* HERO */}
      <section style={styles.hero}>
        <img src={twlLogo} alt="TWL Networks" style={styles.heroLogo} />
        <p style={styles.heroSubtitle}>
          Entretenimiento digital, música y producción creativa
        </p>
        {!loadingStream && (
          <div style={{
            ...styles.streamBadge,
            backgroundColor: isLive ? '#ff0000' : '#1a1a2e',
            border: isLive ? '1px solid #ff0000' : '1px solid #8d96ab',
          }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: isLive ? '#fff' : '#8d96ab',
              display: 'inline-block',
              marginRight: '8px',
            }} />
            {isLive ? '🔴 EN VIVO AHORA' : 'Sin transmisión activa'}
          </div>
        )}
        <div style={styles.heroLinks}>
          <Link to="/kanat" style={styles.heroLinkSecondary}>Kanat</Link>
          <Link to="/golden-feather" style={styles.heroLinkSecondary}>Golden Feather Studios</Link>
        </div>
      </section>

      {/* PROGRAMAS */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Nuestros Programas</h2>
        <div style={styles.programsGrid}>
          {PROGRAMS.map(program => (
            <Link to={program.path} key={program.id} style={styles.programCard}>
              <div style={styles.programLogoWrapper}>
                <img src={program.logo} alt={program.name} style={styles.programLogo} />
              </div>
              <div style={styles.programInfo}>
                <h3 style={{ ...styles.programName, color: program.color }}>{program.name}</h3>
                <p style={styles.programDesc}>{program.description}</p>
                <span style={{ ...styles.programBtn, backgroundColor: program.color }}>
                  Ver más →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PATROCINADORES */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Patrocinadores</h2>
        <div style={styles.sponsorsRow}>
          {SPONSORS.map(sponsor => (
            sponsor.url
              ? <a href={sponsor.url} target="_blank" rel="noopener noreferrer" key={sponsor.name} style={styles.sponsorCard}>
                  <img src={sponsor.logo} alt={sponsor.name} style={styles.sponsorLogo} />
                </a>
              : <div key={sponsor.name} style={styles.sponsorCard}>
                  <img src={sponsor.logo} alt={sponsor.name} style={styles.sponsorLogo} />
                </div>
          ))}
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
    justifyContent: 'center',
    padding: '5rem 2rem',
    textAlign: 'center',
    borderBottom: '1px solid #1a1a2e',
  },
  heroLogo: {
    width: '320px',
    maxWidth: '90%',
    objectFit: 'contain',
    marginBottom: '1.5rem',
  },
  heroSubtitle: {
    color: '#8d96ab',
    fontSize: '1.1rem',
    marginBottom: '1.5rem',
    maxWidth: '500px',
  },
  streamBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.5rem 1.2rem',
    borderRadius: '20px',
    color: '#ffffff',
    fontSize: '0.85rem',
    fontWeight: '700',
    marginBottom: '2rem',
    letterSpacing: '0.05em',
  },
  heroLinks: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  heroLinkSecondary: {
    textDecoration: 'none',
    color: '#8d96ab',
    border: '1px solid #8d96ab',
    padding: '0.4rem 1.2rem',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: '600',
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
    borderLeft: '4px solid #ff0000',
    paddingLeft: '1rem',
  },
  programsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  programCard: {
    backgroundColor: '#111320',
    borderRadius: '8px',
    overflow: 'hidden',
    textDecoration: 'none',
    border: '1px solid #1a1a2e',
    transition: 'border-color 0.2s',
    display: 'flex',
    flexDirection: 'column',
  },
  programLogoWrapper: {
    backgroundColor: '#0b0c12',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '180px',
  },
  programLogo: {
    maxHeight: '130px',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  programInfo: {
    padding: '1.2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    flex: 1,
  },
  programName: {
    fontSize: '1rem',
    fontWeight: '700',
  },
  programDesc: {
    color: '#8d96ab',
    fontSize: '0.88rem',
    lineHeight: '1.5',
    flex: 1,
  },
  programBtn: {
    display: 'inline-block',
    color: '#ffffff',
    padding: '0.35rem 0.9rem',
    borderRadius: '4px',
    fontSize: '0.82rem',
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginTop: '0.5rem',
  },
  sponsorsRow: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  sponsorCard: {
    backgroundColor: '#111320',
    border: '1px solid #1a1a2e',
    borderRadius: '8px',
    padding: '1.5rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sponsorLogo: {
    height: '60px',
    objectFit: 'contain',
    filter: 'brightness(0.9)',
  },
}