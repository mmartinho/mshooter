# A partir desta imagem do docker hub, node 16, linux alpine 3
FROM node:16.19.0-alpine3.17

# Diretorio de trabalho do container
WORKDIR /app

# Variavel usada durante a geracao da imagem
ARG PORT_BUILD=3000

# Variáveis de Ambiente. Podem ser vistas por todo o container
ENV NODE_ENV="production"
ENV API_PORT=$PORT_BUILD
ENV API_HOST="0.0.0.0"
ENV API_ENTERNAL_HOST="10.47.60.38"
ENV API_EXTERNAL_PORT="8080"
ENV DB_USERNAME="mshooter"
ENV DB_PASSWORD="123456"
ENV DB_DATABASE="mshooter"
ENV DB_HOST="172.18.0.2"
ENV DB_PORT=3306
ENV TOKEN_KEY="production"
ENV EMAIL_HOST="172.18.0.1"
ENV EMAIL_PORT=25
ENV EMAIL_USUARIO=""
ENV EMAIL_SENHA=""
ENV EMAIL_SECURE=0
ENV EMAIL_IGNORETLS=1
ENV EMAIL_REQUIRETLS=0
ENV TEMP_FILE_DIR="temp"
ENV TEMPLATES_DIR="shared/templates"
ENV LOGS_DIR="logs"

VOLUME /app/logs

COPY package*.json ./

# Executar a instalacao dos componentes do node antes de gerar a imagem
RUN npm ci --omit=dev

# Copiar o diretorio atual do projeto para o diretorio atual do container
COPY . .

# Porta da aplicação no container
EXPOSE $PORT_BUILD

CMD [ "node", "index.js" ]