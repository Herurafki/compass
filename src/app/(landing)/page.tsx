import Hero from "@/components/landing/Hero";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing/Pricing";
import FAQ from "@/components/landing/FAQ";
import Logos from "@/components/landing/Logos";
import Benefits from "@/components/landing/Benefits/Benefits";
import Container from "@/components/landing/Container";
import Section from "@/components/landing/Section";
import CTA from "@/components/landing/CTA";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Logos />
      <Container>
        <Benefits />

        <Section
          id="features"
          title="Comprehensive Monitoring Features"
          description=""
        >
          <Pricing />
        </Section>

        <Section
          id="testimonials"
          title="The Dream Team Behind the Project"
          description="Synergy between educational institutions and industry in realizing future technology solutions."
        >
        <Testimonials />
        </Section>

        <FAQ />
               
        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
