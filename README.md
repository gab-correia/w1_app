🏛️ Aplicativo W1 — Plataforma de Gestão Patrimonial

Este é um WebApp full-stack construído para gestão de holdings e planejamento patrimonial. O sistema utiliza React no frontend, Node.js no backend, e Flowise como motor de inteligência artificial. Toda a aplicação roda via Docker.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ **Frontend**: React + Vite + Tailwind + ShadCN
- 🛠️ **Backend**: Node.js + Express
- 🧠 **IA**: Flowise (No-code LLM Tool)
- 🐳 **Infra**: Docker + Docker Compose

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
    cd w1_app
    docker-compose up --build
    ./restore.sh
    backup-2025-05-22_20-02-16.sql
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
      ./restore.sh
      backup-2025-05-22_20-02-16.sql
      ```

4. **Verifique os containers**:
    - Certifique-se de que todos os containers estão em execução no Docker Desktop.

---

## 🛠️ Como acessar o projeto

1. **Frontend**: Acesse `http://localhost:4000` no navegador para visualizar a interface do aplicativo.
2. **Backend**: A API estará disponível em `http://localhost:5000`.
3. **Flowise**: Acesse `http://localhost:3001` para interagir com o motor de IA.

---
### 🔑 Credenciais de Acesso

#### Cliente
- **Login**: `danilo@123`
- **Senha**: `123`

#### Consultor
- **Login**: `consultor@consultor`
- **Senha**: `w1`

### 🆕 Crie sua Conta

Sinta-se à vontade para criar uma conta como cliente diretamente na interface do aplicativo. Basta clicar na opção **Registrar-se**. 

---

## 📝 Notas Adicionais

- Certifique-se de que o Docker e o Docker Compose estão corretamente instalados e configurados.
- Caso encontre problemas de permissão com o Docker, reinicie o sistema após adicionar o usuário ao grupo Docker.
### ❗ Problemas Comuns

#### 🛠️ Falha ao executar `./restore.sh` por falta de permissão

Caso encontre problemas de permissão ao tentar executar o script `./restore.sh`, siga os passos abaixo:

1. **Dê permissão de execução ao script**:
    ```bash
    chmod +x restore.sh
    ```

2. **Execute o script novamente**:
    ```bash
    ./restore.sh
    ```

Se o problema persistir, verifique se você está no diretório correto e se possui as permissões necessárias para executar scripts no sistema.

Agora você está pronto para explorar o Aplicativo W1! 🏛️ Aplicativo W1 — Plataforma de Gestão Patrimonial
