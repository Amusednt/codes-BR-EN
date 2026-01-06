def transformar_arquivo(arquivo_entrada, arquivo_saida, chave, modo='encriptar'):
    """
    Encripta ou decripta um arquivo usando um deslocamento de bytes simples.
    :param arquivo_entrada: Nome do arquivo original.
    :param arquivo_saida: Nome do arquivo que será gerado.
    :param chave: Inteiro que serve como chave de deslocamento.
    :param modo: 'encriptar' para proteger, 'decriptar' para restaurar.
    """
    # Ajusta a chave se for para decriptar
    if modo == 'decriptar':
        chave = -chave

    try:
        # Lê os dados binários do arquivo original
        with open(arquivo_entrada, 'rb') as f:
            dados = f.read()

        # Aplica a lógica de deslocamento em cada byte (0-255)
        # O operador % 256 garante que o valor permaneça no intervalo de bytes
        dados_transformados = bytearray((b + chave) % 256 for b in dados)

        # Grava o resultado no novo arquivo
        with open(arquivo_saida, 'wb') as f:
            f.write(dados_transformados)

        print(f"Sucesso! Arquivo '{arquivo_saida}' gerado no modo: {modo}.")

    except FileNotFoundError:
        print("Erro: Arquivo original não encontrado.")

# Exemplo funcional:
# criar um arquivo 'segredo.txt' e depois rodar:
# transformar_arquivo('segredo.txt', 'segredo.enc', 42, 'encriptar')
# transformar_arquivo('segredo.enc', 'segredo_revelado.txt', 42, 'decriptar')
