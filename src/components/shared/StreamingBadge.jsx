import { useEffect, useState } from 'react'
import { getStreamingStatus } from '../../services/streaming.service'

export default function StreamingBadge() {
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    getStreamingStatus()
        .then(res => setStatus(res.data))
        .catch(() => setStatus(null))
        .finally(() => setLoading(false))

    // Refresca cada 60 segundos
    const interval = setInterval(() => {
        getStreamingStatus()
        .then(res => setStatus(res.data))
        .catch(() => {})
    }, 60000)

    return () => clearInterval(interval)
    }, [])

    if (loading) return null

    const isLive = status?.anyLive === true
    const plataformas = status?.platforms?.filter(p => p.live) || []

    return (
    <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem 1rem',
        borderRadius: '999px',
        backgroundColor: isLive ? '#1a0000' : '#1a1a2e',
        border: `1px solid ${isLive ? '#ff0000' : '#8d96ab'}`,
        fontSize: '0.85rem',
        fontWeight: '600',
        color: isLive ? '#ff4444' : '#8d96ab',
    }}>
        <span style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: isLive ? '#ff0000' : '#8d96ab',
        display: 'inline-block',
        animation: isLive ? 'pulse 1.2s infinite' : 'none',
        }} />
        {isLive
        ? `🔴 EN VIVO — ${plataformas.map(p => p.platform).join(', ')}`
        : 'Sin transmisión activa'}
    </div>
    )
}