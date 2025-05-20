# Dockerfile.dev
FROM node:18-alpine

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta do Vite Dev Server
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
