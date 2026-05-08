import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, HeartPulse, Leaf, Sparkles } from "lucide-react";
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
    icon: HeartPulse,
    title: "Rotina e equilíbrio",
    description:
      "Reflexões e dicas para encaixar pequenos cuidados no dia a dia sem transformar bem-estar em pressão.",
  },
  {
    icon: Leaf,
    title: "Hábitos mais leves",
    description:
      "Ideias sobre alimentação, descanso, movimento e escolhas simples que ajudam a vida a respirar melhor.",
  },
  {
    icon: Sparkles,
    title: "Opinião e conteúdo",
    description:
      "Artigos com ponto de vista, contexto e leitura agradável para quem gosta de pensar saúde de forma humana.",
  },
];

const quickLinks = [
  { label: "Temas", href: "#temas" },
  { label: "Artigos", href: "#artigos" },
  { label: "Sobre a página", href: "#sobre" },
];

const Landing = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const blogCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Artigos recentes de Dr Saullo Gomes",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: recentPosts.length,
    itemListElement: recentPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.vocesaude.com.br/blog/${post.slug}`,
      name: post.title,
    })),
  };

  useSEO({
    title: "Dr Saullo Gomes | Artigos, dicas e opiniões sobre saúde e bem-estar",
    description:
      "Dr Saullo Gomes compartilha artigos, dicas e opiniões sobre rotina, hábitos saudáveis, qualidade de vida e equilíbrio.",
    keywords: [
      "saúde e bem-estar",
      "artigos de saúde",
      "dicas de bem-estar",
      "qualidade de vida",
      "hábitos saudáveis",
      "rotina saudável",
      "conteúdo de saúde",
      "blog de saúde",
      "bem-estar no dia a dia",
      "opiniões sobre saúde",
    ],
    ogTitle: "Dr Saullo Gomes | Saúde e bem-estar sem complicação",
    ogDescription:
      "Leituras sobre saúde e bem-estar com artigos, dicas e opiniões de Dr Saullo Gomes para o dia a dia.",
    ogUrl: "https://www.vocesaude.com.br",
    twitterTitle: "Dr Saullo Gomes | Blog de saúde e bem-estar",
    twitterDescription:
      "Artigos e dicas de Dr Saullo Gomes sobre saúde, bem-estar, rotina e qualidade de vida.",
    canonicalUrl: "https://www.vocesaude.com.br",
    googleSiteVerification: "TU7NzrXfsfOsd_Y-dzJPhTKTXodzzW3jeG5vTx6kxRI",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://www.vocesaude.com.br/#website",
          url: "https://www.vocesaude.com.br",
          name: "Dr Saullo Gomes",
          description:
            "Site de Dr Saullo Gomes com artigos, dicas e opiniões sobre saúde e bem-estar.",
          inLanguage: "pt-BR",
        },
        {
          "@type": "Organization",
          "@id": "https://www.vocesaude.com.br/#organization",
          name: "Dr Saullo Gomes",
          url: "https://www.vocesaude.com.br",
          description:
            "Presença editorial de Dr Saullo Gomes com foco em saúde, bem-estar e qualidade de vida.",
        },
        {
          "@type": "CollectionPage",
          "@id": "https://www.vocesaude.com.br/#home",
          url: "https://www.vocesaude.com.br",
          name: "Dr Saullo Gomes | Artigos, dicas e opiniões sobre saúde e bem-estar",
          isPartOf: { "@id": "https://www.vocesaude.com.br/#website" },
          about: [
            "Saúde e bem-estar",
            "Hábitos saudáveis",
            "Qualidade de vida",
            "Rotina equilibrada",
          ],
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.vocesaude.com.br/#breadcrumb",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.vocesaude.com.br",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: "https://www.vocesaude.com.br/blog",
            },
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

        if (error) {
          throw error;
        }

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
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 text-left"
            aria-label="Voltar ao topo"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-base font-semibold">Dr Saullo Gomes</span>
              <span className="block text-xs text-slate-500">
                endocrinologia e saúde corporal com leitura leve
              </span>
            </span>
          </button>

          <nav aria-label="Navegação principal" className="hidden items-center gap-6 md:flex">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
              <Link to="/blog">Ir para o blog</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-emerald-100 bg-[#f4fbf8] lg:max-h-[560px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,118,110,0.08),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(110,231,183,0.22),_transparent_28%)]" />
          <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-[1440px] items-stretch lg:h-[560px] lg:min-h-0 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center px-6 py-20 sm:px-10 lg:px-12 lg:py-8 xl:px-16"
            >
              <div className="absolute inset-y-0 left-0 hidden w-full bg-gradient-to-r from-[#0f766e] via-[#147d72] to-transparent lg:block" />
              <div className="absolute inset-0 rounded-none bg-gradient-to-br from-[#0f766e] via-[#115e59] to-[#1f766e] lg:hidden" />
              <div className="relative z-10 max-w-2xl">
                <p className="mb-5 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/78 backdrop-blur-sm sm:text-[11px]">
                  Endocrinologia • Saúde Corporal
                </p>
                <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-[2.8rem] xl:text-[3.15rem]">
                  Dr Saullo
                  <span className="mt-2 block text-white/92">Gomes</span>
                </h1>
                <div className="mt-6 h-px w-24 bg-gradient-to-r from-white via-white/65 to-transparent" />
                <p className="mt-5 max-w-md font-body text-lg leading-8 text-white/86 lg:text-[0.92rem] lg:leading-6 xl:text-[1rem]">
                  Médico Endocrinologista e especialista em saúde corporal
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.12 }}
              className="relative min-h-[420px] overflow-hidden lg:h-full lg:min-h-0"
            >
              <img
                src={drSaulloImage}
                alt="Dr Saullo Gomes"
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#115e59]/92 via-[#115e59]/54 via-32% to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031f1d]/28 via-transparent to-white/10" />
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#115e59]/72 to-transparent blur-2xl" />
            </motion.div>
          </div>
        </section>

        <section className="border-b border-emerald-100 bg-gradient-to-b from-emerald-50 via-white to-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:px-8 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-sm font-medium text-emerald-700">
                <BookOpen className="h-4 w-4" />
                artigos, dicas e opiniões
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Saúde e bem-estar sem excesso de promessas.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Dr Saullo Gomes apresenta uma página para ler, refletir e encontrar ideias
                práticas sobre rotina, equilíbrio, hábitos e qualidade de vida.
                Sem vender serviços, sem fórmulas prontas, sem complicar o que
                pode ser dito com clareza.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <Link to="/blog">
                    Ler artigos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    document
                      .getElementById("temas")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="border-emerald-200 text-emerald-800 hover:bg-emerald-50"
                >
                  Ver temas
                </Button>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid gap-4 self-start"
              aria-label="Resumo editorial"
            >
              <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Uma página para quem gosta de conteúdo útil.
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Dr Saullo Gomes publica textos sobre saúde e bem-estar em um tom mais leve,
                  com dicas, opiniões e assuntos que fazem sentido no cotidiano.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                  foco editorial
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  <li>Conteúdo acessível e direto.</li>
                  <li>Saúde e bem-estar com linguagem humana.</li>
                  <li>Leituras para inspirar pequenas mudanças reais.</li>
                </ul>
              </div>
            </motion.aside>
          </div>
        </section>

        <section id="temas" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              O que você encontra por aqui
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Uma curadoria de temas que ajudam a olhar para a saúde e o bem-estar
              com mais contexto, menos ruído e mais presença no dia a dia.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {topicCards.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="artigos"
          className="border-y border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Artigos recentes
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Os textos mais novos da página para quem quer continuar lendo
                  com calma e encontrar novas ideias ao longo da semana.
                </p>
              </div>
              <Button asChild variant="outline" className="w-full border-emerald-200 text-emerald-800 hover:bg-emerald-50 sm:w-auto">
                <Link to="/blog">Ver todos os artigos</Link>
              </Button>
            </div>

            {!loadingPosts && recentPosts.length > 0 ? (
              <div className="mt-12 grid gap-6 lg:grid-cols-3">
                {recentPosts.map((post) => {
                  const imageUrl =
                    post.featured_image || extractFirstImage(post.html_content);

                  return (
                    <article
                      key={post.id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        className="block w-full text-left"
                        aria-label={`Ler o artigo ${post.title}`}
                      >
                        <div className="h-52 w-full overflow-hidden bg-emerald-100">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={post.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center">
                              <Leaf className="h-10 w-10 text-emerald-500" />
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <p className="text-sm text-slate-500">
                            {new Date(post.created_at).toLocaleDateString("pt-BR")}
                          </p>
                          <h3 className="mt-3 text-xl font-semibold leading-8 text-slate-900">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                              {post.excerpt}
                            </p>
                          )}
                          <span className="mt-5 inline-flex items-center text-sm font-medium text-emerald-700">
                            Continuar leitura
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                Em breve, novos artigos aparecem aqui.
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

        <section id="sobre" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-8">
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Uma presença editorial, não uma oferta de serviço
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                Esta página existe para reunir conteúdo sobre saúde e bem-estar.
                O objetivo é compartilhar artigos, percepções, dicas e leituras
                que possam acompanhar a vida cotidiana com mais leveza.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Aqui, a proposta é simples: publicar bons textos. Sem promessas
                exageradas, sem vender atendimento, sem apresentar planos,
                profissionais ou metodologias como produto.
              </p>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Navegue rápido</h3>
              <div className="mt-5 flex flex-col gap-3">
                <Button asChild variant="outline" className="justify-start border-slate-200 text-slate-700 hover:bg-slate-50">
                  <Link to="/blog">Ver blog completo</Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document
                      .getElementById("artigos")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="justify-start border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Ir para artigos recentes
                </Button>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div className="max-w-xl">
            <p className="text-lg font-semibold text-slate-900">Dr Saullo Gomes</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Conteúdo de Dr Saullo Gomes sobre saúde e bem-estar com artigos, dicas e opiniões para
              uma leitura clara, leve e interessante.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-slate-500">
            <a href="#temas" className="transition hover:text-emerald-700">
              Temas
            </a>
            <a href="#artigos" className="transition hover:text-emerald-700">
              Artigos
            </a>
            <a href="/blog" className="transition hover:text-emerald-700">
              Blog
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
