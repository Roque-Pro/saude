import { Linkedin, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Resultados", href: "#resultados" },
  { label: "Projetos", href: "#projetos" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-bold">TechNexos<span className="text-primary">Digital</span></p>
            <p className="mt-1 text-xs text-muted-foreground">Roque Rafael Proença — Consultoria & Soluções Digitais sob Medida</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-xs text-muted-foreground hover:text-primary transition-colors">{l.label}</a>
            ))}
          </div>

          <div className="flex gap-3">
            {[Linkedin, Instagram, Github].map((Icon, i) => (
              <a key={i} href="#" className="rounded-lg border border-border/50 p-2 text-muted-foreground transition-colors hover:text-primary hover:border-primary/30">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} TechNexos Digital — Roque Rafael Proença. Todos os direitos reservados.
          <br />
          <span className="font-semibold">CRM/ES 435671</span>
          <br />
          <Link to="/autoclub-pro" className="text-xs text-muted-foreground hover:text-primary transition-colors mt-2 inline-block">
            AutoClub Pro
          </Link>
        </p>
      </div>
    </footer>
  );
}
