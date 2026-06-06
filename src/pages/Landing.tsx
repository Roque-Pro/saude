import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  Activity,
  Zap,
  BarChart3,
  Globe,
  Lock,
  MessageSquare,
  Search,
  LayoutDashboard,
  Users,
  LineChart,
  PieChart,
  Command,
  Heart,
  Dna,
  Stethoscope,
  Microscope,
  Waves,
  BrainCircuit,
  Cpu,
  ShieldAlert
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import drSaulloImage from "@/img/drsaulo.jpg";

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useSEO({
    title: "Dr Saullo Gomes | Endocrinologia & Engenharia Metabólica de Alta Performance",
    description: "Medicina de precisão para médicos e advogados. Estratégias hormonais e metabólicas para quem busca performance máxima e longevidade real.",
    keywords: ["endocrinologista de elite", "performance metabólica", "hormônios e carreira", "dr saullo gomes", "longevidade estratégica", "saúde para executivos"],
  });

  return (
    <div className="min-h-screen bg-[#020808] text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-100 antialiased overflow-x-hidden">
      {/* Blueprint Visual Layer - Clinical/Technical Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#020808_80%)]" />
      </div>

      {/* Sophisticated Clinical Navigation */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-1000 ${scrolled ? "bg-[#020808]/95 backdrop-blur-3xl border-b border-emerald-500/10 py-5" : "py-12"}`}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-10 lg:px-24">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-[0.2em] text-white">DR SAULLO GOMES</span>
              <div className="mt-1.5 flex items-center gap-3">
                <span className="h-[1px] w-6 bg-emerald-500/50" />
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-emerald-500/80">Endocrinologia & Performance</span>
              </div>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-16">
            <a href="#ciência" className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-emerald-400 transition-all">Ciência</a>
            <a href="#protocolos" className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-emerald-400 transition-all">Protocolos</a>
            <a href="#fluxo" className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-emerald-400 transition-all">Engenharia</a>
            <a href="#acervo" className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-emerald-400 transition-all">Acervo</a>
            <div className="h-5 w-[1px] bg-white/5" />
            <Link to="/crm" className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500 hover:text-emerald-400 transition-all">
              Restrito
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO: Cinematic Metabolic Integration */}
        <section id="ciência" className="relative flex min-h-screen items-center overflow-hidden bg-[#020808] pt-32 lg:pt-48">
          
          {/* THE IMMERSIVE BACKGROUND: Photo 'Por baixo' with controlled proportion */}
          <div className="absolute inset-0 z-0 overflow-hidden">
             <div className="absolute right-0 top-0 h-full w-full lg:w-[65%] xl:w-[60%]">
                <img 
                    src={drSaulloImage} 
                    alt="Dr Saullo Gomes Cinematic Background" 
                    className="h-full w-full object-cover object-top" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020808] via-[#020808]/50 to-transparent" />
             </div>
             
             <div className="absolute inset-0 bg-gradient-to-r from-[#020808] via-[#020808] to-transparent lg:via-[40%] xl:via-[50%]" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#020808] via-transparent to-transparent lg:via-[15%]" />
             <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_20%_50%,_rgba(16,185,129,0.05),_transparent_50%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1600px] w-full px-10 lg:px-24">
            <div className="max-w-4xl py-20 lg:py-40">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <h1 className="text-5xl font-bold leading-[1.05] tracking-tighter text-white sm:text-7xl lg:text-[100px]">
                  Engenharia <br />
                  <span className="text-emerald-500 italic font-medium">Metabólica.</span>
                </h1>

                <p className="mt-12 max-w-2xl text-lg leading-relaxed text-slate-300 font-medium lg:text-xl drop-shadow-2xl">
                  Sua fisiologia não é um pano de fundo para a sua carreira; ela é o motor central que impulsiona cada decisão crítica, cada audiência exaustiva e cada diagnóstico complexo. Através de uma abordagem rigorosa e personalizada, o Dr. Saullo Gomes desenvolve arquiteturas biológicas projetadas especificamente para profissionais liberais de alta performance. Unimos a precisão da endocrinologia moderna com protocolos de otimização metabólica que garantem que sua mente e seu corpo operem em estado de fluxo contínuo, blindando sua vitalidade contra o desgaste inerente ao sucesso.
                </p>

                <div className="mt-16 flex flex-col gap-10 sm:flex-row sm:items-center">
                  <Button asChild size="lg" className="h-24 rounded-full bg-emerald-500 px-16 text-xl font-bold text-[#020808] transition-all hover:bg-emerald-400 hover:scale-[1.05] active:scale-95 shadow-[0_30px_60px_rgba(16,185,129,0.4)]">
                    <Link to="/diagnostico-gratuito">
                      Iniciar Scan Clínico
                      <ArrowRight className="ml-4 h-6 w-6" />
                    </Link>
                  </Button>
                  <div className="flex flex-col border-l-2 border-emerald-500/20 pl-10">
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-2">Autoridade Médica</span>
                      <span className="text-xl font-bold text-white tracking-widest">CRM/ES 435671</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* METHODOLOGY: Elite Protocols */}
        <section id="protocolos" className="bg-white py-24 lg:py-40 rounded-[80px] lg:rounded-[120px] relative overflow-hidden">
          <div className="mx-auto max-w-[1600px] px-10 lg:px-24">
            <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-16">
              <div className="max-w-2xl">
                <div className="mb-8 h-[2px] w-24 bg-emerald-900" />
                <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-emerald-700">Arquitetura Estratégica</span>
                <h2 className="mt-8 text-4xl font-bold leading-[0.9] tracking-tighter text-slate-950 lg:text-[70px]">
                    Protocolos <br />
                    <span className="text-slate-300 italic">de Elite.</span>
                </h2>
              </div>
              <p className="max-w-md text-lg leading-relaxed text-slate-500 font-medium italic border-l-4 border-emerald-100 pl-8">
                "O verdadeiro diferencial competitivo no século XXI não é apenas intelectual, é biológico. Quem domina seu metabolismo, domina o seu mercado."
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {[
                { 
                  title: "Bio-Otimização Avançada", 
                  id: "PROTOCOL-A", 
                  desc: "Mapeamento genético e bioquímico exaustivo para alinhar seus eixos hormonais ao seu ritmo de vida sob alta pressão. Não buscamos apenas o 'normal', buscamos o estado ótimo de funcionamento sistêmico.",
                  icon: Microscope 
                },
                { 
                  title: "Engenharia de Energia", 
                  id: "PROTOCOL-B", 
                  desc: "Controle da inflamação sistêmica silenciosa e otimização mitocondrial para garantir foco mental inabalável, resiliência emocional e clareza absoluta em momentos de tomada de decisão crítica.",
                  icon: Zap 
                },
                { 
                  title: "Blindagem Longevidade", 
                  id: "PROTOCOL-C", 
                  desc: "Estratégias de bio-engenharia regenerativa projetadas para proteger sua autoridade profissional e sua vitalidade física pelas próximas décadas, garantindo que o topo da carreira não seja o início do declínio.",
                  icon: Waves 
                }
              ].map((m, i) => (
                <div key={i} className="group relative rounded-[56px] border border-slate-100 bg-slate-50/30 p-12 transition-all duration-700 hover:bg-slate-950 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(6,78,59,0.1)]">
                  <div className="mb-16 flex items-center justify-between">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[32px] bg-white text-emerald-900 shadow-lg transition-all group-hover:rotate-[15deg] group-hover:bg-emerald-500 group-hover:text-white">
                        <m.icon className="h-8 w-8" />
                    </div>
                    <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-slate-300 group-hover:text-emerald-500/40">{m.id}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950 group-hover:text-white transition-colors">{m.title}</h3>
                  <p className="mt-8 text-base leading-relaxed text-slate-500 group-hover:text-emerald-50/60 transition-colors">{m.desc}</p>
                  
                  <div className="mt-16 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-900 opacity-0 transition-all group-hover:opacity-100 group-hover:text-emerald-400">
                    Ver Protocolo <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEW SECTION: The Flow Engine */}
        <section id="fluxo" className="bg-[#020808] py-24 lg:py-40">
          <div className="mx-auto max-w-[1600px] px-10 lg:px-24">
            <div className="grid gap-24 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="relative z-10 grid grid-cols-2 gap-6">
                  {[
                    { label: "Cortisol Control", value: "Locked", icon: ShieldCheck, color: "text-emerald-400" },
                    { label: "Deep Sleep Cycle", value: "98%", icon: Zap, color: "text-amber-400" },
                    { label: "Neural Clarity", value: "Peak", icon: BrainCircuit, color: "text-blue-400" },
                    { label: "Hormonal Yield", value: "+32%", icon: Activity, color: "text-emerald-500" }
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-[40px] border border-white/5 bg-white/5 p-8 backdrop-blur-sm"
                    >
                      <stat.icon className={`mb-4 h-6 w-6 ${stat.color}`} />
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                      <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="absolute -inset-10 -z-10 bg-emerald-500/5 blur-[80px]" />
              </div>
              
              <div className="order-1 lg:order-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-emerald-500">Mecânica da Performance</span>
                <h2 className="mt-8 text-4xl font-bold leading-none tracking-tighter text-white lg:text-[70px]">
                  A Engenharia <br />
                  <span className="italic text-slate-500">do Flow.</span>
                </h2>
                <div className="mt-12 space-y-8 text-lg leading-relaxed text-slate-400 font-medium">
                  <p>
                    O sucesso em carreiras de alta demanda, como a medicina e a advocacia, exige mais do que apenas competência técnica. Exige uma biologia que suporte a carga cognitiva constante. Quando o Dr. Saullo Gomes fala em Engenharia do Flow, ele se refere à calibração precisa do seu ambiente interno.
                  </p>
                  <p>
                    Nosso trabalho consiste em identificar onde sua energia está vazando. Através de análises avançadas de biomarcadores, corrigimos a resistência insulínica, modulamos a resposta ao estresse e equilibramos a produção hormonal para que seu cérebro e seu corpo trabalhem em perfeita sincronia, sem as oscilações que geram o burnout.
                  </p>
                  <p>
                    Não se trata de tratamentos paliativos, mas de uma reconfiguração profunda da sua dinâmica metabólica para que você atinja a sua cota máxima de produtividade com saúde real.
                  </p>
                </div>
                <div className="mt-16 flex items-center gap-10">
                   <div className="flex flex-col">
                      <p className="text-3xl font-bold text-white tracking-tighter">Bio-OS</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-700">Operating System</p>
                   </div>
                   <div className="h-10 w-[1px] bg-white/10" />
                   <p className="text-xs font-medium text-slate-500 max-w-[200px]">Sistema operacional biológico customizado para o seu DNA.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROVOCATION: The Price of Neglect */}
        <section className="bg-[#020808] py-32 lg:py-56 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.05),_transparent_50%)]" />
            <div className="mx-auto max-w-[1600px] px-10 lg:px-24 relative">
                <div className="relative z-10 mx-auto max-w-6xl text-center">
                    <h2 className="text-4xl font-bold leading-[1.1] text-white lg:text-[80px] tracking-tighter">
                        "Seu metabolismo é o <br />
                        <span className="text-emerald-500">teto do seu sucesso."</span>
                    </h2>
                    <div className="mt-24 flex flex-col items-center">
                         <p className="max-w-3xl text-xl leading-relaxed text-slate-400 font-medium">
                            Negligenciar os sinais sutis de desequilíbrio hoje é aceitar a obsolescência precoce amanhã. O Dr. Saullo Gomes utiliza o rigor científico da endocrinologia de elite para transformar exaustão crônica em autoridade inabalável. Este portal é um convite para quem entende que o tempo é o recurso mais escasso e que uma biologia otimizada é a única forma de multiplicá-lo, garantindo uma carreira exponencial e uma vida vibrante.
                         </p>
                         <div className="mt-20 h-24 w-[1px] bg-gradient-to-b from-emerald-500 to-transparent" />
                    </div>
                </div>
            </div>
        </section>

        {/* ARCHIVE: Intelligence Briefings */}
        <section id="acervo" className="bg-[#fcfdfd] py-24 lg:py-40">
          <div className="mx-auto max-w-[1600px] px-10 lg:px-24">
            <div className="mb-32 grid gap-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-emerald-800">Intelligence Feed</span>
                <h2 className="mt-10 text-5xl font-bold leading-[0.9] text-slate-950 lg:text-[80px]">Acervo <br /> Médico.</h2>
              </div>
              <div className="flex flex-col gap-12">
                <p className="max-w-md text-lg leading-relaxed text-slate-500 font-medium">
                    Explorações técnicas profundas e briefings científicos sobre o futuro da fisiologia humana e gestão de saúde para o alto escalão profissional.
                </p>
                <Link to="/blog" className="inline-flex items-center gap-6 text-xs font-bold uppercase tracking-[0.5em] text-emerald-900 group">
                    Index Científico Completo <div className="h-12 w-12 flex items-center justify-center rounded-full border border-emerald-900/10 group-hover:bg-emerald-900 group-hover:text-white transition-all duration-500"><ChevronRight className="h-4 w-4" /></div>
                </Link>
              </div>
            </div>

            <div className="grid gap-20 lg:grid-cols-2">
              <RecentBriefings />
            </div>
          </div>
        </section>

        {/* CTA: Final System Initialize */}
        <section className="bg-emerald-950 py-32 lg:py-56 relative overflow-hidden">
             <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
             <div className="mx-auto max-w-[1600px] px-10 lg:px-24 text-center relative z-10">
                <h2 className="text-5xl font-bold text-white lg:text-[90px] tracking-tighter">Redefina seus limites.</h2>
                <p className="mt-12 mx-auto max-w-2xl text-xl text-emerald-100/40 font-medium leading-relaxed">
                    Sua jornada para a máxima performance biográfica começa com um mapeamento preciso. Inicie seu protocolo estratégico com o Dr. Saullo Gomes hoje mesmo e tome as rédeas da sua biologia.
                </p>
                <div className="mt-20">
                     <Button asChild size="lg" className="h-24 rounded-full bg-white px-20 text-xl font-bold text-emerald-950 hover:bg-emerald-400 hover:text-white transition-all shadow-[0_30px_70px_rgba(16,185,129,0.2)]">
                        <Link to="/diagnostico-gratuito">Initialize System Scan</Link>
                     </Button>
                </div>
             </div>
        </section>

        {/* FOOTER: Clinical Signature */}
        <footer className="bg-[#020808] py-32 border-t border-emerald-500/5">
            <div className="mx-auto max-w-[1600px] px-10 lg:px-24">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-32">
                    <div className="max-w-md">
                        <span className="text-3xl font-bold text-white tracking-[0.2em]">DR SAULLO GOMES</span>
                        <p className="mt-10 text-slate-500 text-lg leading-relaxed font-medium">
                            A nova fronteira da endocrinologia para profissionais que exigem o máximo de sua biologia e de seu tempo. Excelência médica aplicada à alta performance executiva.
                        </p>
                        <div className="mt-14 flex items-center gap-10">
                          {["In", "Ig", "Wa"].map(social => (
                            <a key={social} href="#" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-emerald-400 transition-colors">
                              {social}
                            </a>
                          ))}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-20 lg:gap-32">
                        {[
                            { label: "Medicina", links: ["Endocrinologia", "Metabolismo", "Longevidade"] },
                            { label: "Ética", links: ["Privacidade", "Termos", "CRM/ES 435671"] },
                            { label: "Redes", links: ["LinkedIn", "Instagram", "WhatsApp"] },
                            { label: "Acesso", links: ["Diagnóstico", "Briefings", "Protocolos"] }
                        ].map((col, idx) => (
                            <div key={idx}>
                                <h4 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white mb-10">{col.label}</h4>
                                <ul className="space-y-5">
                                    {col.links.map(link => (
                                        <li key={link}><a href="#" className="text-sm font-bold text-slate-500 hover:text-emerald-400 transition-colors">{link}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="mt-48 flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/5 pt-16">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-700">
                        &copy; {new Date().getFullYear()} Dr Saullo Gomes. Engineering Human Potential.
                    </p>
                    <div className="flex items-center gap-10">
                         <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-800 italic underline underline-offset-8 decoration-emerald-500/20">Protocol EXE-2026</span>
                    </div>
                </div>
            </div>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@700&display=swap');
        
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        html { scroll-behavior: smooth; }
        
        ::selection { background: rgba(16, 185, 129, 0.2); color: #fff; }
        
        .tracking-tight { letter-spacing: -0.04em; }
        .tracking-tighter { letter-spacing: -0.06em; }
      `}} />
    </div>
  );
};

