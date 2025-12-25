async function converterMoeda(valor, daMoeda, paraMoeda) {
    const url = https://api.exchangerate-api.com/v4/latest/${daMoeda};
    
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        const taxa = dados.rates[paraMoeda];
        const resultado = valor * taxa;
        
        console.log(${valor} ${daMoeda} equivale a ${resultado.toFixed(2)} ${paraMoeda});
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
    }
}

// Exemplo de uso: Converter 100 Reais para Dólares
converterMoeda(100, 'BRL', 'USD');
