import React from 'react';
import { Calculator } from './components/Calculator';
import { ArrowLeft, Sparkles, FolderGit2 } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 antialiased p-4 sm:p-6 lg:p-8 selection:bg-sky-500 selection:text-white">
      {/* Top Navigation Bar */}
      <nav className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6">
        <a
          href="http://localhost:3000"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-sky-400" />
          <span>40 Web Projects Gallery</span>
        </a>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">projects/01-calculator</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center my-auto py-4">
        <Calculator />
      </main>

      {/* Bottom Footer */}
      <footer className="max-w-4xl mx-auto w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-900">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Project 01 of 40 • Responsive Isolated App</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Keyboard enabled</span>
          <span>•</span>
          <span>Order of operations (PEMDAS)</span>
        </div>
      </footer>
    </div>
  );
};
