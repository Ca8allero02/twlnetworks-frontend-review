import masAllaLogo from '../../assets/programs/LOGO_MAS_ALLA_DEL_POLLISEO.png'
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

      {/* PRÓXIMAMENTE */}
      <section className="masalla-section">
        <h2 className="masalla-section__title">Episodios y contenido</h2>
        <div className="masalla-coming-soon">
          <span className="masalla-coming-soon__icon">📺</span>
          <h3 className="masalla-coming-soon__title">Próximamente</h3>
          <p className="masalla-coming-soon__desc">
            Los episodios, clips y contenido exclusivo del programa
            estarán disponibles aquí muy pronto.
          </p>
        </div>
      </section>

    </div>
  )
}