# Use a imagem base do Node.js
FROM node:21

# Defina o diretório de trabalho
WORKDIR /frontend 

# Copie o arquivo package.json e package-lock.json
COPY package.json package-lock.json ./

# Instale as dependências do projeto
RUN npm install

# Adicione comandos para verificar o estado do node e npm
RUN node -v
RUN npm -v
RUN ls -la

# Copie o restante do código do projeto
COPY . .

# Garanta que o node esteja no PATH durante o build
RUN ln -s /frontend/node_modules/.bin/node /usr/local/bin/node

# Construa o projeto Next.js
RUN npm run build

# Exponha a porta que o Next.js utilizará
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "start"]
