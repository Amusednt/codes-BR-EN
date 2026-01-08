/**
 * Busca dados meteorológicos de uma cidade específica.
 * @param {string} cidade - Nome da cidade para consulta.
 */
async function obterPrevisao(cidade) {
    // Usamos a API pública Open-Meteo (não requer chave de API para testes)
    // Primeiro buscamos as coordenadas (latitude/longitude) da cidade
    const urlGeocoding = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`;

    try {
        console.log(`🔍 Buscando informações para: ${cidade}...`);
        
        const resGeo = await fetch(urlGeocoding);
        const dadosGeo = await resGeo.json();

        if (!dadosGeo.results) {
            throw new Error("Cidade não encontrada.");
        }

        const { latitude, longitude, name, country } = dadosGeo.results[0];

        // Agora buscamos o clima atual usando as coordenadas
        const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        
        const resClima = await fetch(urlClima);
        const dadosClima = await resClima.json();

        const clima = dadosClima.current_weather;

        console.log(`
--- 🌍 Clima em ${name}, ${country} ---
🌡️ Temperatura: ${clima.temperature}°C
💨 Velocidade do Vento: ${clima.windspeed} km/h
🕒 Horário da Leitura: ${clima.time}
----------------------------------
        `);

    } catch (erro) {
        console.error("❌ Erro:", erro.message);
    }
}

// Testando com uma cidade
obterPrevisao("Sao Paulo");
