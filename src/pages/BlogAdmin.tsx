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
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <header className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-b border-indigo-500 sticky top-0 z-40 shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => navigate("/crm")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar
                        </Button>
                        <h1 className="text-3xl font-display font-bold text-white">
                            Blog Admin
                        </h1>
                    </div>
                    <Button
                        onClick={() => {
                            resetForm();
                            setShowForm(!showForm);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Post
                    </Button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Form */}
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-800 rounded-2xl p-8 shadow-xl border-2 border-indigo-500 mb-12"
                    >
                        <h2 className="text-2xl font-display font-bold text-white mb-6">
                            {editingId ? "Editar Post" : "Criar Novo Post"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Título */}
                            <div className="space-y-2">
                                <Label className="font-semibold text-indigo-300">Título *</Label>
                                <Input
                                    placeholder="Título do post"
                                    value={formData.title}
                                    onChange={handleTitleChange}
                                    required
                                    className="bg-slate-700 border-indigo-500 text-white placeholder-slate-400"
                                />
                            </div>

                            {/* Slug */}
                            <div className="space-y-2">
                                <Label className="font-semibold text-indigo-300">Slug *</Label>
                                <Input
                                    placeholder="slug-do-post"
                                    value={formData.slug}
                                    onChange={(e) =>
                                        setFormData({ ...formData, slug: e.target.value })
                                    }
                                    required
                                    className="bg-slate-700 border-indigo-500 text-white placeholder-slate-400"
                                />
                                <p className="text-sm text-indigo-300">
                                    URL: /blog/{formData.slug}
                                </p>
                            </div>

                            {/* Excerpt */}
                            <div className="space-y-2">
                                <Label className="font-semibold text-indigo-300">
                                    Resumo (opcional)
                                </Label>
                                <textarea
                                    placeholder="Resumo do post"
                                    value={formData.excerpt}
                                    onChange={(e) =>
                                        setFormData({ ...formData, excerpt: e.target.value })
                                    }
                                    className="w-full px-4 py-2 rounded-lg border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-20 resize-none !text-white bg-slate-700 placeholder-slate-400"
                                />
                            </div>

                            {/* HTML Content */}
                            <div className="space-y-2">
                                <Label className="font-semibold text-indigo-300">
                                    Conteúdo HTML *
                                </Label>
                                <div className="bg-slate-900 rounded-lg border-2 border-dashed border-indigo-500 p-4">
                                    <p className="text-sm text-indigo-300 mb-3">
                                        Cole seu HTML aqui. Você pode incluir imagens, links,
                                        formatação, etc.
                                    </p>
                                    <textarea
                                        placeholder='<h1>Título</h1><p>Seu conteúdo aqui...</p>'
                                        value={formData.html_content}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                html_content: e.target.value,
                                            })
                                        }
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-64 resize-vertical font-mono text-sm !text-white bg-slate-800 placeholder-slate-400"
                                    />
                                </div>
                            </div>

                            {/* Publicado */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={formData.published}
                                    onChange={(e) =>
                                        setFormData({ ...formData, published: e.target.checked })
                                    }
                                    className="w-5 h-5 rounded border-indigo-500 text-indigo-600 cursor-pointer"
                                />
                                <label
                                    htmlFor="published"
                                    className="text-indigo-300 font-semibold cursor-pointer"
                                >
                                    Publicar agora
                                </label>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {editingId ? "Atualizar" : "Criar"} Post
                                </Button>
                                <Button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold"
                                >
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Posts List */}
                <div>
                    <h2 className="text-2xl font-display font-bold text-white mb-6">
                        Posts Publicados ({posts.length})
                    </h2>

                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-indigo-300">Carregando posts...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-12 bg-slate-800 rounded-2xl border-2 border-dashed border-indigo-500">
                            <p className="text-indigo-300 mb-4">Nenhum post criado ainda</p>
                            <Button
                                onClick={() => setShowForm(true)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Criar Primeiro Post
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {posts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-slate-800 rounded-2xl p-6 shadow-lg border-2 border-indigo-500 hover:border-indigo-400 transition-all"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-display font-bold text-white">
                                                    {post.title}
                                                </h3>
                                                {post.published ? (
                                                    <span className="inline-block px-3 py-1 bg-emerald-900 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-500">
                                                        Publicado
                                                    </span>
                                                ) : (
                                                    <span className="inline-block px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-semibold border border-slate-600">
                                                        Rascunho
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-indigo-300 text-sm mb-2">
                                                /blog/{post.slug}
                                            </p>
                                            {post.excerpt && (
                                                <p className="text-slate-300 mb-3 line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                            <p className="text-slate-400 text-xs">
                                                Criado em{" "}
                                                {new Date(post.created_at).toLocaleDateString("pt-BR")}
                                            </p>
                                        </div>

                                        <div className="flex gap-2 ml-4">
                                            <Button
                                                onClick={() =>
                                                    window.open(`/blog/${post.slug}`, "_blank")
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                onClick={() => handleEdit(post)}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(post.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogAdmin;
