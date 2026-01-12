import csv
import json

def converter_csv_para_json(arquivo_csv, arquivo_json):
    """
    Lê um arquivo CSV e converte cada linha em um objeto dentro de um JSON.
    :param arquivo_csv: Caminho do arquivo .csv de origem
    :param arquivo_json: Caminho do arquivo .json de destino
    """
    lista_dados = []

    try:
        # Abre o CSV para leitura
        with open(arquivo_csv, encoding='utf-8') as f_csv:
            # Usa DictReader para que a primeira linha do CSV vire as chaves do dicionário
            leitor = csv.DictReader(f_csv)
            for linha in leitor:
                lista_dados.append(linha)

        # Salva a lista de dicionários como um arquivo JSON formatado
        with open(arquivo_json, 'w', encoding='utf-8') as f_json:
            json.dump(lista_dados, f_json, indent=4, ensure_ascii=False)
            
        print(f"✅ Conversão concluída: {arquivo_json}")

    except Exception as e:
        print(f"❌ Erro na conversão: {e}")

# Exemplo de uso (Crie um dados.csv para testar):
# converter_csv_para_json('vendas.csv', 'vendas.json')
