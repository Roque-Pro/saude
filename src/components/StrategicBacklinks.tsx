import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const references = [
  {
    text: "Organização Mundial da Saúde: bem-estar e saúde",
    url: "https://www.who.int/health-topics",
    domain: "WHO",
    category: "Saúde",
  },
  {
    text: "Ministério da Saúde: cuidados e prevenção",
    url: "https://www.gov.br/saude/pt-br",
    domain: "Gov.br",
    category: "Prevenção",
  },
  {
    text: "OPAS Brasil: qualidade de vida e saúde pública",
    url: "https://www.paho.org/pt/brasil",
    domain: "OPAS",
    category: "Bem-estar",
  },
  {
    text: "Biblioteca Virtual em Saúde",
    url: "https://bvsalud.org/",
    domain: "BVS",
    category: "Leitura",
  },
  {
    text: "Fiocruz: conteúdos e educação em saúde",
    url: "https://portal.fiocruz.br/",
    domain: "Fiocruz",
    category: "Pesquisa",
  },
  {
    text: "Hospital Albert Einstein: saúde e hábitos",
    url: "https://www.einstein.br/blog",
    domain: "Einstein",
    category: "Hábitos",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

const StrategicBacklinks = () => {
  return (
    <section className="my-16 rounded-2xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-teal-50 py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-8">
          <h3 className="mb-3 text-2xl font-display font-bold text-gray-900">
            Leituras e referências relacionadas
          </h3>
          <p className="text-sm text-gray-600">
            Fontes confiáveis para aprofundar a leitura sobre saúde, prevenção e bem-estar.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid gap-3 md:grid-cols-2"
        >
          {references.map((link) => (
            <motion.a
              key={link.url}
              variants={itemVariants}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-4 transition-all duration-300 hover:border-emerald-400 hover:shadow-md"
            >
              <div className="flex-1">
                <div className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-emerald-700">
                  {link.text}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                    {link.category}
                  </span>
                  <span className="text-xs text-gray-500">{link.domain}</span>
                </div>
              </div>
              <ExternalLink className="ml-3 h-4 w-4 flex-shrink-0 text-gray-400 transition-colors group-hover:text-emerald-700" />
            </motion.a>
          ))}
        </motion.div>

        <div className="mt-8 rounded-lg border border-emerald-300 bg-emerald-100 p-4">
          <p className="text-sm text-emerald-900">
            <span className="font-semibold">Dica editorial:</span> apoiar seus artigos com
            referências confiáveis reforça a qualidade da leitura e a confiança no conteúdo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StrategicBacklinks;
