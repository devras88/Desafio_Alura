import React, { useState } from 'react';
import { Header } from './components/Header';
import { CodeViewer } from './components/CodeViewer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { StepByStepVisualizer } from './components/StepByStepVisualizer';
import { ConceptsGuide } from './components/ConceptsGuide';
import { QuizAndChallenges } from './components/QuizAndChallenges';
import { CALCULATOR_VERSIONS } from './data/calculatorCode';
import { BookOpen, PlayCircle, Eye, HelpCircle, Terminal, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('code');
  const [copied, setCopied] = useState<boolean>(false);

  const fullPythonCode = CALCULATOR_VERSIONS.structured.fullCode;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(fullPythonCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const handleDownloadPy = () => {
    const element = document.createElement('a');
    const file = new Blob([fullPythonCode], { type: 'text/x-python;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'calculadora.py';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCopyCode={handleCopyCode}
        copied={copied}
        onDownloadPy={handleDownloadPy}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Editorial Subheader / Mode Bar */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Programação em Python</span>
              <span aria-hidden="true">·</span>
              <span>4 Operações Matemáticas Básicas</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">Guia Completo para Iniciantes</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
              Calculadora Simples em Python
            </h1>
          </div>

          {/* Quick tab switcher pill bar */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'code'
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Código</span>
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'terminal'
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Executar</span>
            </button>

            <button
              onClick={() => setActiveTab('visualizer')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'visualizer'
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Depurador</span>
            </button>

            <button
              onClick={() => setActiveTab('concepts')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'concepts'
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Conceitos</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Quiz</span>
            </button>
          </div>
        </section>

        {/* View Switcher */}
        {activeTab === 'code' && (
          <CodeViewer
            onRunInTerminal={() => setActiveTab('terminal')}
            onCopyCode={handleCopyCode}
            copied={copied}
            onDownloadPy={handleDownloadPy}
          />
        )}

        {activeTab === 'terminal' && <InteractiveTerminal />}

        {activeTab === 'visualizer' && <StepByStepVisualizer />}

        {activeTab === 'concepts' && <ConceptsGuide />}

        {activeTab === 'quiz' && <QuizAndChallenges />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Calculadora Python</span>
            <span aria-hidden="true">·</span>
            <span>Adição, Subtração, Multiplicação e Divisão</span>
            <span aria-hidden="true">·</span>
            <span>Código 100% comentado</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('code')}
              className="hover:text-emerald-400 transition-colors"
            >
              Ver Código
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className="hover:text-emerald-400 transition-colors"
            >
              Terminal
            </button>
            <button
              onClick={handleDownloadPy}
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              Baixar calculadora.py
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
