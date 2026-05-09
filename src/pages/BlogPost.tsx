import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import BlogNavbar from "@/components/BlogNavbar";
import ShareBlogPost from "@/components/ShareBlogPost";
import StrategicBacklinks from "@/components/StrategicBacklinks";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getBlogPostingSchema, getBreadcrumbSchema, stripHtml, optimizeImageAltTags, generateKeywords } from "@/lib/seo-optimization";
import { BlogPost } from "@/types";
import { useSEO } from "@/hooks/useSEO";
import { SEO_CONFIG } from "@/lib/seo-config";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [previousPosts, setPreviousPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const firstImage = post ? extractFirstImage(post.html_content) : null;
  const description = post ? post.excerpt || stripHtml(post.html_content).slice(0, 160) : "";

  useSEO({
    title: post?.title,
    description,
    keywords: post ? generateKeywords(post.title, description).split(", ") : [],
    ogImage: firstImage || undefined,
    ogType: "article",
    schema: post ? [
      getBlogPostingSchema({
        title: post.title,
        slug: post.slug,
        excerpt: description,
        htmlContent: post.html_content,
        publishedAt: post.created_at
      }, firstImage || undefined),
      getBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "Blog", item: "/blog" },
        { name: post.title, item: `/blog/${post.slug}` },
      ])
    ] : undefined
  });

  useEffect(() => {
    loadPost();

    const adSenseScript = document.querySelector('script[src*="googlesyndication"]');
    if (!adSenseScript) {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3146585413190904";
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, [slug]);

  useEffect(() => {
    if (post) {
      loadPreviousPosts(post);
    }
  }, [post]);

  function extractFirstImage(htmlContent: string): string | null {
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/;
    const match = htmlContent.match(imgRegex);
    return match ? match[1] : null;
  }

  const loadPost = async () => {
    try {
      if (!slug) throw new Error("Slug não fornecido");

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          toast({
            title: "Post não encontrado",
            description: "Este post não existe ou não foi publicado.",
            variant: "destructive",
          });
          navigate("/");
        } else {
          throw error;
        }
      } else {
        setPost(data);
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao carregar post: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadPreviousPosts = async (currentPost: BlogPost) => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .lt("created_at", currentPost.created_at)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setPreviousPosts((data as BlogPost[]) || []);
    } catch (error) {
      console.error("Erro ao carregar posts anteriores:", error);
      setPreviousPosts([]);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-600">Carregando post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <Button asChild className="mb-8 bg-emerald-600 text-white hover:bg-emerald-700">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Home
            </Link>
          </Button>
          <div className="py-12 text-center">
            <p className="text-gray-600">Post não encontrado</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <BlogNavbar hideAboutLink hideDiagnosticButton />

      <motion.div
        style={{ paddingTop: "5rem" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="mb-10">
          <h1 className="mb-4 text-5xl font-display font-black leading-tight text-gray-900 sm:text-6xl">
            {post.title}
          </h1>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-gray-600">
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span>{Math.ceil(post.html_content.split(" ").length / 200)} min de leitura</span>
            </div>
            <ShareBlogPost title={post.title} slug={post.slug} excerpt={post.excerpt} />
          </div>
        </div>

        {post.excerpt && (
          <p className="mb-8 border-l-4 border-emerald-600 pl-6 text-xl leading-relaxed text-gray-700">
            {post.excerpt}
          </p>
        )}

        <div className="mb-12 h-1 w-12 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500" />

        <div
          className="prose prose-lg max-w-none
          prose-headings:font-display prose-headings:font-bold prose-headings:text-gray-900
          prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
          prose-a:text-emerald-700 prose-a:underline hover:prose-a:text-emerald-800
          prose-strong:font-bold prose-strong:text-gray-900
          prose-em:text-gray-700 prose-em:italic
          prose-code:rounded prose-code:border prose-code:border-gray-300 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:font-mono prose-code:text-sm prose-code:text-gray-900
          prose-pre:overflow-auto prose-pre:rounded-lg prose-pre:border prose-pre:border-gray-700 prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:text-white
          prose-blockquote:border prose-blockquote:border-emerald-200 prose-blockquote:border-l-4 prose-blockquote:border-l-emerald-600 prose-blockquote:bg-emerald-50 prose-blockquote:px-4 prose-blockquote:py-4 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700
          prose-ul:mb-6 prose-ul:ml-6 prose-ul:list-disc
          prose-ol:mb-6 prose-ol:ml-6 prose-ol:list-decimal
          prose-li:mb-2 prose-li:text-gray-700
          prose-img:my-8 prose-img:max-w-full prose-img:rounded-lg prose-img:shadow-lg
          prose-table:my-6 prose-table:w-full prose-table:border-collapse
          prose-th:border prose-th:border-gray-300 prose-th:bg-gray-200 prose-th:p-3 prose-th:text-left prose-th:font-bold prose-th:text-gray-900
          prose-td:border prose-td:border-gray-300 prose-td:p-3 prose-td:text-gray-700
          prose-hr:my-8 prose-hr:border-gray-300"
          style={{ color: "#111827" }}
          dangerouslySetInnerHTML={{ __html: post.html_content }}
        />

        {previousPosts.length > 0 && (
          <section className="my-16 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-display font-bold text-gray-900">
                Continue com leituras anteriores
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Estes são os 3 posts publicados antes deste artigo para reforçar sua navegação e aprofundar a leitura.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {previousPosts.map((previousPost) => (
                <Link
                  key={previousPost.id}
                  to={`/blog/${previousPost.slug}`}
                  className="group rounded-xl border border-emerald-100 bg-white p-5 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-700">
                    Publicado antes
                  </p>
                  <h3 className="mt-3 line-clamp-3 text-lg font-semibold leading-7 text-gray-900 transition-colors group-hover:text-emerald-700">
                    {previousPost.title}
                  </h3>
                  {previousPost.excerpt && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {previousPost.excerpt}
                    </p>
                  )}
                  <p className="mt-4 text-xs text-gray-500">
                    {new Date(previousPost.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <StrategicBacklinks />
      </motion.div>

      <div className="mt-16 border-t border-emerald-200 bg-gradient-to-r from-emerald-600 to-teal-600 py-12">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-display font-bold text-white">
            Continue sua leitura com mais leveza
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-white/90">
            Explore outros artigos sobre saúde, rotina, equilíbrio e bem-estar.
          </p>
          <Button
            onClick={() => navigate("/blog")}
            className="bg-white px-8 py-6 text-lg font-bold text-emerald-600 hover:bg-white/90"
          >
            Ver mais artigos
          </Button>
        </div>
      </div>

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

export default BlogPostPage;
