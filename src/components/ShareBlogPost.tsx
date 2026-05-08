import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Facebook, Linkedin, Share2 } from "lucide-react";

interface ShareBlogPostProps {
  title: string;
  slug: string;
  excerpt?: string;
}

export default function ShareBlogPost({
  title,
  slug,
  excerpt,
}: ShareBlogPostProps) {
  const [open, setOpen] = useState(false);

  const postUrl = `https://www.vocesaude.com.br/blog/${slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareOptions = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-50 hover:bg-blue-100 text-blue-700",
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}`,
          "_blank",
          "width=600,height=600"
        );
        setTimeout(() => setOpen(false), 300);
      },
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-50 hover:bg-blue-100 text-blue-600",
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
          "_blank",
          "width=600,height=600"
        );
        setTimeout(() => setOpen(false), 300);
      },
    },
  ];

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
      >
        <Share2 className="h-5 w-5" />
        Compartilhar
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-full z-50 mt-4 w-96 rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl"
            >
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-display font-bold text-gray-900">
                  Compartilhe este artigo
                </h3>
                <p className="line-clamp-2 text-sm font-medium text-gray-600">{title}</p>
                {excerpt && (
                  <p className="mt-2 line-clamp-2 text-xs text-gray-500">{excerpt}</p>
                )}
              </div>

              <div className="mb-6 h-px bg-gradient-to-r from-emerald-200 to-teal-200" />

              <div className="space-y-3">
                {shareOptions.map((option) => (
                  <motion.button
                    key={option.name}
                    onClick={option.action}
                    whileHover={{ x: 6 }}
                    className={`w-full rounded-xl border border-transparent px-5 py-4 font-semibold transition-all hover:border-gray-300 ${option.color} flex items-center gap-4`}
                  >
                    <option.icon className="h-6 w-6 flex-shrink-0" />
                    <span>{option.name}</span>
                    <span className="ml-auto text-xs opacity-60">↗</span>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-100 pt-6 text-center text-xs text-gray-500">
                Compartilhe para levar mais saúde, equilíbrio e bem-estar para a sua rede.
              </div>

              <div className="absolute -top-2 left-6 h-4 w-4 rotate-45 border-l border-t border-gray-200 bg-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40"
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
