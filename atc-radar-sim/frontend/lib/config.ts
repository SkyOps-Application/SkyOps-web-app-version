export const getUrlWithProtocol = (url: string | undefined, defaultUrl: string) => {
    if (!url) return defaultUrl;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
        return url;
    }
    return `https://${url}`;
};

export const API_URL = getUrlWithProtocol(
    process.env.NEXT_PUBLIC_API_URL,
    'http://localhost:5001'
);

export const SIMULATOR_URL = getUrlWithProtocol(
    process.env.NEXT_PUBLIC_SIMULATOR_URL,
    'http://localhost:4000'
);