// Sub-component for Recent Briefings
const RecentBriefings = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(2);
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="h-96 w-full flex items-center justify-center"><Zap className="h-16 w-16 text-emerald-900 animate-pulse" /></div>;

  return (
    <>
      {posts.map((post, i) => (
        <motion.article 
          key={post.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative flex flex-col gap-10"
        >
          <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden rounded-[60px] border border-white/5 shadow-2xl transition-all duration-700 group-hover:rounded-[30px]">
             {post.featured_image && (
               <img src={post.featured_image} alt={post.title} className="h-full w-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-110 group-hover:scale-100" />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-[#020808] via-[#020808]/20 to-transparent opacity-90 transition-opacity group-hover:opacity-40" />
             
             <div className="absolute bottom-10 left-10 right-10">
                <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-2 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                    Clinical Briefing {i+1}
                </div>
                <h3 className="text-3xl font-bold text-white leading-[0.95] tracking-tighter transition-all group-hover:translate-x-2">
                    {post.title}
                </h3>
             </div>
          </Link>
          <div className="px-10 border-l border-emerald-500/10">
            <p className="text-slate-400 text-base leading-relaxed font-medium line-clamp-3">
                {post.excerpt}
            </p>
            <div className="mt-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Issued: {new Date(post.created_at).toLocaleDateString("pt-BR")}</span>
                </div>
                <Link to={`/blog/${post.slug}`} className="h-16 w-16 rounded-full border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-500">
                    <ArrowRight className="h-6 w-6 text-white group-hover:text-slate-950 transition-colors" />
                </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </>
  );
};

export default Landing;
