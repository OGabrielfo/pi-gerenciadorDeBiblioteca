# Use a imagem base do Node.js
FROM node:21

# Defina o diretório de trabalho
WORKDIR /frontend

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY package.json package-lock.json ./

# Instale as dependências do Node.js no contêiner
RUN npm install

# Copie todo o restante do código do frontend, excluindo a pasta node_modules
COPY . .

# Remova qualquer pasta node_modules que possa ter sido copiada inadvertidamente
RUN rm -rf ./node_modules

# Instale as dependências do Node.js no contêiner
RUN npm install

# Construa o aplicativo
RUN npm run build

# Exponha a porta em que o app vai rodar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]

