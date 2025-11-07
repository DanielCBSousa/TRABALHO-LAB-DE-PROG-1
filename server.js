const express = require('express');
const app = express();
const port = 3000;

// Middleware para analisar JSON no corpo da requisição
app.use(express.json());

// Endpoint POST /health ou /health/check
app.post('/health', (req, res) => {
    // 2. Receber o array do corpo da requisição
    const arrayDeDados = req.body.data; 

    // 3. Executar as verificações
    
    // a. Verificar se é um array
    if (!Array.isArray(arrayDeDados)) {
        return res.status(400).json({ 
            status: 'Não Saudável',
            mensagem: 'A entrada deve ser um array.',
            codigo: 'ERRO_NAO_ARRAY'
        });
    }

    // b. Verificar o tamanho mínimo do array (maior que 4 index = tamanho > 4)
    if (arrayDeDados.length <= 4) {
        return res.status(400).json({ 
            status: 'Não Saudável',
            mensagem: 'O array deve ter mais de 4 elementos (tamanho > 4).',
            codigo: 'ERRO_TAMANHO_ARRAY'
        });
    }

    // c. Percorrer o array (a lógica que você pediu)
    // Se o objetivo for APENAS percorrer sem uma validação específica, 
    // podemos apenas simular o loop. Se houver uma validação, ela iria aqui.
    let contador = 0;
    for (const elemento of arrayDeDados) {
        // Exemplo de uma ação que a API faria ao "percorrer"
        // console.log(`Processando elemento: ${elemento}`);
        contador++;
    }
    
    // d. Checagem final e retorno de sucesso
    if (contador === arrayDeDados.length) {
        // Retorna status 200 (OK) indicando sucesso
        return res.status(200).json({
            status: 'Saudável',
            mensagem: 'API saudável! Array processado com sucesso.',
            elementos_processados: contador
        });
    } else {
         // Caso a contagem falhe por algum motivo inesperado
         return res.status(500).json({ 
            status: 'Erro Interno',
            mensagem: 'Falha ao processar todos os elementos do array.',
            codigo: 'ERRO_PROCESSAMENTO_INTERNO'
        });
    }
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});