import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import {
  getApplications,
  createChampion, updateChampion, updateStats, deleteChampion,
  createSponsor, deleteSponsor,
  createSocialLink, deleteSocialLink,
  createContent, deleteContent,
  updateBandMember,
} from '../../services/admin.service'
import { getChampions } from '../../services/chickboxing.service'
import { getBandInfo } from '../../services/band.service'
import { getSponsors } from '../../services/sponsors.service'
import Loader from '../../components/shared/Loader'

const TABS = [
  { id: 'postulaciones', label: '📋 Postulaciones' },
  { id: 'campeones',     label: '🏆 Campeones' },
  { id: 'banda',         label: '🎸 Banda' },
  { id: 'sponsors',      label: '🤝 Sponsors' },
  { id: 'social',        label: '🔗 Redes sociales' },
  { id: 'contenido',     label: '🎬 Contenido' },
]

export default function AdminPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('postulaciones')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)

  // Datos
  const [applications, setApplications] = useState([])
  const [champions, setChampions] = useState([])
  const [bandMembers, setBandMembers] = useState([])
  const [sponsors, setSponsors] = useState([])

  // Formularios
  const [newChampion, setNewChampion] = useState({ name: '', season: '', image_url: '' })
  const [newSponsor, setNewSponsor] = useState({ name: '', logo_url: '', website_url: '' })
  const [newSocial, setNewSocial] = useState({ entity_type: 'network', entity_id: '', platform: '', url: '' })
  const [newContent, setNewContent] = useState({ program_id: '', type: 'episode', title: '', description: '', media_url: '', thumbnail_url: '', published_at: '' })

  const showFeedback = (msg, ok = true) => {
    setFeedback({ msg, ok })
    setTimeout(() => setFeedback(null), 3000)
  }

  // Cargar datos según tab activo
  useEffect(() => {
    if (activeTab === 'postulaciones') {
      setLoading(true)
      getApplications().then(r => setApplications(r.data)).catch(() => {}).finally(() => setLoading(false))
    }
    if (activeTab === 'campeones') {
      setLoading(true)
      getChampions().then(r => setChampions(r.data)).catch(() => {}).finally(() => setLoading(false))
    }
    if (activeTab === 'banda') {
      setLoading(true)
      getBandInfo().then(r => setBandMembers(r.data.members)).catch(() => {}).finally(() => setLoading(false))
    }
    if (activeTab === 'sponsors') {
      setLoading(true)
      getSponsors().then(r => setSponsors(r.data)).catch(() => {}).finally(() => setLoading(false))
    }
  }, [activeTab])

  // ── Handlers campeones ────────────────────────────────────────
  const handleCreateChampion = async (e) => {
    e.preventDefault()
    try {
      await createChampion(newChampion)
      showFeedback('Campeón creado exitosamente')
      setNewChampion({ name: '', season: '', image_url: '' })
      getChampions().then(r => setChampions(r.data))
    } catch {
      showFeedback('Error al crear campeón', false)
    }
  }

  const handleDeleteChampion = async (id) => {
    if (!confirm('¿Eliminar este campeón?')) return
    try {
      await deleteChampion(id)
      showFeedback('Campeón eliminado')
      setChampions(prev => prev.filter(c => c.id !== id))
    } catch {
      showFeedback('Error al eliminar campeón', false)
    }
  }

  // ── Handlers banda ────────────────────────────────────────────
  const handleUpdateMember = async (id, name, role) => {
    try {
      await updateBandMember(id, { name, role })
      showFeedback('Integrante actualizado')
    } catch {
      showFeedback('Error al actualizar integrante', false)
    }
  }

  // ── Handlers sponsors ─────────────────────────────────────────
  const handleCreateSponsor = async (e) => {
    e.preventDefault()
    try {
      await createSponsor({ ...newSponsor, scope: 'global' })
      showFeedback('Patrocinador creado')
      setNewSponsor({ name: '', logo_url: '', website_url: '' })
      getSponsors().then(r => setSponsors(r.data))
    } catch {
      showFeedback('Error al crear patrocinador', false)
    }
  }

  const handleDeleteSponsor = async (id) => {
    if (!confirm('¿Eliminar este patrocinador?')) return
    try {
      await deleteSponsor(id)
      showFeedback('Patrocinador eliminado')
      setSponsors(prev => prev.filter(s => s.id !== id))
    } catch {
      showFeedback('Error al eliminar patrocinador', false)
    }
  }

  // ── Handlers redes sociales ───────────────────────────────────
  const handleCreateSocial = async (e) => {
    e.preventDefault()
    try {
      await createSocialLink({
        ...newSocial,
        entity_id: newSocial.entity_id || null,
      })
      showFeedback('Enlace creado')
      setNewSocial({ entity_type: 'network', entity_id: '', platform: '', url: '' })
    } catch {
      showFeedback('Error al crear enlace', false)
    }
  }

  // ── Handlers contenido ────────────────────────────────────────
  const handleCreateContent = async (e) => {
    e.preventDefault()
    try {
      await createContent(newContent)
      showFeedback('Contenido creado')
      setNewContent({ program_id: '', type: 'episode', title: '', description: '', media_url: '', thumbnail_url: '', published_at: '' })
    } catch {
      showFeedback('Error al crear contenido', false)
    }
  }

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Panel de administración</h1>
        <p style={styles.subtitle}>Bienvenido, {user?.name}</p>
      </div>

      {/* Feedback */}
      {feedback && (
        <div style={{
          ...styles.feedback,
          backgroundColor: feedback.ok ? '#002a00' : '#2a0000',
          border: `1px solid ${feedback.ok ? '#00ff00' : '#ff0000'}`,
          color: feedback.ok ? '#00ff88' : '#ff6b6b',
        }}>
          {feedback.msg}
        </div>
      )}

      {/* Tabs */}
      <div style={styles.tabs}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.tabActive : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido del tab */}
      <div style={styles.content}>
        {loading && <Loader />}

        {/* ── POSTULACIONES ── */}
        {!loading && activeTab === 'postulaciones' && (
          <div>
            <h2 style={styles.sectionTitle}>Postulaciones recibidas</h2>
            {applications.length === 0
              ? <p style={styles.empty}>No hay postulaciones aún.</p>
              : applications.map(app => (
                <div key={app.id} style={styles.listItem}>
                  <div>
                    <p style={styles.listItemTitle}>{app.user_name}</p>
                    <p style={styles.listItemSub}>{app.user_email} · {app.program}</p>
                    <p style={styles.listItemDate}>{new Date(app.created_at).toLocaleDateString('es-CO')}</p>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* ── CAMPEONES ── */}
        {!loading && activeTab === 'campeones' && (
          <div>
            <h2 style={styles.sectionTitle}>Campeones</h2>

            <form onSubmit={handleCreateChampion} style={styles.form}>
              <h3 style={styles.formTitle}>Agregar campeón</h3>
              <div style={styles.formRow}>
                <input style={styles.input} placeholder="Nombre" value={newChampion.name}
                  onChange={e => setNewChampion({ ...newChampion, name: e.target.value })} required />
                <input style={styles.input} placeholder="Temporada (ej: 9)" value={newChampion.season}
                  onChange={e => setNewChampion({ ...newChampion, season: e.target.value })} required />
              </div>
              <input style={styles.input} placeholder="URL de imagen (opcional)" value={newChampion.image_url}
                onChange={e => setNewChampion({ ...newChampion, image_url: e.target.value })} />
              <button type="submit" style={styles.btnPrimary}>Agregar</button>
            </form>

            <div style={styles.list}>
              {champions.map(c => (
                <div key={c.id} style={styles.listItem}>
                  <div>
                    <p style={styles.listItemTitle}>{c.name}</p>
                    <p style={styles.listItemSub}>Temporada {c.season} · {c.wins}W {c.losses}L {c.knockouts}KO</p>
                  </div>
                  <button onClick={() => handleDeleteChampion(c.id)} style={styles.btnDanger}>Eliminar</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BANDA ── */}
        {!loading && activeTab === 'banda' && (
          <div>
            <h2 style={styles.sectionTitle}>Integrantes de Kanat</h2>
            <div style={styles.list}>
              {bandMembers.map(member => (
                <BandMemberRow key={member.id} member={member} onSave={handleUpdateMember} />
              ))}
            </div>
          </div>
        )}

        {/* ── SPONSORS ── */}
        {!loading && activeTab === 'sponsors' && (
          <div>
            <h2 style={styles.sectionTitle}>Patrocinadores</h2>

            <form onSubmit={handleCreateSponsor} style={styles.form}>
              <h3 style={styles.formTitle}>Agregar patrocinador</h3>
              <input style={styles.input} placeholder="Nombre *" value={newSponsor.name}
                onChange={e => setNewSponsor({ ...newSponsor, name: e.target.value })} required />
              <input style={styles.input} placeholder="URL del logo (opcional)" value={newSponsor.logo_url}
                onChange={e => setNewSponsor({ ...newSponsor, logo_url: e.target.value })} />
              <input style={styles.input} placeholder="Sitio web (opcional)" value={newSponsor.website_url}
                onChange={e => setNewSponsor({ ...newSponsor, website_url: e.target.value })} />
              <button type="submit" style={styles.btnPrimary}>Agregar</button>
            </form>

            <div style={styles.list}>
              {sponsors.map(s => (
                <div key={s.id} style={styles.listItem}>
                  <div>
                    <p style={styles.listItemTitle}>{s.name}</p>
                    {s.website_url && <p style={styles.listItemSub}>{s.website_url}</p>}
                  </div>
                  <button onClick={() => handleDeleteSponsor(s.id)} style={styles.btnDanger}>Eliminar</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── REDES SOCIALES ── */}
        {!loading && activeTab === 'social' && (
          <div>
            <h2 style={styles.sectionTitle}>Redes sociales</h2>
            <form onSubmit={handleCreateSocial} style={styles.form}>
              <h3 style={styles.formTitle}>Agregar enlace</h3>
              <div style={styles.formRow}>
                <select style={styles.input} value={newSocial.entity_type}
                  onChange={e => setNewSocial({ ...newSocial, entity_type: e.target.value })}>
                  <option value="network">TWL Networks</option>
                  <option value="band">Kanat</option>
                  <option value="label">Golden Feather</option>
                  <option value="program">Programa</option>
                </select>
                <input style={styles.input} placeholder="Plataforma (ej: Twitter)" value={newSocial.platform}
                  onChange={e => setNewSocial({ ...newSocial, platform: e.target.value })} required />
              </div>
              {newSocial.entity_type === 'program' && (
                <input style={styles.input} placeholder="ID del programa (1, 2 o 3)" value={newSocial.entity_id}
                  onChange={e => setNewSocial({ ...newSocial, entity_id: e.target.value })} />
              )}
              <input style={styles.input} placeholder="URL completa *" value={newSocial.url}
                onChange={e => setNewSocial({ ...newSocial, url: e.target.value })} required />
              <button type="submit" style={styles.btnPrimary}>Agregar</button>
            </form>
          </div>
        )}

        {/* ── CONTENIDO ── */}
        {!loading && activeTab === 'contenido' && (
          <div>
            <h2 style={styles.sectionTitle}>Contenido de programas</h2>
            <form onSubmit={handleCreateContent} style={styles.form}>
              <h3 style={styles.formTitle}>Agregar episodio o clip</h3>
              <div style={styles.formRow}>
                <select style={styles.input} value={newContent.program_id}
                  onChange={e => setNewContent({ ...newContent, program_id: e.target.value })} required>
                  <option value="">Selecciona programa</option>
                  <option value="1">Chickboxing Championship</option>
                  <option value="2">Desempacados</option>
                  <option value="3">Más Allá del Polliseo</option>
                </select>
                <select style={styles.input} value={newContent.type}
                  onChange={e => setNewContent({ ...newContent, type: e.target.value })}>
                  <option value="episode">Episodio</option>
                  <option value="clip">Clip</option>
                  <option value="article">Artículo</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              <input style={styles.input} placeholder="Título *" value={newContent.title}
                onChange={e => setNewContent({ ...newContent, title: e.target.value })} required />
              <textarea style={{ ...styles.input, resize: 'vertical', fontFamily: 'inherit' }}
                placeholder="Descripción (opcional)" rows={3} value={newContent.description}
                onChange={e => setNewContent({ ...newContent, description: e.target.value })} />
              <input style={styles.input} placeholder="URL del video o clip" value={newContent.media_url}
                onChange={e => setNewContent({ ...newContent, media_url: e.target.value })} />
              <input style={styles.input} placeholder="URL del thumbnail (opcional)" value={newContent.thumbnail_url}
                onChange={e => setNewContent({ ...newContent, thumbnail_url: e.target.value })} />
              <input style={styles.input} type="date" value={newContent.published_at}
                onChange={e => setNewContent({ ...newContent, published_at: e.target.value })} />
              <button type="submit" style={styles.btnPrimary}>Publicar</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente auxiliar para editar integrante de banda inline
function BandMemberRow({ member, onSave }) {
  const [name, setName] = useState(member.name)
  const [role, setRole] = useState(member.role)

  return (
    <div style={styles.listItem}>
      <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
        <input style={{ ...styles.input, flex: 1 }} value={name} onChange={e => setName(e.target.value)} />
        <input style={{ ...styles.input, flex: 1 }} value={role} onChange={e => setRole(e.target.value)} />
      </div>
      <button onClick={() => onSave(member.id, name, role)} style={styles.btnPrimary}>
        Guardar
      </button>
    </div>
  )
}

const styles = {
  page: {
    backgroundColor: '#0b0c12',
    minHeight: '100vh',
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '1.5rem',
  },
  title: {
    color: '#ffffff',
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '0.3rem',
  },
  subtitle: {
    color: '#8d96ab',
    fontSize: '0.9rem',
  },
  feedback: {
    padding: '0.7rem 1rem',
    borderRadius: '4px',
    fontSize: '0.88rem',
    marginBottom: '1rem',
  },
  tabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  tab: {
    backgroundColor: '#111320',
    border: '1px solid #1a1a2e',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    color: '#8d96ab',
    fontSize: '0.88rem',
    cursor: 'pointer',
    fontWeight: '600',
  },
  tabActive: {
    backgroundColor: '#1a1a2e',
    border: '1px solid #ff0000',
    color: '#ffffff',
  },
  content: {
    backgroundColor: '#111320',
    border: '1px solid #1a1a2e',
    borderRadius: '8px',
    padding: '2rem',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
  },
  formTitle: {
    color: '#8d96ab',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '0.8rem',
  },
  form: {
    backgroundColor: '#0b0c12',
    border: '1px solid #1a1a2e',
    borderRadius: '6px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    marginBottom: '1.5rem',
  },
  formRow: {
    display: 'flex',
    gap: '0.8rem',
  },
  input: {
    backgroundColor: '#111320',
    border: '1px solid #1a1a2e',
    borderRadius: '4px',
    padding: '0.6rem 0.9rem',
    color: '#ffffff',
    fontSize: '0.9rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  listItem: {
    backgroundColor: '#0b0c12',
    border: '1px solid #1a1a2e',
    borderRadius: '4px',
    padding: '0.9rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  },
  listItemTitle: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '0.95rem',
    margin: 0,
  },
  listItemSub: {
    color: '#8d96ab',
    fontSize: '0.82rem',
    margin: '0.2rem 0 0',
  },
  listItemDate: {
    color: '#555c6e',
    fontSize: '0.78rem',
    margin: '0.2rem 0 0',
  },
  empty: {
    color: '#555c6e',
    fontSize: '0.9rem',
  },
  btnPrimary: {
    backgroundColor: '#ff0000',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '0.55rem 1.2rem',
    fontSize: '0.88rem',
    fontWeight: '700',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  btnDanger: {
    backgroundColor: 'transparent',
    color: '#ff4444',
    border: '1px solid #ff4444',
    borderRadius: '4px',
    padding: '0.45rem 0.9rem',
    fontSize: '0.82rem',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
}