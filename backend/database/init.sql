CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS consultores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS consultor_clientes (
    consultor_id INTEGER NOT NULL,
    cliente_id INTEGER NOT NULL,
    PRIMARY KEY (consultor_id, cliente_id),
    FOREIGN KEY (consultor_id) REFERENCES consultores(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS holdings (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(20) UNIQUE,
    consultor_id INTEGER NOT NULL,
    data_constituicao DATE,
    FOREIGN KEY (consultor_id) REFERENCES consultores(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS holding_socios (
    holding_id INTEGER NOT NULL,
    cliente_id INTEGER NOT NULL,
    percentual_participacao DECIMAL(5,2),
    tipo_socio VARCHAR(50),
    PRIMARY KEY (holding_id, cliente_id),
    FOREIGN KEY (holding_id) REFERENCES holdings(id) ON DELETE CASCADE,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
);

CREATE TABLE patrimonios (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id) ON DELETE CASCADE,
  categoria TEXT NOT NULL,
  valor NUMERIC(12, 2) NOT NULL,
  data_aquisicao DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);