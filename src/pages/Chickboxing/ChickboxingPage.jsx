import { Link } from 'react-router-dom'
import cbcLogo from '../../assets/programs/new_logo_CBC.png'
import hallOfFame from '../../assets/programs/champions/HALL_OF_FAME_V2.png'
import s1 from '../../assets/programs/champions/s1_polli_balboa.png'
import s2 from '../../assets/programs/champions/s2_otto_schindler.png'
import s3 from '../../assets/programs/champions/s3_el_pollo.png'
import s4 from '../../assets/programs/champions/s4_cartolopollo.png'
import s5 from '../../assets/programs/champions/s5_pollon_wick.png'
import s6 from '../../assets/programs/champions/s6_rougazanma.png'
import s7 from '../../assets/programs/champions/s7_scor-pio.png'
import s8 from '../../assets/programs/champions/s8_lazaro_capaldi.png'
import './ChickboxingPage.css'

const CHAMPIONS = [
  { season: 1, name: 'Polli Balboa',   img: s1 },
  { season: 2, name: 'Otto Schindler', img: s2 },
  { season: 3, name: 'El Pollo',       img: s3 },
  { season: 4, name: 'Cartolopollo',   img: s4 },
  { season: 5, name: 'Pollon Wick',    img: s5 },
  { season: 6, name: 'Rougazanma',     img: s6 },
  { season: 7, name: 'Scor-Pio',       img: s7 },
  { season: 7, name: 'Lazaro Capaldi', img: s8 },
]

export default function ChickboxingPage() {
  return (
    <div className="chickboxing-page">

      <section className="chickboxing-hero">
        <img src={cbcLogo} alt="Chickboxing Championship" className="chickboxing-hero__logo" />
        <p className="chickboxing-hero__desc">
          El campeonato de boxeo más salvaje del mundo avícola. Pollos de todas
          las razas se enfrentan en épicas batallas por la gloria eterna.
          ¿Tienes un pollo con lo que se necesita?
        </p>
        <Link to="/chickboxing/postular" className="chickboxing-hero__btn">
          Postular mi pollo
        </Link>
      </section>

      <section className="chickboxing-section">
        <div className="chickboxing-hall-header">
          <img src={hallOfFame} alt="Salón de la Fama" className="chickboxing-hall-logo" />
        </div>
        <div className="chickboxing-grid">
          {CHAMPIONS.map(champion => (
            <div key={champion.season} className="chickboxing-card">
              <img
                src={champion.img}
                alt={champion.name}
                className="chickboxing-card__img"
              />
              <div className="chickboxing-card__info">
                <span className="chickboxing-card__season">
                  Temporada {champion.season}
                </span>
                <h3 className="chickboxing-card__name">{champion.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}