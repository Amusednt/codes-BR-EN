/**
 * Gera uma senha aleatória segura
 * @param {number} tamanho - Quantidade de caracteres da senha
 */
function gerarSenha(tamanho = 12) {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let senha = "";

    // Loop para selecionar caracteres aleatórios da string acima
    for (let i = 0; i < tamanho; i++) {
        // Gera um índice aleatório entre 0 e o comprimento da string de caracteres
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        
        // Adiciona o caractere sorteado à senha final
        senha += caracteres.charAt(indiceAleatorio);
    }

    return senha;
}

// Exemplo de uso: gera uma senha de 16 caracteres e exibe no console
const novaSenha = gerarSenha(16);
console.log("Sua nova senha segura é: " + novaSenha);
