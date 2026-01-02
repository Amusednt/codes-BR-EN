import os
import shutil

def organizar_diretorio(caminho):
    """
    Percorre uma pasta e move arquivos para subpastas 
    baseadas na sua extensão.
    """
    # Lista todos os arquivos na pasta informada
    for nome_arquivo in os.listdir(caminho):
        caminho_completo = os.path.join(caminho, nome_arquivo)

        # Verifica se é um arquivo (e não uma pasta)
        if os.path.isfile(caminho_completo):
            # Extrai a extensão do arquivo (ex: .png)
            extensao = nome_arquivo.split('.')[-1].lower() if '.' in nome_arquivo else 'sem_extensao'
            
            # Cria a pasta de destino se ela não existir
            pasta_destino = os.path.join(caminho, extensao)
            if not os.path.exists(pasta_destino):
                os.makedirs(pasta_destino)
            
            # Move o arquivo para a nova pasta
            shutil.move(caminho_completo, os.path.join(pasta_destino, nome_arquivo))
            print(f"Movido: {nome_arquivo} -> Pasta {extensao}")

# Exemplo de uso (Cuidado: use um caminho de pasta de teste primeiro!)
# organizar_diretorio('./minha_pasta_baguncada')
print("Função de organização pronta para uso.")
