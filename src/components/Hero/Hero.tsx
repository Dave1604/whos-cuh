import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import screenHome from '../../assets/screen-home.png'
import screenRestaurant from '../../assets/screen-restaurant.png'
import screenJollof from '../../assets/screen-jollof.png'
import './Hero.css'

const ease = [0.16, 1, 0.3, 1] as const
const screens = [screenHome, screenRestaurant, screenJollof]

function HeroPhone() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % screens.length), 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hero-phone-wrap">
      <div className="hero-ring hero-ring--1" aria-hidden="true" />
      <div className="hero-ring hero-ring--2" aria-hidden="true" />

      <div className="hero-phone">
        <div className="hero-phone-inner">
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={screens[active]}
              alt="App screen"
              className="hero-phone-screen"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease }}
            />
          </AnimatePresence>
          <div className="hero-phone-bar" />
        </div>
      </div>

      <motion.div
        className="hero-float hero-float--top"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="hero-float-emoji">⚡</span>
        <div>
          <p className="hero-float-title">30 min delivery</p>
          <p className="hero-float-sub">Ijebu-Ode &amp; Ijagun</p>
        </div>
      </motion.div>

      <motion.div
        className="hero-float hero-float--bottom"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      >
        <span className="hero-float-emoji">🍛</span>
        <div>
          <p className="hero-float-title">5+ Restaurants</p>
          <p className="hero-float-sub">&amp; growing</p>
        </div>
      </motion.div>

      <div className="hero-dots">
        {screens.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === active ? ' active' : ''}`}
            onClick={() => setActive(i)}
            aria-label={`Screen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-left">
        <motion.div
          className="hero-left-inner"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="hero-pill">
            <span className="hero-pill-dot" />
            Now building · Ijebu-Ode &amp; Ijagun
          </div>

          <h1 className="hero-headline">
            Food that<br />
            <em className="hero-headline-em">hits different.</em>
          </h1>

          <p className="hero-sub">
            Order from Mosun Cafe, Mos Restaurant, Chicken and Co, Iya Adams,
            Lord Reigneth and your favourite Ijebu-Ode spots. Delivered in
            30 minutes or less — built for Ogun State.
          </p>

          <div className="hero-actions">
            <button
              className="btn-orange"
              onClick={() => document.getElementById('coming-soon')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Early Access
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className="btn-ghost"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See the app ↓
            </button>
          </div>

          <div className="hero-partners">
            <span className="hero-partners-label">Partnered with</span>
            <div className="hero-partners-chips">
              {['Mosun Cafe', 'Mos Restaurant', 'Chicken and Co', 'Iya Adams', 'Lord Reigneth'].map(b => (
                <span key={b} className="hero-chip">{b}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hero-right">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <HeroPhone />
        </motion.div>
      </div>
    </section>
  )
}
