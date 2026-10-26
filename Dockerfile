FROM oven/bun:1.4.2-alpine

# Set working directory
WORKDIR /app

# Copy Bun manifest and lockfile
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build when deploying
# RUN bun run build

# Expose port 3000 (default Next.js port)
EXPOSE 3000

# Run the application
# CMD ["bun", "run", "start"]
