import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getChampions } from '../../services/chickboxing.service'
import Loader from '../../components/shared/Loader'
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

const CHAMPION_IMAGES = {
  'polli balboa':   s1,
  'otto schindler': s2,
  'el pollo':       s3,
  'cartolopollo':   s4,
  'pollon wick':    s5,
  'rougazanma':     s6,
  'scor-pio':       s7,
  'lazaro capaldi': s8,
}

const getChampionImage = (name) => {
  if (!name) return null
  return CHAMPION_IMAGES[name.toLowerCase().trim()] || null
}

export default function ChickboxingPage() {
  const [champions, setChampions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getChampions()
      .then(res => setChampions(res.data))
      .catch(() => setError('No se pudieron cargar los campeones'))
      .finally(() => setLoading(false))
  }, [])

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

        {loading && <Loader mensaje="Cargando campeones..." />}

        {error && (
          <p style={{ color: '#ff6b6b', textAlign: 'center', padding: '2rem' }}>
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="chickboxing-grid">
            {champions.map(champion => {
              const localImage = getChampionImage(champion.name)
              const imageSrc = localImage || champion.image_url || null

              return (
                <div key={champion.id} className="chickboxing-card">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={champion.name}
                      className="chickboxing-card__img"
                    />
                  ) : (
                    <div className="chickboxing-card__img chickboxing-card__no-img">
                      🐔
                    </div>
                  )}
                  <div className="chickboxing-card__info">
                    <span className="chickboxing-card__season">
                      Temporada {champion.season}
                    </span>
                    <h3 className="chickboxing-card__name">{champion.name}</h3>
                    {(champion.wins > 0 || champion.losses > 0 || champion.knockouts > 0) && (
                      <p className="chickboxing-card__stats">
                        {champion.wins}W · {champion.losses}L · {champion.knockouts}KO
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </section>

    </div>
  )
}