FROM node:20-alpine AS builder

WORKDIR /app

# Copy shared module
COPY shared ./shared

# Backend setup
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json* ./

RUN sed -i 's/"@atc-radar-sim\/shared": "[^"]*"/"@atc-radar-sim\/shared": "file:..\/shared"/g' package.json
RUN npm install

COPY backend ./


RUN npm install --save-dev @types/react @types/node @types/react-dom


RUN echo '{"extends": "./tsconfig.json", "compilerOptions": {"rootDir": ".", "outDir": "./dist-noti", "jsx": "react-jsx", "esModuleInterop": true, "skipLibCheck": true, "noUnusedLocals": false, "noUnusedParameters": false}, "include": ["notification_service/**/*"]}' > tsconfig.noti.json
RUN npx tsc -p tsconfig.noti.json

FROM node:20-alpine AS runner
WORKDIR /app/backend

ENV NODE_ENV production

COPY backend/package.json backend/package-lock.json* ./

COPY shared ../shared
RUN sed -i 's/"@atc-radar-sim\/shared": "[^"]*"/"@atc-radar-sim\/shared": "file:..\/shared"/g' package.json
RUN npm install --omit=dev



COPY --from=builder /app/backend/dist-noti ./dist-noti

# Expose port for Render Web Service
EXPOSE 8080

CMD ["node", "dist-noti/notification_service/worker.js"]
