import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Edit2, Trash2, Eye, Save } from "lucide-react";
import { BlogPost } from "@/types";

const BlogAdmin = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        html_content: "",
        excerpt: "",
        published: false,
    });

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const { data, error } = await supabase
                .from("blog_posts")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setPosts(data || []);
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

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.slug || !formData.html_content) {
            toast({
                title: "Erro",
                description: "Preencha todos os campos obrigatórios",
                variant: "destructive",
            });
            return;
        }

        try {
            const now = new Date().toISOString();

            if (editingId) {
                // Update
                const { error } = await supabase
                    .from("blog_posts")
                    .update({
                        title: formData.title,
                        slug: formData.slug,
                        html_content: formData.html_content,
                        excerpt: formData.excerpt,
                        published: formData.published,
                        updated_at: now,
                    })
                    .eq("id", editingId);

                if (error) throw error;

                toast({
                    title: "Sucesso",
                    description: "Post atualizado com sucesso",
                });
            } else {
                // Create
                const { error } = await supabase.from("blog_posts").insert({
                    title: formData.title,
                    slug: formData.slug,
                    html_content: formData.html_content,
                    excerpt: formData.excerpt,
                    published: formData.published,
                    created_at: now,
                    updated_at: now,
                });

                if (error) throw error;

                toast({
                    title: "Sucesso",
                    description: "Post criado com sucesso",
                });
            }

            resetForm();
            loadPosts();
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    const handleEdit = (post: BlogPost) => {
        setFormData({
            title: post.title,
            slug: post.slug,
            html_content: post.html_content,
            excerpt: post.excerpt || "",
            published: post.published,
        });
        setEditingId(post.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja deletar este post?")) return;

        try {
            const { error } = await supabase.from("blog_posts").delete().eq("id", id);

            if (error) throw error;

            toast({
                title: "Sucesso",
                description: "Post deletado com sucesso",
            });

            loadPosts();
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            slug: "",
            html_content: "",
            excerpt: "",
            published: false,
        });
        setEditingId(null);
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans overflow-x-hidden">
            {/* Header Sóbrio */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 py-4 backdrop-blur-xl shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-3 sm:gap-6">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/crm")}
                            className="h-8 px-2 sm:h-9 sm:px-3 text-[10px] sm:text-xs font-bold text-slate-600 hover:bg-slate-100"
                        >
                            <ArrowLeft className="sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="hidden xs:inline">CRM</span>
                        </Button>
                        <div className="hidden xxs:block">
                            <h1 className="font-serif text-base sm:text-lg font-bold tracking-tight text-emerald-950 truncate">
                                Editor
                            </h1>
                            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-emerald-700/70">
                                Blog Estratégico
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={() => {
                            resetForm();
                            setShowForm(!showForm);
                        }}
                        className="h-8 px-3 sm:h-9 sm:px-6 bg-emerald-900 text-[10px] sm:text-xs font-bold text-white hover:bg-emerald-800"
                    >
                        <Plus className="sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="hidden xs:inline">Nova Publicação</span>
                        <span className="xs:hidden">Novo</span>
                    </Button>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-3 sm:px-6 py-6 sm:py-12">
                {/* Form Refinado e Altamente Responsivo */}
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 sm:mb-16 rounded-2xl sm:rounded-[40px] border border-slate-200 bg-white p-4 sm:p-10 shadow-2xl shadow-emerald-900/5"
                    >
                        <h2 className="font-serif text-lg sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8">
                            {editingId ? "Refinar Publicação" : "Nova Publicação Estratégica"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-8">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="space-y-1.5">
                                    <Label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Título da Matéria *</Label>
                                    <Input
                                        placeholder="Ex: A Ciência da Primeira Impressão"
                                        value={formData.title}
                                        onChange={handleTitleChange}
                                        required
                                        className="h-11 sm:h-12 rounded-xl border-slate-200 bg-white text-sm sm:text-base focus-visible:ring-emerald-900"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Slug / URL Amigável *</Label>
                                    <Input
                                        placeholder="url-da-materia"
                                        value={formData.slug}
                                        onChange={(e) =>
                                            setFormData({ ...formData, slug: e.target.value })
                                        }
                                        required
                                        className="h-11 sm:h-12 rounded-xl border-slate-200 bg-white text-sm sm:text-base focus-visible:ring-emerald-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Resumo Executivo (Excerpt)</Label>
                                <textarea
                                    placeholder="Breve descrição para atrair o leitor..."
                                    value={formData.excerpt}
                                    onChange={(e) =>
                                        setFormData({ ...formData, excerpt: e.target.value })
                                    }
                                    className="w-full h-20 sm:h-24 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 text-sm focus:border-emerald-900 focus:ring-4 focus:ring-emerald-900/5 transition-all outline-none resize-none"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Conteúdo em HTML Estruturado *</Label>
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-4">
                                    <textarea
                                        placeholder="Insira o HTML da matéria aqui..."
                                        value={formData.html_content}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                html_content: e.target.value,
                                            })
                                        }
                                        required
                                        className="w-full h-[250px] sm:h-[400px] rounded-xl border border-slate-200 bg-white p-3 sm:p-4 font-mono text-xs sm:text-sm focus:border-emerald-900 transition-all outline-none resize-vertical"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={formData.published}
                                    onChange={(e) =>
                                        setFormData({ ...formData, published: e.target.checked })
                                    }
                                    className="w-5 h-5 shrink-0 rounded-lg border-slate-300 text-emerald-900 focus:ring-emerald-900"
                                />
                                <label
                                    htmlFor="published"
                                    className="text-[11px] sm:text-sm font-bold text-slate-700 cursor-pointer"
                                >
                                    Tornar esta publicação visível no site agora
                                </label>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Button
                                    type="submit"
                                    className="h-11 sm:h-12 bg-emerald-900 px-10 text-sm font-bold text-white hover:bg-emerald-800 active:scale-95 transition-all shadow-lg shadow-emerald-900/10"
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    {editingId ? "Salvar Alterações" : "Publicar Matéria"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={resetForm}
                                    className="h-11 sm:h-12 px-8 text-sm font-bold text-red-400 hover:bg-red-50 hover:text-red-600"
                                >
                                    Descartar
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Lista de Matérias */}
                <div className="space-y-6 sm:space-y-8">
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                        Acervo <span className="text-emerald-900/30">({posts.length})</span>
                    </h2>

                    {loading ? (
                        <div className="flex h-48 sm:h-64 items-center justify-center rounded-3xl sm:rounded-[40px] border border-dashed border-slate-200 bg-white">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-900 border-t-transparent" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="flex h-48 sm:h-64 flex-col items-center justify-center rounded-3xl sm:rounded-[40px] border border-dashed border-slate-200 bg-white text-slate-400">
                            <p className="font-bold">Nenhuma matéria publicada ainda</p>
                            <Button
                                variant="link"
                                onClick={() => setShowForm(true)}
                                className="mt-2 text-emerald-900 font-bold"
                            >
                                Criar Primeiro Post
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-3 sm:gap-4">
                            {posts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    layout
                                    className="group rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                                <h3 className="truncate font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-950 transition-colors">
                                                    {post.title}
                                                </h3>
                                                {post.published ? (
                                                    <span className="shrink-0 rounded-full bg-emerald-50 px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-emerald-700 border border-emerald-100">
                                                        Ativo
                                                    </span>
                                                ) : (
                                                    <span className="shrink-0 rounded-full bg-slate-50 px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-slate-100">
                                                        Rascunho
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[10px] sm:text-xs font-bold text-emerald-900/40 mb-2 sm:mb-3 truncate">
                                                /blog/{post.slug}
                                            </p>
                                            <div className="flex items-center gap-4 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                <span>{new Date(post.created_at).toLocaleDateString("pt-BR")}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-1 sm:gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
                                            <Button
                                                variant="ghost"
                                                onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
                                                className="h-9 w-9 sm:h-10 sm:w-10 p-0 text-slate-400 hover:text-emerald-900 hover:bg-emerald-50 rounded-xl"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleEdit(post)}
                                                className="h-9 w-9 sm:h-10 sm:w-10 p-0 text-slate-400 hover:text-emerald-900 hover:bg-emerald-50 rounded-xl"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleDelete(post.id)}
                                                className="h-9 w-9 sm:h-10 sm:w-10 p-0 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-xl"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default BlogAdmin;
