FROM node as base

WORKDIR /usr/app

COPY package*.json ./

RUN npm i --silent

COPY . .