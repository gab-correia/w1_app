const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require('./db'); 

const authRoutes = require('./auth');

const app = express();

app.use(cors());
app.use(express.json());

// Middleware de autenticação JWT
const autenticarJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido ou inválido' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Erro ao verificar token:', err.message);
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};

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

// Rota protegida que retorna lista de usuários
app.get('/api/users', autenticarJWT, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao acessar o banco:', error);
    res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
  }
});

// Rota protegida que retorna os patrimônios do cliente logado
app.get('/api/patrimonios', autenticarJWT, async (req, res) => {
  try {
    const userId = req.user.id;

    // Buscar cliente_id a partir de user_id
    const clienteResult = await pool.query(
      'SELECT id FROM clientes WHERE user_id = $1',
      [userId]
    );

    if (clienteResult.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const clienteId = clienteResult.rows[0].id;

    // Buscar patrimônios do cliente
    const patrimoniosResult = await pool.query(
      'SELECT categoria, valor FROM patrimonios WHERE cliente_id = $1',
      [clienteId]
    );

    res.json(patrimoniosResult.rows);
  } catch (error) {
    console.error('Erro ao buscar patrimônios:', error);
    res.status(500).json({ error: 'Erro ao buscar patrimônios' });
  }
});

// Rotas de autenticação
app.use(authRoutes);

// Rota de healthcheck
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Backend funcionando!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
