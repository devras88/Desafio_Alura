import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/calculatorCode';
import { Check, X, RotateCcw, Trophy, Award, Laptop, Terminal as TerminalIcon } from 'lucide-react';

export const QuizAndChallenges: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const allAnswered = QUIZ_QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);
  const score = calculateScore();

  return (
    <div className="space-y-8">
      {/* Quiz Intro Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span>Fixação de Conteúdo</span>
            <span aria-hidden="true">·</span>
            <span>4 Questões Rápidas</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-medium">Feedback Imediato</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Teste Seu Conhecimento de Python
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Responda às questões abaixo para garantir que você entendeu os fundamentos da lógica da calculadora.
          </p>
        </div>

        {showResults && (
          <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800 shrink-0">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-xs text-slate-400 block">Sua pontuação:</span>
              <span className="text-base font-bold text-white tabular-nums">
                {score} de {QUIZ_QUESTIONS.length} acertos
              </span>
            </div>
            <button
              onClick={resetQuiz}
              className="ml-3 p-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 rounded border border-slate-700"
              title="Refazer quiz"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-semibold text-white leading-relaxed">
                  <span className="text-emerald-400 font-mono mr-2">0{idx + 1}.</span>
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((option, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (showResults) {
                    if (optIdx === q.correctIndex) {
                      btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-medium';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-950/40 border-rose-500/80 text-rose-300';
                    } else {
                      btnStyle = 'bg-slate-950 border-slate-800/60 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-medium';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`p-3 text-left rounded-lg border text-xs leading-relaxed transition-all flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span className="w-4 h-4 rounded border border-slate-700 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {showResults && optIdx === q.correctIndex && (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {showResults && isSelected && !isCorrect && (
                        <X className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation after submit */}
              {showResults && (
                <div
                  className={`p-3 rounded-lg text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-emerald-950/20 border border-emerald-500/20 text-emerald-300'
                      : 'bg-slate-900 border border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="font-semibold block mb-0.5">
                    {isCorrect ? 'Correto!' : 'Explicação:'}
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit / Reset Actions */}
      <div className="flex items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
        <span className="text-xs text-slate-400">
          {showResults
            ? `Você completou o questionário com ${score}/${QUIZ_QUESTIONS.length} pontos.`
            : allAnswered
            ? 'Todas as questões foram respondidas! Pronto para conferir?'
            : `${Object.keys(selectedAnswers).length} de ${QUIZ_QUESTIONS.length} respondidas.`}
        </span>

        {!showResults ? (
          <button
            onClick={() => setShowResults(true)}
            disabled={!allAnswered}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Verificar Respostas
          </button>
        ) : (
          <button
            onClick={resetQuiz}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tentar Novamente</span>
          </button>
        )}
      </div>

      {/* Practical "How to run on your computer" Section */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <Laptop className="w-4 h-4" />
          <span>Guia Prático: Como Rodar Este Código no Seu Computador</span>
        </div>
        <h3 className="text-lg font-bold text-white">
          Executando o arquivo calculadora.py na sua máquina
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[11px] font-mono text-emerald-400">
                1
              </span>
              <span>Instale o Python</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Acesse o site oficial <strong className="text-slate-300">python.org</strong> e baixe a versão recomendada para seu sistema operacional (Windows, Mac ou Linux). Lembre-se de marcar a opção <em>"Add python.exe to PATH"</em> no Windows!
            </p>
          </div>

          <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[11px] font-mono text-emerald-400">
                2
              </span>
              <span>Salve o Código</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Clique no botão <strong>"Baixar .py"</strong> no topo desta página ou copie o código e salve em um arquivo de texto com o nome <code className="text-emerald-300 font-mono">calculadora.py</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[11px] font-mono text-emerald-400">
                3
              </span>
              <span>Execute no Terminal</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Abra o Terminal (ou Prompt de Comando) na pasta onde salvou o arquivo e digite:
            </p>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-emerald-300">
              python calculadora.py
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
