import secrets
import string

def gerar_senha_segura(comprimento=16):
    """
    Gera uma senha aleatória de alta complexidade.
    
    Args:
        comprimento (int): Quantidade de caracteres da senha.
        
    Returns:
        str: A senha gerada contendo letras, números e símbolos.
    """
    # Define os caracteres possíveis: letras (maiúsculas/minúsculas), dígitos e pontuação
    caracteres = string.ascii_letters + string.digits + string.punctuation
    
    # Usa secrets.choice para garantir segurança criptográfica na escolha
    senha = ''.join(secrets.choice(caracteres) for _ in range(comprimento))
    
    return senha

def analisar_complexidade(senha):
    """
    Avalia a força da senha baseada no comprimento.
    """
    if len(senha) < 12:
        return "Fraca"
    elif len(senha) < 16:
        return "Boa"
    else:
        return "Excelente"

# Execução principal
if __name__ == "__main__":
    nova_senha = gerar_senha_segura(20)
    print(f"Senha Gerada: {nova_senha}")
    print(f"Nível de Segurança: {analisar_complexidade(nova_senha)}")
