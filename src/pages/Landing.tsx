import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  BookOpen, 
  HeartPulse, 
  Leaf, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  Stethoscope,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";
import drSaulloImage from "@/img/drsaulo.jpg";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  html_content: string;
  featured_image: string | null;
  created_at: string;
};

const topicCards = [
  {
    icon: Activity,
    title: "Equilíbrio Metabólico",
    description:
      "Insights científicos sobre como alinhar seu metabolismo e hormônios para uma vida com mais vitalidade e menos pressão.",
  },
  {
    icon: Leaf,
    title: "Longevidade Ativa",
    description:
      "Estratégias sobre nutrição regenerativa, sono reparador e movimento consciente para uma saúde que respira liberdade.",
  },
  {
    icon: Sparkles,
    title: "Perspectivas Médicas",
    description:
      "Conteúdo editorial com curadoria técnica e olhar humanizado sobre as tendências da endocrinologia moderna.",
  },
];

const quickLinks = [
  { label: "Pilares", href: "#temas" },
  { label: "Publicações", href: "#artigos" },
  { label: "A Proposta", href: "#sobre" },
];

const Landing = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blogCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Artigos e Publicações de Dr Saullo Gomes | Endocrinologia e Saúde Corporal",
    description: "Acervo de artigos sobre metabolismo, longevidade e hábitos saudáveis pelo Dr. Saullo Gomes.",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: recentPosts.length,
    itemListElement: recentPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.doutorsaullo.com.br/blog/${post.slug}`,
      name: post.title,
    })),
  };

  useSEO({
    title: "Dr Saullo Gomes | Endocrinologia, Metabolismo e Saúde Integral",
    description:
      "Explore artigos exclusivos sobre endocrinologia, saúde corporal e longevidade. O Dr. Saullo Gomes compartilha dicas práticas para um equilíbrio metabólico real e duradouro.",
    keywords: [
      "endocrinologista",
      "saúde hormonal",
      "metabolismo e emagrecimento",
      "longevidade saudável",
      "dr saullo gomes",
      "artigos médicos saúde",
      "equilíbrio corporal",
      "prevenção doenças metabólicas",
      "hábitos de vida saudáveis",
      "bem-estar integral",
    ],
    ogTitle: "Dr Saullo Gomes | A Ciência do Bem-Estar e Equilíbrio Hormonal",
    ogDescription:
      "Descubra uma abordagem humana e científica para sua saúde. Artigos, reflexões e guias práticos sobre endocrinologia e hábitos.",
    ogUrl: "https://www.doutorsaullo.com.br",
    twitterTitle: "Dr Saullo Gomes | Saúde Corporal e Endocrinologia",
    twitterDescription:
      "Conteúdo especializado para quem busca saúde sem fórmulas prontas. Dr. Saullo Gomes analisa metabolismo e vida saudável.",
    canonicalUrl: "https://www.doutorsaullo.com.br",
    googleSiteVerification: "TU7NzrXfsfOsd_Y-dzJPhTKTXodzzW3jeG5vTx6kxRI",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://www.doutorsaullo.com.br/#website",
          url: "https://www.doutorsaullo.com.br",
          name: "Dr Saullo Gomes | Saúde Integral",
          description: "Portal de conteúdo médico sobre endocrinologia e estilo de vida saudável.",
          inLanguage: "pt-BR",
        },
        {
          "@type": "Physician",
          "@id": "https://www.doutorsaullo.com.br/#doctor",
          name: "Dr. Saullo Gomes",
          url: "https://www.doutorsaullo.com.br",
          image: "https://www.doutorsaullo.com.br/src/img/drsaulo.jpg",
          description: "Médico Endocrinologista dedicado à saúde corporal e longevidade.",
          medicalSpecialty: "Endocrinology",
          address: {
            "@type": "PostalAddress",
            "addressLocality": "Brasil",
          }
        },
        {
          "@type": "CollectionPage",
          "@id": "https://www.doutorsaullo.com.br/#home",
          url: "https://www.doutorsaullo.com.br",
          name: "Dr Saullo Gomes | Portal de Saúde e Endocrinologia",
          isPartOf: { "@id": "https://www.doutorsaullo.com.br/#website" },
          about: [
            "Endocrinologia",
            "Metabolismo",
            "Saúde Corporal",
            "Longevidade",
          ],
        },
      ],
    },
  });

  useEffect(() => {
    const loadRecentPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        setRecentPosts((data as BlogPost[]) || []);
      } catch (error) {
        console.error("Erro ao carregar posts recentes:", error);
      } finally {
        setLoadingPosts(false);
      }
    };

    loadRecentPosts();
  }, []);

  const extractFirstImage = (htmlContent: string): string | null => {
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/;
    const match = htmlContent.match(imgRegex);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-[#fafcfb] font-sans text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header Premium */}
      <header 
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled 
            ? "border-b border-emerald-900/10 bg-white/80 py-3 backdrop-blur-xl" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-4 text-left"
            aria-label="Dr Saullo Gomes - Início"
          >
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-emerald-900 transition-transform duration-500 group-hover:scale-110">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900 via-emerald-800 to-emerald-700 opacity-50" />
              <HeartPulse className="relative h-6 w-6 text-emerald-50" />
            </div>
            <div>
              <span className="block font-serif text-xl font-bold tracking-tight text-emerald-950 sm:text-2xl">
                Dr Saullo Gomes
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700/80">
                Endocrinologia & Longevidade
              </span>
            </div>
          </button>

          <nav className="hidden items-center gap-10 lg:flex">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-900 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-all hover:bg-emerald-800 hover:shadow-emerald-900/30 active:scale-95"
            >
              Explorar Blog
              <ChevronRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section - Visual Overhaul */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white pt-20">
          <div className="absolute inset-0 z-0">
            <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-emerald-50/50 blur-[120px]" />
            <div className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-slate-50 blur-[100px]" />
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-100 bg-emerald-50/50 px-4 py-2 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-800">
                  Conteúdo Médico Especializado
                </span>
              </div>
              
              <h1 className="font-serif text-6xl font-bold leading-[1.05] tracking-tight text-emerald-950 sm:text-7xl lg:text-8xl">
                Onde a saúde <br />
                <span className="relative inline-block italic text-emerald-800">
                  encontra
                  <svg className="absolute -bottom-2 left-0 h-3 w-full text-emerald-200/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span>
                <br />
                o equilíbrio.
              </h1>

              <p className="mt-8 max-w-lg text-lg leading-relaxed text-slate-600 lg:text-xl">
                Dr Saullo Gomes apresenta uma perspectiva humanizada sobre <strong>endocrinologia</strong> e <strong>longevidade</strong>. Descubra como pequenos ajustes metabólicos podem transformar sua vitalidade diária.
              </p>
              
              <p className="mt-4 text-sm font-bold tracking-widest text-emerald-800/80 uppercase">
                CRM/ES 435671
              </p>

              <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="h-14 rounded-full bg-emerald-900 px-10 text-base font-bold text-white transition-all hover:bg-emerald-800 hover:shadow-xl hover:shadow-emerald-900/20 active:scale-95">
                  <Link to="/blog">
                    Ler Artigos Recentes
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <button 
                  onClick={() => document.getElementById("temas")?.scrollIntoView({ behavior: "smooth" })}
                  className="group flex items-center gap-3 px-6 py-4 text-sm font-bold text-emerald-900 transition-colors hover:text-emerald-700"
                >
                  Conheça os Pilares
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-200 transition-colors group-hover:border-emerald-600">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </button>
              </div>

              <div className="mt-16 flex items-center gap-8 border-t border-slate-100 pt-10">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`h-10 w-10 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-800 shadow-sm`}>
                      {i === 4 ? "+5k" : ""}
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-500">
                  <span className="font-bold text-emerald-950">+5.000 leitores</span> mensais <br /> em busca de saúde real.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 aspect-[4/5] w-full overflow-hidden rounded-[40px] shadow-2xl shadow-emerald-900/20">
                <img
                  src={drSaulloImage}
                  alt="Dr Saullo Gomes - Médico Endocrinologista"
                  className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -left-10 z-20 max-w-[240px] animate-float rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-2xl backdrop-blur-xl">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-900 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold text-emerald-950">Referência Médica</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  Abordagem baseada em evidências para o equilíbrio corporal e hormonal.
                </p>
              </div>

              <div className="absolute -right-6 -top-6 -z-10 h-64 w-64 rounded-full bg-emerald-100/40 blur-3xl" />
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div className="relative">
                <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-emerald-50/80 blur-3xl" />
                <p className="relative z-10 mb-6 inline-flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-emerald-700 text-[10px]">
                  <BookOpen className="h-4 w-4" />
                  conhecimento que transforma
                </p>
                <h2 className="relative z-10 font-serif text-4xl font-bold leading-tight text-emerald-950 sm:text-5xl lg:text-6xl">
                  Ciência e bem-estar sem fórmulas mirabolantes.
                </h2>
                <p className="relative z-10 mt-8 text-lg leading-relaxed text-slate-600">
                  O Dr. Saullo Gomes acredita que a saúde corporal e o equilíbrio metabólico não vêm de promessas rápidas, mas de uma compreensão profunda de como seu corpo funciona. 
                </p>
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <Stethoscope className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-950">Rigor Científico</h4>
                      <p className="mt-1 text-sm text-slate-500">Informações validadas por estudos e prática clínica.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-950">Leitura Leve</h4>
                      <p className="mt-1 text-sm text-slate-500">Complexidade médica traduzida para o seu dia a dia.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[32px] border border-emerald-900/5 bg-emerald-900 p-8 text-emerald-50 lg:p-12">
                  <h3 className="font-serif text-3xl font-bold">Uma voz editorial única na saúde.</h3>
                  <p className="mt-6 text-lg leading-relaxed opacity-80">
                    Nesta página, a proposta é direta: reunir conteúdo que inspire pequenas mudanças reais. Sem vender atendimentos ou pacotes mágicos. Apenas a medicina compartilhada com propósito.
                  </p>
                  <Button asChild variant="outline" className="mt-10 h-12 rounded-full border-emerald-700 bg-transparent px-8 font-bold text-white hover:bg-emerald-800 hover:text-white">
                    <Link to="/blog">Explorar Temas</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars Section */}
        <section id="temas" className="relative bg-[#f4f8f6] py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.05),_transparent_40%)]" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
            <div className="text-center">
              <h2 className="font-serif text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl lg:text-6xl">
                O que você encontra por aqui
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
                Uma curadoria estratégica de temas fundamentais para quem busca olhar para a saúde corporal e longevidade com clareza e autoridade.
              </p>
            </div>

            <div className="mt-20 grid gap-8 md:grid-cols-3">
              {topicCards.map(({ icon: Icon, title, description }, i) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col items-center text-center rounded-[40px] border border-emerald-900/5 bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/10"
                >
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-900 group-hover:text-emerald-50">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-emerald-950">{title}</h3>
                  <p className="mt-5 text-base leading-relaxed text-slate-500">
                    {description}
                  </p>
                  <div className="mt-auto pt-10">
                    <Link to="/blog" className="inline-flex items-center text-sm font-bold text-emerald-900 opacity-0 transition-all group-hover:opacity-100">
                      Ver publicações
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section
          id="artigos"
          className="bg-white py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="text-center md:text-left">
                <h2 className="font-serif text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl">
                  Publicações Recentes
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Os insights mais novos sobre metabolismo e saúde integrativa.
                </p>
              </div>
              <Button asChild variant="outline" className="h-12 rounded-full border-emerald-900/20 px-8 font-bold text-emerald-900 hover:bg-emerald-50">
                <Link to="/blog">Acessar Todo Acervo</Link>
              </Button>
            </div>

            {!loadingPosts && recentPosts.length > 0 ? (
              <div className="mt-20 grid gap-10 lg:grid-cols-3">
                {recentPosts.map((post, i) => {
                  const imageUrl = post.featured_image || extractFirstImage(post.html_content);

                  return (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="group flex flex-col overflow-hidden rounded-[32px] border border-slate-100 bg-white shadow-sm transition-all hover:shadow-xl hover:shadow-emerald-900/5"
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        className="flex flex-col h-full"
                        aria-label={`Ler o artigo ${post.title}`}
                      >
                        <div className="relative h-64 w-full overflow-hidden">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={post.title}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-emerald-50">
                              <Leaf className="h-12 w-12 text-emerald-300" />
                            </div>
                          )}
                          <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-900 backdrop-blur-sm shadow-sm">
                            Medicina & Vida
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col p-8">
                          <time className="text-xs font-bold uppercase tracking-widest text-emerald-600/70">
                            {new Date(post.created_at).toLocaleDateString("pt-BR", {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </time>
                          <h3 className="mt-4 font-serif text-2xl font-bold leading-tight text-emerald-950 transition-colors group-hover:text-emerald-800">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-500">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="mt-auto pt-8">
                            <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-900">
                              Continuar leitura
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-20 flex h-64 items-center justify-center rounded-[40px] border border-dashed border-emerald-900/10 bg-emerald-50/20 text-slate-400">
                Aguardando novas publicações científicas...
              </div>
            )}
          </div>
        </section>

        {recentPosts.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(blogCollectionSchema),
            }}
          />
        )}

        {/* Closing Section */}
        <section id="sobre" className="bg-[#0c2e27] py-24 sm:py-32 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.1),_transparent_70%)]" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Saúde corporal, <br />
                  sem ruído.
                </h2>
                <p className="mt-8 text-xl leading-relaxed text-emerald-50/70">
                  Dr Saullo Gomes acredita que a medicina deve ser compartilhada com clareza. Este portal é um esforço para levar a endocrinologia moderna e a ciência da longevidade a todos que buscam viver melhor.
                </p>
                <div className="mt-12 flex flex-wrap gap-4">
                  <Button asChild size="lg" className="h-14 rounded-full bg-emerald-500 px-10 text-base font-bold text-emerald-950 transition-all hover:bg-emerald-400 active:scale-95">
                    <Link to="/blog">Explorar Publicações</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 rounded-full border-emerald-500/30 bg-transparent px-10 text-base font-bold text-white hover:bg-emerald-900/50 hover:text-white">
                    <a href="#artigos">Ver Artigos Recentes</a>
                  </Button>
                </div>
              </div>

              <div className="rounded-[40px] border border-white/5 bg-white/5 p-8 backdrop-blur-sm lg:p-12">
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                      <Activity className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Presença Editorial</h4>
                      <p className="mt-2 text-sm text-emerald-50/60 leading-relaxed">Foco exclusivo em educação em saúde e disseminação de boas práticas clínicas.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Linguagem Direta</h4>
                      <p className="mt-2 text-sm text-emerald-50/60 leading-relaxed">Conteúdo acessível que respeita sua inteligência e seu tempo.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Minimalista & Premium */}
      <footer className="border-t border-slate-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
            <div className="max-w-md text-center lg:text-left">
              <span className="font-serif text-2xl font-bold tracking-tight text-emerald-950">
                Dr Saullo Gomes
              </span>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                Uma plataforma dedicada ao conhecimento médico sobre endocrinologia, longevidade e saúde corporal integral. A ciência a serviço do seu equilíbrio.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-10">
              {quickLinks.map(link => (
                <a key={link.href} href={link.href} className="text-sm font-bold text-emerald-950 transition-colors hover:text-emerald-600">
                  {link.label}
                </a>
              ))}
              <Link to="/blog" className="text-sm font-bold text-emerald-950 transition-colors hover:text-emerald-600">Blog</Link>
            </div>
          </div>
          
          <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-slate-50 pt-10 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-xs text-slate-400">
                &copy; {new Date().getFullYear()} Dr Saullo Gomes. Conteúdo informativo e educacional.
              </p>
              <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                CRM/ES 435671
              </p>
            </div>
            <div className="flex items-center gap-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                Saúde Corporal & Longevidade
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Estilos Adicionais para Fontes Premium */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Inter:wght@400;500;600;700;800&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default Landing;
