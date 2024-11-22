# Use uma imagem oficial do Python como base
FROM python:3.10

# Defina o diretório de trabalho no contêiner
WORKDIR /backend

# Copie os requisitos do projeto
COPY requirements.txt .

# Instale as dependências do projeto
RUN pip install -r requirements.txt

# Copie o restante do código do projeto
COPY . .

# Defina a variável de ambiente para o Django
ENV DJANGO_SETTINGS_MODULE=drp03_pi.settings

# Exponha a porta que o Django utilizará
EXPOSE 8080

# Comando para iniciar o servidor Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]
