import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Features.css'

const ease = [0.16, 1, 0.3, 1] as const

const features = [
  {
    num: '01',
    icon: '🏪',
    title: 'Multiple Restaurants',
    desc: 'Mosun Cafe, Mos Restaurant, Chicken and Co, Iya Adams, Lord Reigneth and more — all in one app.',
    accent: '#F8780A',
    size: 'large',
  },
  {
    num: '02',
    icon: '⚡',
    title: 'Fast Delivery',
    desc: 'Hot food at your door in 30 minutes or less. Every time.',
    accent: '#ff6b00',
    size: 'small',
  },
  {
    num: '03',
    icon: '📡',
    title: 'Live Tracking',
    desc: 'Watch your rider\'s location in real time on a map.',
    accent: '#ff9900',
    size: 'small',
  },
  {
    num: '04',
    icon: '❤️',
    title: 'Favourites',
    desc: 'Save your go-to orders and reorder with one tap.',
    accent: '#ff4d4d',
    size: 'large',
  },
  {
    num: '05',
    icon: '💳',
    title: 'Easy Payments',
    desc: 'Card, bank transfer, or cash on delivery. Your choice.',
    accent: '#F8780A',
    size: 'small',
  },
  {
    num: '06',
    icon: '📍',
    title: 'Local-First',
    desc: 'Designed for Ijebu-Ode and Ijagun. We know your streets, your spots, your area.',
    accent: '#ff8c1a',
    size: 'large',
  },
]

/* Pre-defined shuffle starting positions — each card deals in from a unique angle */
const shuffleFrom = [
  { rotate: -9, x: -28, y: 48, scale: 0.78 },
  { rotate:  7, x:  22, y: 56, scale: 0.80 },
  { rotate: -6, x: -18, y: 52, scale: 0.76 },
  { rotate:  8, x:  26, y: 44, scale: 0.82 },
  { rotate: -7, x: -20, y: 50, scale: 0.78 },
  { rotate:  5, x:  16, y: 60, scale: 0.80 },
]

export default function Features() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="features" id="features" ref={ref}>
      <div className="features-inner">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="section-eyebrow">What we offer</span>
          <h2 className="features-headline">
            Every feature you need.<br />
            <span className="text-orange">Nothing you don't.</span>
          </h2>
          <p className="features-sub">
            Built lean, built fast, built for Ogun State.
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((f, i) => {
            const from = shuffleFrom[i]
            return (
              <motion.article
                key={f.title}
                className={`fcard fcard--${f.size}`}
                style={{ '--accent': f.accent } as React.CSSProperties}
                initial={{
                  opacity: 0,
                  y: from.y,
                  x: from.x,
                  rotate: from.rotate,
                  scale: from.scale,
                }}
                animate={inView ? { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.1 * i,
                  ease,
                }}
              >
                <div className="fcard-top">
                  <div className="fcard-icon">{f.icon}</div>
                  <span className="fcard-num">{f.num}</span>
                </div>
                <h3 className="fcard-title">{f.title}</h3>
                <p className="fcard-desc">{f.desc}</p>
                <div className="fcard-corner" aria-hidden="true" />
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
