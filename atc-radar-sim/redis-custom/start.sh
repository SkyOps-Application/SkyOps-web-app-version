#!/bin/sh

# Start Redis in the background on the default port (6379)
echo "Starting Redis server..."
redis-server --daemonize yes

# Start a dummy HTTP server for Render health checks on $PORT
echo "Starting Health Check Listener on port $PORT..."
python3 -m http.server $PORT
