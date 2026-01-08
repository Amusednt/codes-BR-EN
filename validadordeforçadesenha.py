import re

def verificar_forca_senha(senha):
    """
    Analisa uma senha e retorna uma pontuação baseada em critérios de segurança.
    :param senha: A string da senha a ser testada.
    """
    pontuacao = 0
    criterios = {
        "Comprimento (mínimo 8)": len(senha) >= 8,
        "Possui Letra Maiúscula": re.search(r"[A-Z]", senha) is not None,
        "Possui Letra Minúscula": re.search(r"[a-z]", senha) is not None,
        "Possui Número": re.search(r"\d", senha) is not None,
        "Possui Caractere Especial": re.search(r"[!@#$%^&*(),.?\":{}|<>]", senha) is not None
    }

    print(f"--- Analisando Senha ---")
    
    for nome, atendido in criterios.items():
        status = "✅" if atendido else "❌"
        if atendido: pontuacao += 1
        print(f"{status} {nome}")

    # Classificação final
    if pontuacao == 5:
        resultado = "Forte 💪"
    elif pontuacao >= 3:
        resultado = "Média ⚠️"
    else:
        resultado = "Fraca 🔴"

    print(f"\nResultado Final: {resultado}")

# Exemplo de uso
verificar_forca_senha("Python@2026")
