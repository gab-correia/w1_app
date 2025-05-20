CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

INSERT INTO users (name, email) VALUES
('Gabriel', 'gabriel@example.com'),
('DaniloMalvado', 'daniloMalvado@example.com'),
('FelipinhoBonzinho', 'felipinhoBonzinho@example.com');

