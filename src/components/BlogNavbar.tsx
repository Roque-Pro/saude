import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type BlogNavbarProps = {
  hideAboutLink?: boolean;
  hideDiagnosticButton?: boolean;
};

export default function BlogNavbar({
  hideAboutLink = false,
  hideDiagnosticButton = false,
}: BlogNavbarProps) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-emerald-200/30 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 sm:gap-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex flex-shrink-0 items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/50 sm:h-10 sm:w-10"
          >
            <HeartPulse className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </motion.div>
          <div className="hidden sm:block">
            <p className="text-lg font-display font-bold text-gray-900 sm:text-xl">
              Dr Saullo Gomes
            </p>
          </div>
          <div className="sm:hidden">
            <p className="text-sm font-display font-bold text-gray-900">
              Dr Saullo Gomes
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-1 md:hidden">
          {!hideDiagnosticButton && (
            <Button
              onClick={() => navigate("/diagnostico-gratuito")}
              size="sm"
              className="bg-emerald-600 px-2 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
            >
              <span>Diagnóstico</span>
            </Button>
          )}
          <Button
            onClick={() => navigate("/auth")}
            size="sm"
            className="rounded border-2 border-emerald-600 bg-white px-2 py-1.5 text-xs font-bold text-emerald-600 transition-all hover:bg-emerald-50"
          >
            <span>Login</span>
          </Button>
        </div>

        <div className="relative ml-auto flex items-center gap-1 sm:gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-sm text-gray-700 hover:text-emerald-600 md:inline-flex"
          >
            <Link to="/">Home</Link>
          </Button>

          {!hideAboutLink && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden text-sm text-gray-700 hover:text-emerald-600 md:inline-flex"
            >
              <Link to="/about-me">Sobre Nós</Link>
            </Button>
          )}

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-sm text-gray-700 hover:text-emerald-600 md:inline-flex"
          >
            <Link to="/blog">Blog</Link>
          </Button>

          <Button
            onClick={() => window.open("https://wa.me/5532991075164", "_blank")}
            variant="ghost"
            size="sm"
            className="hidden text-sm text-gray-700 hover:text-emerald-600 sm:inline-flex"
          >
            Contato
          </Button>

          {!hideDiagnosticButton && (
            <Button
              asChild
              size="sm"
              className="hidden bg-emerald-600 px-2 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 sm:px-3 sm:py-2 sm:text-sm md:inline-flex"
            >
              <Link to="/diagnostico-gratuito">Diagnóstico</Link>
            </Button>
          )}

          <Button
            onClick={() => navigate("/auth")}
            size="sm"
            className="hidden rounded border-2 border-emerald-600 bg-white px-3 py-1.5 text-xs font-bold text-emerald-600 transition-all hover:bg-emerald-50 sm:px-4 sm:py-2 sm:text-sm md:inline-flex"
          >
            <span>Acesso</span>
          </Button>

          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            variant="ghost"
            size="sm"
            className="text-gray-700 hover:text-emerald-600 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute left-0 right-0 top-full border-t border-emerald-200/30 bg-white shadow-lg md:hidden">
            <div className="flex flex-col gap-2 p-4">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="justify-start text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
              >
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
              </Button>
              {!hideAboutLink && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="justify-start text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  <Link to="/about-me" onClick={() => setMobileMenuOpen(false)}>
                    Sobre Nós
                  </Link>
                </Button>
              )}
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="justify-start text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
              >
                <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>
                  Blog
                </Link>
              </Button>
              <Button
                onClick={() => {
                  window.open("https://wa.me/5532991075164", "_blank");
                  setMobileMenuOpen(false);
                }}
                variant="ghost"
                size="sm"
                className="justify-start text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
              >
                Contato
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
