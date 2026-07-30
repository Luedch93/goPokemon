FROM node:22.23.2

WORKDIR /src/app/

COPY package*.json ./

RUN ["npm", "install"]

COPY . .
