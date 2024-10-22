# Etapa de construção
FROM node:20.17.0 AS build

WORKDIR /usr/source/app

# Copiar arquivos necessários
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Instalar dependências
RUN yarn install

# Copiar código fonte
COPY . .

# Construir o projeto
RUN yarn run build

# Focar em pacotes de produção e limpar o cache do yarn
RUN yarn workspaces focus --production && yarn cache clean

# Etapa de produção
FROM node:20.17.0-alpine3.20

WORKDIR /usr/src/path

# Copiar arquivos da etapa de construção
COPY --from=build /usr/source/app/package.json ./
COPY --from=build /usr/source/app/yarn.lock ./
COPY --from=build /usr/source/app/dist ./dist
COPY --from=build /usr/source/app/node_modules ./node_modules
COPY --from=build /usr/source/app/.yarn ./.yarn
COPY --from=build /usr/source/app/.yarnrc.yml ./

EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "run", "start:prod"]
