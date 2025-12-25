FROM node:20

WORKDIR /app/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

RUN npm i

CMD [ "npm", "start" ]
