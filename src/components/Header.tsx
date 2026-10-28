import React from 'react';
import { Terminal, Download, Copy, Check, BookOpen, PlayCircle, Eye, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCopyCode: () => void;
  copied: boolean;
  onDownloadPy: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onCopyCode,
  copied,
  onDownloadPy,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Terminal className="w-5 h-5" />
            </div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('code');
              }}
              className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors"
            >
              PyCalc <span className="text-slate-400 font-normal">· Guia do Iniciante</span>
            </a>
          </div>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <button
              onClick={() => setActiveTab('code')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 ${
                activeTab === 'code' ? 'text-emerald-400 border-emerald-500 font-semibold' : 'border-transparent'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Código Python
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 ${
                activeTab === 'terminal' ? 'text-emerald-400 border-emerald-500 font-semibold' : 'border-transparent'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              Terminal Interativo
            </button>
            <button
              onClick={() => setActiveTab('visualizer')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 ${
                activeTab === 'visualizer' ? 'text-emerald-400 border-emerald-500 font-semibold' : 'border-transparent'
              }`}
            >
              <Eye className="w-4 h-4" />
              Depurador Visual
            </button>
            <button
              onClick={() => setActiveTab('concepts')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 ${
                activeTab === 'concepts' ? 'text-emerald-400 border-emerald-500 font-semibold' : 'border-transparent'
              }`}
            >
              <Terminal className="w-4 h-4" />
              Conceitos Explicados
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 flex items-center gap-1.5 ${
                activeTab === 'quiz' ? 'text-emerald-400 border-emerald-500 font-semibold' : 'border-transparent'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Quiz & Prática
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onDownloadPy}
              title="Baixar arquivo calculadora.py"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar .py</span>
            </button>
            <button
              onClick={onCopyCode}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 px-2 py-2 text-xs font-medium bg-slate-950">
        <button
          onClick={() => setActiveTab('code')}
          className={`px-2 py-1 rounded ${activeTab === 'code' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          Código
        </button>
        <button
          onClick={() => setActiveTab('terminal')}
          className={`px-2 py-1 rounded ${activeTab === 'terminal' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          Terminal
        </button>
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`px-2 py-1 rounded ${activeTab === 'visualizer' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          Depurador
        </button>
        <button
          onClick={() => setActiveTab('concepts')}
          className={`px-2 py-1 rounded ${activeTab === 'concepts' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          Conceitos
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-2 py-1 rounded ${activeTab === 'quiz' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          Quiz
        </button>
      </div>
    </header>
  );
};
