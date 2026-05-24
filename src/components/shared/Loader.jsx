export default function Loader({ mensaje = 'Cargando...' }) {
    return (
    <div style={styles.wrapper}>
        <div style={styles.spinner} />
        <p style={styles.texto}>{mensaje}</p>
    </div>
    )
}

const styles = {
    wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '40vh',
    gap: '1rem',
    },
    spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #1a1a2e',
    borderTop: '4px solid #ff0000',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    },
    texto: {
    color: '#8d96ab',
    fontSize: '0.9rem',
    },
}