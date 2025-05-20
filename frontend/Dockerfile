# Etapa de build
FROM node:18-alpine AS build

WORKDIR /app

# Copia arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia todo o restante e roda o build do Vite
COPY . .
RUN npm run build

# Etapa de produção: usa Nginx para servir o app
FROM nginx:stable-alpine

# Copia o build final para a pasta do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta do Nginx
EXPOSE 4000

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]
