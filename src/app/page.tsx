import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="divider-gold max-w-6xl mx-auto" />
        <ScrollReveal>
          <Services />
        </ScrollReveal>
        <div className="divider-gold max-w-6xl mx-auto" />
        <ScrollReveal>
          <Portfolio />
        </ScrollReveal>
        <div className="divider-gold max-w-6xl mx-auto" />
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>
        <div className="divider-gold max-w-6xl mx-auto" />
        <ScrollReveal>
          <About />
        </ScrollReveal>
        <div className="divider-gold max-w-6xl mx-auto" />
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}