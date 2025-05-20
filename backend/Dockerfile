# Use uma imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta que a aplicação irá rodar
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]

