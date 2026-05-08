import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import MethodologySection from "@/components/MethodologySection";
import ProblemsResultsSection from "@/components/ProblemsResultsSection";
import PortfolioSection from "@/components/PortfolioSection";
import AudienceSection from "@/components/AudienceSection";
import WhyMeSection from "@/components/WhyMeSection";
import FAQSection from "@/components/FAQSection";
import VideoSection from "@/components/VideoSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import AutoClubProDetailedSection from "@/components/AutoClubProDetailedSection";
import { useSEO } from "@/hooks/useSEO";
import { getLocalBusinessSchema, getFAQSchema } from "@/lib/seo-optimization";

const Index = () => {
  useSEO({
    title: "Início",
    schema: [
      getLocalBusinessSchema(),
      getFAQSchema([
        {
          question: "Como funciona a consultoria do Dr. Saullo Gomes?",
          answer: "A consultoria foca em uma análise integral da saúde do paciente, abordando pilares como nutrição, movimento, sono e equilíbrio mental para otimizar a performance e longevidade.",
        },
        {
          question: "Quais serviços são oferecidos?",
          answer: "Oferecemos check-up de performance, consultoria de estilo de vida, plano nutricional personalizado e acompanhamento de biohacking seguro.",
        },
      ]),
    ],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
         <HeroSection />
         <ServicesSection />
         <MethodologySection />
         <ProblemsResultsSection />
         <PortfolioSection />
         <AutoClubProDetailedSection />
         <AudienceSection />
         <WhyMeSection />
         <FAQSection />
         <VideoSection />
         <ContactSection />
       </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
