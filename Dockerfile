FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn config set registry http://registry.npmmirror.com/ && \
    yarn install --network-timeout 300000
RUN yarn global add nodemon @nestjs/cli

COPY . .

EXPOSE 8000

CMD [ "nest", "start" ,"--watch" ]