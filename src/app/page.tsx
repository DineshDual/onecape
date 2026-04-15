import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProofBar from "@/components/SocialProofBar";
import Services from "@/components/Services";
import WhyOneCape from "@/components/WhyOneCape";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ScrollReveal>
          <SocialProofBar />
        </ScrollReveal>
        <div className="divider-accent max-w-6xl mx-auto" />
        <ScrollReveal>
          <Services />
        </ScrollReveal>
        <ScrollReveal variant="fade-up" stagger>
          <WhyOneCape />
        </ScrollReveal>
        <ScrollReveal>
          <Process />
        </ScrollReveal>
        <div className="divider-accent max-w-6xl mx-auto" />
        <ScrollReveal>
          <Portfolio />
        </ScrollReveal>
        <div className="divider-accent max-w-6xl mx-auto" />
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>
        <div className="divider-accent max-w-6xl mx-auto" />
        <ScrollReveal>
          <About />
        </ScrollReveal>
        <div className="divider-accent max-w-6xl mx-auto" />
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}