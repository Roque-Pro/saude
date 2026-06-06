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
    title: "Eficiente",
    description: "Análise técnica em menos de 2 minutos",
  },
  {
    icon: ShieldCheck,
    title: "Confidencial",
    description: "Sigilo absoluto sob ética profissional",
  },
  {
    icon: Target,
    title: "Direto",
    description: "Sem rodeios, foco em resultados reais",
  },
];

const diagnosisPoints = [
  {
    icon: Target,
    title: "Performance de Atendimento",
    description:
      "Analisamos como sua estrutura atual impacta na conversão e retenção de pacientes/clientes.",
  },
  {
    icon: MessageSquareMore,
    title: "Gargalos de Comunicação",
    description:
      "Descubra onde sua equipe ou sistema falha no primeiro contato e no pós-atendimento.",
  },
  {
    icon: Workflow,
    title: "Potencial de Automação",
    description:
      "Identificamos processos repetitivos que podem ser automatizados para liberar seu tempo.",
  },
  {
    icon: TrendingUp,
    title: "Análise de Faturamento",
    description:
      "Encontramos vazamentos financeiros e oportunidades de aumento de margem em cada serviço.",
  },
  {
    icon: Rocket,
    title: "Escala com Sobriedade",
    description:
      "Avaliamos seu posicionamento no mercado e como crescer sem perder a qualidade técnica.",
  },
];

const businessTypes = [
  { value: "", label: "Selecione sua área de atuação..." },
  { value: "medicina", label: "Clínica Médica / Especialidade" },
  { value: "advocacia", label: "Escritório de Advocacia" },
  { value: "saude", label: "Serviços de Saúde / Bem-estar" },
  { value: "consultoria", label: "Consultoria / Serviços Profissionais" },
  { value: "outro", label: "Outro tipo de negócio de elite" },
];

