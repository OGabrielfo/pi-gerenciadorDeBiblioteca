# Use uma imagem oficial do Node.js como base
FROM node:21

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do projeto
COPY . .

# Construa o projeto Next.js
RUN npm run build

# Exponha a porta que o Next.js utilizará
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "start"]
