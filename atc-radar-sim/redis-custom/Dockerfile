FROM redis:alpine

# Install Python3 for the dummy health check server
RUN apk add --no-cache python3

WORKDIR /app
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Render provides the PORT env var (usually 10000)
# We need to expose it for the health check
ENV PORT=10000

CMD ["/app/start.sh"]
