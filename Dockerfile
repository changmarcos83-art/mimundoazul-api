# Dockerfile para el deploy de la API en Railway.
# Define explícitamente cómo se construye el container, sin
# depender de heurísticas del builder.
# CACHE_BUST=2026-05-20-rebuild-testimonios-agotado

FROM node:20-slim

# Necesario para que Prisma corra en Linux (libssl)
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 1) Copio package.json + lock e instalo deps (cache de Docker)
COPY package*.json ./
RUN npm ci

# 2) Copio el código fuente
COPY . .

# 3) Genero el cliente de Prisma + compilo Nest
RUN npx prisma generate
RUN npm run build

# Verificación: si dist/main.js no existe, el build falla acá
RUN test -f dist/main.js && echo "✅ dist/main.js generado" || (echo "❌ FALLO: dist/main.js no existe" && exit 1)

# 4) Expongo el puerto (Railway inyecta PORT en runtime)
EXPOSE 8080

# 5) Al arrancar: corro migraciones pendientes y levanto la app
# Uso path absoluto para evitar ambigüedades
CMD ["sh", "-c", "npx prisma migrate deploy && node /app/dist/main.js"]
