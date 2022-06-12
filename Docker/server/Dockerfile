ARG NODE_VERSION
FROM node:$NODE_VERSION

WORKDIR /app/spotify-api/

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "server.js"]
