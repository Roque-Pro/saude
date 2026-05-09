import { ArrowLeft, Award, Briefcase, Code2, Zap, Shield, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import roqueImage from "@/img/roque-rafael-proenca-consultor.png";
import BlogNavbar from "@/components/BlogNavbar";
import Footer from "@/components/Footer";

const AboutMe = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-blue-50">
      <BlogNavbar />

      {/* Hero intro */}
      <section className="relative py-20 overflow-hidden" style={{ paddingTop: "6rem" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
        <div className="container relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 leading-tight text-gray-900">
            Transformando Ideias em{" "}
            <span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
              Soluções de IA
            </span>{" "}
            que Escalam
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Especialista em arquitetura de soluções empresariais, automação
            inteligente e transformação digital.
          </p>
        </div>
      </section>

      {/* Quem Sou Eu - Com Imagem */}
      <section className="py-16 border-t border-gray-200">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div className="max-w-none">
              <h3 className="text-3xl font-bold mb-6 text-gray-900">Quem Sou Eu</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Meu nome é <strong>Roque Rafael Proença</strong>, tenho <strong>41 anos</strong> e sou
                um profissional apaixonado por tecnologia baseado no <strong>Rio de Janeiro, RJ</strong>.
                Sou formado pela <strong>Universidade Estácio de Sá</strong> em
                <strong> Análise e Desenvolvimento de Sistemas (ADS)</strong>, com especialização em
                arquitetura de soluções empresariais. Minha trajetória é marcada pela busca constante
                de excelência técnica e pela capacidade de transformar desafios complexos em soluções
                elegantes e escaláveis.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Trabalho na interseção entre estratégia empresarial e inovação
                tecnológica, tendo desenvolvido expertise em design de sistemas de
                automação inteligentes que não apenas resolvem problemas
                imediatos, mas estabelecem bases sólidas para o crescimento
                futuro das organizações.
              </p>
            </div>

            {/* Imagem */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-xs sm:max-w-sm lg:max-w-full mx-auto lg:mx-0">
              <img
                src={roqueImage}
                alt="Roque Rafael Proença - Arquiteto de Soluções de IA"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-white/95 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 shadow-xl">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-purple-600 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    Roque Rafael Proença
                  </p>
                  <p className="text-xs text-gray-700">
                    Arquiteto de Soluções de IA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formação e Certificações */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-3xl">
          <h3 className="text-3xl font-bold mb-12 text-gray-900">Formação & Certificações</h3>

          <div className="space-y-8">
            {/* Educação principal */}
            <div className="border border-purple-200 rounded-xl p-6 bg-white hover:border-purple-400 transition-colors shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Award className="h-6 w-6 text-purple-600 mt-1" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-gray-900">
                    Análise e Desenvolvimento de Sistemas
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Formação acadêmica com foco em arquitetura de sistemas,
                    engenharia de software e metodologias ágeis.
                  </p>
                  <p className="text-sm text-purple-600 font-medium">
                    Fundação para carreira em soluções empresariais
                  </p>
                </div>
              </div>
            </div>

            {/* Cursos e especialização */}
            <div className="border border-purple-200 rounded-xl p-6 bg-white hover:border-purple-400 transition-colors shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Code2 className="h-6 w-6 text-purple-600 mt-1" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-4 text-gray-900">
                    Especialização Contínua
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>
                        <strong>Arquitetura de Sistemas Distribuídos</strong> —
                        Design de integrações orientadas a APIs
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>
                        <strong>Automação Empresarial</strong> — Fluxos de
                        trabalho avançados com RPA, Power Automate e Copilot
                        Studio
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>
                        <strong>IA e Machine Learning</strong> — Agentes de IA,
                        integração com plataformas Microsoft e Azure
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>
                        <strong>Plataformas de Dados Empresariais</strong> —
                        Databricks, integração de data lakes e pipelines
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>
                        <strong>Governança e Escalabilidade</strong> — Padrões
                        de arquitetura para produção, segurança e auditabilidade
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O Que Ofereço */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <h3 className="text-3xl font-bold mb-12 text-gray-900">O Que Posso Oferecer</h3>

          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              Para empresas que buscam transformação digital genuína, oferecço
              muito mais que implementação técnica. Trago visão estratégica,
              profundo conhecimento técnico e a capacidade de orientar equipes
              na jornada de automação e inteligência artificial.
            </p>
          </div>

          <div className="grid gap-6 mb-12">
            {/* Card 1 */}
            <div className="border border-purple-200 rounded-xl p-6 bg-white shadow-sm hover:border-purple-400 transition-colors">
              <div className="flex items-start gap-4">
                <Zap className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">
                    Arquitetura de Soluções Inteligentes
                  </h4>
                  <p className="text-gray-700">
                    Design completo de sistemas de automação e IA de nível
                    empresarial. Integração de agentes de IA, APIs e plataformas
                    como Microsoft Copilot, Power Platform e Azure para criar
                    soluções escaláveis e prontas para produção.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="border border-purple-200 rounded-xl p-6 bg-white shadow-sm hover:border-purple-400 transition-colors">
              <div className="flex items-start gap-4">
                <Briefcase className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">
                    Automação de Processos Empresariais
                  </h4>
                  <p className="text-gray-700">
                    Transformação de workflows manuais em fluxos inteligentes e
                    automatizados. Projetos com RPA, Power Automate, Copilot
                    Studio e orquestração multiagentes que reduzem custos
                    operacionais e aumentam produtividade.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="border border-purple-200 rounded-xl p-6 bg-white shadow-sm hover:border-purple-400 transition-colors">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">
                    Integração e Governança
                  </h4>
                  <p className="text-gray-700">
                    Arquitetura de integrações seguras entre agentes de IA,
                    plataformas de automação e sistemas empresariais,
                    particularmente Databricks. Estabeleço padrões de
                    governança, tratamento de exceções, aprovações e
                    auditabilidade para operações confiáveis.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="border border-purple-200 rounded-xl p-6 bg-white shadow-sm hover:border-purple-400 transition-colors">
              <div className="flex items-start gap-4">
                <Lightbulb className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">
                    Liderança Técnica & Orientação
                  </h4>
                  <p className="text-gray-700">
                    Desenvolvimento de padrões de arquitetura, modelos
                    reutilizáveis e frameworks de automação de IA. Orientação
                    estratégica e mentoring de equipes na implementação de
                    soluções inovadoras e avaliação de tecnologias emergentes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 border-t border-gray-200">
        <div className="container max-w-3xl">
          <h3 className="text-3xl font-bold mb-12 text-gray-900">Stack Tecnológico</h3>

          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              Trabalho com as tecnologias mais modernas e escaláveis do mercado,
              selecionadas especificamente para entregar soluções de alta
              performance, segurança e manutenibilidade.
            </p>
          </div>

          <div className="grid gap-6">
            {/* Frontend */}
            <div className="border border-purple-200 rounded-xl p-6 bg-white shadow-sm hover:border-purple-400 transition-colors">
              <h4 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-purple-600" />
                Frontend & UI
              </h4>
              <div className="flex flex-wrap gap-3">
                {["React", "TypeScript", "Tailwind CSS", "Vite"].map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-purple-50 border border-purple-300 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-700 mt-4">
                Desenvolvimento de interfaces reativas, responsivas e acessíveis
                com foco em UX/UI.
              </p>
            </div>

            {/* Backend */}
            <div className="border border-purple-200 rounded-xl p-6 bg-white shadow-sm hover:border-purple-400 transition-colors">
              <h4 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                Backend & API
              </h4>
              <div className="flex flex-wrap gap-3">
                {["Node.js", "TypeScript", "SQL", "REST APIs"].map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-purple-50 border border-purple-300 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-700 mt-4">
                Arquitetura de servidores robustos, APIs escaláveis e integração
                com plataformas empresariais.
              </p>
            </div>

            {/* Database & Infrastructure */}
            <div className="border border-purple-200 rounded-xl p-6 bg-white shadow-sm hover:border-purple-400 transition-colors">
              <h4 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Banco de Dados & Cloud
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "Supabase",
                  "PostgreSQL",
                  "Real-time Database",
                  "Cloud Storage",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-purple-50 border border-purple-300 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-700 mt-4">
                Banco de dados relacional com PostgreSQL via Supabase,
                integração real-time e armazenamento seguro em cloud.
              </p>
            </div>

            {/* AI & Automation */}
            <div className="border border-purple-200 rounded-xl p-6 bg-white shadow-sm hover:border-purple-400 transition-colors">
              <h4 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-purple-600" />
                IA & Automação
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "Microsoft Copilot",
                  "Power Automate",
                  "Agentes de IA",
                  "Azure AI",
                  "Databricks",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-purple-50 border border-purple-300 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-700 mt-4">
                Integração de agentes de IA, automação de processos empresariais
                e orquestração de workflows inteligentes.
              </p>
            </div>

            {/* Development Tools */}
            <div className="border border-purple-200 rounded-xl p-6 bg-white shadow-sm hover:border-purple-400 transition-colors">
              <h4 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-purple-600" />
                Ferramentas & Metodologia
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "Git/GitHub",
                  "Amp CLI",
                  "Docker",
                  "Testing",
                  "CI/CD",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 bg-purple-50 border border-purple-300 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors"
                  >
                    {tech}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-700 mt-4">
                Desenvolvimento ágil com controle de versão, testes automatizados
                e deployment contínuo.
              </p>
            </div>
          </div>

          {/* Proficiency Statement */}
          <div className="mt-12 p-6 border border-purple-300 rounded-xl bg-purple-50">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900">
                Expertise em Full Stack Development:
              </strong>{" "}
              Capacidade comprovada de projetar e implementar soluções completas
              do frontend até o backend, com foco em escalabilidade, segurança e
              performance. Domínio profundo em integração de plataformas, IA
              empresarial e automação de processos.
            </p>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-3xl">
          <h3 className="text-3xl font-bold mb-12 text-gray-900">Por Que Trabalhar Comigo</h3>

          <div className="grid gap-4 mb-12">
            <div className="flex gap-4 p-4 border border-purple-200 rounded-lg bg-white">
              <span className="text-2xl font-bold text-purple-600 min-w-fit">
                ✓
              </span>
              <div>
                <h4 className="font-semibold mb-1 text-gray-900">
                  Expertise Comprovada em Automação Empresarial
                </h4>
                <p className="text-gray-700 text-sm">
                  Experiência prática na implementação de soluções inteligentes
                  orientadas por IA em ambientes de produção.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-purple-200 rounded-lg bg-white">
              <span className="text-2xl font-bold text-purple-600 min-w-fit">
                 ✓
               </span>
               <div>
                 <h4 className="font-semibold mb-1 text-gray-900">
                   Domínio Técnico das Principais Plataformas
                 </h4>
                 <p className="text-gray-700 text-sm">
                  Microsoft Copilot, Power Platform, Copilot Studio, Power
                  Automate, Azure e Databricks — as tecnologias que empresas
                  modernas precisam.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-purple-200 rounded-lg bg-white">
              <span className="text-2xl font-bold text-purple-600 min-w-fit">
                 ✓
               </span>
               <div>
                 <h4 className="font-semibold mb-1 text-gray-900">
                   Visão Estratégica e Pensamento Arquitetural
                 </h4>
                 <p className="text-gray-700 text-sm">
                  Não apenas codificar — projetar soluções escaláveis, seguras e
                  prontas para o futuro.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-purple-200 rounded-lg bg-white">
              <span className="text-2xl font-bold text-purple-600 min-w-fit">
                 ✓
               </span>
               <div>
                 <h4 className="font-semibold mb-1 text-gray-900">
                   Orientação de Equipes e Centros de Excelência
                 </h4>
                 <p className="text-gray-700 text-sm">
                  Capacidade comprovada de mentorar equipes e estabelecer
                  frameworks de automação que geram valor contínuo.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-purple-200 rounded-lg bg-white">
              <span className="text-2xl font-bold text-purple-600 min-w-fit">
                 ✓
               </span>
               <div>
                 <h4 className="font-semibold mb-1 text-gray-900">
                   Foco em ROI e Negócio
                 </h4>
                 <p className="text-gray-700 text-sm">
                  Toda solução é pensada em termos de impacto empresarial —
                  redução de custos, aumento de produtividade e receita.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proposta de Valor */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="relative border border-purple-300 rounded-2xl p-8 bg-purple-50 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl -mr-20 -mt-20" />

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                Pronto para Transformar Sua Empresa?
              </h3>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Se sua organização busca um profissional que combine conhecimento
                técnico profundo, visão estratégica e a capacidade de orientar
                equipes na era da automação e IA, vamos conversar.
              </p>
              <Button size="lg" className="glow-md gap-2" asChild>
                <a href="https://wa.me/5532991075164" target="_blank" rel="noopener noreferrer">
                  Fale Comigo no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <section className="py-12" />
      <Footer />
    </div>
  );
};

export default AboutMe;
