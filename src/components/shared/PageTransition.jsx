import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import transitionVideo from '../../assets/transition_animation.webm'
import './PageTransition.css'

export default function PageTransition({ children }) {
  const location = useLocation()
  const [playing, setPlaying] = useState(false)
  const [displayLocation, setDisplayLocation] = useState(location)

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setPlaying(true)
    }
  }, [location])

  const handleVideoEnd = () => {
    setDisplayLocation(location)
    setPlaying(false)
  }

  return (
    <>
      {playing && (
        <div className="page-transition__overlay">
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