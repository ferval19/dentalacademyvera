import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Collaborators from '@/components/Collaborators'
import Features from '@/components/Features'
import Courses from '@/components/Courses'
import Professors from '@/components/Professors'
import Trajectory from '@/components/Trajectory'
import About from '@/components/About'
import Location from '@/components/Location'
import Faq from '@/components/Faq'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import MobileReserveBar from '@/components/MobileReserveBar'
import { getNextCourse, formatShortDate, formatPrice } from '@/lib/data/courses'
import { whatsappCourse } from '@/lib/contact'

export default function Home() {
  const next = getNextCourse()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Collaborators />
        <Features />
        <Courses />
        <Professors />
        <Trajectory />
        <About />
        <Location />
        <Faq />
        <CTA />
      </main>
      <Footer />
      {next && (
        <MobileReserveBar
          title={next.title}
          detail={`${formatShortDate(next)} · ${formatPrice(next)}`}
          href={whatsappCourse(next.title)}
        />
      )}
    </>
  )
}
