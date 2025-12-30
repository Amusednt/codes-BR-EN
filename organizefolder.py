import os
import shutil

def organizar_pasta(diretorio):
    # Define o mapeamento de extensões para pastas específicas
    formatos = {
        "Imagens": [".jpg", ".jpeg", ".png", ".gif"],
        "Documentos": [".pdf", ".docx", ".txt", ".xlsx"],
        "Videos": [".mp4", ".mkv", ".mov"],
        "Compactados": [".zip", ".rar", ".7z"]
    }

    # Muda o diretório de trabalho para o local desejado
    os.chdir(diretorio)

    for arquivo in os.listdir():
        # Ignora se for uma pasta
        if os.path.isdir(arquivo):
            continue
            
        # Extrai a extensão do arquivo
        nome, extensao = os.path.splitext(arquivo)
        extensao = extensao.lower()

        # Verifica em qual categoria o arquivo se encaixa
        for pasta, extensoes_suportadas in formatos.items():
            if extensao in extensoes_suportadas:
                # Cria a pasta caso ela não exista
                if not os.path.exists(pasta):
                    os.makedirs(pasta)
                
                # Move o arquivo para a nova pasta
                shutil.move(arquivo, f"{pasta}/{arquivo}")
                print(f"Movido: {arquivo} -> {pasta}")

# Execução: Substitua pelo caminho da sua pasta de testes
# organizar_pasta("C:/Users/SeuUsuario/Downloads")
