import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Courses from '@/components/Courses'
import Professors from '@/components/Professors'
import About from '@/components/About'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Courses />
        <Professors />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
