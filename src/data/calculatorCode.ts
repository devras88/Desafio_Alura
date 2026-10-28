export interface CodeLine {
  lineNumber: number;
  code: string;
  comment?: string;
  explanation: string;
  concept: string;
  type: 'function' | 'io' | 'condition' | 'loop' | 'logic' | 'comment' | 'blank';
}

export interface CodeVersion {
  id: string;
  title: string;
  badge: string;
  description: string;
  fullCode: string;
  lines: CodeLine[];
}

export const CALCULATOR_VERSIONS: Record<string, CodeVersion> = {
  structured: {
    id: 'structured',
    title: 'Com Funções e Menu Interativo',
    badge: 'Recomendado',
    description: 'Código modular organizado em funções reutilizáveis, com menu de opções e repetição contínua.',
    fullCode: `# ===================================================
# CALCULADORA SIMPLES EM PYTHON - 4 OPERAÇÕES BÁSICAS
# Criada com funções modulares e menu interativo
# ===================================================

# 1. DEFINIÇÃO DAS FUNÇÕES MATEMÁTICAS
def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a diferença entre o primeiro e o segundo número."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto de dois números."""
    return a * b

def dividir(a, b):
    """Retorna a divisão do primeiro número pelo segundo.
    Evita o erro de divisão por zero."""
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

# 2. FUNÇÃO PRINCIPAL DO PROGRAMA
def calculadora():
    print("=" * 40)
    print("      BEM-VINDO À CALCULADORA PYTHON      ")
    print("=" * 40)
    
    # O loop 'while True' mantém a calculadora rodando até o usuário decidir sair
    while True:
        # Exibição do menu de operações
        print("\\nEscolha a operação desejada:")
        print("1 - Adição (+)")
        print("2 - Subtração (-)")
        print("3 - Multiplicação (*)")
        print("4 - Divisão (/)")
        print("0 - Sair da calculadora")
        
        # Leitura da escolha do usuário
        opcao = input("Digite sua opção (0-4): ").strip()
        
        # Verifica se o usuário deseja encerrar o programa
        if opcao == "0":
            print("\\nObrigado por usar a calculadora! Até logo!")
            break  # Interrompe o loop 'while'
            
        # Verifica se a opção digitada é válida
        if opcao in ["1", "2", "3", "4"]:
            # Leitura dos números (convertendo texto para float/decimal)
            try:
                num1 = float(input("Digite o primeiro número: "))
                num2 = float(input("Digite o segundo número: "))
            except ValueError:
                print("\\n[Aviso] Entrada inválida! Por favor, digite apenas números.")
                continue  # Reinicia o loop para tentar novamente
                
            # Executa a operação correspondente à opção escolhida
            if opcao == "1":
                resultado = somar(num1, num2)
                print(f"\\n>>> Resultado: {num1} + {num2} = {resultado}")
            elif opcao == "2":
                resultado = subtrair(num1, num2)
                print(f"\\n>>> Resultado: {num1} - {num2} = {resultado}")
            elif opcao == "3":
                resultado = multiplicar(num1, num2)
                print(f"\\n>>> Resultado: {num1} * {num2} = {resultado}")
            elif opcao == "4":
                resultado = dividir(num1, num2)
                print(f"\\n>>> Resultado: {num1} / {num2} = {resultado}")
        else:
            print("\\n[Aviso] Opção inválida! Escolha um número entre 0 e 4.")

# 3. PONTO DE ENTRADA DO SCRIPT
# Chama a função principal para iniciar a calculadora
if __name__ == "__main__":
    calculadora()
`,
    lines: [
      {
        lineNumber: 1,
        code: '# 1. DEFINIÇÃO DAS FUNÇÕES MATEMÁTICAS',
        explanation: 'Comentários começam com # e servem para explicar o código aos humanos. O Python ignora essas linhas durante a execução.',
        concept: 'Comentários (#)',
        type: 'comment',
      },
      {
        lineNumber: 2,
        code: 'def somar(a, b):',
        explanation: 'A palavra-chave "def" define uma nova função. Aqui criamos a função "somar" que recebe dois valores (parâmetros a e b).',
        concept: 'Declaração de Funções (def)',
        type: 'function',
      },
      {
        lineNumber: 3,
        code: '    return a + b',
        explanation: 'O comando "return" calcula a soma de a com b e devolve esse resultado para quem chamou a função. A indentação de 4 espaços indica que a linha pertence à função.',
        concept: 'Retorno de Valores (return)',
        type: 'function',
      },
      {
        lineNumber: 4,
        code: 'def subtrair(a, b):',
        explanation: 'Define a função de subtração recebendo os dois números a e b.',
        concept: 'Função de Subtração',
        type: 'function',
      },
      {
        lineNumber: 5,
        code: '    return a - b',
        explanation: 'Devolve a subtração do primeiro número pelo segundo usando o operador matemático "-".',
        concept: 'Operador de Subtração (-)',
        type: 'function',
      },
      {
        lineNumber: 6,
        code: 'def multiplicar(a, b):',
        explanation: 'Define a função de multiplicação recebendo os fatores a e b.',
        concept: 'Função de Multiplicação',
        type: 'function',
      },
      {
        lineNumber: 7,
        code: '    return a * b',
        explanation: 'Devolve o produto dos números. Em linguagens de programação, a multiplicação utiliza o asterisco (*).',
        concept: 'Operador de Multiplicação (*)',
        type: 'function',
      },
      {
        lineNumber: 8,
        code: 'def dividir(a, b):',
        explanation: 'Define a função de divisão. Ela tem um cuidado essencial: impedir a divisão por zero.',
        concept: 'Função de Divisão',
        type: 'function',
      },
      {
        lineNumber: 9,
        code: '    if b == 0:',
        explanation: 'Condicional que checa se o divisor b é exatamente zero (== testa igualdade). Dividir por zero é matematicamente indefinido.',
        concept: 'Checagem de Guarda (if b == 0)',
        type: 'condition',
      },
      {
        lineNumber: 10,
        code: '        return "Erro: Não é possível dividir por zero!"',
        explanation: 'Se b for zero, retorna uma mensagem de erro amigável em vez de travar o programa com ZeroDivisionError.',
        concept: 'Proteção contra Falhas',
        type: 'logic',
      },
      {
        lineNumber: 11,
        code: '    return a / b',
        explanation: 'Caso b não seja zero, divide a por b usando a barra (/) e retorna o quociente como número decimal (float).',
        concept: 'Operador de Divisão (/)',
        type: 'function',
      },
      {
        lineNumber: 12,
        code: 'def calculadora():',
        explanation: 'Define a função central que orquestra o menu, as entradas do teclado e as chamadas das operações.',
        concept: 'Função Principal (Main)',
        type: 'function',
      },
      {
        lineNumber: 13,
        code: '    while True:',
        explanation: 'Cria um laço de repetição infinito. A calculadora continuará funcionando até que encontre um comando "break".',
        concept: 'Loop de Repetição (while)',
        type: 'loop',
      },
      {
        lineNumber: 14,
        code: '        opcao = input("Digite sua opção (0-4): ").strip()',
        explanation: 'input() lê o que o usuário digita no teclado e retorna sempre como texto (str). O método .strip() remove espaços vazios acidentais.',
        concept: 'Entrada de Dados (input)',
        type: 'io',
      },
      {
        lineNumber: 15,
        code: '        if opcao == "0":',
        explanation: 'Se o usuário digitou "0", significa que ele deseja fechar a calculadora.',
        concept: 'Condicional de Saída',
        type: 'condition',
      },
      {
        lineNumber: 16,
        code: '            break',
        explanation: 'O comando "break" interrompe imediatamente o loop while, permitindo que o programa finalize com elegância.',
        concept: 'Interrupção de Loop (break)',
        type: 'loop',
      },
      {
        lineNumber: 17,
        code: '        if opcao in ["1", "2", "3", "4"]:',
        explanation: 'O operador "in" verifica se o texto digitado pertence à lista de opções válidas permitidas.',
        concept: 'Validação com Lista (in)',
        type: 'condition',
      },
      {
        lineNumber: 18,
        code: '            num1 = float(input("Digite o primeiro número: "))',
        explanation: 'Como input() retorna texto, float() converte a resposta para número decimal. Sem isso, "5" + "5" viraria "55"!',
        concept: 'Conversão de Tipos (Casting float)',
        type: 'io',
      },
      {
        lineNumber: 19,
        code: '            num2 = float(input("Digite o segundo número: "))',
        explanation: 'Lê o segundo número e também converte imediatamente para número decimal.',
        concept: 'Conversão de Tipos',
        type: 'io',
      },
      {
        lineNumber: 20,
        code: '            if opcao == "1":',
        explanation: 'Testa se a opção escolhida foi a 1 (Adição). Se sim, executa o bloco indentado abaixo.',
        concept: 'Condicional Simples (if)',
        type: 'condition',
      },
      {
        lineNumber: 21,
        code: '                resultado = somar(num1, num2)',
        explanation: 'Chama a função somar() passando os valores num1 e num2, armazenando o valor de retorno na variável "resultado".',
        concept: 'Chamada de Função',
        type: 'logic',
      },
      {
        lineNumber: 22,
        code: '                print(f"\\n>>> Resultado: {num1} + {num2} = {resultado}")',
        explanation: 'Usa uma f-string (texto prefixado com f) para inserir o conteúdo de variáveis diretamente entre chaves {}.',
        concept: 'Interpolação de Texto (f-string)',
        type: 'io',
      },
      {
        lineNumber: 23,
        code: '            elif opcao == "2":',
        explanation: '"elif" é a abreviação de "else if" (senão se). É testado somente se a condição anterior foi falsa.',
        concept: 'Condicional Encadeada (elif)',
        type: 'condition',
      },
      {
        lineNumber: 24,
        code: '            elif opcao == "3":',
        explanation: 'Testa a opção 3 para multiplicação.',
        concept: 'Condicional Encadeada (elif)',
        type: 'condition',
      },
      {
        lineNumber: 25,
        code: '            elif opcao == "4":',
        explanation: 'Testa a opção 4 para divisão.',
        concept: 'Condicional Encadeada (elif)',
        type: 'condition',
      },
      {
        lineNumber: 26,
        code: '        else:',
        explanation: '"else" (senão) captura qualquer entrada que não seja 0, 1, 2, 3 ou 4 e alerta o usuário.',
        concept: 'Caso Geral (else)',
        type: 'condition',
      },
      {
        lineNumber: 27,
        code: 'if __name__ == "__main__":',
        explanation: 'Boa prática em Python: garante que o código só seja executado quando o arquivo for rodado diretamente no terminal.',
        concept: 'Ponto de Entrada (__main__)',
        type: 'logic',
      },
      {
        lineNumber: 28,
        code: '    calculadora()',
        explanation: 'Inicia a execução da função principal do programa.',
        concept: 'Início do Programa',
        type: 'logic',
      },
    ],
  },

  basic: {
    id: 'basic',
    title: 'Iniciante Direto (Sem Loops)',
    badge: 'Mais Simples',
    description: 'A versão mais curta e acessível: lê dois números, pergunta a operação e exibe o resultado diretamente.',
    fullCode: `# Calculadora Básica e Direta em Python
# Ideal para os primeiros passos na programação

print("=== CALCULADORA BÁSICA ===")

# 1. Entrada de dados
# input() lê o texto digitado pelo usuário
# float() converte esse texto em um número com casas decimais
numero1 = float(input("Digite o primeiro número: "))
numero2 = float(input("Digite o segundo número: "))

# 2. Escolha do operador
print("\\nOperações disponíveis:")
print("+ : Soma")
print("- : Subtração")
print("* : Multiplicação")
print("/ : Divisão")
operacao = input("\\nQual operação você deseja realizar (+, -, *, /)? ")

# 3. Processamento das condições
if operacao == "+":
    resultado = numero1 + numero2
    print(f"\\nResultado: {numero1} + {numero2} = {resultado}")

elif operacao == "-":
    resultado = numero1 - numero2
    print(f"\\nResultado: {numero1} - {numero2} = {resultado}")

elif operacao == "*":
    resultado = numero1 * numero2
    print(f"\\nResultado: {numero1} * {numero2} = {resultado}")

elif operacao == "/":
    # Regra de proteção: não podemos dividir por zero!
    if numero2 == 0:
        print("\\nErro: Divisão por zero não é permitida!")
    else:
        resultado = numero1 / numero2
        print(f"\\nResultado: {numero1} / {numero2} = {resultado}")

else:
    print("\\nOperação inválida! Por favor, digite +, -, * ou /.")
`,
    lines: [
      {
        lineNumber: 1,
        code: '# Calculadora Básica e Direta em Python',
        explanation: 'Linha de comentário informativo.',
        concept: 'Comentário',
        type: 'comment',
      },
      {
        lineNumber: 2,
        code: 'numero1 = float(input("Digite o primeiro número: "))',
        explanation: 'Cria a variável "numero1", exibe a pergunta na tela e converte o que o usuário digitar em número com float().',
        concept: 'Variável e Conversão',
        type: 'io',
      },
      {
        lineNumber: 3,
        code: 'numero2 = float(input("Digite o segundo número: "))',
        explanation: 'Armazena o segundo valor digitado na variável "numero2".',
        concept: 'Variável e Conversão',
        type: 'io',
      },
      {
        lineNumber: 4,
        code: 'operacao = input("Qual operação você deseja realizar (+, -, *, /)? ")',
        explanation: 'Lê o símbolo matemático digitado pelo usuário ("+", "-", "*" ou "/"). Como queremos o texto do símbolo, não usamos float() aqui.',
        concept: 'Leitura de Texto (String)',
        type: 'io',
      },
      {
        lineNumber: 5,
        code: 'if operacao == "+":',
        explanation: 'Compara se o símbolo digitado foi o sinal de mais (+). Dois iguais (==) comparam igualdade.',
        concept: 'Condicional (if)',
        type: 'condition',
      },
      {
        lineNumber: 6,
        code: '    resultado = numero1 + numero2',
        explanation: 'Soma as duas variáveis numéricas e guarda o valor em "resultado".',
        concept: 'Operação de Adição',
        type: 'logic',
      },
      {
        lineNumber: 7,
        code: '    print(f"Resultado: {numero1} + {numero2} = {resultado}")',
        explanation: 'Exibe a resposta formatada na tela usando f-string.',
        concept: 'Saída de Dados (print)',
        type: 'io',
      },
      {
        lineNumber: 8,
        code: 'elif operacao == "/":',
        explanation: 'Se a operação for divisão, entramos neste bloco especial com verificação de zero.',
        concept: 'Condicional (elif)',
        type: 'condition',
      },
      {
        lineNumber: 9,
        code: '    if numero2 == 0:',
        explanation: 'Verifica se o divisor é 0 antes de tentar dividir, prevenindo a quebra do programa.',
        concept: 'Prevenção de Erro',
        type: 'condition',
      },
    ],
  },
};

