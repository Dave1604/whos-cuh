import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './ComingSoon.css'

const LAUNCH_DATE = new Date('2026-09-01T00:00:00')

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now())
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  const [time, setTime] = useState(calc)

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

interface CountUnitProps {
  value: number
  label: string
  delay: number
  inView: boolean
}

function CountUnit({ value, label, delay, inView }: CountUnitProps) {
  return (
    <motion.div
      className="countdown-unit"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="countdown-value">{pad(value)}</div>
      <div className="countdown-label">{label}</div>
    </motion.div>
  )
}

export default function ComingSoon() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('submitted')
    setEmail('')
  }

  return (
    <section className="coming-soon" id="coming-soon" ref={ref}>
      <div className="coming-soon-glow" aria-hidden="true" />
      <div className="coming-soon-inner">
        <motion.div
          className="coming-soon-content"
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-eyebrow">Launching soon</span>
          <h2 className="coming-soon-headline">
            We're almost <span className="text-accent">ready.</span>
          </h2>
          <p className="coming-soon-sub">
            Be the first in Ijebu-Ode and Ijagun to know when we go live.
          </p>

          <div className="area-tags">
            <span className="area-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              Ijebu-Ode
            </span>
            <span className="area-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              Ijagun
            </span>
          </div>

          <div className="countdown" role="timer" aria-label="Time until launch">
            <CountUnit value={days} label="Days" delay={0.1} inView={inView} />
            <div className="countdown-sep" aria-hidden="true">:</div>
            <CountUnit value={hours} label="Hours" delay={0.18} inView={inView} />
            <div className="countdown-sep" aria-hidden="true">:</div>
            <CountUnit value={minutes} label="Minutes" delay={0.26} inView={inView} />
            <div className="countdown-sep" aria-hidden="true">:</div>
            <CountUnit value={seconds} label="Seconds" delay={0.34} inView={inView} />
          </div>

          {status === 'idle' ? (
            <form className="email-form" onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="email-input"
                aria-label="Email address"
              />
              <button type="submit" className="btn-primary">
                Notify me
              </button>
            </form>
          ) : (
            <motion.div
              className="email-success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="email-success-icon" aria-hidden="true">✓</span>
              You're on the list! We'll notify you when we launch.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
