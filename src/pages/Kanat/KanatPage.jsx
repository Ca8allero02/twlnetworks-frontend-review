import { Link } from 'react-router-dom'
import kanatLogo from '../../assets/logos/kanat_logo_bg_transparent.png'
import sajitImg from '../../assets/band/sajit_original.png'
import minnaImg from '../../assets/band/MINNA_FULL.png'
import kallioImg from '../../assets/band/kallio_full.webp'
import johaImg from '../../assets/band/YOHA_full.png'
import ronnieImg from '../../assets/band/ronni_full.png'
import frankieImg from '../../assets/band/frankie_full.png'
import './KanatPage.css'

const MEMBERS = [
  { name: 'Sajit',  role: 'Lead Vocals / Voz principal',              img: sajitImg  },
  { name: 'Minna',  role: 'Lead Vocals & Bass / Voz principal y bajo', img: minnaImg  },
  { name: 'Kallio', role: 'Lead Guitar / Guitarra líder',              img: kallioImg },
  { name: 'Joha',   role: 'Rhythm Guitar / Guitarra rítmica',          img: johaImg   },
  { name: 'Ronnie', role: 'Keyboards / Teclados',                      img: ronnieImg },
  { name: 'Frankie',role: 'Drums / Batería',                           img: frankieImg},
]

export default function KanatPage() {
  return (
    <div className="kanat-page">

      <header className="kanat-header">
        <p className="kanat-header__tag">🤘 Metal desde Helsinki · Signed by Golden Feather Studios</p>
        <img src={kanatLogo} alt="KANAT" className="kanat-header__logo" />
        <p className="kanat-header__sub">TWL NETWORKS</p>
      </header>

      <section className="kanat-hero">
        <h1 className="kanat-hero__title">Riffs oscuros, plumas al viento.</h1>
        <p className="kanat-hero__desc">
          KANAT es una banda de metal nacida en Helsinki, donde las luces de neón chocan
          con el frío y el ruido se vuelve himno. Sonidos pesados, coros que se quedan
          pegados y un universo propio dentro de TWL NETWORKS.
        </p>
        <div className="kanat-hero__links">
          <a href="https://open.spotify.com/artist/1mNXIQpxFWVWjSOY6VilcD?si=qZ8JHhnTRDSxm3oKEQsbwg" target="_blank" rel="noopener noreferrer" className="kanat-hero__btn-spotify">
            ▶ Escuchar en Spotify
          </a>
          <a href="https://music.youtube.com/channel/UCUygH_fZlUw5nGJk37LpkwQ?si=7mMWQXJYAMzIoUS6" target="_blank" rel="noopener noreferrer" className="kanat-hero__btn-yt">
            ▶ Escuchar en YouTube Music
          </a>
        </div>
      </section>

      <section className="kanat-section">
        <h2 className="kanat-section__title">Integrantes</h2>
        <div className="kanat-members-grid">
          {MEMBERS.map(member => (
            <div key={member.name} className="kanat-member-card">
              <div className="kanat-member-card__img-wrapper">
                <img src={member.img} alt={member.name} className="kanat-member-card__img" />
              </div>
              <h3 className="kanat-member-card__name">{member.name}</h3>
              <p className="kanat-member-card__role">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="kanat-footer">
        <div className="kanat-footer__links">
          <a href="https://open.spotify.com/artist/1mNXIQpxFWVWjSOY6VilcD?si=qZ8JHhnTRDSxm3oKEQsbwg" target="_blank" rel="noopener noreferrer" className="kanat-footer__link">Spotify</a>
          <a href="https://music.youtube.com/channel/UCUygH_fZlUw5nGJk37LpkwQ?si=7mMWQXJYAMzIoUS6" target="_blank" rel="noopener noreferrer" className="kanat-footer__link">YouTube Music</a>
          <Link to="/" className="kanat-footer__link">TWL NETWORKS</Link>
        </div>
        <p className="kanat-footer__copy">© KANAT · TWL NETWORKS</p>
      </footer>

    </div>
  )
}