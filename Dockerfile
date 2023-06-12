FROM node:20.0.0-slim

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD [ "node", "server.js" ]
