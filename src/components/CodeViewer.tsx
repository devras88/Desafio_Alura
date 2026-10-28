import React, { useState } from 'react';
import { CALCULATOR_VERSIONS, CodeLine } from '../data/calculatorCode';
import { Copy, Check, Download, Info, Play, Sparkles } from 'lucide-react';

interface CodeViewerProps {
  onRunInTerminal?: () => void;
  onCopyCode: () => void;
  copied: boolean;
  onDownloadPy: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  onRunInTerminal,
  onCopyCode,
  copied,
  onDownloadPy,
}) => {
  const [selectedVersion, setSelectedVersion] = useState<'structured' | 'basic'>('structured');
  const [activeLineNumber, setActiveLineNumber] = useState<number | null>(2);

  const version = CALCULATOR_VERSIONS[selectedVersion];

  // Helper to colorize Python code syntax
  const renderSyntaxLine = (code: string) => {
    // Check if it's a comment
    const trimmed = code.trim();
    if (trimmed.startsWith('#')) {
      return <span className="text-slate-500 italic">{code}</span>;
    }

    // Split into comments and code if inline comment exists
    const commentIndex = code.indexOf('#');
    let codePart = code;
    let commentPart = '';
    if (commentIndex !== -1 && !code.slice(0, commentIndex).includes('"') && !code.slice(0, commentIndex).includes("'")) {
      codePart = code.slice(0, commentIndex);
      commentPart = code.slice(commentIndex);
    }

    // Basic tokenization for display
    const tokens = codePart.split(/(\b(?:def|return|if|elif|else|while|True|False|break|continue|try|except|in|is|not|and|or)\b|\b(?:print|input|float|int|str|len|range)\b|"[^"]*"|'[^']*'|\d+\.?\d*|[+\-*/=<>!]+)/g);

    return (
      <>
        {tokens.map((token, i) => {
          if (!token) return null;
          // Python keywords
          if (/^(def|return|if|elif|else|while|True|False|break|continue|try|except|in|is|not|and|or)$/.test(token)) {
            return <span key={i} className="text-sky-400 font-semibold">{token}</span>;
          }
          // Built-in functions
          if (/^(print|input|float|int|str|len|range)$/.test(token)) {
            return <span key={i} className="text-amber-300 font-medium">{token}</span>;
          }
          // String literals
          if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
            return <span key={i} className="text-emerald-300">{token}</span>;
          }
          // Numbers
          if (/^\d+\.?\d*$/.test(token)) {
            return <span key={i} className="text-violet-300">{token}</span>;
          }
          // Operators
          if (/^[+\-*/=<>!]+$/.test(token)) {
            return <span key={i} className="text-rose-400 font-medium">{token}</span>;
          }
          return <span key={i} className="text-slate-200">{token}</span>;
        })}
        {commentPart && <span className="text-slate-500 italic">{commentPart}</span>}
      </>
    );
  };

  const selectedLineObj: CodeLine | undefined = version.lines.find(
    (l) => l.lineNumber === activeLineNumber
  ) || version.lines[0];

  return (
    <div className="space-y-6">
      {/* Top Banner & Version Selector */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span>Guia Passo a Passo</span>
            <span aria-hidden="true">·</span>
            <span>Python 3.x</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium">Iniciante Amigável</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Código da Calculadora em Python
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Clique em qualquer linha com o ícone de lâmpada para ver a explicação detalhada de como ela funciona por baixo dos panos.
          </p>
        </div>

        {/* Segmented control for version */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => {
              setSelectedVersion('structured');
              setActiveLineNumber(2);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
              selectedVersion === 'structured'
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Com Funções (Recomendado)
          </button>
          <button
            onClick={() => {
              setSelectedVersion('basic');
              setActiveLineNumber(2);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
              selectedVersion === 'basic'
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Iniciante Direto (Sem Loops)
          </button>
        </div>
      </div>

      {/* Main Grid: Code Left, Line Inspector Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Code Window (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span className="text-xs font-mono text-slate-400 ml-2">
                calculadora_{selectedVersion}.py
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onDownloadPy}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                title="Baixar arquivo python pronto"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Baixar .py</span>
              </button>
              <button
                onClick={onCopyCode}
                className="text-xs text-emerald-400 hover:text-emerald-300 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5 font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
              {onRunInTerminal && (
                <button
                  onClick={onRunInTerminal}
                  className="text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Executar</span>
                </button>
              )}
            </div>
          </div>

          {/* Code Lines Container */}
          <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed max-h-[640px] overflow-y-auto">
            {version.fullCode.split('\n').map((rawLine, index) => {
              const lineNum = index + 1;
              const hasAnnotation = version.lines.some((l) => l.lineNumber === lineNum);
              const isSelected = activeLineNumber === lineNum;

              return (
                <div
                  key={lineNum}
                  onClick={() => {
                    if (hasAnnotation) {
                      setActiveLineNumber(lineNum);
                    }
                  }}
                  className={`group flex items-start gap-4 px-2 py-0.5 rounded transition-colors ${
                    hasAnnotation ? 'cursor-pointer hover:bg-slate-900/80' : ''
                  } ${isSelected ? 'bg-emerald-950/40 border-l-2 border-emerald-400' : ''}`}
                >
                  {/* Line Number */}
                  <span className="select-none text-slate-600 text-right w-8 shrink-0 tabular-nums font-mono text-xs pt-0.5">
                    {lineNum}
                  </span>

                  {/* Indicator if interactive explanation exists */}
                  <span className="w-4 shrink-0 pt-0.5 text-center">
                    {hasAnnotation ? (
                      <span
                        className={`inline-block text-[10px] ${
                          isSelected
                            ? 'text-emerald-400 font-bold'
                            : 'text-slate-600 group-hover:text-emerald-400'
                        }`}
                        title="Clique para ler a explicação desta linha"
                      >
                        ●
                      </span>
                    ) : (
                      <span className="inline-block w-2"></span>
                    )}
                  </span>

                  {/* Code Line Content */}
                  <span className="whitespace-pre font-mono flex-1">
                    {renderSyntaxLine(rawLine || ' ')}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Syntax Legend Bar */}
          <div className="px-4 py-2.5 bg-slate-900/80 border-t border-slate-800 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-slate-400 font-mono">
            <span>Legenda:</span>
            <span className="text-sky-400 font-medium">■ Palavra-chave (def, if, while)</span>
            <span className="text-amber-300 font-medium">■ Função interna (print, float)</span>
            <span className="text-emerald-300 font-medium">■ Texto / String</span>
            <span className="text-rose-400 font-medium">■ Operador (+, -, *, /)</span>
            <span className="text-slate-500 font-medium">■ Comentário (#)</span>
          </div>
        </div>

        {/* Right Column: Line Inspector & Teaching Deck (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Line Explanation Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Explicação da Linha {activeLineNumber}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {selectedLineObj?.concept || 'Conceito Python'}
              </span>
            </div>

            {selectedLineObj ? (
              <div className="space-y-4">
                {/* Code Snippet Box */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                  <code>{selectedLineObj.code}</code>
                </div>

                {/* Explanation prose */}
                <div>
                  <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                    O que essa linha faz:
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {selectedLineObj.explanation}
                  </p>
                </div>

                {/* Tip box */}
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-emerald-400 block mb-1">Dica para o Iniciante:</span>
                  {selectedLineObj.concept.includes('input') &&
                    'O input() sempre lê dados do teclado como letras (string). Sem converter com float(), somar 5 + 5 daria o texto "55".'}
                  {selectedLineObj.concept.includes('def') &&
                    'Funções permitem organizar tarefas. Pense nelas como receitas de bolo: você define uma vez e pode fazer o bolo quantas vezes quiser.'}
                  {selectedLineObj.concept.includes('while') &&
                    'O comando "while True" cria um laço que nunca para sozinho. O comando "break" é o botão de emergência que encerra o programa quando o usuário escolhe 0.'}
                  {selectedLineObj.concept.includes('if') &&
                    'A indentação de 4 espaços depois de "if" é obrigatória em Python. É ela que diz quais comandos pertencem àquela decisão.'}
                  {!selectedLineObj.concept.includes('input') &&
                    !selectedLineObj.concept.includes('def') &&
                    !selectedLineObj.concept.includes('while') &&
                    !selectedLineObj.concept.includes('if') &&
                    'Comentários que começam com "#" são para você e outros programadores entenderem o que foi feito. Eles não deixam o programa mais lento.'}
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                Selecione uma linha do código à esquerda com o ponto verde para ver sua análise técnica.
              </p>
            )}
          </div>

          {/* Quick Summary of the 4 Operations Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-sky-400" />
              As 4 Operações em Python
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <div>
                  <span className="font-semibold text-white">Adição: </span>
                  <span className="text-slate-400">a + b</span>
                </div>
                <code className="text-emerald-400 font-mono">10 + 5 = 15</code>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <div>
                  <span className="font-semibold text-white">Subtração: </span>
                  <span className="text-slate-400">a - b</span>
                </div>
                <code className="text-emerald-400 font-mono">10 - 5 = 5</code>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <div>
                  <span className="font-semibold text-white">Multiplicação: </span>
                  <span className="text-slate-400">a * b</span>
                </div>
                <code className="text-emerald-400 font-mono">10 * 5 = 50</code>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800/80">
                <div>
                  <span className="font-semibold text-white">Divisão: </span>
                  <span className="text-slate-400">a / b</span>
                </div>
                <code className="text-emerald-400 font-mono">10 / 5 = 2.0</code>
              </li>
            </ul>
            <p className="text-[11px] text-slate-400 mt-3 italic">
              * Nota: Em Python 3, a divisão comum com barra única (<code className="text-slate-300">/</code>) sempre retorna um número decimal (<code className="text-slate-300">float</code>).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
