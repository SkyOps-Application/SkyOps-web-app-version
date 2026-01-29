import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().transform(Number).default('4000'),
    CORS_ORIGIN: z.union([z.string(), z.array(z.string())]).default('http://localhost:3000'),
    DATABASE_URL: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error('Invalid environment variables:', JSON.stringify(parsedEnv.error.format(), null, 4));
    process.exit(1);
}

export const env = parsedEnv.data;
