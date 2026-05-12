import Cursor from './components/Cursor/Cursor'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Features from './components/Features/Features'
import ComingSoon from './components/ComingSoon/ComingSoon'
import Download from './components/Download/Download'
import './App.css'

function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <ComingSoon />
        <Download />
      </main>
    </>
  )
}

export default App