export interface ConceptItem {
  id: string;
  title: string;
  summary: string;
  whyItMatters: string;
  pythonSyntax: string;
  beginnerTrap: string;
  exampleCode: string;
}

export const CONCEPTS: ConceptItem[] = [
  {
    id: 'functions',
    title: '1. Funções (def & return)',
    summary: 'Blocos de código reutilizáveis que realizam uma tarefa específica e podem devolver um resultado.',
    whyItMatters: 'Sem funções, você precisaria reescrever a mesma fórmula matemática toda vez que quisesse calcular. Com funções, o código fica limpo, legível e modular.',
    pythonSyntax: 'def nome_da_funcao(parametro1, parametro2):\n    # Instruções indentadas com 4 espaços\n    return resultado',
    beginnerTrap: 'Confundir "print()" com "return". O print() apenas desenha o texto na tela para você ler, mas não devolve o valor para o programa continuar usando. O return entrega o valor para uma variável.',
    exampleCode: `# Criando a função
def somar(a, b):
    return a + b

# Usando a função
total = somar(10, 5)  # total recebe 15
print(f"O total é {total}")`,
  },
  {
    id: 'input-casting',
    title: '2. Entrada de Dados e Conversão (input & float)',
    summary: 'A função input() recebe dados digitados pelo usuário sempre em formato de texto (string). float() converte para número decimal.',
    whyItMatters: 'No Python, somar textos junta as palavras ("5" + "5" vira "55"). Para que o Python realize a matemática real, precisamos transformar a resposta em número através de float().',
    pythonSyntax: 'valor_texto = input("Digite algo: ")  # É sempre texto\nvalor_numero = float(valor_texto)        # Agora é número!',
    beginnerTrap: 'Esquecer o float() e tentar somar direto: input() + input(). O resultado será concatenação de texto e não uma soma aritmética.',
    exampleCode: `# ERRADO:
x = input("Digite 5: ")  # x vale "5" (texto)
y = input("Digite 5: ")  # y vale "5" (texto)
print(x + y)             # Imprime "55"!

# CORRETO:
x = float(input("Digite 5: "))  # x vale 5.0 (número)
y = float(input("Digite 5: "))  # y vale 5.0 (número)
print(x + y)                    # Imprime 10.0!`,
  },
  {
    id: 'conditionals',
    title: '3. Estruturas Condicionais (if, elif, else)',
    summary: 'Permitem que o programa tome decisões e escolha qual caminho seguir de acordo com a opção escolhida pelo usuário.',
    whyItMatters: 'A calculadora precisa saber se você quer somar, subtrair, multiplicar ou dividir. O "if" testa a primeira opção, o "elif" testa opções alternativas, e o "else" cuida dos erros.',
    pythonSyntax: 'if condicao_1:\n    # Executa se a condicao_1 for verdadeira\nelif condicao_2:\n    # Executa se a condicao_2 for verdadeira\nelse:\n    # Executa se nenhuma das anteriores for verdadeira',
    beginnerTrap: 'Usar um único sinal de igual (=) em vez de dois (==). Um igual (=) é para guardar valor em variável (atribuição). Dois iguais (==) servem para testar igualdade (comparação).',
    exampleCode: `opcao = input("Escolha 1 para Somar ou 2 para Subtrair: ")

if opcao == "1":
    print("Você escolheu adição!")
elif opcao == "2":
    print("Você escolheu subtração!")
else:
    print("Opção desconhecida!")`,
  },
  {
    id: 'zero-division',
    title: '4. Proteção contra Divisão por Zero',
    summary: 'Na matemática, é impossível dividir qualquer número por 0. No computador, fazer isso causa uma parada abrupta do programa.',
    whyItMatters: 'Se alguém tentar fazer 10 / 0 em Python sem proteção, o programa quebra com o erro ZeroDivisionError: division by zero. Por isso, testamos sempre se o segundo número é zero antes de dividir.',
    pythonSyntax: 'if divisor == 0:\n    print("Não é possível dividir por zero!")\nelse:\n    resultado = dividendo / divisor',
    beginnerTrap: 'Colocar a verificação depois de já ter tentado dividir. A verificação precisa ocorrer ANTES da barra de divisão (/).',
    exampleCode: `def dividir(a, b):
    # Proteção de guarda
    if b == 0:
        return "Erro: O divisor não pode ser zero!"
    return a / b

print(dividir(10, 2))  # Retorna 5.0
print(dividir(10, 0))  # Retorna mensagem amigável sem quebrar!`,
  },
  {
    id: 'while-loop',
    title: '5. Repetição Contínua (while True & break)',
    summary: 'Permite que a calculadora faça vários cálculos seguidos sem que você precise reiniciar o script toda hora no terminal.',
    whyItMatters: 'Programas de console reais mantêm um menu ativo para conveniência do usuário e só fecham quando o usuário digita 0 ou "sair".',
    pythonSyntax: 'while True:\n    # Bloco que se repete\n    if condicao_para_sair:\n        break  # Sai do loop!',
    beginnerTrap: 'Criar um loop infinito sem nenhuma condição de saída (break). Se isso acontecer, o programa roda para sempre até ser cancelado à força (Ctrl+C).',
    exampleCode: `while True:
    comando = input("Digite 'sair' para fechar ou 'ok' para continuar: ")
    if comando == "sair":
        print("Até a próxima!")
        break
    print("Continuando o programa...")`,
  },
  {
    id: 'f-strings',
    title: '6. Formatação Moderna (f-strings)',
    summary: 'O jeito mais elegante e legível no Python 3 para misturar textos fixos com valores de variáveis.',
    whyItMatters: 'Antigamente era preciso converter tudo com str(num) e juntar com "+", o que gerava muitos erros de digitação e código confuso.',
    pythonSyntax: 'resultado = 42\nprint(f"O valor final é: {resultado}")',
    beginnerTrap: 'Esquecer da letra "f" antes das aspas! Sem o "f", o Python vai imprimir literalmente as chaves {resultado} em vez do número 42.',
    exampleCode: `a = 15
b = 5
soma = a + b

# Com f-string (Limpíssimo e moderno):
print(f"A soma de {a} com {b} resulta em {soma}!")
# Saída: A soma de 15 com 5 resulta em 20!`,
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Se um usuário digitar "10" e depois "20", e você somar diretamente sem usar float(), qual será o resultado?',
    options: [
      '30 (a soma matemática)',
      '"1020" (os textos são colados um ao lado do outro)',
      'Um erro fatal de sistema',
      '0 (número nulo)',
    ],
    correctIndex: 1,
    explanation: 'A função input() sempre devolve texto (string). Ao somar duas strings com o sinal "+", o Python faz concatenação (junta os textos), resultando em "1020" em vez de 30!',
  },
  {
    id: 2,
    question: 'Por que é obrigatório verificar se o segundo número é zero antes de fazer uma divisão?',
    options: [
      'Porque o resultado seria um número infinito que não cabe na memória',
      'Porque divisão por zero não é permitida matematicamente e dispara o erro ZeroDivisionError no Python',
      'Porque o Python converte automaticamente zero para o número 1',
      'Não é obrigatório, o Python resolve normalmente dando zero',
    ],
    correctIndex: 1,
    explanation: 'Em Python, tentar dividir qualquer número por 0 dispara a exceção "ZeroDivisionError", o que trava o programa imediatamente caso não haja uma verificação prévia.',
  },
  {
    id: 3,
    question: 'Qual é a diferença fundamental entre "print()" e "return"?',
    options: [
      'print() devolve o valor para ser guardado em uma variável, enquanto return só exibe na tela',
      'print() serve apenas para exibir algo visual na tela, enquanto return devolve o valor de uma função para quem a chamou',
      'Ambos fazem exatamente a mesma coisa, são sinônimos',
      'return é exclusivo para somas e multiplicações',
    ],
    correctIndex: 1,
    explanation: 'O comando print() desenha o texto no terminal para que o ser humano veja, mas o programa "perde" esse dado. Já o return envia o valor calculado de volta para a variável continuar o cálculo.',
  },
  {
    id: 4,
    question: 'Para que serve o comando "break" dentro do laço "while True"?',
    options: [
      'Para fazer uma pausa de 1 segundo na execução',
      'Para reiniciar a calculadora do começo',
      'Para interromper imediatamente o loop e sair dele quando o usuário desejar',
      'Para apagar os dados da memória',
    ],
    correctIndex: 2,
    explanation: 'O comando "break" quebra o fluxo de repetição do loop, permitindo que o programa continue nas linhas seguintes ao bloco while.',
  },
];
