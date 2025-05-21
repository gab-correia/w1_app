🏛️ Aplicativo W1 — Plataforma de Gestão Patrimonial

Este é um WebApp full-stack construído para gestão de holdings e planejamento patrimonial. O sistema utiliza React no frontend, Node.js no backend, e Flowise como motor de inteligência artificial. Toda a aplicação roda via Docker.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ **Frontend**: React + Vite + Tailwind + ShadCN
- 🛠️ **Backend**: Node.js + Express
- 🧠 **IA**: Flowise (No-code LLM Tool)
- 🐳 **Infra**: Docker + Docker Compose

---

## 🧰 Requisitos para rodar o projeto

### ✅ Linux

1. **Atualize os pacotes e instale dependências necessárias**:
    ```bash
    sudo apt update
    sudo apt install git docker.io docker-compose -y
    ```

2. **Adicione seu usuário ao grupo Docker**:
    ```bash
    sudo usermod -aG docker $USER
    newgrp docker
    ```

3. **Clone o repositório e inicie o projeto**:
    ```bash
    git clone https://github.com/gab-correia/aplicativo-w1
    cd aplicativo-w1
    docker-compose up --build
    ```

---

### ✅ Windows

1. **Instale o Docker Desktop**:
    - Baixe e instale o [Docker Desktop](https://www.docker.com/products/docker-desktop/).
    - Certifique-se de habilitar a integração com o WSL 2 durante a instalação.

2. **Habilite o WSL 2**:
    - Caso ainda não tenha o WSL 2 configurado, siga as instruções oficiais da [documentação do WSL](https://learn.microsoft.com/pt-br/windows/wsl/install).

3. **Clone o repositório e inicie o projeto**:
    - Abra o terminal (PowerShell ou WSL) e execute os comandos:
      ```bash
      git clone https://github.com/seu-usuario/aplicativo-w1.git
      cd aplicativo-w1
      docker-compose up --build
      ```

4. **Verifique os containers**:
    - Certifique-se de que todos os containers estão em execução no Docker Desktop.

--- 

## 📂 Estrutura do Projeto

```plaintext
aplicativo-w1/
├── backend/        # Servidor Express com API
├── frontend/       # Interface React + Vite
├── flowise/        # Container com Flowise
├── flowise_data/   # Dados persistentes do Flowise
└── docker-compose.yml
```

---

## 🛠️ Como acessar o projeto

1. **Frontend**: Acesse `http://localhost:3000` no navegador para visualizar a interface do aplicativo.
2. **Backend**: A API estará disponível em `http://localhost:5000`.
3. **Flowise**: Acesse `http://localhost:8080` para interagir com o motor de IA.

---

## 📝 Notas Adicionais

- Certifique-se de que o Docker e o Docker Compose estão corretamente instalados e configurados.
- Caso encontre problemas de permissão com o Docker, reinicie o sistema após adicionar o usuário ao grupo Docker.
- Para persistência de dados, os volumes do Docker são configurados automaticamente.

Agora você está pronto para explorar o Aplicativo W1! 🏛️ Aplicativo W1 — Plataforma de Gestão Patrimonial




docker exec -t w1_app_postgres_1 pg_dump -U admin -d resumos > backend/database/backup.sql


./backup.sh
./restore.sh
