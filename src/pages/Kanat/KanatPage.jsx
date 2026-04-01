import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import kanatLogo from '../../assets/logos/kanat_logo_bg_transparent.png'
import sajitImg from '../../assets/band/sajit_original.png'
import minnaImg from '../../assets/band/MINNA_FULL.png'
import kallioImg from '../../assets/band/kallio_full.webp'
import johaImg from '../../assets/band/YOHA_full.png'
import ronnieImg from '../../assets/band/ronni_full.png'
import frankieImg from '../../assets/band/frankie_full.png'

const MEMBERS = [
  { name: 'Sajit', role: 'Lead Vocals / Voz principal', img: sajitImg },
  { name: 'Minna', role: 'Lead Vocals & Bass / Voz principal y bajo', img: minnaImg },
  { name: 'Kallio', role: 'Lead Guitar / Guitarra líder', img: kallioImg },
  { name: 'Joha', role: 'Rhythm Guitar / Guitarra rítmica', img: johaImg },
  { name: 'Ronnie', role: 'Keyboards / Teclados', img: ronnieImg },
  { name: 'Frankie', role: 'Drums / Batería', img: frankieImg },
]

export default function KanatPage() {
  const [bandInfo, setBandInfo] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/band/kanat`)
      .then(res => res.json())
      .then(data => setBandInfo(data))
      .catch(() => setBandInfo(null))
  }, [])

  return (
    <div style={styles.page}>

      {/* HEADER PROPIO */}
      <header style={styles.header}>
        <div style={styles.headerTop}>
          <span style={styles.headerTag}>🤘 Metal desde Hensinki · Signed by Golden Feather Studios</span>
        </div>
        <img src={kanatLogo} alt="KANAT" style={styles.headerLogo} />
        <p style={styles.headerSub}>TWL NETWORKS</p>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Riffs oscuros, plumas al viento.</h1>
        <p style={styles.heroDesc}>
          KANAT es una banda de metal nacida en Hensinki, donde las luces de neón chocan
          con el frío y el ruido se vuelve himno. Sonidos pesados, coros que se quedan
          pegados y un universo propio dentro de TWL NETWORKS.
        </p>
        <div style={styles.heroLinks}>
          <a href="https://open.spotify.com/artist/1mNXIQpxFWVWjSOY6VilcD?si=nT0gXOQERRCJtN4tjOv_sw" target="_blank" rel="noopener noreferrer" style={styles.btnSpotify}>
            ▶ Escuchar en Spotify
          </a>
          <a href="https://music.youtube.com/channel/UC4pF245rt6PvMPyHANGHnLg" target="_blank" rel="noopener noreferrer" style={styles.btnYT}>
            ▶ Escuchar en YouTube Music
          </a>
        </div>
      </section>

      {/* INTEGRANTES */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Integrantes</h2>
        <div style={styles.membersGrid}>
          {MEMBERS.map(member => (
            <div key={member.name} style={styles.memberCard}>
              <div style={styles.memberImgWrapper}>
                <img src={member.img} alt={member.name} style={styles.memberImg} />
              </div>
              <h3 style={styles.memberName}>{member.name}</h3>
              <p style={styles.memberRole}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER PROPIO */}
      <footer style={styles.footer}>
        <div style={styles.footerLinks}>
          <a href="https://open.spotify.com/artist/1mNXIQpxFWVWjSOY6VilcD?si=nT0gXOQERRCJtN4tjOv_sw" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>Spotify</a>
          <a href="https://music.youtube.com/channel/UC4pF245rt6PvMPyHANGHnLg" target="_blank" rel="noopener noreferrer" style={styles.footerLink}>YouTube Music</a>
          <Link to="/" style={styles.footerLink}>TWL NETWORKS</Link>
        </div>
        <p style={styles.footerCopy}>© KANAT · TWL NETWORKS</p>
      </footer>

    </div>
  )
}

const styles = {
  page: {
    backgroundColor: '#050507',
    minHeight: '100vh',
    color: '#ffffff',
    fontFamily: 'sans-serif',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem 2rem 2rem',
    textAlign: 'center',
    borderBottom: '1px solid #1a1a1a',
  },
  headerTop: {
    marginBottom: '1.5rem',
  },
  headerTag: {
    color: '#8d96ab',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
  },
  headerLogo: {
    width: '260px',
    maxWidth: '80%',
    objectFit: 'contain',
    marginBottom: '0.8rem',
    filter: 'brightness(1.1)',
  },
  headerSub: {
    color: '#8d96ab',
    fontSize: '0.8rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  },
  hero: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '4rem 2rem',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '2rem',
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: '1.2rem',
    lineHeight: '1.2',
  },
  heroDesc: {
    color: '#8d96ab',
    fontSize: '1rem',
    lineHeight: '1.8',
    marginBottom: '2.5rem',
  },
  heroLinks: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btnSpotify: {
    textDecoration: 'none',
    backgroundColor: '#1db954',
    color: '#000000',
    padding: '0.7rem 1.5rem',
    borderRadius: '30px',
    fontWeight: '700',
    fontSize: '0.9rem',
  },
  btnYT: {
    textDecoration: 'none',
    backgroundColor: '#ff0000',
    color: '#ffffff',
    padding: '0.7rem 1.5rem',
    borderRadius: '30px',
    fontWeight: '700',
    fontSize: '0.9rem',
  },
  section: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '4rem 2rem',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: '2.5rem',
    textAlign: 'center',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  membersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '2rem',
  },
  memberCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '0.6rem',
  },
  memberImgWrapper: {
    width: '140px',
    height: '200px',
    overflow: 'hidden',
    borderRadius: '4px',
    backgroundColor: '#0f0f0f',
  },
  memberImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top',
  },
  memberName: {
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '700',
  },
  memberRole: {
    color: '#8d96ab',
    fontSize: '0.78rem',
    lineHeight: '1.4',
  },
  footer: {
    borderTop: '1px solid #1a1a1a',
    padding: '2.5rem 2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  footerLinks: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerLink: {
    color: '#8d96ab',
    textDecoration: 'none',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
  },
  footerCopy: {
    color: '#3a3a3a',
    fontSize: '0.8rem',
  },
}