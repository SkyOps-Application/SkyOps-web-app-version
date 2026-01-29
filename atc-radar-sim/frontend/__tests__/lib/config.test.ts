import { getUrlWithProtocol } from '../../lib/config';

describe('Config Utilities', () => {
    describe('getUrlWithProtocol', () => {
        it('should return default URL when input is undefined', () => {
            expect(getUrlWithProtocol(undefined, 'http://default.com')).toBe('http://default.com');
        });

        it('should return default URL when input is empty string', () => {
            expect(getUrlWithProtocol('', 'http://default.com')).toBe('http://default.com');
        });

        it('should return URL as-is when it starts with http://', () => {
            expect(getUrlWithProtocol('http://example.com', 'http://default.com')).toBe('http://example.com');
        });

        it('should return URL as-is when it starts with https://', () => {
            expect(getUrlWithProtocol('https://secure.example.com', 'http://default.com')).toBe('https://secure.example.com');
        });

        it('should return URL as-is when it starts with /', () => {
            expect(getUrlWithProtocol('/api/endpoint', 'http://default.com')).toBe('/api/endpoint');
        });

        it('should add https:// prefix to URLs without protocol', () => {
            expect(getUrlWithProtocol('example.com', 'http://default.com')).toBe('https://example.com');
        });

        it('should add https:// prefix to URLs with subdomain', () => {
            expect(getUrlWithProtocol('api.example.com:8080', 'http://default.com')).toBe('https://api.example.com:8080');
        });

        it('should add https:// prefix to URLs with path', () => {
            expect(getUrlWithProtocol('example.com/api/v1', 'http://default.com')).toBe('https://example.com/api/v1');
        });
    });
});
