import { Heart, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg text-white">40 Web Projects</span>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono border border-sky-500/20">
                Monorepo Edition
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              A curated progressive collection of 40 isolated modern web applications.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              React + Vite + Tailwind CSS
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              Built with care
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
