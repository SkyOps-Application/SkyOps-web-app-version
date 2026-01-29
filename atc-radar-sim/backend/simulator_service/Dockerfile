FROM node:20-alpine AS builder

WORKDIR /app

# Copy shared module
COPY shared ./shared
WORKDIR /app/shared
RUN npm install
RUN npm run build


# Backend setup
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json* ./
RUN sed -i 's/"@atc-radar-sim\/shared": "[^"]*"/"@atc-radar-sim\/shared": "file:..\/shared"/g' package.json
RUN npm install

COPY backend ./

RUN npx tsc


# Production image
FROM node:20-alpine AS runner
WORKDIR /app/backend

ENV NODE_ENV production

COPY backend/package.json backend/package-lock.json* ./

# Copy fully built shared module from builder (contains dist and bridge files)
COPY --from=builder /app/shared /app/shared

# Update shared dependency to local path
RUN sed -i 's/"@atc-radar-sim\/shared": "[^"]*"/"@atc-radar-sim\/shared": "file:..\/shared"/g' package.json
RUN npm install --omit=dev



COPY --from=builder /app/backend/dist ./dist

EXPOSE 4000

CMD ["npm", "start"]
