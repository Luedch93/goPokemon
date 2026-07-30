FROM node:22.14

WORKDIR /src/app/

COPY package*.json ./

RUN ["npm", "install"]

COPY . .
