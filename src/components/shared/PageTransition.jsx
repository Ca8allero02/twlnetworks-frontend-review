import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import transitionVideo from '../../assets/transition_animation.webm'
import './PageTransition.css'

export default function PageTransition({ children }) {
  const location = useLocation()
  const [playing, setPlaying] = useState(false)
  const [displayLocation, setDisplayLocation] = useState(location)
  const [showNewPage, setShowNewPage] = useState(true)

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setPlaying(true)
      setShowNewPage(false)

      // A los 1.5s cambia la vista (mitad de la animación)
      setTimeout(() => {
        setDisplayLocation(location)
        setShowNewPage(true)
      }, 1500)
    }
  }, [location])

  const handleVideoEnd = () => {
    setPlaying(false)
  }

  return (
    <>
      {playing && (
        <div className="page-transition__overlay">
          {!showNewPage && <div className="page-transition__black" />}
          <video
            src={transitionVideo}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="page-transition__video"
          />
        </div>
      )}
      <div key={displayLocation.pathname}>
        {children}
      </div>
    </>
  )
}