import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import twlLogo from '../../assets/logos/TWL_NETWORKS_transp.png'
import './Navbar.css'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/chickboxing', label: 'Chickboxing' },
  { to: '/desempacados', label: 'Desempacados' },
  { to: '/mas-alla-del-polliseo', label: 'Más Allá' },
  { to: '/golden-feather', label: 'Golden Feather' },
  { to: '/kanat', label: 'Kanat' },
]

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="navbar">
      <Link to="/" onClick={closeMenu}>
        <img src={twlLogo} alt="TWL Networks" className="navbar__logo" />
      </Link>

      {/* Hamburguesa */}
      <button className="navbar__hamburger" onClick={toggleMenu} aria-label="Menú">
        <span />
        <span />
        <span />
      </button>

      {/* Links */}
      <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
        {links.map(link => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`navbar__link ${location.pathname === link.to ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          </li>
        ))}
        {/* En móvil los botones de auth van dentro del menú */}
        <li className="navbar__auth-mobile">
          <Link to="/login" className="navbar__btn-login" onClick={closeMenu}>Iniciar sesión</Link>
        </li>
        <li className="navbar__auth-mobile">
          <Link to="/registro" className="navbar__btn-register" onClick={closeMenu}>Registrarse</Link>
        </li>
      </ul>

      {/* Auth en desktop */}
      <div className="navbar__auth">
        <Link to="/login" className="navbar__btn-login">Iniciar sesión</Link>
        <Link to="/registro" className="navbar__btn-register">Registrarse</Link>
      </div>
    </nav>
  )
}