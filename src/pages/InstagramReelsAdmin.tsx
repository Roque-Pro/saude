import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Loader, Play, Copy, CheckCircle } from "lucide-react";

interface Reel {
  id: string;
  videoUrl: string;
  caption: string;
  hashtags: string[];
  duration: number;
  status: "processing" | "ready" | "error";
  downloadUrl?: string;
  timestamp?: string;
}

const InstagramReelsAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [reels, setReels] = useState<Reel[]>([]);
  const [processing, setProcessing] = useState(false);
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [customCaption, setCustomCaption] = useState("");
  const [customHashtags, setCustomHashtags] = useState("");

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const processVideoWithRunway = async (youtubeId: string) => {
    setProcessing(true);
    try {
      const youtubeDownloadUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
      
      // Chamar nossa Vercel Function (proxy para Runway ML)
      const runwayResponse = await fetch("/api/runway", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "create",
          youtubeUrl: youtubeDownloadUrl,
        }),
      });

      if (!runwayResponse.ok) {
        const errorData = await runwayResponse.json();
        throw new Error(errorData.error || "Erro ao processar vídeo com Runway ML");
      }

      const taskData = await runwayResponse.json();
      const taskId = taskData.id;

      // Aguardar processamento (pooling)
      let processedData = null;
      let attempts = 0;
      const maxAttempts = 60; // 5 minutos com 5s de intervalo

      while (attempts < maxAttempts) {
        const statusResponse = await fetch(
          `/api/runway`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "status",
              taskId: taskId,
            }),
          }
        );

        const statusData = await statusResponse.json();

        if (statusData.status === "completed") {
          processedData = statusData;
          break;
        } else if (statusData.status === "failed") {
          throw new Error("Processamento do vídeo falhou");
        }

        // Aguardar 5 segundos antes de verificar novamente
        await new Promise((resolve) => setTimeout(resolve, 5000));
        attempts++;
      }

      if (!processedData) {
        throw new Error("Tempo limite de processamento excedido");
      }

      // Extrair informações do vídeo processado
      const downloadUrl = processedData.output?.video_url;
      const duration = processedData.output?.duration || 30;
      const captions = processedData.output?.captions || [];

      // Gerar legenda e hashtags padrão
      const defaultCaption = `Confira este recorte imperdível! 🎬✨\n\nExcelência técnica e visão estratégica em ação.\n\n#DrSaulloGomes #GestãoDeElite #MedicinaModerna #AdvocaciaEstratégica #Performance`;
      
      const defaultHashtags = [
        "#DrSaulloGomes",
        "#GestãoDeElite",
        "#MedicinaModerna",
        "#AdvocaciaEstratégica",
        "#Performance",
        "#EstratégiaProfissional",
        "#ConsultoriaDeAltoNivel",
        "#ResultadosReais"
      ];

      const newReel: Reel = {
        id: `reel-${Date.now()}`,
        videoUrl: youtubeDownloadUrl,
        caption: defaultCaption,
        hashtags: defaultHashtags,
        duration,
        status: "ready",
        downloadUrl,
        timestamp: new Date().toLocaleString("pt-BR"),
      };

      setReels([newReel, ...reels]);
      setSelectedReel(newReel);
      setCustomCaption(defaultCaption);
      setCustomHashtags(defaultHashtags.join(" "));

      toast({
        title: "✅ Reel Gerado com Sucesso!",
        description: "Seu conteúdo estratégico está pronto para download.",
      });
    } catch (error: any) {
      console.error("Erro ao processar vídeo:", error);
      toast({
        title: "❌ Falha no Processamento",
        description: error.message || "Tente novamente em instantes.",
        variant: "destructive",
      });
      
      const errorReel: Reel = {
        id: `reel-${Date.now()}`,
        videoUrl: youtubeUrl,
        caption: "",
        hashtags: [],
        duration: 0,
        status: "error",
        timestamp: new Date().toLocaleString("pt-BR"),
      };
      setReels([errorReel, ...reels]);
    } finally {
      setProcessing(false);
    }
  };

  const handleProcessVideo = async () => {
    if (!youtubeUrl.trim()) {
      toast({
        title: "Link ausente",
        description: "Insira um link válido do YouTube",
        variant: "destructive",
      });
      return;
    }

    const youtubeId = extractYoutubeId(youtubeUrl);
    if (!youtubeId) {
      toast({
        title: "Link inválido",
        description: "Insira uma URL válida do YouTube",
        variant: "destructive",
      });
      return;
    }

    setYoutubeUrl("");
    await processVideoWithRunway(youtubeId);
  };

  const downloadReel = async (reel: Reel) => {
    if (!reel.downloadUrl) return;

    try {
      const link = document.createElement("a");
      link.href = reel.downloadUrl;
      link.download = `reel-${reel.id}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "✅ Download Iniciado",
      });
    } catch (error) {
      toast({
        title: "Erro ao baixar",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "✅ Copiado!",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Header Sóbrio */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 py-4 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/crm")}
              className="h-9 px-3 text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              CRM
            </Button>
            <div>
              <h1 className="font-serif text-lg font-bold tracking-tight text-emerald-950">
                Curadoria de Reels
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700/70">
                Extração de Insights em Vídeo
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Input YouTube Moderno */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 rounded-[40px] border border-slate-200 bg-white p-8 shadow-2xl shadow-emerald-900/5 sm:p-12"
        >
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <Play className="h-6 w-6 text-emerald-900" />
            Processar Nova Matéria
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">URL do YouTube</Label>
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="h-14 rounded-2xl border-slate-200 bg-white px-6 text-base focus-visible:ring-emerald-900"
                disabled={processing}
              />
            </div>

            <Button
              onClick={handleProcessVideo}
              disabled={processing || !youtubeUrl.trim()}
              className="h-14 w-full rounded-2xl bg-emerald-900 text-base font-bold text-white hover:bg-emerald-800 active:scale-95 transition-all shadow-xl shadow-emerald-900/10"
            >
              {processing ? (
                <>
                  <Loader className="mr-3 h-5 w-5 animate-spin" />
                  Sintetizando Reel... (aguarde)
                </>
              ) : (
                <>
                  <Play className="mr-3 h-5 w-5" />
                  Gerar Reel Estratégico com Runway ML
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Reel Selecionado Refinado */}
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 rounded-[40px] border border-emerald-900/20 bg-white p-8 shadow-2xl shadow-emerald-900/10 sm:p-12"
          >
            <div className="flex items-center gap-4 mb-8">
              {selectedReel.status === "ready" ? (
                <>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-slate-900">Reel Processado</h2>
                </>
              ) : (
                <h2 className="font-serif text-2xl font-bold text-red-600">Falha no Processamento</h2>
              )}
            </div>

            {selectedReel.status === "ready" && (
              <div className="space-y-8">
                {/* Preview Placeholder */}
                <div className="relative aspect-video w-full overflow-hidden rounded-[32px] bg-slate-900 shadow-2xl">
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-emerald-900/20 to-transparent">
                    <Play className="mb-4 h-16 w-16 text-emerald-500 opacity-50" />
                    <p className="text-sm font-bold uppercase tracking-widest text-white/50">Recorte Pronto ({selectedReel.duration}s)</p>
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-6">
                    <div>
                      <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Legenda Estratégica</Label>
                      <Textarea
                        value={customCaption}
                        onChange={(e) => setCustomCaption(e.target.value)}
                        className="mt-2 min-h-[150px] rounded-2xl border-slate-200 bg-white p-4 text-sm resize-none focus:border-emerald-900 transition-all outline-none"
                      />
                      <Button
                        onClick={() => copyToClipboard(customCaption)}
                        variant="ghost"
                        className="mt-2 h-9 text-xs font-bold text-emerald-900 hover:bg-emerald-50"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar Texto
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Hashtags Curadas</Label>
                      <Textarea
                        value={customHashtags}
                        onChange={(e) => setCustomHashtags(e.target.value)}
                        className="mt-2 min-h-[150px] rounded-2xl border-slate-200 bg-white p-4 text-sm resize-none focus:border-emerald-900 transition-all outline-none"
                      />
                      <Button
                        onClick={() => copyToClipboard(customHashtags)}
                        variant="ghost"
                        className="mt-2 h-9 text-xs font-bold text-emerald-900 hover:bg-emerald-50"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar Hashtags
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => downloadReel(selectedReel)}
                  className="h-14 w-full rounded-2xl bg-emerald-900 text-base font-bold text-white hover:bg-emerald-800 active:scale-95 transition-all shadow-xl shadow-emerald-900/20"
                >
                  <Download className="mr-3 h-5 w-5" />
                  Baixar Matéria em Vídeo (MP4)
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Histórico com Cards Refinados */}
        {reels.length > 0 && (
          <div className="space-y-8">
            <h3 className="font-serif text-3xl font-bold text-slate-900">Histórico de Produção</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reels.map((reel) => (
                <motion.div
                  key={reel.id}
                  layout
                  onClick={() => reel.status === "ready" && setSelectedReel(reel)}
                  className={`cursor-pointer rounded-[32px] border p-6 transition-all hover:shadow-xl ${
                    reel.status === "ready"
                      ? "border-emerald-100 bg-white hover:border-emerald-900/20"
                      : reel.status === "processing"
                      ? "border-blue-100 bg-blue-50/30 animate-pulse"
                      : "border-red-100 bg-red-50/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      reel.status === "ready" ? "text-emerald-600" : reel.status === "processing" ? "text-blue-600" : "text-red-600"
                    }`}>
                      {reel.status === "ready" ? "Pronto" : reel.status === "processing" ? "Em Fila" : "Erro"}
                    </span>
                    <span className="text-[10px] font-bold text-slate-300">{reel.timestamp?.split(",")[0]}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 truncate mb-4">{reel.videoUrl}</p>
                  {reel.status === "ready" && (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900/40">
                      <Play className="h-3 w-3" />
                      {reel.duration} Segundos
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InstagramReelsAdmin;
