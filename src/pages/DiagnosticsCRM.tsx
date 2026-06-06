import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
    Code2,
    ChevronDown,
    Search,
    Trash2,
    Download,
    Users,
    LogOut,
    BookOpen,
    Clapperboard,
    ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Diagnostic {
    id: string;
    name: string;
    phone: string;
    company: string | null;
    area: string;
    description: string;
    status: string;
    budget_estimate: number | null;
    notes: string | null;
    created_at: string;
}

const DiagnosticsCRM = () => {
    const { session } = useAuth();
    const { toast } = useToast();
    const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Verificar autenticação
    if (!session) {
        return <Navigate to="/auth" replace />;
    }

    // Carregar diagnósticos
    useEffect(() => {
        fetchDiagnostics();
    }, []);

    const fetchDiagnostics = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("diagnostics")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setDiagnostics(data || []);
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message || "Erro ao carregar diagnósticos",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // Filtrar diagnósticos
    const filteredDiagnostics = diagnostics.filter((d) => {
        const matchSearch =
            d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.phone.includes(searchTerm) ||
            d.company?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchStatus = filterStatus === "all" || d.status === filterStatus;

        return matchSearch && matchStatus;
    });

    // Atualizar status
    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from("diagnostics")
                .update({ status: newStatus })
                .eq("id", id);

            if (error) throw error;

            setDiagnostics(
                diagnostics.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
            );

            toast({
                title: "Status atualizado",
                description: `Diagnóstico movido para ${newStatus}`,
            });
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    // Atualizar orçamento
    const updateBudget = async (id: string, budget: number) => {
        try {
            const { error } = await supabase
                .from("diagnostics")
                .update({ budget_estimate: budget })
                .eq("id", id);

            if (error) throw error;

            setDiagnostics(
                diagnostics.map((d) =>
                    d.id === id ? { ...d, budget_estimate: budget } : d
                )
            );

            toast({
                title: "Orçamento atualizado",
            });
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    // Atualizar notas
    const updateNotes = async (id: string, notes: string) => {
        try {
            const { error } = await supabase
                .from("diagnostics")
                .update({ notes })
                .eq("id", id);

            if (error) throw error;

            setDiagnostics(
                diagnostics.map((d) => (d.id === id ? { ...d, notes } : d))
            );

            toast({
                title: "Notas salvas",
            });
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    // Deletar
    const deleteDiagnostic = async (id: string) => {
        if (!confirm("Tem certeza que deseja deletar este diagnóstico?")) return;

        try {
            const { error } = await supabase.from("diagnostics").delete().eq("id", id);

            if (error) throw error;

            setDiagnostics(diagnostics.filter((d) => d.id !== id));

            toast({
                title: "Deletado",
                description: "Diagnóstico removido",
            });
        } catch (error: any) {
            toast({
                title: "Erro",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    // Exportar CSV
    const exportCSV = () => {
        const headers = [
            "Nome",
            "WhatsApp",
            "Empresa",
            "Área",
            "Descrição",
            "Status",
            "Orçamento",
            "Data",
        ];
        const rows = filteredDiagnostics.map((d) => [
            d.name,
            d.phone,
            d.company || "-",
            d.area,
            d.description.replace(/"/g, '""'),
            d.status,
            d.budget_estimate || "-",
            new Date(d.created_at).toLocaleDateString("pt-BR"),
        ]);

        const csv = [
            headers.join(","),
            ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
        ].join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `diagnosticos_${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    };

    // Logout
    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    const stats = {
        total: diagnostics.length,
        new: diagnostics.filter((d) => d.status === "new").length,
        contacted: diagnostics.filter((d) => d.status === "contacted").length,
        quoted: diagnostics.filter((d) => d.status === "quoted").length,
        won: diagnostics.filter((d) => d.status === "won").length,
    };

    const statusColors: Record<string, string> = {
        new: "bg-blue-50 text-blue-700 border border-blue-200",
        contacted: "bg-amber-50 text-amber-700 border border-amber-200",
        quoted: "bg-purple-50 text-purple-700 border border-purple-200",
        won: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        lost: "bg-slate-50 text-slate-700 border border-slate-200",
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
            {/* Header Moderno & Sóbrio */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 py-4 backdrop-blur-xl shadow-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-900 shadow-lg shadow-emerald-900/20">
                            <Code2 className="h-5 w-5 text-emerald-50" />
                        </div>
                        <div>
                            <h1 className="font-serif text-lg font-bold tracking-tight text-emerald-950">
                                Dr Saullo Gomes
                            </h1>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700/70">
                                Gestão & Diagnósticos
                            </p>
                        </div>
                    </motion.div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
                        <Button
                            variant="ghost"
                            onClick={() => (window.location.href = "/blog-admin")}
                            className="h-9 px-3 text-xs font-bold text-slate-600 hover:bg-slate-100 sm:text-sm"
                        >
                            <BookOpen className="mr-2 h-4 w-4" />
                            Blog
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => (window.location.href = "/instagram-reels-admin")}
                            className="h-9 px-3 text-xs font-bold text-slate-600 hover:bg-slate-100 sm:text-sm"
                        >
                            <Clapperboard className="mr-2 h-4 w-4" />
                            Reels
                        </Button>
                        <Button
                            onClick={exportCSV}
                            className="h-9 bg-emerald-900 px-4 text-xs font-bold text-white hover:bg-emerald-800 sm:text-sm"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Exportar
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="h-9 px-3 text-xs font-bold text-red-600 hover:bg-red-50 sm:text-sm"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                        </Button>
                    </div>
                </div>
            </header>

            {/* Conteúdo */}
            <main className="mx-auto max-w-7xl p-6 lg:p-12">
                {/* Stats Modernas */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-2 gap-4 sm:grid-cols-5 mb-10"
                >
                    {[
                        { label: "Total", value: stats.total, color: "text-slate-900", bg: "bg-white" },
                        { label: "Novos", value: stats.new, color: "text-blue-600", bg: "bg-blue-50/50" },
                        { label: "Contatados", value: stats.contacted, color: "text-amber-600", bg: "bg-amber-50/50" },
                        { label: "Orçados", value: stats.quoted, color: "text-purple-600", bg: "bg-purple-50/50" },
                        { label: "Ganhos", value: stats.won, color: "text-emerald-600", bg: "bg-emerald-50/50" },
                    ].map((stat, i) => (
                        <div key={i} className={`${stat.bg} rounded-3xl p-6 border border-slate-200 shadow-sm transition-all hover:shadow-md`}>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
                            <p className={`text-4xl font-serif font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Filtros Refinados */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 flex flex-col sm:flex-row gap-4"
                >
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-700 transition-colors" />
                        <Input
                            placeholder="Buscar por nome, WhatsApp ou empresa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-12 pl-11 rounded-2xl border-slate-200 bg-white text-sm focus-visible:ring-emerald-900 transition-all placeholder:text-slate-400"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="h-12 px-4 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all cursor-pointer"
                    >
                        <option value="all">Todos os Status</option>
                        <option value="new">Novo</option>
                        <option value="contacted">Contatado</option>
                        <option value="quoted">Orçado</option>
                        <option value="won">Ganho</option>
                        <option value="lost">Perdido</option>
                    </select>
                </motion.div>

                {/* Lista */}
                {loading ? (
                    <div className="flex h-64 items-center justify-center rounded-[40px] border border-dashed border-slate-200 bg-white shadow-sm">
                        <div className="flex flex-col items-center gap-3">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-900 border-t-transparent" />
                            <p className="text-sm font-bold text-slate-400">Processando diagnósticos...</p>
                        </div>
                    </div>
                ) : filteredDiagnostics.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center rounded-[40px] border border-dashed border-slate-200 bg-white shadow-sm">
                        <Users className="mb-4 h-12 w-12 text-slate-200" />
                        <p className="text-sm font-bold text-slate-400">Nenhum registro encontrado</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredDiagnostics.map((diagnostic) => (
                            <motion.div
                                key={diagnostic.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition-all hover:shadow-xl hover:shadow-emerald-900/5"
                            >
                                {/* Header do Card */}
                                <div
                                    onClick={() =>
                                        setExpandedId(
                                            expandedId === diagnostic.id ? null : diagnostic.id
                                        )
                                    }
                                    className="cursor-pointer p-6 sm:p-8"
                                >
                                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-5">
                                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                                                <Users className="h-6 w-6" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="truncate font-serif text-xl font-bold text-slate-900">
                                                    {diagnostic.name}
                                                </h3>
                                                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                                                    <span>{diagnostic.area}</span>
                                                    <span className="h-1 w-1 rounded-full bg-slate-200" />
                                                    <span>
                                                        {new Date(diagnostic.created_at).toLocaleDateString("pt-BR")}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-4 sm:justify-end">
                                            <div className="flex flex-wrap gap-2">
                                                <span
                                                    className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ${statusColors[diagnostic.status] ||
                                                        "bg-slate-50 text-slate-400 border-slate-200"
                                                        }`}
                                                >
                                                    {diagnostic.status === "new" ? "Novo" :
                                                     diagnostic.status === "contacted" ? "Contatado" :
                                                     diagnostic.status === "quoted" ? "Orçado" :
                                                     diagnostic.status === "won" ? "Ganho" :
                                                     diagnostic.status === "lost" ? "Perdido" : diagnostic.status}
                                                </span>
                                            </div>
                                            <ChevronDown
                                                className={`h-5 w-5 text-slate-300 transition-transform duration-500 ${expandedId === diagnostic.id ? "rotate-180 text-emerald-900" : "group-hover:text-slate-600"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Detalhes Expandidos */}
                                <AnimatePresence>
                                    {expandedId === diagnostic.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden border-t border-slate-100 bg-slate-50/50"
                                        >
                                            <div className="p-6 sm:p-10">
                                                <div className="grid gap-8 lg:grid-cols-2">
                                                    <div className="space-y-6">
                                                        <div>
                                                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-900/60">
                                                                Relato do Cliente
                                                            </Label>
                                                            <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-600 shadow-sm">
                                                                {diagnostic.description}
                                                            </div>
                                                        </div>

                                                        {diagnostic.company && (
                                                            <div>
                                                                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-900/60">
                                                                    Empresa / Instituição
                                                                </Label>
                                                                <p className="mt-2 text-sm font-bold text-slate-900">
                                                                    {diagnostic.company}
                                                                </p>
                                                            </div>
                                                        )}

                                                        <div className="grid gap-6 sm:grid-cols-2">
                                                            <div>
                                                                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-900/60">
                                                                    WhatsApp de Contato
                                                                </Label>
                                                                <a
                                                                    href={`https://wa.me/${diagnostic.phone.replace(/\D/g, "")}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="mt-3 flex items-center justify-between rounded-xl border border-emerald-900/10 bg-emerald-50/30 px-4 py-3 text-sm font-bold text-emerald-900 transition-colors hover:bg-emerald-50"
                                                                >
                                                                    {diagnostic.phone}
                                                                    <ArrowRight className="h-4 w-4" />
                                                                </a>
                                                            </div>
                                                            <div>
                                                                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-900/60">
                                                                    Estimativa (R$)
                                                                </Label>
                                                                <Input
                                                                    type="number"
                                                                    value={diagnostic.budget_estimate || ""}
                                                                    onChange={(e) => {
                                                                        const val = e.target.value
                                                                            ? parseFloat(e.target.value)
                                                                            : null;
                                                                        updateBudget(diagnostic.id, val as number);
                                                                    }}
                                                                    placeholder="0.00"
                                                                    className="mt-2 h-11 rounded-xl border-slate-200 bg-white text-sm font-bold focus-visible:ring-emerald-900"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-6">
                                                        <div>
                                                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-900/60">
                                                                Status da Jornada
                                                            </Label>
                                                            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                                                                {["new", "contacted", "quoted", "won", "lost"].map((status) => (
                                                                    <button
                                                                        key={status}
                                                                        onClick={() => updateStatus(diagnostic.id, status)}
                                                                        className={`rounded-xl border px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-all ${diagnostic.status === status
                                                                            ? "border-emerald-900 bg-emerald-900 text-white"
                                                                            : "border-slate-200 bg-white text-slate-400 hover:border-emerald-900/20 hover:text-emerald-900"
                                                                            }`}
                                                                    >
                                                                        {status === "new" ? "Novo" :
                                                                         status === "contacted" ? "Contatado" :
                                                                         status === "quoted" ? "Orçado" :
                                                                         status === "won" ? "Ganho" : "Perdido"}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-900/60">
                                                                Notas de Planejamento
                                                            </Label>
                                                            <textarea
                                                                value={diagnostic.notes || ""}
                                                                onChange={(e) =>
                                                                    updateNotes(diagnostic.id, e.target.value)
                                                                }
                                                                placeholder="Descreva os próximos passos estratégicos..."
                                                                className="mt-3 min-h-[120px] w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-600 outline-none transition-all focus:border-emerald-900/30 focus:ring-4 focus:ring-emerald-900/5 placeholder:text-slate-300"
                                                            />
                                                        </div>

                                                        <div className="flex justify-end pt-4">
                                                            <Button
                                                                variant="ghost"
                                                                onClick={() => deleteDiagnostic(diagnostic.id)}
                                                                className="h-10 rounded-xl text-xs font-bold text-red-400 hover:bg-red-50 hover:text-red-600"
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Remover Registro
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default DiagnosticsCRM;
