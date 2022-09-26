FROM node:8.9.4-alpine

WORKDIR /usr/src/app

RUN npm install -g serve
CMD serve -s build
EXPOSE 3000

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --production