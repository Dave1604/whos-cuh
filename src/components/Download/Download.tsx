import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import logo from '../../assets/logo.png'
import screenHome from '../../assets/screen-home.png'
import screenJollof from '../../assets/screen-jollof.png'
import './Download.css'

const ease = [0.16, 1, 0.3, 1] as const

function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.18 23.76c.33.18.71.19 1.06.04l12.4-6.96-2.68-2.68-10.78 9.6zM.5 1.58C.19 1.9 0 2.38 0 3v18c0 .62.19 1.1.5 1.42l.07.07L10.16 12.5v-.23L.57 1.51.5 1.58zM20.79 10.38l-2.89-1.62-3.02 3.02 3.02 3.02 2.9-1.63c.83-.46.83-1.22-.01-1.79zM4.24.2L16.64 7.16l-2.68 2.68L4.24.2z" />
    </svg>
  )
}

function DualPhones() {
  return (
    <div className="dual-phones">
      <div className="dphone dphone--back">
        <div className="dphone-frame">
          <img src={screenJollof} alt="" className="dphone-screen" />
          <div className="dphone-bar" />
        </div>
      </div>
      <div className="dphone dphone--front">
        <div className="dphone-frame">
          <img src={screenHome} alt="Who's Cuh? home screen" className="dphone-screen" />
          <div className="dphone-bar" />
        </div>
      </div>
      <div className="dual-phones-glow" aria-hidden="true" />
    </div>
  )
}

export default function Download() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      <section className="download" id="download" ref={ref}>
        <div className="download-glow" aria-hidden="true" />
        <div className="download-inner">
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <DualPhones />
          </motion.div>

          <motion.div
            className="download-text"
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <span className="section-eyebrow">Get the app</span>
            <h2 className="download-headline">
              Download &amp;<br />
              <span className="text-orange">start eating.</span>
            </h2>
            <p className="download-sub">
              Free to download on iOS and Android. No delivery fees on your very first order.
              Available in Ijebu-Ode and Ijagun at launch.
            </p>
            <div className="download-launch-note">
              <span className="download-dot" />
              Launching September 2026 — join the waitlist above
            </div>
            <div className="store-buttons">
              <button className="store-btn" disabled aria-label="App Store — coming soon">
                <AppleIcon />
                <div>
                  <span className="store-eyebrow">Download on the</span>
                  <span className="store-name">App Store</span>
                </div>
              </button>
              <button className="store-btn" disabled aria-label="Google Play — coming soon">
                <PlayIcon />
                <div>
                  <span className="store-eyebrow">Get it on</span>
                  <span className="store-name">Google Play</span>
                </div>
              </button>
            </div>
            <p className="store-note">Buttons activate at launch</p>
          </motion.div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src={logo} alt="Who's Cuh?" className="footer-logo" />
            <p className="footer-tag">Food that hits different.</p>
          </div>
          <div className="footer-right">
            <nav className="footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Contact</a>
            </nav>
            <p className="footer-copy">
              © {new Date().getFullYear()} Who's Cuh? · Built in Ijebu-Ode, Ogun State 🇳🇬
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
