/**
 * Executa uma busca binária em um array ordenado.
 * @param {number[]} lista - Array de números (DEVE estar ordenado).
 * @param {number} alvo - O número que estamos procurando.
 */
function buscaBinaria(lista, alvo) {
    let inicio = 0;
    let fim = lista.length - 1;
    let tentativas = 0;

    console.log(`--- Iniciando busca pelo número ${alvo} ---`);

    while (inicio <= fim) {
        tentativas++;
        // Encontra o meio do array
        let meio = Math.floor((inicio + fim) / 2);
        let chute = lista[meio];

        if (chute === alvo) {
            console.log(`✅ Encontrado na posição ${meio} após ${tentativas} tentativas.`);
            return meio;
        }

        if (chute > alvo) {
            // Se o chute foi alto demais, descarta a metade direita
            fim = meio - 1;
        } else {
            // Se o chute foi baixo demais, descarta a metade esquerda
            inicio = meio + 1;
        }
    }

    console.log("❌ O número não existe na lista.");
    return null;
}

// Criando uma lista de 1 a 100 para o teste
const numeros = Array.from({length: 100}, (_, i) => i + 1);

// Testando a eficiência (O logaritmo de 100 é aprox. 7, então deve achar em no máximo 7 passos)
buscaBinaria(numeros, 73);