const PlanAuth = () => {
  const { loading } = useAuth();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  useSEO({
    title: "Diagnóstico Estratégico | Dr Saullo Gomes - Gestão para Médicos e Advogados",
    description:
      "Em menos de 2 minutos, receba uma análise estratégica da sua operação e descubra como otimizar seu faturamento e sua autoridade.",
    keywords: [
      "diagnóstico médico",
      "gestão clínica",
      "estratégia para advogados",
      "alta performance profissional",
      "dr saullo gomes",
      "automação para médicos",
      "consultoria de gestão de elite",
    ],
    ogTitle: "Descubra o potencial oculto da sua prática profissional",
    ogDescription:
      "Receba um diagnóstico estratégico gratuito e descubra os gargalos que travam o seu crescimento.",
    ogUrl: "https://www.doutorsaullo.com.br/diagnostico-gratuito",
    twitterTitle: "Diagnóstico Estratégico para Médicos e Advogados",
    twitterDescription:
      "Descubra oportunidades reais para escalar sua carreira com sobriedade.",
    canonicalUrl: "https://www.doutorsaullo.com.br/diagnostico-gratuito",
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
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
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
        title: "Dados recebidos com sucesso!",
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
      <section className="relative overflow-hidden bg-[#0c2e27] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.15),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.05),_transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="mb-12">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
                    <Search className="h-6 w-6 text-emerald-950" />
                  </div>
                  <div>
                    <span className="block font-serif text-2xl font-bold tracking-tight text-white">
                      Dr Saullo Gomes
                    </span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/80">
                      Gestão & Estratégia
                    </span>
                  </div>
                </div>
              </div>

              <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[1.1] sm:text-6xl lg:text-7xl">
                Descubra onde sua prática está <br />
                <span className="italic text-emerald-400">perdendo performance</span> <br />
                e autoridade.
              </h1>

              <div className="my-10 h-1 w-20 rounded-full bg-emerald-500/30" />

              <p className="max-w-2xl text-lg leading-relaxed text-emerald-50/70 sm:text-xl">
                Em menos de 2 minutos, você recebe um <br className="hidden sm:block" />
                <span className="font-bold text-white underline decoration-emerald-500/50 underline-offset-8">diagnóstico estratégico exclusivo</span> com insights para médicos e advogados de elite.
              </p>
            </div>

            <div className="mt-12 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="grid gap-6 sm:grid-cols-3">
                {highlights.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="flex flex-col items-start gap-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-emerald-50/50">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={scrollToForm}
              className="mt-10 h-16 w-full max-w-md rounded-2xl bg-emerald-500 text-base font-bold text-emerald-950 hover:bg-emerald-400 active:scale-95 transition-all lg:hidden"
            >
              Iniciar Análise Gratuita
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative hidden items-end justify-center lg:flex"
          >
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0c2e27] to-transparent z-20" />
            <img
              src={diagnosticoHeroMan}
              alt="Análise de Performance Profissional"
              className="relative z-10 max-h-[750px] w-full rounded-[48px] object-cover shadow-2xl transition-transform duration-700 hover:scale-105"
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <h2 className="font-serif text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Seu diagnóstico analisa <br />
              <span className="text-emerald-800 italic">5 pilares fundamentais</span>
            </h2>
            <p className="mt-6 text-xl text-slate-500 font-medium">
              que definem o sucesso e a escala da sua carreira:
            </p>
          </motion.div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-5">
            {diagnosisPoints.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group relative rounded-[40px] border border-slate-100 bg-white px-8 pb-10 pt-12 text-center shadow-sm transition-all hover:shadow-2xl hover:shadow-emerald-900/5 hover:-translate-y-2"
              >
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 text-emerald-800 transition-colors group-hover:bg-emerald-900 group-hover:text-emerald-50">
                  <Icon className="h-10 w-10" />
                </div>
                <h3 className="font-serif text-xl font-bold leading-tight text-slate-900">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">{description}</p>
                <div className="absolute left-1/2 top-6 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-emerald-900/20">
                  Pilar {(index + 1).toString().padStart(2, "0")}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="diagnostic-form" className="bg-[#f8fafc] px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="max-w-xl border-l-4 border-emerald-500 pl-8">
              <h2 className="font-serif text-5xl font-bold leading-tight text-slate-950">
                Pronto para a <br /> transformação?
              </h2>
              <p className="mt-8 text-xl leading-relaxed text-slate-600 font-medium">
                Preencha os dados e receba uma análise personalizada que respeita sua inteligência e seu tempo. <br />
                <span className="text-slate-950 font-bold italic">
                  "Se você não sabe quanto está perdendo por mês... esse já é o problema."
                </span>
              </p>
            </div>

            <div className="mt-12 rounded-[40px] bg-white p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700">
                  <Gift className="h-8 w-8" />
                </div>
                <p className="text-lg leading-relaxed text-slate-600">
                  Este diagnóstico é gratuito e exclusivo para profissionais que buscam o próximo nível de sua prática clínica ou jurídica.
                </p>
              </div>
            </div>

            <p
              className="mt-12 text-center text-4xl text-emerald-900/30"
              style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic' }}
            >
              Exatidão técnica. Visão estratégica.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="rounded-[48px] bg-white p-8 shadow-2xl shadow-emerald-900/5 sm:p-12 border border-slate-100"
          >
            <h3 className="text-center font-serif text-3xl font-bold text-slate-950">
              Receber Diagnóstico
            </h3>

            <form onSubmit={handleDiagnosticSubmit} className="mt-10 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="diagnosticName" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Nome Completo
                </Label>
                <Input
                  id="diagnosticName"
                  value={diagnosticData.diagnosticName}
                  onChange={(e) =>
                    setDiagnosticData({ ...diagnosticData, diagnosticName: e.target.value })
                  }
                  placeholder="Seu nome aqui"
                  required
                  className="h-14 rounded-2xl border-slate-200 bg-white px-6 text-base focus-visible:ring-emerald-900"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="diagnosticPhone" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
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
                    className="h-14 rounded-2xl border-slate-200 bg-white px-6 text-base focus-visible:ring-emerald-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="diagnosticCompany"
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                  >
                    Nome da Clínica/Escritório
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
                    placeholder="Nome da sua instituição"
                    className="h-14 rounded-2xl border-slate-200 bg-white px-6 text-base focus-visible:ring-emerald-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnosticArea" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Área de Atuação
                </Label>
                <select
                  id="diagnosticArea"
                  value={diagnosticData.diagnosticArea}
                  onChange={(e) =>
                    setDiagnosticData({ ...diagnosticData, diagnosticArea: e.target.value })
                  }
                  required
                  className="flex h-14 w-full rounded-2xl border border-slate-200 bg-white px-6 text-base outline-none transition focus:border-emerald-900"
                >
                  {businessTypes.map((option) => (
                    <option key={option.value || "placeholder"} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="diagnosticDescription"
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  Principal desafio estratégico hoje?
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
                  placeholder="Ex.: Baixa retenção, dificuldade com faturamento, falta de tempo..."
                  required
                  className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base outline-none transition focus:border-emerald-900 placeholder:text-slate-300"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="mt-4 flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-emerald-900 text-lg font-bold text-white hover:bg-emerald-800 active:scale-95 transition-all shadow-xl shadow-emerald-900/20"
              >
                <Lock className="h-5 w-5" />
                {submitting
                  ? "Processando dados..."
                  : "RECEBER DIAGNÓSTICO ESTRATÉGICO"}
              </Button>

              <div className="flex items-center justify-center gap-2 pt-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                <ShieldCheck className="h-4 w-4" />
                <span>Dados protegidos por ética profissional</span>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-12 text-white lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="flex items-center gap-6 text-center lg:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-500">
              <Rocket className="h-8 w-8" />
            </div>
            <p className="max-w-xl font-serif text-2xl leading-snug">
              Sua excelência técnica merece uma <span className="text-emerald-400 italic">gestão de elite.</span>
            </p>
          </div>

          <ArrowRight className="hidden h-10 w-10 text-emerald-500/20 lg:block" />

          <p className="max-w-md text-center text-sm font-medium text-slate-400 lg:text-right leading-relaxed">
            Descubra agora os gargalos que estão impedindo o crescimento sustentável da sua carreira.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PlanAuth;
