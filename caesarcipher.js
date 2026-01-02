/**
 * Encripta ou Decripta um texto usando a Cifra de César.
 * @param {string} str - O texto original.
 * @param {number} deslocamento - Quantas posições pular no alfabeto.
 * @returns {string} - O texto cifrado.
 */
function cifraDeCesar(str, deslocamento) {
    // Garante que o deslocamento esteja entre 0 e 25
    const shift = deslocamento % 26;
    
    return str.split('').map(char => {
        let code = char.charCodeAt(0);

        // Verifica se é uma letra maiúscula (A-Z: 65-90)
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
        // Verifica se é uma letra minúscula (a-z: 97-122)
        else if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
        }
        // Se for número ou símbolo, mantém igual
        return char;
    }).join('');
}

// Exemplo de execução
const mensagemOriginal = "Ola Mundo 2026!";
const mensagemCifrada = cifraDeCesar(mensagemOriginal, 3);

console.log("Original: " + mensagemOriginal);
console.log("Cifrada (+3): " + mensagemCifrada); 
// Resultado esperado: "Rnd Pxqgr 2026!"
