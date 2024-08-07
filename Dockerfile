FROM node:lts-slim

WORKDIR /usr/src/app

COPY  . /usr/src/app

COPY package.json package.json
COPY  package-lock.json package-lock.json

RUN npm install -g @angular/cli

RUN npm install

CMD [ "ng", "serve", "--host", "0.0.0.0"]

