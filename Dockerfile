FROM node:latest
FROM dotenv

WORKDIR /app

COPY package.json .

COPY next.config.js .

RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "start"]