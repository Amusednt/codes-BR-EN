import os
import shutil

def organizar_pasta(caminho_diretorio):
    """
    Organiza arquivos em subpastas com base em suas extensões.
    :param caminho_diretorio: O caminho da pasta que você deseja limpar.
    """
    # Mapeamento de extensões para nomes de pastas
    formatos = {
        "Imagens": [".jpg", ".jpeg", ".png", ".gif", ".svg"],
        "Documentos": [".pdf", ".docx", ".txt", ".xlsx", ".pptx"],
        "Videos": [".mp4", ".mkv", ".mov", ".avi"],
        "Compactados": [".zip", ".rar", ".7z"],
        "Executaveis": [".exe", ".msi"]
    }

    # Muda o diretório de trabalho para o alvo
    os.chdir(caminho_diretorio)

    # Itera sobre cada arquivo na pasta
    for arquivo in os.listdir():
        if os.path.isfile(arquivo):
            nome, extensao = os.path.splitext(arquivo)
            extensao = extensao.lower()

            # Verifica em qual categoria a extensão se encaixa
            movido = False
            for pasta, extensoes_alvo in formatos.items():
                if extensao in extensoes_alvo:
                    # Cria a pasta se ela não existir
                    if not os.path.exists(pasta):
                        os.makedirs(pasta)
                    
                    # Move o arquivo para a pasta correspondente
                    shutil.move(arquivo, f"{pasta}/{arquivo}")
                    print(f"Movido: {arquivo} -> {pasta}")
                    movido = True
                    break
            
            if not movido:
                print(f"Ignorado (sem categoria): {arquivo}")

# Exemplo de uso (Altere para o caminho da sua pasta):
# organizar_pasta("C:/Users/Usuario/Downloads")
