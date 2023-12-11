FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

ARG REACT_APP_BACKEND_HOST=localhost
ENV REACT_APP_BACKEND_HOST=${REACT_APP_BACKEND_HOST}

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
