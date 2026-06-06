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
  Command
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
    title: "Dr Saullo Gomes | Strategic Operating System para Médicos e Advogados",
    description: "A ciência da medicina encontra a precisão da gestão estratégica. Portal exclusivo para profissionais de elite que buscam escala, segurança e autoridade.",
    keywords: ["gestão médica", "estratégia para advogados", "consultoria de elite", "dr saullo gomes", "crm médico", "performance profissional"],
  });

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-100 antialiased overflow-x-hidden">
      {/* Visual background setup - Technical Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-transparent to-transparent" />
      </div>

      {/* Modern Navigation */}
      <header className={`fixed top-0 z-50 w-full transition-all duration-700 ${scrolled ? "bg-[#020617]/95 backdrop-blur-3xl border-b border-white/5 py-4" : "py-10"}`}>
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 lg:px-20">
          <div className="flex items-center gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-950 border border-emerald-500/30">
                <Command className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-black tracking-tight text-white leading-none">DR SAULLO GOMES</span>
              <span className="mt-1 text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500/60">Strategic Performance Engine</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-16">
            <a href="#sistema" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Sistema</a>
            <a href="#modulos" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Módulos</a>
            <a href="#briefings" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors">Briefings</a>
            <div className="h-4 w-px bg-white/10" />
            <Link to="/crm" className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-3 transition-all hover:bg-white hover:text-slate-950">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Acesso de Elite</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO SECTION: The Operational Command Center */}
        <section id="sistema" className="mx-auto flex min-h-screen max-w-[1500px] items-center px-8 lg:px-20 pt-32">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-10 inline-flex items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-2.5">
                <div className="relative h-2 w-2">
                    <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                    <div className="relative rounded-full h-2 w-2 bg-emerald-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Core System: Operational</span>
              </div>

              <h1 className="font-serif text-6xl font-black leading-[0.9] tracking-tighter text-white sm:text-8xl lg:text-[120px]">
                Gestão de <br />
                <span className="relative inline-block italic text-emerald-500">
                  elite
                  <svg className="absolute -bottom-4 left-0 h-4 w-full text-emerald-500/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="6" />
                  </svg>
                </span>
                <br />
                zero ruído.
              </h1>

              <p className="mt-12 max-w-xl text-xl leading-relaxed text-slate-400 font-medium lg:text-2xl">
                Você é pago para ser brilhante em sua técnica. Nós construímos a infraestrutura para que sua gestão brilhe na mesma intensidade.
              </p>

              <div className="mt-16 flex flex-col gap-8 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="h-20 rounded-[32px] bg-emerald-500 px-14 text-lg font-black text-[#020617] transition-all hover:bg-emerald-400 hover:scale-[1.02] active:scale-95 shadow-[0_20px_50px_rgba(16,185,129,0.3)]">
                  <Link to="/diagnostico-gratuito">
                    Run Strategic Scan
                    <Zap className="ml-3 h-6 w-6 fill-current" />
                  </Link>
                </Button>
                <div className="flex items-center gap-6 border-l border-white/10 pl-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Medical Authority</span>
                        <span className="text-lg font-bold text-white">CRM/ES 435671</span>
                    </div>
                </div>
              </div>
            </div>

            {/* THE CRM MOCKUP: Asymmetrical & Technical */}
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 rounded-[60px] border border-white/10 bg-slate-900/50 p-4 shadow-2xl backdrop-blur-3xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
                <div className="relative rounded-[48px] overflow-hidden">
                    <img src={drSaulloImage} alt="Strategic Lead" className="w-full aspect-[4/5] object-cover grayscale opacity-40 mix-blend-luminosity hover:grayscale-0 hover:opacity-100 transition-all duration-1000" />
                </div>

                {/* Status Overlay Modules */}
                <div className="absolute inset-0 p-10 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-end">
                         <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 backdrop-blur-md shadow-2xl pointer-events-auto">
                            <div className="flex items-center gap-4 mb-2">
                                <LineChart className="h-4 w-4 text-emerald-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Yield Engine</span>
                            </div>
                            <p className="text-2xl font-serif font-black text-white">+42%</p>
                         </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 max-w-[200px]">
                        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/90 p-6 backdrop-blur-md shadow-2xl pointer-events-auto">
                            <Users className="h-6 w-6 text-emerald-400 mb-3" />
                            <p className="text-3xl font-serif font-black text-white">+5k</p>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500/70">Verified Leads</p>
                        </div>
                    </div>
                </div>
              </motion.div>

              {/* Decorative Blueprint elements */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />
              <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-blue-500/5 blur-[120px]" />
            </div>
          </div>
        </section>

        {/* METHODOLOGY SECTION: The Module Grid */}
        <section id="modulos" className="bg-white py-32 lg:py-56 rounded-[100px] lg:rounded-[160px] relative">
          <div className="mx-auto max-w-[1500px] px-8 lg:px-20">
            <div className="mb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-16">
              <div className="max-w-2xl">
                <div className="mb-6 h-1 w-24 bg-emerald-900" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-700">OS Architecture</span>
                <h2 className="mt-8 font-serif text-5xl font-black leading-none tracking-tighter text-slate-950 lg:text-[90px]">
                    O Sistema <br />
                    <span className="italic text-slate-300">Modular.</span>
                </h2>
              </div>
              <p className="max-w-md text-xl leading-relaxed text-slate-500 font-medium">
                Elimine a improvisação. Cada aspecto da sua jornada profissional é tratado como um módulo de alta precisão.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {[
                { 
                  title: "Workflow Engine", 
                  id: "WF-01", 
                  desc: "Redesenho radical do seu funil de atendimento. Transformamos consultas em experiências de alto valor.",
                  icon: Activity 
                },
                { 
                  title: "Legal Shield", 
                  id: "LS-02", 
                  desc: "Proteção estratégica contra vazamentos operacionais e riscos de conformidade jurídica/clínica.",
                  icon: ShieldCheck 
                },
                { 
                  title: "Authority Core", 
                  id: "AC-03", 
                  desc: "Domínio de narrativa digital para atrair o público que valoriza sua hora e seu conhecimento.",
                  icon: Globe 
                }
              ].map((m, i) => (
                <div key={i} className="group relative rounded-[56px] border border-slate-100 bg-slate-50/50 p-12 transition-all duration-500 hover:bg-emerald-950 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(6,78,59,0.15)]">
                  <div className="mb-20 flex items-center justify-between">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[32px] bg-white text-emerald-900 shadow-sm transition-transform group-hover:rotate-12 group-hover:bg-emerald-500 group-hover:text-white">
                        <m.icon className="h-10 w-10" />
                    </div>
                    <span className="font-mono text-xs font-bold tracking-widest text-slate-300 group-hover:text-emerald-500/50">{m.id}</span>
                  </div>
                  <h3 className="font-serif text-4xl font-black text-slate-950 group-hover:text-white transition-colors">{m.title}</h3>
                  <p className="mt-8 text-lg leading-relaxed text-slate-500 group-hover:text-emerald-50/60 transition-colors">{m.desc}</p>
                  
                  <div className="mt-16 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900 opacity-0 transition-all group-hover:opacity-100 group-hover:text-emerald-400">
                    Deploy Module <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUOTE SECTION: Provocative Human Authority */}
        <section className="bg-[#020617] py-40 lg:py-64 overflow-hidden">
            <div className="mx-auto max-w-[1500px] px-8 lg:px-20 relative">
                <div className="absolute -left-20 top-0 text-[300px] font-serif font-black text-white/5 italic select-none">"</div>
                <div className="relative z-10 mx-auto max-w-5xl text-center">
                    <h2 className="font-serif text-5xl font-black italic leading-[1.1] text-white lg:text-[100px] tracking-tighter">
                        "Se você não sabe quanto seu tempo vale... <br />
                        <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-[20px]">o mercado define por você."</span>
                    </h2>
                    <div className="mt-24 flex flex-col items-center">
                         <p className="max-w-2xl text-2xl leading-relaxed text-slate-400 font-medium">
                            Dr Saullo Gomes construiu sua autoridade na interseção entre o rigor clínico e a agilidade executiva. Este não é um curso. É o seu novo sistema operacional.
                         </p>
                         <div className="mt-16 h-24 w-px bg-gradient-to-b from-emerald-500 to-transparent" />
                    </div>
                </div>
            </div>
        </section>

        {/* ARCHIVE SECTION: Intelligence Briefings */}
        <section id="briefings" className="bg-[#f8fafc] py-32 lg:py-56">
          <div className="mx-auto max-w-[1500px] px-8 lg:px-20">
            <div className="mb-32 grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-800">Knowledge Stack</span>
                <h2 className="mt-8 font-serif text-6xl font-black leading-none text-slate-950 lg:text-[100px]">Strategic <br /> Briefings.</h2>
              </div>
              <div className="flex flex-col gap-10">
                <p className="max-w-md text-xl leading-relaxed text-slate-500 font-medium">
                    Explorações técnicas sobre o futuro da gestão médica e jurídica. Sem clichês, apenas dados e estratégia pura.
                </p>
                <Link to="/blog" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-emerald-900 group">
                    View Complete Index <div className="h-10 w-10 flex items-center justify-center rounded-full border border-emerald-900/10 group-hover:bg-emerald-900 group-hover:text-white transition-all"><ChevronRight className="h-4 w-4" /></div>
                </Link>
              </div>
            </div>

            <div className="grid gap-20 lg:grid-cols-2">
              <RecentBriefings />
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="bg-emerald-950 py-32 lg:py-48 relative overflow-hidden">
             <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
             <div className="mx-auto max-w-[1500px] px-8 lg:px-20 text-center relative z-10">
                <h2 className="font-serif text-5xl font-black text-white lg:text-8xl tracking-tight">Pronto para o upgrade?</h2>
                <p className="mt-12 mx-auto max-w-xl text-xl text-emerald-200/60 font-medium">
                    Inicie o diagnóstico agora e descubra como o Operational Command do Dr. Saullo Gomes pode transformar sua prática em uma máquina de resultados.
                </p>
                <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8">
                     <Button asChild size="lg" className="h-20 rounded-full bg-white px-16 text-lg font-black text-emerald-950 hover:bg-emerald-400 hover:text-emerald-950 transition-all shadow-2xl shadow-emerald-500/20">
                        <Link to="/diagnostico-gratuito">Initialize System Scan</Link>
                     </Button>
                </div>
             </div>
        </section>

        {/* FOOTER: Minimalist & Technical */}
        <footer className="bg-[#020617] py-24 border-t border-white/5">
            <div className="mx-auto max-w-[1500px] px-8 lg:px-20">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-20">
                    <div className="max-w-sm">
                        <span className="font-serif text-3xl font-black text-white tracking-tighter">DR SAULLO GOMES</span>
                        <p className="mt-8 text-slate-500 text-sm leading-relaxed font-medium">
                            A nova fronteira da gestão estratégica para os profissionais de elite do século XXI. 
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-16 lg:gap-24">
                        {[
                            { label: "Sistema", links: ["Protocolos", "Módulos", "Diagnóstico"] },
                            { label: "Legal", links: ["Privacidade", "Termos", "CRM/ES"] },
                            { label: "Canal", links: ["LinkedIn", "Instagram", "WhatsApp"] },
                            { label: "Elite", links: ["Acesso", "Briefings", "Admin"] }
                        ].map((col, idx) => (
                            <div key={idx}>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">{col.label}</h4>
                                <ul className="space-y-4">
                                    {col.links.map(link => (
                                        <li key={link}><a href="#" className="text-sm font-bold text-slate-500 hover:text-emerald-400 transition-colors">{link}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                        &copy; {new Date().getFullYear()} Dr Saullo Gomes. Engineering Strategic Success.
                    </p>
                    <div className="flex items-center gap-8">
                         <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-700">Protocol 01-EXE</span>
                         <div className="h-1 w-20 rounded-full bg-white/5" />
                    </div>
                </div>
            </div>
        </footer>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=Inter:wght@400;500;700;900&family=JetBrains+Mono:wght@700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        html { scroll-behavior: smooth; }
        
        ::selection { background: rgba(16, 185, 129, 0.2); color: #fff; }
      `}} />
    </div>
  );
};

// Sub-component for Recent Briefings (Redesigned Blog Posts)
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

  if (loading) return <div className="h-64 w-full animate-spin flex items-center justify-center"><Zap className="h-10 w-10 text-emerald-900 opacity-20" /></div>;

  return (
    <>
      {posts.map((post, i) => (
        <motion.article 
          key={post.id}
          initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="group relative flex flex-col gap-10"
        >
          <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden rounded-[64px] border border-white/5 shadow-2xl">
             {post.featured_image && (
               <img src={post.featured_image} alt={post.title} className="h-full w-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-110 group-hover:scale-100" />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
             
             <div className="absolute bottom-10 left-10 right-10">
                <div className="mb-4 inline-flex rounded-full bg-emerald-500 px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-950">
                    Briefing {i+1}
                </div>
                <h3 className="font-serif text-4xl font-black text-white leading-tight">
                    {post.title}
                </h3>
             </div>
          </Link>
          <div className="px-10">
            <p className="text-slate-400 text-lg leading-relaxed font-medium line-clamp-3">
                {post.excerpt}
            </p>
            <div className="mt-12 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 italic">Release Date: {new Date(post.created_at).toLocaleDateString("pt-BR")}</span>
                <Link to={`/blog/${post.slug}`} className="h-14 w-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-all">
                    <ArrowRight className="h-5 w-5 text-white" />
                </Link>
            </div>
          </div>
        </motion.article>
      ))}
    </>
  );
};

export default Landing;
