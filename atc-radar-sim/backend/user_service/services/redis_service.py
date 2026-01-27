import redis
import json
import os
import logging

class RedisService:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(RedisService, cls).__new__(cls)
            cls._instance._init_redis()
        return cls._instance

    def _init_redis(self):
        redis_url = os.getenv('REDIS_URL')
        
        try:
            if redis_url:
                # Use connection string (handles password, host, port, ssl)
                # Render's internal REDIS_URL might be redis:// (no SSL) or rediss:// (SSL)
                self.client = redis.from_url(
                    redis_url, 
                    decode_responses=True, 
                    ssl_cert_reqs=None # Trust self-signed certs if SSL is used
                )
                logging.info(f"Connected to Redis using REDIS_URL (SSL: {'rediss' in redis_url})")
            else:
                # Fallback to Host/Port (legacy)
                redis_host = os.getenv('REDIS_HOST', 'localhost')
                redis_port = int(os.getenv('REDIS_PORT', 6379))
                ssl_enabled = os.getenv('REDIS_SSL', 'false').lower() == 'true'
                
                self.client = redis.Redis(
                    host=redis_host, 
                    port=redis_port, 
                    decode_responses=True,
                    ssl=ssl_enabled,
                    ssl_cert_reqs=None
                )
                logging.info(f"Connected to Redis at {redis_host}:{redis_port}")

            self.client.ping()
        except Exception as e:
            logging.error(f"Failed to connect to Redis: {e}")
            self.client = None

    def consume_history_logs(self, timeout=0):
        """
        Blocking pop from history_logs queue.
        Returns deserialized dict or None.
        """
        if not self.client:
            return None
        
        try:
            result = self.client.blpop('history_logs', timeout=timeout)
            if result:
                _, message = result
                return json.loads(message)
        except Exception as e:
            logging.error(f"Error consuming from Redis: {e}")
        return None

    def add_to_queue(self, queue_name, data):
        """
        Push data to a Redis list (queue)
        """
        if not self.client:
            logging.warning("Redis client not initialized, skipping queue push")
            return False
            
        try:
            message = json.dumps(data)
            self.client.rpush(queue_name, message)
            logging.info(f"Pushed task to {queue_name}: {data}")
            return True
        except Exception as e:
            logging.error(f"Failed to push to Redis queue: {e}")
            return False
