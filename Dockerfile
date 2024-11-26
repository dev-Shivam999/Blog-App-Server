# EXPRESS TYPESCRIPT PRISMA
FROM node:20


WORKDIR /app/user


COPY tsconfig.json ./
COPY package*.json ./
COPY prisma ./


RUN npm install


COPY . .


RUN npx prisma migrate dev --name init && npx prisma generate


RUN npm run build


EXPOSE 3000


CMD ["node", "dist/index.js"]



