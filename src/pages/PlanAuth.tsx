import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Gift,
  Lock,
  MessageSquareMore,
  Rocket,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Workflow,
  Dna,
  Activity,
  Zap,
  Heart,
  Microscope,
  Waves
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import diagnosticoHeroMan from "@/img/diagnostico-hero-man.jpg";

const highlights = [
  {
    icon: Clock3,
    title: "Sintético",
    description: "Análise preliminar em 2 minutos",
  },
  {
    icon: ShieldCheck,
    title: "Sigilo Ético",
    description: "Proteção total de dados clínicos",
  },
  {
    icon: Target,
    title: "Precisão",
    description: "Baseado em evidências científicas",
  },
];

const diagnosisPoints = [
  {
    icon: Activity,
    title: "Eficiência Metabólica",
    description:
      "Avaliamos como seu corpo processa energia e o impacto da insulina na sua vitalidade diária.",
  },
  {
    icon: Zap,
    title: "Equilíbrio Hormonal",
    description:
      "Identificamos sinais de desequilíbrio em cortisol e tireoide que travam sua performance.",
  },
  {
    icon: Waves,
    title: "Carga Inflamatória",
    description:
      "Análise de marcadores que indicam estresse sistêmico e risco de exaustão precoce.",
  },
  {
    icon: Heart,
    title: "Saúde Cardiovascular",
    description:
      "Rastreamento de riscos silenciosos que podem comprometer sua longevidade ativa.",
  },
  {
    icon: Microscope,
    title: "Cognição & Energia",
    description:
      "Como sua fisiologia atual está influenciando seu foco mental e sua tomada de decisão.",
  },
];

const patientProfiles = [
  { value: "", label: "Selecione seu perfil profissional..." },
  { value: "medico", label: "Médico / Profissional de Saúde" },
  { value: "advogado", label: "Advogado / Profissional Jurídico" },
  { value: "executivo", label: "Executivo / C-Level" },
  { value: "empresario", label: "Empresário / Alta Gestão" },
  { value: "outro", label: "Outro perfil de alta performance" },
];

