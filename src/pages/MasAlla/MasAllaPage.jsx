// MasAllaPage.jsx
import { useEffect, useState } from 'react'
import masAllaLogo from '../../assets/programs/LOGO_MAS_ALLA_DEL_POLLISEO.png'
import { getProgramContent } from '../../services/programs.service'
import Loader from '../../components/shared/Loader'
import './MasAllaPage.css'

const INFO_CARDS = [
  {
    icon: '🎮',
    title: 'Cultura Geek',
    desc: 'Videojuegos, series, películas y todo lo que define la cultura geek moderna desde la perspectiva de Rod Ruster.',
  },
  {
    icon: '🎬',
    title: 'Detrás de cámaras',
    desc: 'La vida personal del conductor del Chickboxing Championship vista desde adentro, sin filtros.',
  },
  {
    icon: '🌐',
    title: 'Comunidad',
    desc: 'Un espacio preparado para crecer con episodios, clips y participación de la comunidad de TWL Networks.',
  },
]

export default function MasAllaPage() {
  const [content, setContent] = useState([])
  const [loadingContent, setLoadingContent] = useState(true)

  useEffect(() => {
    getProgramContent(3)
      .then(res => setContent(res.data))
      .catch(() => setContent([]))
      .finally(() => setLoadingContent(false))
  }, [])

  return (
    <div className="masalla-page">

      {/* HERO */}
      <section className="masalla-hero">
        <img
          src={masAllaLogo}
          alt="Más Allá del Polliseo"
          className="masalla-hero__logo"
        />
        <p className="masalla-hero__desc">
          El programa que va más allá del ring. Rod Ruster nos muestra
          su vida fuera de cámaras, su pasión por la cultura geek y
          los videojuegos en un formato cercano y sin filtros.
        </p>
      </section>

      {/* SOBRE EL PROGRAMA */}
      <section className="masalla-section">
        <h2 className="masalla-section__title">Sobre el programa</h2>
        <div className="masalla-info-grid">
          {INFO_CARDS.map(card => (
            <div key={card.title} className="masalla-info-card">
              <span className="masalla-info-card__icon">{card.icon}</span>
              <h3 className="masalla-info-card__title">{card.title}</h3>
              <p className="masalla-info-card__desc">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* CONDUCTOR */}
        <div className="masalla-host">
          <div className="masalla-host__avatar">🐔</div>
          <div>
            <h3 className="masalla-host__name">Rod Ruster</h3>
            <p className="masalla-host__role">Conductor · TWL Networks</p>
            <p className="masalla-host__desc">
              Conductor del Chickboxing Championship y figura central del
              universo de TWL Networks. En Más Allá del Polliseo lo conocemos
              fuera del ring.
            </p>
          </div>
        </div>
      </section>

      {/* EPISODIOS Y CONTENIDO */}
      <section className="masalla-section">
        <h2 className="masalla-section__title">Episodios y contenido</h2>

        {loadingContent && <Loader mensaje="Cargando contenido..." />}

        {!loadingContent && content.length === 0 && (
          <div className="masalla-coming-soon">
            <span className="masalla-coming-soon__icon">📺</span>
            <h3 className="masalla-coming-soon__title">Próximamente</h3>
            <p className="masalla-coming-soon__desc">
              Los episodios, clips y contenido exclusivo del programa
              estarán disponibles aquí muy pronto.
            </p>
          </div>
        )}

        {!loadingContent && content.length > 0 && (
          <div style={styles.contentGrid}>
            {content.map(item => (
              <div key={item.id} style={styles.contentCard}>
                {item.thumbnail_url && (
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    style={styles.thumbnail}
                  />
                )}
                <div style={styles.contentInfo}>
                  <span style={styles.contentType}>
                    {item.type === 'episode' ? '📺 Episodio'
                      : item.type === 'clip' ? '🎬 Clip'
                      : item.type === 'article' ? '📝 Artículo'
                      : '📌 Contenido'}
                  </span>
                  <h3 style={styles.contentTitle}>{item.title}</h3>
                  {item.description && (
                    <p style={styles.contentDesc}>{item.description}</p>
                  )}
                  {item.media_url && (
                    <a
                      href={item.media_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.contentBtn}
                    >
                      Ver ahora →
                    </a>
                  )}
                  {item.published_at && (
                    <p style={styles.contentDate}>
                      {new Date(item.published_at).toLocaleDateString('es-CO', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>
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
  contentGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  contentCard: {
    backgroundColor: '#111320',
    border: '1px solid #1a1a2e',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    gap: '1.2rem',
  },
  thumbnail: {
    width: '180px',
    minWidth: '180px',
    height: '120px',
    objectFit: 'cover',
  },
  contentInfo: {
    padding: '1rem 1rem 1rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  contentType: {
    color: '#f5a000',
    fontSize: '0.78rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  contentTitle: {
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '700',
    margin: '0.2rem 0',
  },
  contentDesc: {
    color: '#8d96ab',
    fontSize: '0.85rem',
    lineHeight: '1.5',
    margin: 0,
  },
  contentBtn: {
    color: '#f5a000',
    fontSize: '0.85rem',
    fontWeight: '600',
    textDecoration: 'none',
    marginTop: '0.3rem',
  },
  contentDate: {
    color: '#555c6e',
    fontSize: '0.78rem',
    margin: 0,
  },
}