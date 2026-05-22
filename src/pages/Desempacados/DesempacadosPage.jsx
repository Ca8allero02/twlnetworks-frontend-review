import { Link } from 'react-router-dom'
import desempacadosLogo from '../../assets/programs/DESEMPACA2_LOGO_transparente.png'
import './DesempacadosPage.css'

const INFO_CARDS = [
  {
    icon: '🎙️',
    title: 'Entrevistas auténticas',
    desc: 'Conversaciones profundas con personas que tienen historias únicas que contar.',
  },
  {
    icon: '📦',
    title: 'Se abre la caja',
    desc: 'Descubrimos lo que hay detrás de cada invitado, más allá de lo que todos ya conocen.',
  },
  {
    icon: '🌐',
    title: 'Comunidad',
    desc: 'Los espectadores pueden postularse para ser el próximo invitado del programa.',
  },
]

export default function DesempacadosPage() {
  return (
    <div className="desempacados-page">

      <section className="desempacados-hero">
        <img src={desempacadosLogo} alt="Desempacados" className="desempacados-hero__logo" />
        <p className="desempacados-hero__desc">
          El programa donde se descubre lo que hay dentro de los personajes
          más interesantes. Entrevistas únicas, historias reales y momentos
          que no te puedes perder.
        </p>
        <Link to="/desempacados/postular" className="desempacados-hero__btn">
          Quiero ser entrevistado
        </Link>
      </section>

      <section className="desempacados-section">
        <h2 className="desempacados-section__title">Sobre el programa</h2>
        <div className="desempacados-info-grid">
          {INFO_CARDS.map(card => (
            <div key={card.title} className="desempacados-info-card">
              <span className="desempacados-info-card__icon">{card.icon}</span>
              <h3 className="desempacados-info-card__title">{card.title}</h3>
              <p className="desempacados-info-card__desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="desempacados-cta-section">
        <div className="desempacados-cta">
          <h2 className="desempacados-cta__title">¿Quieres aparecer en Desempacados?</h2>
          <p className="desempacados-cta__desc">
            Si tienes una historia que contar, postúlate. Necesitas una
            cuenta para enviar tu postulación.
          </p>
          <div className="desempacados-cta__btns">
            <Link to="/desempacados/postular" className="desempacados-cta__btn-primary">
              Postularme ahora
            </Link>
            <Link to="/registro" className="desempacados-cta__btn-secondary">
              Crear cuenta
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}