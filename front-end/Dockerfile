# ─── Estágio 1: Build ───────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências primeiro (melhor uso de cache)
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm ci

# Copia o restante do código
COPY . .

# Gera o build de produção
RUN npm run build

# ─── Estágio 2: Servir com Nginx ─────────────────────────────────────
FROM nginx:stable-alpine

# Copia os arquivos buildados para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuração do Nginx com proxy para o back-end
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]