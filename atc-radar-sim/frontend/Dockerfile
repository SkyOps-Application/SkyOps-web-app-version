FROM node:20-alpine AS builder

WORKDIR /app

# Copy shared module first to cache dependencies if possible, 
# though dependencies are installed in subdirectories.
COPY shared ./shared

# Build shared module
WORKDIR /app/shared
RUN npm install
RUN npm run build

# Frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json* ./
# Update shared dependency to local path
RUN sed -i 's/"@atc-radar-sim\/shared": "[^"]*"/"@atc-radar-sim\/shared": "file:..\/shared"/g' package.json
# Remove prebuild script that conflicts with local link
RUN npm pkg delete scripts.prebuild
RUN npm install

COPY frontend ./
# Remove prebuild script AGAIN because COPY frontend overwrote package.json
RUN npm pkg delete scripts.prebuild
# Update shared dependency AGAIN to match installed node_modules
RUN sed -i 's/"@atc-radar-sim\/shared": "[^"]*"/"@atc-radar-sim\/shared": "file:..\/shared"/g' package.json

# Manually copy shared module to node_modules to ensure Next.js can resolve it without symlink issues
RUN rm -rf node_modules/@atc-radar-sim/shared && \
    mkdir -p node_modules/@atc-radar-sim/shared && \
    cp -r ../shared/* node_modules/@atc-radar-sim/shared/

# Build configuration
# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

ARG NEXT_PUBLIC_API_URL=http://localhost:5001
ARG NEXT_PUBLIC_SIMULATOR_URL=http://localhost:4000

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SIMULATOR_URL=$NEXT_PUBLIC_SIMULATOR_URL

RUN npm run build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app/frontend

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy shared required for any runtime imports (though usually bundled, 
# next.js server components might need it if not fully bundled? 
# Usually next build bundles everything, but let's be safe or just copy standalone)
# Using standalone output is best for docker. 
# We need to enable standalone in next.config.js usually.
# Assuming standard build for now.

COPY --from=builder /app/frontend/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/frontend/.next ./.next
COPY --from=builder /app/frontend/node_modules ./node_modules
COPY --from=builder /app/frontend/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
