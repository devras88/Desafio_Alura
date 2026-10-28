import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, RotateCcw, Trash2, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'output' | 'input' | 'error' | 'success' | 'system';
  text: string;
}

const MENU_TEXT = [
  '========================================',
  '      BEM-VINDO À CALCULADORA PYTHON    ',
  '========================================',
  '',
  'Escolha a operação desejada:',
  '1 - Adição (+)',
  '2 - Subtração (-)',
  '3 - Multiplicação (*)',
  '4 - Divisão (/)',
  '0 - Sair da calculadora',
  '----------------------------------------',
];

export const InteractiveTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>(() => {
    return [
      { id: '1', type: 'system', text: 'Python 3.12.0 (main) [GCC Interactive Terminal Emulator]' },
      { id: '2', type: 'system', text: 'Executando: python calculadora.py ...' },
      { id: '3', type: 'system', text: '' },
      ...MENU_TEXT.map((t, idx) => ({ id: `menu-${idx}`, type: 'output' as const, text: t })),
    ];
  });

  // State machine for Python calculator execution
  // 'OPTION' -> 'NUM1' -> 'NUM2' -> compute -> back to 'OPTION'
  const [step, setStep] = useState<'OPTION' | 'NUM1' | 'NUM2' | 'TERMINATED'>('OPTION');
  const [selectedOp, setSelectedOp] = useState<string>('1');
  const [num1, setNum1] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [promptText, setPromptText] = useState<string>('Digite sua opção (0-4): ');

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new lines
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // Focus input on render or click
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleRestart = () => {
    setLines([
      { id: Date.now() + '-1', type: 'system', text: 'Reiniciando o interpretador Python...' },
      { id: Date.now() + '-2', type: 'system', text: 'Executando: python calculadora.py' },
      { id: Date.now() + '-3', type: 'system', text: '' },
      ...MENU_TEXT.map((t, idx) => ({ id: `menu-re-${idx}-${Date.now()}`, type: 'output' as const, text: t })),
    ]);
    setStep('OPTION');
    setSelectedOp('1');
    setNum1(0);
    setInputValue('');
    setPromptText('Digite sua opção (0-4): ');
  };

  const handleClear = () => {
    setLines([
      { id: Date.now().toString(), type: 'system', text: 'Terminal limpo. A calculadora continua em execução.' },
    ]);
  };

  const processInput = (text: string) => {
    const raw = text.trim();

    // Log the user's typed line
    const userLine: TerminalLine = {
      id: Date.now() + '-user',
      type: 'input',
      text: `${promptText}${raw}`,
    };

    if (step === 'OPTION') {
      if (raw === '0') {
        setLines((prev) => [
          ...prev,
          userLine,
          { id: Date.now() + '-exit1', type: 'output', text: '\nObrigado por usar a calculadora! Até logo!' },
          { id: Date.now() + '-exit2', type: 'system', text: '[Processo finalizado com código de saída 0]' },
        ]);
        setStep('TERMINATED');
        setPromptText('(Programa encerrado)');
        return;
      }

      if (['1', '2', '3', '4'].includes(raw)) {
        setSelectedOp(raw);
        setStep('NUM1');
        setPromptText('Digite o primeiro número: ');
        setLines((prev) => [...prev, userLine]);
      } else {
        setLines((prev) => [
          ...prev,
          userLine,
          { id: Date.now() + '-err', type: 'error', text: '[Aviso] Opção inválida! Escolha um número entre 0 e 4.' },
        ]);
      }
    } else if (step === 'NUM1') {
      const parsed = parseFloat(raw.replace(',', '.'));
      if (isNaN(parsed)) {
        setLines((prev) => [
          ...prev,
          userLine,
          { id: Date.now() + '-err', type: 'error', text: '[Aviso] Entrada inválida! Por favor, digite apenas números.' },
        ]);
        // Re-prompt for num1
      } else {
        setNum1(parsed);
        setStep('NUM2');
        setPromptText('Digite o segundo número: ');
        setLines((prev) => [...prev, userLine]);
      }
    } else if (step === 'NUM2') {
      const parsed2 = parseFloat(raw.replace(',', '.'));
      if (isNaN(parsed2)) {
        setLines((prev) => [
          ...prev,
          userLine,
          { id: Date.now() + '-err', type: 'error', text: '[Aviso] Entrada inválida! Por favor, digite apenas números.' },
        ]);
        // Re-prompt for num2
      } else {
        // Calculate result!
        let resultText = '';
        let isError = false;

        if (selectedOp === '1') {
          const res = num1 + parsed2;
          resultText = `>>> Resultado: ${num1} + ${parsed2} = ${res}`;
        } else if (selectedOp === '2') {
          const res = num1 - parsed2;
          resultText = `>>> Resultado: ${num1} - ${parsed2} = ${res}`;
        } else if (selectedOp === '3') {
          const res = num1 * parsed2;
          resultText = `>>> Resultado: ${num1} * ${parsed2} = ${res}`;
        } else if (selectedOp === '4') {
          if (parsed2 === 0) {
            resultText = '>>> Erro: Não é possível dividir por zero!';
            isError = true;
          } else {
            const res = num1 / parsed2;
            resultText = `>>> Resultado: ${num1} / ${parsed2} = ${res}`;
          }
        }

        const resultLine: TerminalLine = {
          id: Date.now() + '-res',
          type: isError ? 'error' : 'success',
          text: resultText,
        };

        const dividerLine: TerminalLine = {
          id: Date.now() + '-div',
          type: 'output',
          text: '\n----------------------------------------\nEscolha outra operação (1-4) ou 0 para sair:',
        };

        setLines((prev) => [...prev, userLine, resultLine, dividerLine]);
        setStep('OPTION');
        setPromptText('Digite sua opção (0-4): ');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'TERMINATED') return;
    processInput(inputValue);
    setInputValue('');
  };

  // Helper preset button action
  const runPreset = (op: string, n1: number, n2: number) => {
    if (step === 'TERMINATED') {
      handleRestart();
    }
    // Simulate steps in sequence
    setTimeout(() => {
      processInput(op);
      setTimeout(() => {
        processInput(n1.toString());
        setTimeout(() => {
          processInput(n2.toString());
        }, 120);
      }, 120);
    }, 50);
  };

  return (
    <div className="space-y-6">
      {/* Intro Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span>Ambiente de Execução</span>
            <span aria-hidden="true">·</span>
            <span>Console Python Interativo</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium">100% no Navegador</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Teste a Calculadora no Terminal
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Digite sua escolha de operação no prompt abaixo e aperte Enter para interagir com o script Python exatamente como faria no terminal do seu computador.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleClear}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Limpar</span>
          </button>
          <button
            onClick={handleRestart}
            className="px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-lg hover:bg-emerald-900/40 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Script</span>
          </button>
        </div>
      </div>

      {/* Preset Buttons for Quick Testing */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          Testes Rápidos:
        </span>
        <button
          onClick={() => runPreset('1', 25, 17)}
          className="text-xs px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-md transition-colors"
        >
          Adição (25 + 17)
        </button>
        <button
          onClick={() => runPreset('2', 100, 37)}
          className="text-xs px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-md transition-colors"
        >
          Subtração (100 - 37)
        </button>
        <button
          onClick={() => runPreset('3', 14, 6)}
          className="text-xs px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-md transition-colors"
        >
          Multiplicação (14 * 6)
        </button>
        <button
          onClick={() => runPreset('4', 15, 0)}
          className="text-xs px-2.5 py-1 bg-rose-950/40 hover:bg-rose-900/40 border border-rose-500/30 text-rose-300 rounded-md transition-colors font-medium"
        >
          Divisão por Zero (15 / 0)
        </button>
        <button
          onClick={() => runPreset('4', 45, 4)}
          className="text-xs px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-md transition-colors"
        >
          Divisão Decimal (45 / 4)
        </button>
      </div>

      {/* Terminal Window */}
      <div
        onClick={focusInput}
        className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono cursor-text"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 ml-2">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>bash - python3 calculadora.py</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Pressione Enter para enviar</span>
        </div>

        {/* Terminal Output Area */}
        <div className="p-4 text-xs sm:text-sm leading-relaxed max-h-[500px] min-h-[380px] overflow-y-auto space-y-1">
          {lines.map((line) => {
            if (line.type === 'system') {
              return (
                <div key={line.id} className="text-slate-500 italic">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'input') {
              return (
                <div key={line.id} className="text-emerald-300 font-semibold flex items-center gap-1">
                  <span>{line.text}</span>
                </div>
              );
            }
            if (line.type === 'error') {
              return (
                <div key={line.id} className="text-rose-400 font-medium">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'success') {
              return (
                <div key={line.id} className="text-emerald-400 font-bold bg-emerald-950/30 p-2 rounded border border-emerald-500/20 my-1">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={line.id} className="text-slate-300 whitespace-pre-wrap">
                {line.text}
              </div>
            );
          })}

          {/* Active Input Line */}
          {step !== 'TERMINATED' ? (
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
              <span className="text-emerald-400 font-bold select-none">{promptText}</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="digite aqui..."
                autoFocus
                className="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono text-sm placeholder:text-slate-600 focus:ring-0"
              />
              <button
                type="submit"
                className="px-2.5 py-1 text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded hover:bg-emerald-500/30 transition-colors flex items-center gap-1 shrink-0"
              >
                <span>Enviar</span>
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </form>
          ) : (
            <div className="pt-3 flex items-center gap-3">
              <span className="text-slate-500 italic text-xs">O programa foi encerrado.</span>
              <button
                onClick={handleRestart}
                className="text-xs text-emerald-400 hover:text-emerald-300 underline font-mono flex items-center gap-1"
              >
                <ArrowRight className="w-3 h-3" />
                Clique aqui para reiniciar
              </button>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>
      </div>

      {/* Helpful context for beginners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-xs font-semibold text-white mb-1 flex items-center gap-2">
            <span>1. Entrada de Dados</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            O comando <code className="text-amber-300">input()</code> pausa a execução do script e espera você digitar algo no teclado e teclar Enter.
          </p>
        </div>
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-xs font-semibold text-white mb-1 flex items-center gap-2">
            <span>2. Conversão de Tipos</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Como o texto vem como letras, a função <code className="text-amber-300">float()</code> converte os caracteres numéricos para que possam ser somados.
          </p>
        </div>
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-xs font-semibold text-white mb-1 flex items-center gap-2">
            <span>3. Saída Formatada</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            O comando <code className="text-amber-300">print(f"...")</code> monta o texto final na tela com os números calculados.
          </p>
        </div>
      </div>
    </div>
  );
};
