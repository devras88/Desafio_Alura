import React, { useState } from 'react';
import { CONCEPTS, ConceptItem } from '../data/calculatorCode';
import { CheckCircle2, AlertTriangle, Code2, ArrowRight } from 'lucide-react';

export const ConceptsGuide: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<string>('functions');

  const current: ConceptItem =
    CONCEPTS.find((c) => c.id === selectedConcept) || CONCEPTS[0];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
          <span>Manual Didático</span>
          <span aria-hidden="true">·</span>
          <span>Fundamentos da Programação</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400 font-medium">Lógica Essencial</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Anatomia e Componentes da Calculadora
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Entenda a fundo cada componente utilizado para construir a calculadora, os motivos por trás de cada linha e as armadilhas mais comuns de quem está começando.
        </p>
      </div>

      {/* Concept Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {CONCEPTS.map((concept) => {
          const isSelected = concept.id === selectedConcept;
          return (
            <button
              key={concept.id}
              onClick={() => setSelectedConcept(concept.id)}
              className={`p-3 text-left rounded-xl border transition-all ${
                isSelected
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="text-[11px] font-mono text-slate-500 mb-1">
                {concept.title.split('.')[0]}
              </div>
              <div className="text-xs font-semibold truncate text-white">
                {concept.title.split('.')[1] || concept.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Feature Concept Deep-Dive */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
        {/* Title & Summary */}
        <div className="border-b border-slate-800/80 pb-4">
          <div className="text-xs font-mono text-emerald-400 mb-1">Conceito em Foco</div>
          <h3 className="text-xl font-bold text-white mb-2">{current.title}</h3>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {current.summary}
          </p>
        </div>

        {/* 2-Column Explanation: Why it matters vs Common Trap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Why it matters */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Por que usamos isso na calculadora?</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {current.whyItMatters}
            </p>
          </div>

          {/* Beginner trap */}
          <div className="p-4 bg-rose-950/20 border border-rose-500/20 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Armadilha comum de quem está aprendendo:</span>
            </div>
            <p className="text-xs text-rose-200 leading-relaxed">
              {current.beginnerTrap}
            </p>
          </div>
        </div>

        {/* Code Example & Syntax Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-sky-400" />
              Exemplo Prático em Python
            </span>
            <span className="text-xs font-mono text-slate-500">Sintaxe Padrão</span>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto leading-relaxed shadow-inner">
            <pre className="whitespace-pre">{current.exampleCode}</pre>
          </div>
        </div>
      </div>

      {/* Expansion Ideas Section */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
          <span>Como Expandir a Calculadora Depois?</span>
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Quando se sentir confortável com as 4 operações básicas, experimente adicionar estas novas operações ao seu código Python:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 mb-1">
              <span>Potenciação (Expoente)</span>
              <code className="text-[11px] font-mono">**</code>
            </div>
            <p className="text-xs text-slate-400">
              Em Python, use dois asteriscos. Exemplo: <code className="text-slate-300">2 ** 3</code> calcula 2 elevado ao cubo = 8.
            </p>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="flex items-center justify-between text-xs font-semibold text-sky-400 mb-1">
              <span>Resto da Divisão (Módulo)</span>
              <code className="text-[11px] font-mono">%</code>
            </div>
            <p className="text-xs text-slate-400">
              O operador porcentagem devolve a sobra de uma divisão. Exemplo: <code className="text-slate-300">10 % 3</code> resulta em 1.
            </p>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
            <div className="flex items-center justify-between text-xs font-semibold text-amber-400 mb-1">
              <span>Raiz Quadrada</span>
              <code className="text-[11px] font-mono">** 0.5</code>
            </div>
            <p className="text-xs text-slate-400">
              Elevar à potência 0.5 calcula a raiz quadrada sem precisar importar bibliotecas: <code className="text-slate-300">9 ** 0.5</code> = 3.0.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
