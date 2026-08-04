import { useEffect, useRef, useState } from 'react'

const POSTER_URL = '/hero-poster.jpg'

const LERP_FACTOR = 0.12
const SEEK_THRESHOLD = 0.04

interface ScrollVideoProps {
  src: string
}

export default function ScrollVideo({ src }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoVisible, setVideoVisible] = useState(false)
  const [posterVisible, setPosterVisible] = useState(true)

  const smoothedRef = useRef(0)
  const targetRef = useRef(0)
  const rafRef = useRef<number>(0)
  const durationRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      targetRef.current = Math.min(1, Math.max(0, p))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onLoadedMetadata = () => {
      durationRef.current = video.duration || 0
    }
    const onLoadedData = () => {
      setVideoVisible(true)
      setPosterVisible(false)
    }

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('loadeddata', onLoadedData)

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('loadeddata', onLoadedData)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tick = () => {
      smoothedRef.current += (targetRef.current - smoothedRef.current) * LERP_FACTOR
      const p = smoothedRef.current
      const duration = durationRef.current

      // Ping-pong fold: forward through the first half of the page,
      // reverse back to frame 1 through the second half.
      const videoProgress = p <= 0.5 ? p / 0.5 : (1 - p) / 0.5

      if (duration && isFinite(duration)) {
        const t = videoProgress * Math.max(0, duration - 0.05)
        if (Math.abs(video.currentTime - t) > SEEK_THRESHOLD) {
          try {
            video.currentTime = t
          } catch {
            /* seek not ready yet */
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: '#0a0a0a' }}
      aria-hidden="true"
    >
      <img
        src={POSTER_URL}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          posterVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onError={(e) => {
          ;(e.target as HTMLImageElement).style.display = 'none'
        }}
      />
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          videoVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
