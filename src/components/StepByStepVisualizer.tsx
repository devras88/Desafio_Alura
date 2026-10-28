import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, RotateCcw, Cpu, Layers } from 'lucide-react';

interface Step {
  stepNumber: number;
  title: string;
  codeSnippet: string;
  explanation: string;
  scope: Record<string, string | number>;
  consoleOutput: string[];
}

export const StepByStepVisualizer: React.FC = () => {
  const [num1, setNum1] = useState<number>(12);
  const [num2, setNum2] = useState<number>(4);
  const [op, setOp] = useState<string>('somar');
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Build the execution steps dynamically based on inputs
  const buildSteps = (): Step[] => {
    let opSymbol = '+';
    let opChoice = '1';
    let funcName = 'somar';
    let resultVal: number | string = num1 + num2;

    if (op === 'somar') {
      opSymbol = '+';
      opChoice = '1';
      funcName = 'somar';
      resultVal = num1 + num2;
    } else if (op === 'subtrair') {
      opSymbol = '-';
      opChoice = '2';
      funcName = 'subtrair';
      resultVal = num1 - num2;
    } else if (op === 'multiplicar') {
      opSymbol = '*';
      opChoice = '3';
      funcName = 'multiplicar';
      resultVal = num1 * num2;
    } else if (op === 'dividir') {
      opSymbol = '/';
      opChoice = '4';
      funcName = 'dividir';
      resultVal = num2 === 0 ? 'Erro: Divisão por zero!' : Number((num1 / num2).toFixed(2));
    }

    const steps: Step[] = [
      {
        stepNumber: 1,
        title: '1. Carregamento das Funções na Memória',
        codeSnippet: `def ${funcName}(a, b):\n    return a ${opSymbol} b`,
        explanation: 'O interpretador Python lê o arquivo de cima a baixo e armazena a definição da função na memória RAM para usá-la quando for chamada.',
        scope: {},
        consoleOutput: [],
      },
      {
        stepNumber: 2,
        title: '2. Exibição do Menu no Terminal',
        codeSnippet: `print("1 - Adição (+)\\n2 - Subtração (-)...")`,
        explanation: 'A função print() envia o texto do menu para o terminal para que o usuário saiba quais opções estão disponíveis.',
        scope: {},
        consoleOutput: [
          '========================================',
          '      BEM-VINDO À CALCULADORA PYTHON    ',
          '========================================',
          'Escolha a operação: 1-Soma, 2-Sub, 3-Mult, 4-Div',
        ],
      },
      {
        stepNumber: 3,
        title: '3. Leitura da Opção do Usuário',
        codeSnippet: `opcao = input("Digite sua opção (0-4): ")`,
        explanation: `O usuário digitou "${opChoice}". A variável "opcao" recebe o texto "${opChoice}".`,
        scope: { opcao: `"${opChoice}"` },
        consoleOutput: [
          '========================================',
          'Escolha a operação: 1-Soma, 2-Sub, 3-Mult, 4-Div',
          `Digite sua opção (0-4): ${opChoice}`,
        ],
      },
      {
        stepNumber: 4,
        title: '4. Leitura e Conversão dos Números',
        codeSnippet: `num1 = float(input(...))\nnum2 = float(input(...))`,
        explanation: `Os valores digitados ("${num1}" e "${num2}") são transformados pelo float() em números decimais reais (${num1}.0 e ${num2}.0).`,
        scope: { opcao: `"${opChoice}"`, num1: `${num1}.0`, num2: `${num2}.0` },
        consoleOutput: [
          `Digite sua opção (0-4): ${opChoice}`,
          `Digite o primeiro número: ${num1}`,
          `Digite o segundo número: ${num2}`,
        ],
      },
      {
        stepNumber: 5,
        title: '5. Verificação da Condicional if/elif',
        codeSnippet: `if opcao == "${opChoice}":\n    resultado = ${funcName}(num1, num2)`,
        explanation: `O Python testa: a variável opcao ("${opChoice}") é igual a "${opChoice}"? Sim (Verdadeiro)! Ele entra no bloco correspondente.`,
        scope: { opcao: `"${opChoice}"`, num1: `${num1}.0`, num2: `${num2}.0` },
        consoleOutput: [
          `Digite sua opção (0-4): ${opChoice}`,
          `Digite o primeiro número: ${num1}`,
          `Digite o segundo número: ${num2}`,
        ],
      },
      {
        stepNumber: 6,
        title: '6. Execução da Função na CPU',
        codeSnippet:
          op === 'dividir' && num2 === 0
            ? `if b == 0:\n    return "Erro: Não é possível dividir por zero!"`
            : `return a ${opSymbol} b  # ${num1} ${opSymbol} ${num2} = ${resultVal}`,
        explanation:
          op === 'dividir' && num2 === 0
            ? 'A verificação de segurança detectou b == 0 e preveniu a quebra do programa!'
            : `A CPU calcula a operação aritmética e a palavra-chave return devolve o valor ${resultVal}.`,
        scope: {
          opcao: `"${opChoice}"`,
          num1: `${num1}.0`,
          num2: `${num2}.0`,
          resultado: typeof resultVal === 'number' ? `${resultVal}` : `"${resultVal}"`,
        },
        consoleOutput: [
          `Digite o primeiro número: ${num1}`,
          `Digite o segundo número: ${num2}`,
        ],
      },
      {
        stepNumber: 7,
        title: '7. Impressão do Resultado com f-string',
        codeSnippet: `print(f">>> Resultado: {num1} ${opSymbol} {num2} = {resultado}")`,
        explanation: 'A f-string substitui cada nome dentro das chaves {} pelo seu valor atual na memória e imprime o resultado.',
        scope: {
          opcao: `"${opChoice}"`,
          num1: `${num1}.0`,
          num2: `${num2}.0`,
          resultado: typeof resultVal === 'number' ? `${resultVal}` : `"${resultVal}"`,
        },
        consoleOutput: [
          `Digite sua opção (0-4): ${opChoice}`,
          `Digite o primeiro número: ${num1}`,
          `Digite o segundo número: ${num2}`,
          `>>> Resultado: ${num1} ${opSymbol} ${num2} = ${resultVal}`,
        ],
      },
    ];

    return steps;
  };

  const steps = buildSteps();
  const currentStep = steps[currentStepIdx] || steps[0];

  // Auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span>Depurador Visual</span>
            <span aria-hidden="true">·</span>
            <span>Rastreamento Passo a Passo</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium">Memória e Variáveis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Como o Python Executa Cada Linha
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Escolha os valores e a operação abaixo e acompanhe visualmente como o interpretador Python processa as variáveis na memória passo a passo.
          </p>
        </div>

        {/* Input Parameters */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-950 p-2 border border-slate-800 rounded-lg">
          <div>
            <label className="text-[11px] text-slate-400 block mb-0.5">Operação:</label>
            <select
              value={op}
              onChange={(e) => {
                setOp(e.target.value);
                setCurrentStepIdx(0);
                setIsPlaying(false);
              }}
              className="bg-slate-900 border border-slate-700 text-white text-xs rounded px-2 py-1 outline-none"
            >
              <option value="somar">Adição (+)</option>
              <option value="subtrair">Subtração (-)</option>
              <option value="multiplicar">Multiplicação (*)</option>
              <option value="dividir">Divisão (/)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-0.5">Número 1:</label>
            <input
              type="number"
              value={num1}
              onChange={(e) => {
                setNum1(Number(e.target.value));
                setCurrentStepIdx(0);
              }}
              className="w-16 bg-slate-900 border border-slate-700 text-white text-xs rounded px-2 py-1 outline-none text-center"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-0.5">Número 2:</label>
            <input
              type="number"
              value={num2}
              onChange={(e) => {
                setNum2(Number(e.target.value));
                setCurrentStepIdx(0);
              }}
              className="w-16 bg-slate-900 border border-slate-700 text-white text-xs rounded px-2 py-1 outline-none text-center"
            />
          </div>
        </div>
      </div>

      {/* Playback Controls & Progress Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Step indicator */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-200">
            Passo {currentStep.stepNumber} de {steps.length}
          </span>
          <div className="flex items-center gap-1">
            {steps.map((s, idx) => (
              <button
                key={s.stepNumber}
                onClick={() => {
                  setCurrentStepIdx(idx);
                  setIsPlaying(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentStepIdx
                    ? 'w-7 bg-emerald-400'
                    : idx < currentStepIdx
                    ? 'w-3 bg-emerald-600/50'
                    : 'w-3 bg-slate-800'
                }`}
                title={`Ir para passo ${s.stepNumber}`}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-md transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="px-3 py-1 text-xs text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed bg-slate-900 border border-slate-800 rounded-md hover:bg-slate-800 transition-colors"
          >
            Anterior
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1 text-xs font-medium text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors flex items-center gap-1.5"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Reproduzir</span>
              </>
            )}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIdx === steps.length - 1}
            className="px-3 py-1 text-xs text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed bg-slate-900 border border-slate-800 rounded-md hover:bg-slate-800 transition-colors flex items-center gap-1"
          >
            <span>Próximo</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Code Step Left (7 cols), Memory & Console Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Active Python Step (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-xl">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mb-2">
              <Cpu className="w-4 h-4" />
              <span>Instrução em Execução</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-3">
              {currentStep.title}
            </h3>

            {/* Glowing Code Block */}
            <div className="p-4 bg-slate-900/90 border border-emerald-500/30 rounded-lg font-mono text-sm text-emerald-300 overflow-x-auto shadow-inner">
              <pre className="whitespace-pre">{currentStep.codeSnippet}</pre>
            </div>

            {/* Explanation */}
            <div className="mt-4 p-4 bg-slate-900/50 border border-slate-800/80 rounded-lg">
              <span className="text-xs text-slate-400 font-medium block mb-1">
                O que acontece nos bastidores:
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {currentStep.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Variable Scope & Console Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Memory Variables Table */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-sky-400" />
                Memória do Programa (Escopo de Variáveis)
              </span>
              <span className="text-[11px] text-slate-400">RAM</span>
            </div>

            {Object.keys(currentStep.scope).length > 0 ? (
              <div className="border border-slate-800 rounded-lg overflow-hidden font-mono text-xs">
                <div className="grid grid-cols-2 bg-slate-900/80 px-3 py-2 text-slate-400 font-medium border-b border-slate-800">
                  <span>Nome da Variável</span>
                  <span>Valor na Memória</span>
                </div>
                {Object.entries(currentStep.scope).map(([varName, val]) => (
                  <div
                    key={varName}
                    className="grid grid-cols-2 px-3 py-2 border-b border-slate-800/60 last:border-b-0 hover:bg-slate-900/40"
                  >
                    <span className="text-sky-300 font-semibold">{varName}</span>
                    <span className="text-emerald-300">{val}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-900/40 rounded-lg border border-slate-800/50">
                Nenhuma variável criada na memória ainda neste passo.
              </p>
            )}
          </div>

          {/* Console Output Screen */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-xl font-mono">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="text-slate-400">Terminal de Saída (print):</span>
              <span className="text-[10px] text-emerald-400">Ao Vivo</span>
            </div>
            <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 min-h-[140px] text-xs leading-relaxed space-y-1 text-slate-300">
              {currentStep.consoleOutput.length > 0 ? (
                currentStep.consoleOutput.map((out, i) => (
                  <div
                    key={i}
                    className={out.startsWith('>>>') ? 'text-emerald-400 font-semibold' : ''}
                  >
                    {out}
                  </div>
                ))
              ) : (
                <span className="text-slate-600 italic">Nenhuma saída ainda...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
