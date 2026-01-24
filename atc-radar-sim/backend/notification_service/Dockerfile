FROM node:20-alpine AS builder

WORKDIR /app

# Copy shared module
COPY shared ./shared

# Backend setup
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json* ./
# Update shared dependency to local path
RUN sed -i 's/"@atc-radar-sim\/shared": "[^"]*"/"@atc-radar-sim\/shared": "file:..\/shared"/g' package.json
RUN npm install

COPY backend ./

# Build Notification Service
# Install missing types for React email templates
RUN npm install --save-dev @types/react @types/node @types/react-dom

# Temporary tsconfig to build notification service including shared types
# Add jsx, esModuleInterop, and skipLibCheck to handle React email templates. Disable strict checks for unused locals.
RUN echo '{"extends": "./tsconfig.json", "compilerOptions": {"rootDir": ".", "outDir": "./dist-noti", "jsx": "react-jsx", "esModuleInterop": true, "skipLibCheck": true, "noUnusedLocals": false, "noUnusedParameters": false}, "include": ["notification_service/**/*"]}' > tsconfig.noti.json
RUN npx tsc -p tsconfig.noti.json

# Production image
FROM node:20-alpine AS runner
WORKDIR /app/backend

ENV NODE_ENV production

COPY backend/package.json backend/package-lock.json* ./

# Setup shared module for runtime before install
COPY shared ../shared
RUN sed -i 's/"@atc-radar-sim\/shared": "[^"]*"/"@atc-radar-sim\/shared": "file:..\/shared"/g' package.json
RUN npm install --omit=dev



COPY --from=builder /app/backend/dist-noti ./dist-noti

# No port exposed

CMD ["node", "dist-noti/notification_service/worker.js"]