const PlanAuth = () => {
  const { loading } = useAuth();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  useSEO({
    title: "Mapeamento Metabólico | Dr Saullo Gomes - Endocrinologia de Alta Performance",
    description:
      "Em menos de 2 minutos, realize um pré-mapeamento da sua saúde hormonal e descubra como otimizar sua biologia para o sucesso profissional.",
    keywords: [
      "diagnóstico metabólico",
      "endocrinologia esportiva",
      "saúde para advogados",
      "performance médica",
      "dr saullo gomes",
      "check-up hormonal",
      "longevidade executiva",
    ],
    ogTitle: "Descubra o teto da sua performance biológica",
    ogDescription:
      "Receba um mapeamento estratégico da sua saúde e descubra o que está travando sua vitalidade.",
    ogUrl: "https://www.doutorsaullo.com.br/diagnostico-gratuito",
  });

  const [diagnosticData, setDiagnosticData] = useState({
    diagnosticName: "",
    diagnosticPhone: "",
    diagnosticCompany: "",
    diagnosticArea: "",
    diagnosticDescription: "",
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020808]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-900 border-t-transparent" />
      </div>
    );
  }

  const handleDiagnosticSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (
        !diagnosticData.diagnosticName ||
        !diagnosticData.diagnosticPhone ||
        !diagnosticData.diagnosticArea ||
        !diagnosticData.diagnosticDescription
      ) {
        throw new Error("Preencha todos os campos obrigatórios.");
      }

      const { error } = await supabase.from("diagnostics").insert({
        name: diagnosticData.diagnosticName,
        phone: diagnosticData.diagnosticPhone,
        company: diagnosticData.diagnosticCompany || null,
        area: diagnosticData.diagnosticArea,
        description: diagnosticData.diagnosticDescription,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Solicitação recebida!",
        description: "Dr. Saullo e sua equipe analisarão seu perfil em breve.",
      });

      setDiagnosticData({
        diagnosticName: "",
        diagnosticPhone: "",
        diagnosticCompany: "",
        diagnosticArea: "",
        diagnosticDescription: "",
      });
    } catch (error: any) {
      toast({
        title: "Erro no envio",
        description: error.message || "Tente novamente em instantes.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("diagnostic-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Visual Identity Section */}
      <section className="relative overflow-hidden bg-[#020808] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.1),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.02),_transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-10 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-20 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="mb-16">
                <div className="flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 shadow-xl shadow-emerald-500/10">
                    <Dna className="h-7 w-7 text-[#020808]" />
                  </div>
                  <div>
                    <span className="block text-2xl font-bold tracking-[0.2em] text-white">
                      DR SAULLO GOMES
                    </span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.5em] text-emerald-400/80">
                      Endocrinologia de Elite
                    </span>
                  </div>
                </div>
              </div>

              <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
                Sua biologia é o seu <br />
                <span className="text-emerald-500 italic font-medium">limite de escala.</span>
              </h1>

              <div className="my-12 h-[1px] w-32 bg-emerald-500/20" />

              <p className="max-w-2xl text-xl leading-relaxed text-slate-400 sm:text-2xl">
                Em menos de 2 minutos, inicie o <span className="text-white font-bold underline decoration-emerald-500/30 underline-offset-8">Mapeamento Metabólico Estratégico</span> e descubra o que está impedindo sua performance máxima.
              </p>
            </div>

            <div className="mt-16 rounded-[40px] border border-white/5 bg-white/5 p-10 backdrop-blur-3xl">
              <div className="grid gap-8 sm:grid-cols-3">
                {highlights.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="flex flex-col items-start gap-5"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-400">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white tracking-wide">{title}</p>
                      <p className="mt-2 text-xs leading-relaxed text-slate-500 font-medium">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={scrollToForm}
              className="mt-12 h-20 w-full max-w-md rounded-3xl bg-emerald-500 text-lg font-bold text-[#020808] hover:bg-emerald-400 active:scale-95 transition-all lg:hidden shadow-2xl shadow-emerald-500/20"
            >
              Iniciar Scan Clínico
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative hidden items-end justify-center lg:flex"
          >
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#020808] to-transparent z-20" />
            <div className="relative z-10 w-full overflow-hidden rounded-[80px] border border-white/5 shadow-2xl grayscale opacity-50 mix-blend-screen transition-all duration-1000 hover:grayscale-0 hover:opacity-100">
                <img
                src={drSaulloImage}
                alt="Dr Saullo Gomes"
                className="w-full aspect-[4/6] object-cover object-top"
                />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Diagnosis Points Section */}
      <section className="bg-white px-10 py-32 lg:px-24 lg:py-48">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-5xl text-center"
          >
            <h2 className="text-5xl font-bold tracking-tighter text-slate-950 sm:text-7xl lg:text-[80px]">
                O Mapeamento analisa <br />
                <span className="text-emerald-800 italic">5 vetores de vitalidade</span>
            </h2>
            <p className="mt-10 text-2xl text-slate-500 font-medium">
              essenciais para o ritmo de médicos e advogados de elite:
            </p>
          </motion.div>

          <div className="mt-32 grid gap-10 md:grid-cols-2 xl:grid-cols-5">
            {diagnosisPoints.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-[56px] border border-slate-100 bg-slate-50/30 p-12 text-center transition-all hover:bg-white hover:shadow-[0_40px_80px_rgba(6,78,59,0.08)] hover:-translate-y-3"
              >
                <div className="mx-auto mb-10 flex h-20 w-20 items-center justify-center rounded-[32px] bg-white text-emerald-800 shadow-xl transition-all group-hover:bg-emerald-950 group-hover:text-white">
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold leading-tight text-slate-900 tracking-tight">{title}</h3>
                <p className="mt-6 text-sm leading-relaxed text-slate-500 font-medium">{description}</p>
                <div className="absolute left-1/2 top-8 -translate-x-1/2 text-[9px] font-bold uppercase tracking-[0.3em] text-emerald-900/20">
                  Fator {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="diagnostic-form" className="bg-[#f8fafc] px-10 py-32 lg:px-24 lg:py-48">
        <div className="mx-auto grid max-w-[1400px] gap-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="max-w-2xl border-l-2 border-emerald-500 pl-12">
              <h2 className="text-6xl font-bold leading-none tracking-tighter text-slate-950 lg:text-8xl">
                Pronto para o <br /> diagnóstico?
              </h2>
              <p className="mt-12 text-2xl leading-relaxed text-slate-600 font-medium">
                Sua performance merece a exatidão da ciência. Preencha seus dados para receber uma análise preliminar personalizada. <br />
                <span className="mt-8 block text-slate-950 font-bold italic text-3xl tracking-tight">
                  "Seu corpo é o suporte físico da sua autoridade."
                </span>
              </p>
            </div>

            <div className="mt-16 rounded-[48px] bg-white p-12 shadow-sm border border-slate-100">
              <div className="flex items-center gap-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[32px] bg-emerald-50 text-emerald-700">
                  <Microscope className="h-10 w-10" />
                </div>
                <p className="text-xl leading-relaxed text-slate-600 font-medium">
                  Este mapeamento é um serviço exclusivo para profissionais que buscam o próximo nível de sua biologia.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[64px] bg-white p-10 shadow-2xl shadow-emerald-900/5 sm:p-20 border border-slate-100"
          >
            <h3 className="text-center text-4xl font-bold text-slate-950 tracking-tight">
              Solicitar Mapeamento
            </h3>

            <form onSubmit={handleDiagnosticSubmit} className="mt-16 space-y-8">
              <div className="space-y-3">
                <Label htmlFor="diagnosticName" className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                  Nome Completo
                </Label>
                <Input
                  id="diagnosticName"
                  value={diagnosticData.diagnosticName}
                  onChange={(e) =>
                    setDiagnosticData({ ...diagnosticData, diagnosticName: e.target.value })
                  }
                  placeholder="Seu nome"
                  required
                  className="h-16 rounded-3xl border-slate-100 bg-[#f8fafc] px-8 text-lg focus-visible:ring-emerald-900"
                />
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-3">
                  <Label htmlFor="diagnosticPhone" className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                    WhatsApp Profissional
                  </Label>
                  <Input
                    id="diagnosticPhone"
                    value={diagnosticData.diagnosticPhone}
                    onChange={(e) =>
                      setDiagnosticData({ ...diagnosticData, diagnosticPhone: e.target.value })
                    }
                    placeholder="(00) 00000-0000"
                    required
                    className="h-16 rounded-3xl border-slate-100 bg-[#f8fafc] px-8 text-lg focus-visible:ring-emerald-900"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="diagnosticCompany"
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400"
                  >
                    Cidade / Atuação
                  </Label>
                  <Input
                    id="diagnosticCompany"
                    value={diagnosticData.diagnosticCompany}
                    onChange={(e) =>
                      setDiagnosticData({
                        ...diagnosticData,
                        diagnosticCompany: e.target.value,
                      })
                    }
                    placeholder="Sua localização"
                    className="h-16 rounded-3xl border-slate-100 bg-[#f8fafc] px-8 text-lg focus-visible:ring-emerald-900"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="diagnosticArea" className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                  Perfil de Alta Performance
                </Label>
                <select
                  id="diagnosticArea"
                  value={diagnosticData.diagnosticArea}
                  onChange={(e) =>
                    setDiagnosticData({ ...diagnosticData, diagnosticArea: e.target.value })
                  }
                  required
                  className="flex h-16 w-full rounded-3xl border border-slate-100 bg-[#f8fafc] px-8 text-lg outline-none transition focus:border-emerald-900"
                >
                  {patientProfiles.map((option) => (
                    <option key={option.value || "placeholder"} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="diagnosticDescription"
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400"
                >
                  Qual seu principal objetivo de performance?
                </Label>
                <textarea
                  id="diagnosticDescription"
                  value={diagnosticData.diagnosticDescription}
                  onChange={(e) =>
                    setDiagnosticData({
                      ...diagnosticData,
                      diagnosticDescription: e.target.value,
                    })
                  }
                  placeholder="Ex.: Controle de estresse, energia cerebral, longevidade, emagrecimento estratégico..."
                  required
                  className="min-h-40 w-full rounded-[40px] border border-slate-100 bg-[#f8fafc] px-8 py-6 text-lg outline-none transition focus:border-emerald-900 placeholder:text-slate-300"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="mt-8 flex h-20 w-full items-center justify-center gap-4 rounded-[32px] bg-emerald-950 text-xl font-bold text-white hover:bg-emerald-900 active:scale-95 transition-all shadow-2xl shadow-emerald-950/20"
              >
                <Lock className="h-6 w-6 text-emerald-400" />
                {submitting
                  ? "Sincronizando Dados..."
                  : "INITIALIZE BIO-SCAN"}
              </Button>

              <div className="flex items-center justify-center gap-3 pt-4 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-300">
                <ShieldCheck className="h-5 w-5" />
                <span>Dados sob sigilo ético médico</span>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Final Signature */}
      <section className="bg-slate-950 px-10 py-20 text-white lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="flex items-center gap-10 text-center lg:text-left">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[32px] bg-emerald-500/10 text-emerald-500">
              <Zap className="h-10 w-10" />
            </div>
            <p className="max-w-2xl text-3xl font-bold tracking-tight">
              A engenharia do seu <span className="text-emerald-400 italic">potencial humano</span> começa aqui.
            </p>
          </div>

          <p className="max-w-sm text-center text-[10px] font-bold uppercase tracking-[0.4em] text-slate-600 lg:text-right leading-relaxed">
            Dr Saullo Gomes | CRM/ES 435671 <br /> Especialista em Alta Performance e Longevidade.
          </p>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .tracking-tighter { letter-spacing: -0.06em; }
        .tracking-tight { letter-spacing: -0.04em; }
      `}} />
    </div>
  );
};

export default PlanAuth;
