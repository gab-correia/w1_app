const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // instale esse pacote com npm
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota que envia pergunta para Flowise
app.post('/api/chat', async (req, res) => {
  const { question } = req.body;

  try {
    const response = await fetch('http://flowise:3001/api/v1/prediction/88f7a3c1-4677-4cc7-94be-964628fd7722', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro ao consultar Flowise:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
