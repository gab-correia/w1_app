const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();
const pool = require('./db'); 

const authRoutes = require('./auth');

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

app.get('/api/users', async (req, res) => {
  try {
    // Lê o header Authorization
    const authHeader = req.headers['authorization']; // ou req.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token não fornecido ou inválido' });
    }

    // Se quiser extrair o token puro:
    const token = authHeader.replace('Bearer ', '');

    // Aqui você pode validar o token, se necessário

    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao acessar o banco:', error);
    res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
  }
});


app.use(authRoutes);

app.get('/api/ping', (req, res) => {
  res.json({ message: 'Backend funcionando!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});