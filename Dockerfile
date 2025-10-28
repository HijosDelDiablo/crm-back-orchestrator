# Multi-stage build para optimizar el tamaño de la imagen
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json yarn.lock ./

# Instalar dependencias
RUN yarn install --frozen-lockfile --production=false

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN yarn build
