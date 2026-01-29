import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files
    dir: './',
});

const config: Config = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@atc-radar-sim/shared$': '<rootDir>/../shared/src',
    },
    collectCoverageFrom: [
        'lib/**/*.{ts,tsx}',
        'components/**/*.{ts,tsx}',
        'hooks/**/*.{ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    coverageDirectory: 'coverage',
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    verbose: true,
};

export default createJestConfig(config);
