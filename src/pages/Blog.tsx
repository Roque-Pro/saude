import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Leaf } from "lucide-react";
import { BlogPost } from "@/types";
import BlogNavbar from "@/components/BlogNavbar";
import { useSEO } from "@/hooks/useSEO";
import { getBreadcrumbSchema } from "@/lib/seo-optimization";

const Blog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: "Blog | Dicas de Saúde, Bem-Estar e Performance",
    description:
      "Acompanhe as últimas tendências e orientações sobre saúde integral, longevidade, nutrição e equilíbrio mental com Dr. Saullo Gomes.",
    keywords: [
      "blog de saúde",
      "dicas de bem-estar",
      "performance humana",
      "longevidade",
      "dr saullo gomes blog",
      "viver melhor",
      "hábitos saudáveis",
    ],
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Blog Dr. Saullo Gomes",
        description: "Artigos sobre saúde, bem-estar, nutrição e performance.",
        publisher: {
          "@type": "Person",
          name: "Dr. Saullo Gomes"
        }
      },
      getBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "Blog", item: "/blog" },
      ]),
    ],
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const processedData = (data || []).map((post) => ({
        ...post,
        featured_image: post.featured_image || extractFirstImage(post.html_content),
      }));

      setPosts(processedData as BlogPost[]);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao carregar posts: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const extractFirstImage = (htmlContent: string): string | null => {
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/;
    const match = htmlContent.match(imgRegex);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-emerald-50">
      <BlogNavbar hideAboutLink hideDiagnosticButton />

      <section className="relative mt-16 px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-5xl font-display font-black leading-tight text-gray-900 sm:text-6xl md:text-7xl"
          >
            Blog{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
              Dr Saullo Gomes
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-600"
          >
            Insights, orientações e descobertas sobre nutrição, movimento,
            saúde mental e equilíbrio para você viver a sua melhor versão.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto h-1 w-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-500"
          />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div className="py-12 text-center">
              <p className="animate-pulse text-emerald-600">Carregando conteúdos...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-emerald-100 bg-white py-20 text-center">
              <p className="mb-6 text-lg text-gray-600">
                Nenhuma publicação encontrada ainda.
              </p>
              <Button asChild className="bg-emerald-600 font-bold text-white hover:bg-emerald-700">
                <Link to="/">Voltar para Home</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const imageUrl =
                  (post as any).featured_image || extractFirstImage(post.html_content);

                return (
                  <motion.article
                    key={post.id}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                      aria-label={`Ler publicação ${post.title}`}
                    >
                      <div className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-gray-100 bg-white shadow-lg transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl">
                        <div className="h-48 w-full overflow-hidden bg-gradient-to-br from-emerald-100 via-teal-100 to-emerald-200 transition-all duration-300 group-hover:from-emerald-200 group-hover:via-teal-200 group-hover:to-emerald-300">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={post.title}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <Leaf className="h-12 w-12 text-emerald-600/30" />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <p className="mb-3 text-sm text-gray-500">
                            {new Date(post.created_at).toLocaleDateString("pt-BR")}
                          </p>

                          <h2 className="mb-3 line-clamp-3 text-xl font-display font-bold text-gray-900 transition-colors group-hover:text-emerald-600">
                            {post.title}
                          </h2>

                          {post.excerpt && (
                            <p className="mb-4 flex-1 line-clamp-2 text-sm text-gray-600">
                              {post.excerpt}
                            </p>
                          )}

                          <p className="mb-4 text-xs text-gray-500">
                            {Math.ceil(post.html_content.split(" ").length / 200)} min de
                            leitura
                          </p>

                          <div className="flex items-center gap-2 font-semibold text-emerald-600 transition-all group-hover:gap-3">
                            Ler publicação
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-emerald-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 text-center">
          <p className="font-serif text-xl font-bold text-emerald-950">Dr Saullo Gomes</p>
          <p className="mt-2 text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Conteúdo informativo e educacional.
          </p>
          <p className="mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            CRM/ES 435671
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
