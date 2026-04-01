import twlLogo from '../../assets/logos/TWL_NETWORKS_transp.png'

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <img src={twlLogo} alt="TWL Networks" style={styles.logo} />
      <p style={styles.text}>© {new Date().getFullYear()} TWL Networks. Todos los derechos reservados.</p>
      <p style={styles.email}>soporte@twlnetworks.org</p>
    </footer>
  )
}

const styles = {
  footer: {
    backgroundColor: '#0b0c12',
    borderTop: '2px solid #ff0000',
    padding: '2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logo: {
    height: '40px',
    objectFit: 'contain',
    marginBottom: '0.5rem',
  },
  text: {
    color: '#8d96ab',
    fontSize: '0.85rem',
  },
  email: {
    color: '#ff0000',
    fontSize: '0.85rem',
  },
}