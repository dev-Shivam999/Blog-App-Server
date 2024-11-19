FROM node:20

# Set the working directory inside the container
WORKDIR /app/user

# Copy only necessary configuration files to leverage Docker's caching
COPY tsconfig.json ./
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client and handle database migrations
RUN npx prisma migrate dev --name init && npx prisma generate

# Build the TypeScript code
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Define the command to run the application
CMD ["node", "dist/index.js"]
