import random

def simular_lancamentos(quantidade):
    """
    Função que simula o lançamento de dois dados.
    Armazena os resultados em um dicionário para análise.
    """
    resultados = {}

    for _ in range(quantidade):
        # Gera valores aleatórios entre 1 e 6 para dois dados
        dado1 = random.randint(1, 6)
        dado2 = random.randint(1, 6)
        soma = dado1 + dado2

        # Registra a soma no dicionário de frequências
        if soma in resultados:
            resultados[soma] += 1
        else:
            resultados[soma] = 1
    
    return resultados

def exibir_estatisticas(dados_coletados):
    """
    Formata e exibe os resultados na tela.
    """
    print("--- Resultados da Simulação ---")
    # Ordena os resultados pela soma (chave do dicionário)
    for soma in sorted(dados_coletados.keys()):
        frequencia = dados_coletados[soma]
        print(f"Soma {soma:2}: Ocorreu {frequencia} vezes")

# Execução do código
if __name__ == "__main__":
    # Simula 1000 lançamentos
    meus_dados = simular_lancamentos(1000)
    exibir_estatisticas(meus_dados)
