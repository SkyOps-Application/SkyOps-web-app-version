/**
 * Authentication Utilities
 * Handles login, register, and token management
 */

const AUTH_API_BASE = 'http://localhost:5000';
const TOKEN_KEY = 'skyops_auth_token';
const USER_KEY = 'skyops_user';

export interface RegisterData {
    email: string;
    first_name: string;
    last_name: string;
    age?: number;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface TokenResponse {
    access_token: string;
    token_type: string;
}

export interface UserResponse {
    email: string;
    first_name: string;
    last_name: string;
    age?: number;
}

export interface AuthError {
    error: string;
    details?: Array<{ loc: string[]; msg: string; type: string }> | string;
}

/**
 * Register a new user
 */
export async function register(data: RegisterData): Promise<UserResponse> {
    const response = await fetch(`${AUTH_API_BASE}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw result as AuthError;
    }

    return result as UserResponse;
}

/**
 * Login user and get token
 */
export async function login(data: LoginData): Promise<TokenResponse> {
    const response = await fetch(`${AUTH_API_BASE}/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw result as AuthError;
    }

    // Save token
    saveToken(result.access_token);

    return result as TokenResponse;
}

/**
 * Save JWT token to localStorage
 */
export function saveToken(token: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, token);
    }
}

/**
 * Get JWT token from localStorage
 */
export function getToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(TOKEN_KEY);
    }
    return null;
}

/**
 * Remove token and user data (logout)
 */
export function logout(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    const token = getToken();
    if (!token) return false;

    // Basic check - could decode JWT and check expiry here
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return false;

        // Decode payload
        const payload = JSON.parse(atob(parts[1]));
        const exp = payload.exp;

        // Check if token is expired
        if (exp && Date.now() >= exp * 1000) {
            logout();
            return false;
        }

        return true;
    } catch {
        return false;
    }
}

/**
 * Get current user info from token
 */
export function getCurrentUser(): { id: string; name: string } | null {
    const token = getToken();
    if (!token) return null;

    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const payload = JSON.parse(atob(parts[1]));
        return {
            id: payload.sub,
            name: payload.name || 'User',
        };
    } catch {
        return null;
    }
}

/**
 * Parse auth error for display
 */
export function parseAuthError(error: AuthError): string {
    if (error.details) {
        if (Array.isArray(error.details)) {
            // Pydantic validation errors
            return error.details.map(d => d.msg).join('\n');
        }
        return String(error.details);
    }
    return error.error || 'An unknown error occurred';
}
