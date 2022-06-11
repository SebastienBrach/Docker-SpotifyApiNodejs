ARG NODE_VERSION
FROM node:$NODE_VERSION

WORKDIR /app/spotify-api/

COPY . .

RUN npm init -y &&\
    npm install express --save

CMD [ "node", "server.js" ]
