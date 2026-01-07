from PIL import Image
import os

def criar_thumbnails(pasta_origem, tamanho=(128, 128)):
    """
    Percorre uma pasta, redimensiona todas as imagens encontradas 
    e as salva em uma pasta 'thumbnails'.
    :param pasta_origem: Caminho da pasta com as imagens originais.
    :param tamanho: Tupla (largura, altura) para a miniatura.
    """
    pasta_destino = os.path.join(pasta_origem, "thumbnails")

    # Cria a pasta de destino se não existir
    if not os.path.exists(pasta_destino):
        os.makedirs(pasta_destino)

    # Lista arquivos na pasta de origem
    for arquivo in os.listdir(pasta_origem):
        # Verifica se o arquivo é uma imagem comum
        if arquivo.lower().endswith(('.png', '.jpg', '.jpeg')):
            try:
                caminho_completo = os.path.join(pasta_origem, arquivo)
                img = Image.open(caminho_completo)
                
                # O método 'thumbnail' redimensiona mantendo a proporção (aspect ratio)
                img.thumbnail(tamanho)
                
                # Salva a nova imagem na pasta de destino
                img.save(os.path.join(pasta_destino, f"thumb_{arquivo}"))
                print(f"Thumbnail criada para: {arquivo}")
            except Exception as e:
                print(f"Erro ao processar {arquivo}: {e}")

# Exemplo de uso:
# criar_thumbnails("./minhas_fotos")
