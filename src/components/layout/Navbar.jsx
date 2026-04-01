import { Link, useLocation } from 'react-router-dom'
import twlLogo from '../../assets/logos/TWL_NETWORKS_transp.png'

export default function Navbar() {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/chickboxing', label: 'Chickboxing' },
    { to: '/desempacados', label: 'Desempacados' },
    { to: '/mas-alla-del-polliseo', label: 'Más Allá' },
    { to: '/golden-feather', label: 'Golden Feather' },
    { to: '/kanat', label: 'Kanat' },
  ]

  return (
    <nav style={styles.nav}>
      <Link to="/">
        <img src={twlLogo} alt="TWL Networks" style={styles.logo} />
      </Link>
      <ul style={styles.links}>
        {links.map(link => (
          <li key={link.to}>
            <Link
              to={link.to}
              style={{
                ...styles.link,
                color: location.pathname === link.to ? '#ff0000' : '#8d96ab'
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div style={styles.auth}>
        <Link to="/login" style={styles.btnLogin}>Iniciar sesión</Link>
        <Link to="/registro" style={styles.btnRegister}>Registrarse</Link>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    height: '70px',
    backgroundColor: '#0b0c12',
    borderBottom: '2px solid #ff0000',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    height: '45px',
    objectFit: 'contain',
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    listStyle: 'none',
  },
  link: {
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'color 0.2s',
  },
  auth: {
    display: 'flex',
    gap: '0.75rem',
  },
  btnLogin: {
    textDecoration: 'none',
    color: '#8d96ab',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  btnRegister: {
    textDecoration: 'none',
    backgroundColor: '#ff0000',
    color: '#ffffff',
    padding: '0.4rem 1rem',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
}