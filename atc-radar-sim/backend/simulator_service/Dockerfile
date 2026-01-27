FROM node:20-alpine AS builder

WORKDIR /app

# Copy shared module
COPY shared ./shared
WORKDIR /app/shared
# Install dependencies for shared (typescript) and build it
RUN npm install
RUN npm run build


# Backend setup
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json* ./
# Update shared dependency to local path
RUN sed -i 's/"@atc-radar-sim\/shared": "[^"]*"/"@atc-radar-sim\/shared": "file:..\/shared"/g' package.json
RUN npm install

COPY backend ./

# Build Simulator (uses default tsconfig which targets simulator_service)
# Build Simulator directly with tsc to avoid postbuild conflict
RUN npx tsc
# Ensure postbuild runs to setup shared link in builder for verification if needed


# Production image
FROM node:20-alpine AS runner
WORKDIR /app/backend

ENV NODE_ENV production

COPY backend/package.json backend/package-lock.json* ./

# Setup shared module for runtime before install
COPY shared ../shared
RUN sed -i 's/"@atc-radar-sim\/shared": "[^"]*"/"@atc-radar-sim\/shared": "file:..\/shared"/g' package.json

RUN npm install --omit=dev

# Build shared module for runtime (to generate dist and bridge files)
WORKDIR /app/shared
RUN npm install
RUN npm run build
# Return to backend to finish setup
WORKDIR /app/backend



COPY --from=builder /app/backend/dist ./dist

EXPOSE 4000

CMD ["npm", "start"]
