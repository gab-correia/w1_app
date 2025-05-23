const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'segredoUltraSeguro';

// 🔐 Cadastro
router.post('/api/auth/register', async (req, res) => {
  const { name, email, password, userType } = req.body;
  console.log('📥 Dados recebidos no cadastro:', req.body);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await client.query(
      'INSERT INTO users (name, email, password, user_type) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, userType]
    );

    const user = userResult.rows[0];
    console.log('✅ Usuário cadastrado:', user);

    if (userType === 'client') {
      await client.query('INSERT INTO clientes (user_id) VALUES ($1)', [user.id]);
      console.log('👤 Cliente inserido.');
    } else if (userType === 'consultant') {
      await client.query('INSERT INTO consultores (user_id) VALUES ($1)', [user.id]);
      console.log('🧠 Consultor inserido.');
    }

    await client.query('COMMIT');

    res.json({ message: 'Usuário registrado!', user });

  } catch (error) {
    await client.query('ROLLBACK');

    if (error.code === '23505') {
      console.log('⚠️ E-mail já existe:', email);
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    console.error('❌ Erro no cadastro:', error);
    res.status(500).json({ error: 'Erro no cadastro' });

  } finally {
    client.release();
  }
});

// 🔐 Login
router.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('🔐 Tentativa de login:', email);

  // ✅ Caso especial: acesso direto para o consultor
  if (email === 'consultor@consultor' && password === 'w1') {
    const token = jwt.sign(
      { id: 'consultor', userType: 'consultant' },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    console.log('✅ Login especial de consultor bem-sucedido');

    return res.json({
      message: 'Login bem-sucedido',
      token,
      userType: 'consultant',
    });
  }

  // ✅ Caso especial: acesso direto para o cliente
  if (email === 'cliente@cliente' && password === 'w1') {
    const token = jwt.sign(
      { id: 'cliente', userType: 'client' },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    console.log('✅ Login especial de cliente bem-sucedido');

    return res.json({
      message: 'Login bem-sucedido',
      token,
      userType: 'client',
    });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      console.log('❌ Usuário não encontrado:', email);
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('❌ Senha incorreta para:', email);
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      { id: user.id, userType: user.user_type },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    console.log('✅ Login bem-sucedido para:', email);

    res.json({
      message: 'Login bem-sucedido',
      token,
      userType: user.user_type,
    });
  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({ error: 'Erro no login' });
  }
});

module.exports = router;
