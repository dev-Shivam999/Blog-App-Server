
FROM node:20

WORKDIR /app/user

COPY tsconfig.json ./
COPY package*.json ./
COPY prisma ./

RUN npm install && npm install -g typescript

COPY . .


CMD ["sh", "-c", "npx prisma migrate dev --name init && npx prisma generate && tsc -b && node dist/index.js"]

EXPOSE 3000
