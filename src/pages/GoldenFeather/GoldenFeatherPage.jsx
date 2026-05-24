// GoldenFeatherPage.jsx
import { Link } from 'react-router-dom'
import gfLogo from '../../assets/logos/golden_feather_transparente.png'
import kanatLogo from '../../assets/logos/kanat_logo_bg_transparent.png'
import './GoldenFeatherPage.css'

const VALUES = [
  {
    icon: '🎵',
    title: 'Producción original',
    desc: 'Creamos música original que forma parte del universo narrativo de TWL Networks.',
  },
  {
    icon: '🪶',
    title: 'Identidad propia',
    desc: 'Cada proyecto tiene su propio sonido, estética y lugar dentro del multiverso.',
  },
  {
    icon: '🤝',
    title: 'Colaboración',
    desc: 'Trabajamos con artistas y creadores independientes dentro del ecosistema TWL.',
  },
  {
    icon: '🌍',
    title: 'Alcance global',
    desc: 'Nuestros proyectos están disponibles en las principales plataformas digitales.',
  },
]

const PROJECTS = [
  {
    name: 'Kanat',
    desc: 'Banda oficial de rock alternativo de TWL Networks. Origen: Helsinki, Finlandia.',
    logo: kanatLogo,
    path: '/kanat',
  },
]

export default function GoldenFeatherPage() {
  return (
    <div className="gf-page">

      {/* HEADER */}
      <header className="gf-header">
        <img src={gfLogo} alt="Golden Feather Studios" className="gf-header__logo" />
        <h1 className="gf-header__title">Golden Feather Studios</h1>
        <p className="gf-header__subtitle">TWL Networks · Sello Musical Independiente</p>
      </header>

      {/* HERO */}
      <section className="gf-hero">
        <h2 className="gf-hero__title">
          Donde las ideas se convierten en <span>música</span>
        </h2>
        <p className="gf-hero__desc">
          Golden Feather Studios es el sello musical creativo de TWL Networks.
          Producimos proyectos originales que forman parte del universo narrativo
          del proyecto, dando vida a bandas, composiciones y experiencias sonoras
          únicas dentro del multiverso de The Winged Legends.
        </p>
        <a href="mailto:soporte@twlnetworks.org" className="gf-hero__btn">
          Contactar al estudio
        </a>
      </section>

      {/* VALORES */}
      <section className="gf-section">
        <h2 className="gf-section__title">Nuestro enfoque</h2>
        <div className="gf-values-grid">
          {VALUES.map(value => (
            <div key={value.title} className="gf-value-card">
              <span className="gf-value-card__icon">{value.icon}</span>
              <h3 className="gf-value-card__title">{value.title}</h3>
              <p className="gf-value-card__desc">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROYECTOS */}
      <section className="gf-section">
        <h2 className="gf-section__title">Proyectos</h2>
        <div className="gf-projects-grid">
          {PROJECTS.map(project => (
            <Link to={project.path} key={project.name} className="gf-project-card">
              <div className="gf-project-card__img-wrapper">
                <img
                  src={project.logo}
                  alt={project.name}
                  className="gf-project-card__img"
                />
              </div>
              <div className="gf-project-card__info">
                <h3 className="gf-project-card__name">{project.name}</h3>
                <p className="gf-project-card__desc">{project.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="gf-cta">
        <h2 className="gf-cta__title">¿Tienes un proyecto musical?</h2>
        <p className="gf-cta__desc">
          Golden Feather Studios está abierto a colaboraciones con artistas
          y creadores que compartan nuestra visión creativa.
        </p>
        <a href="mailto:soporte@twlnetworks.org" className="gf-cta__btn">
          Escribirnos
        </a>
      </div>

      {/* FOOTER PROPIO */}
      <footer className="gf-footer">
        <div className="gf-footer__links">
          <Link to="/kanat" className="gf-footer__link">Kanat</Link>
          <Link to="/" className="gf-footer__link">TWL Networks</Link>
          <a href="mailto:soporte@twlnetworks.org" className="gf-footer__link">Contacto</a>
        </div>
        <p className="gf-footer__copy">© Golden Feather Studios · TWL Networks</p>
      </footer>

    </div>
  )
}