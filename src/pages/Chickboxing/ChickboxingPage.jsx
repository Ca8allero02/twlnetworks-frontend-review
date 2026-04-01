import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cbcLogo from '../../assets/programs/new_logo_CBC.png'
import { getChampions } from '../../services/chickboxing.service'

export default function ChickboxingPage() {
  const [champions, setChampions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getChampions()
      .then(res => setChampions(res.data))
      .catch(() => setError('No se pudieron cargar los campeones.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={styles.page}>

      {/* HERO */}
      <section style={styles.hero}>
        <img src={cbcLogo} alt="Chickboxing Championship" style={styles.heroLogo} />
        <p style={styles.heroDesc}>
          El campeonato de boxeo más salvaje del mundo avícola. Pollos de todas
          las razas se enfrentan en épicas batallas por la gloria eterna.
          ¿Tienes un pollo con lo que se necesita?
        </p>
        <Link to="/chickboxing/postular" style={styles.applyBtn}>
          Postular mi pollo
        </Link>
      </section>

      {/* CAMPEONES */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Campeones por Temporada</h2>

        {loading && (
          <p style={styles.stateText}>Cargando campeones...</p>
        )}

        {error && (
          <p style={styles.errorText}>{error}</p>
        )}

        {!loading && !error && champions.length === 0 && (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>🏆</span>
            <p style={styles.emptyTitle}>Aún no hay campeones registrados</p>
            <p style={styles.emptyDesc}>
              Los campeones de cada temporada aparecerán aquí próximamente.
            </p>
          </div>
        )}

        {!loading && champions.length > 0 && (
          <div style={styles.championsGrid}>
            {champions.map(champion => (
              <div key={champion.id} style={styles.championCard}>
                <div style={styles.championImageWrapper}>
                  {champion.image_url
                    ? <img src={champion.image_url} alt={champion.name} style={styles.championImage} />
                    : <div style={styles.championImagePlaceholder}>🐔</div>
                  }
                </div>
                <div style={styles.championInfo}>
                  <span style={styles.championSeason}>Temporada {champion.season}</span>
                  <h3 style={styles.championName}>{champion.name}</h3>
                  {champion.stats && (
                    <div style={styles.statsRow}>
                      {Object.entries(champion.stats).map(([key, val]) => (
                        <div key={key} style={styles.statBadge}>
                          <span style={styles.statKey}>{key}</span>
                          <span style={styles.statVal}>{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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
    background: 'linear-gradient(180deg, #1a0000 0%, #0b0c12 100%)',
  },
  heroLogo: {
    width: '280px',
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
    backgroundColor: '#ff0000',
    color: '#ffffff',
    padding: '0.7rem 2rem',
    borderRadius: '4px',
    fontWeight: '700',
    fontSize: '1rem',
    letterSpacing: '0.03em',
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
  stateText: {
    color: '#8d96ab',
    textAlign: 'center',
    padding: '3rem',
  },
  errorText: {
    color: '#ff0000',
    textAlign: 'center',
    padding: '3rem',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#111320',
    borderRadius: '8px',
    border: '1px solid #1a1a2e',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '3.5rem',
    marginBottom: '1rem',
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  emptyDesc: {
    color: '#8d96ab',
    fontSize: '0.9rem',
  },
  championsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  championCard: {
    backgroundColor: '#111320',
    borderRadius: '8px',
    border: '1px solid #1a1a2e',
    overflow: 'hidden',
  },
  championImageWrapper: {
    height: '220px',
    backgroundColor: '#0b0c12',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  championImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  championImagePlaceholder: {
    fontSize: '4rem',
  },
  championInfo: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  championSeason: {
    color: '#ff0000',
    fontSize: '0.8rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  championName: {
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '700',
  },
  statsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
    marginTop: '0.4rem',
  },
  statBadge: {
    backgroundColor: '#0b0c12',
    border: '1px solid #1a1a2e',
    borderRadius: '4px',
    padding: '0.2rem 0.5rem',
    display: 'flex',
    gap: '0.3rem',
    fontSize: '0.78rem',
  },
  statKey: {
    color: '#8d96ab',
    textTransform: 'capitalize',
  },
  statVal: {
    color: '#ffffff',
    fontWeight: '700',
  },
}