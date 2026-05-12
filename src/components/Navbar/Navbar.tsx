import { useEffect, useRef } from 'react'
import logo from '../../assets/logo.png'
import './Navbar.css'

const links = [
  { label: 'About', id: 'about' },
  { label: 'Features', id: 'features' },
  { label: 'Coming Soon', id: 'coming-soon' },
  { label: 'Download', id: 'download' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => navRef.current?.classList.toggle('scrolled', window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav ref={navRef} className="navbar">
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          <img src={logo} alt="Who's Cuh?" />
        </a>
        <ul className="navbar-links">
          {links.map(({ label, id }) => (
            <li key={id}><button onClick={() => go(id)}>{label}</button></li>
          ))}
        </ul>
        <button className="navbar-cta" onClick={() => go('coming-soon')}>
          Get Early Access
        </button>
      </div>
    </nav>
  )
}
