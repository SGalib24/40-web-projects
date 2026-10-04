import React from 'react';
import { Layers, Sparkles, FolderGit2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative pt-12 pb-8 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack & Frontend Showcase</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              40 Web <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400">Projects</span>
            </h1>
            
            <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              A progressive collection of 40 diverse web applications built in a unified monorepo. Explore foundational tools, interactive games, productivity apps, and full-stack clones.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-mono">
              <FolderGit2 className="w-4 h-4 text-sky-400" />
              <span>Monorepo Architecture</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-mono">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>React + Vite</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
