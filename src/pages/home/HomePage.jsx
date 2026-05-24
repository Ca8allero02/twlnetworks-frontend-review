// HomePage.jsx
import { Link } from 'react-router-dom'
import twlLogo from '../../assets/logos/TWL_NETWORKS_transp.png'
import cbcLogo from '../../assets/programs/new_logo_CBC.png'
import desempacadosLogo from '../../assets/programs/DESEMPACA2_LOGO_transparente.png'
import masAllaLogo from '../../assets/programs/LOGO_MAS_ALLA_DEL_POLLISEO.png'
import secarodLogo from '../../assets/sponsors/SECAROD_COSMETICS_TRANSBG.png'
import silveriosLogo from '../../assets/sponsors/silverios_logo_tbg.png'
import StreamingBadge from '../../components/shared/StreamingBadge'
import './HomePage.css'

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

const VALUES = [
  { title: 'Creatividad', desc: 'Ideas originales y nuevas formas de contar historias.' },
  { title: 'Comunidad', desc: 'Espacios donde creadores y audiencias se sienten parte del proyecto.' },
  { title: 'Colaboración', desc: 'Apoyo a streamers y creadores independientes.' },
  { title: 'Innovación', desc: 'Nuevas tecnologías y formatos para experiencias únicas.' },
  { title: 'Respeto', desc: 'Ambiente familiar, seguro y accesible para todos.' },
  { title: 'Pasión', desc: 'Todo nace del amor por el contenido y las historias.' },
]

const SPONSORS = [
  { name: 'Secarod Professional Cosmetics', logo: secarodLogo, url: null },
  { name: "Silverio's Cereales", logo: silveriosLogo, url: null },
]

export default function HomePage() {
  return (
    <div className="home-page">

      {/* HERO */}
      <section className="home-hero">
        <img src={twlLogo} alt="TWL Networks" className="home-hero__logo" />
        <p className="home-hero__tagline">The Winged Legends</p>
        <p className="home-hero__name">Entretenimiento digital · Música · Producción creativa</p>

        {/* StreamingBadge maneja su propio estado internamente */}
        <StreamingBadge />

        <div className="home-hero__links">
          <Link to="/kanat" className="home-hero__link">Kanat</Link>
          <Link to="/golden-feather" className="home-hero__link">Golden Feather Studios</Link>
        </div>
      </section>

      {/* SOBRE TWL NETWORKS */}
      <section className="home-section">
        <h2 className="home-section__title">¿Qué es TWL Networks?</h2>
        <div className="home-about">
          <p className="home-about__desc">
            <span className="home-about__highlight">TWL Networks</span> — The Winged Legends — es una plataforma
            creativa dedicada al entretenimiento digital, la producción audiovisual y el desarrollo
            de universos narrativos originales. Desde transmisiones en vivo hasta música, animación
            y videojuegos, funciona como un estudio creativo independiente donde las ideas se
            transforman en experiencias para la audiencia.
          </p>
          <p className="home-about__desc">
            Uno de los pilares del proyecto es la construcción de un
            <span className="home-about__highlight"> multiverso narrativo propio</span>, donde distintos
            programas, personajes y producciones forman parte de un mismo mundo creativo. También
            colaboramos con streamers, artistas y creadores independientes a través de
            <span className="home-about__highlight"> Nak+</span>, nuestra comunidad de amigos y
            creadores que comparten valores de apoyo mutuo, creatividad y crecimiento.
          </p>
          <div className="home-values-grid">
            {VALUES.map(value => (
              <div key={value.title} className="home-value-card">
                <h4 className="home-value-card__title">{value.title}</h4>
                <p className="home-value-card__desc">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section className="home-section">
        <h2 className="home-section__title">Misión y Visión</h2>
        <div className="home-mv-grid">
          <div className="home-mv-card">
            <div className="home-mv-card__icon">🎯</div>
            <h3 className="home-mv-card__title">Misión</h3>
            <p className="home-mv-card__desc">
              Crear contenido original que entretenga, conecte y construya comunidad,
              utilizando formatos innovadores como streaming, música, animación y
              experiencias interactivas. Transformar ideas en historias que puedan
              compartirse en múltiples plataformas.
            </p>
          </div>
          <div className="home-mv-card">
            <div className="home-mv-card__icon">🚀</div>
            <h3 className="home-mv-card__title">Visión</h3>
            <p className="home-mv-card__desc">
              Convertirnos en un estudio creativo reconocido dentro del entretenimiento
              digital independiente, expandiendo el universo de The Winged Legends hacia
              nuevas plataformas, formatos y audiencias alrededor del mundo.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAMAS */}
      <section className="home-section">
        <h2 className="home-section__title">Nuestros Programas</h2>
        <div className="home-programs-grid">
          {PROGRAMS.map(program => (
            <Link to={program.path} key={program.id} className="home-program-card">
              <div className="home-program-card__logo-wrapper">
                <img src={program.logo} alt={program.name} className="home-program-card__logo" />
              </div>
              <div className="home-program-card__info">
                <h3 className="home-program-card__name" style={{ color: program.color }}>
                  {program.name}
                </h3>
                <p className="home-program-card__desc">{program.description}</p>
                <span className="home-program-card__btn" style={{ backgroundColor: program.color }}>
                  Ver más →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PATROCINADORES */}
      <section className="home-section">
        <h2 className="home-section__title">Patrocinadores</h2>
        <div className="home-sponsors-row">
          {SPONSORS.map(sponsor => (
            sponsor.url
              ? <a href={sponsor.url} target="_blank" rel="noopener noreferrer" key={sponsor.name} className="home-sponsor-card">
                  <img src={sponsor.logo} alt={sponsor.name} className="home-sponsor-logo" />
                </a>
              : <div key={sponsor.name} className="home-sponsor-card">
                  <img src={sponsor.logo} alt={sponsor.name} className="home-sponsor-logo" />
                </div>
          ))}
        </div>
      </section>

    </div>
  )
}