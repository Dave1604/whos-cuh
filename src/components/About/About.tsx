import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import screenHome from '../../assets/screen-home.png'
import screenRestaurant from '../../assets/screen-restaurant.png'
import screenBurger from '../../assets/screen-burger.png'
import './About.css'

const ease = [0.16, 1, 0.3, 1] as const

const tabs = [
  {
    id: 'browse',
    label: 'Browse',
    icon: '🏪',
    screen: screenHome,
    headline: 'All your favourites, one app',
    body: 'From Mosun Cafe to Lord Reigneth Restaurant — browse menus, check deals, and order in seconds. Your favourite Ijebu-Ode spots, all in one place.',
  },
  {
    id: 'order',
    label: 'Order',
    icon: '🛒',
    screen: screenRestaurant,
    headline: 'Pick your meal, tap to order',
    body: 'Browse restaurant menus with real photos, add to cart, choose your payment method and confirm. No accounts needed to browse — just tap and eat.',
  },
  {
    id: 'enjoy',
    label: 'Enjoy',
    icon: '⚡',
    screen: screenBurger,
    headline: 'Hot food, 30 minutes flat',
    body: 'Track your delivery in real time. Our riders know Ijebu-Ode and Ijagun inside out — your food arrives hot, fast, and exactly as ordered.',
  },
]

const stats = [
  { value: '5+', label: 'Restaurants', sub: 'Local & national brands' },
  { value: '2', label: 'Areas', sub: 'Ijebu-Ode & Ijagun' },
  { value: '30min', label: 'Avg. delivery', sub: 'Guaranteed speed' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  return (
    <section className="about" id="about" ref={ref}>
      <div className="about-bg-glow" aria-hidden="true" />
      <div className="about-inner">
        <motion.div
          className="about-left"
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <span className="section-eyebrow">The App</span>
          <h2 className="about-headline">
            Built by Ijebu,<br />
            <span className="text-orange">for Ijebu.</span>
          </h2>
          <p className="about-body">
            Who's Cuh? is not a Lagos app that forgot Ogun State exists. We were built
            here, we operate here, and every feature was designed around how you actually
            eat and order in Ijebu-Ode.
          </p>

          {/* Tabs */}
          <div className="about-tabs">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                className={`about-tab${active === i ? ' active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="about-tab-icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="about-tab-content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
            >
              <h3 className="about-tab-headline">{tabs[active].headline}</h3>
              <p className="about-tab-body">{tabs[active].body}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="about-right"
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          {/* Phone */}
          <div className="about-phone">
            <div className="about-phone-frame">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={tabs[active].screen}
                  alt={tabs[active].label}
                  className="about-phone-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              <div className="about-phone-home" />
            </div>
            <div className="about-phone-glow" aria-hidden="true" />
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="about-stats-strip">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="about-stat"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 * i + 0.3, ease }}
          >
            <div className="about-stat-value">{s.value}</div>
            <div className="about-stat-label">{s.label}</div>
            <div className="about-stat-sub">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
