import {
    calculateDistance,
    calculateBearing,
    normalizeHeading,
    getShortestTurnDirection,
    toRadians,
    toDegrees,
    calculateDestination,
    isPointInPolygon,
    latLngToScreen,
    screenToLatLng,
    LatLng,
} from '../src/utils/coordinates';

describe('Coordinate Utilities', () => {
    describe('toRadians', () => {
        it('should convert 0 degrees to 0 radians', () => {
            expect(toRadians(0)).toBe(0);
        });

        it('should convert 180 degrees to PI radians', () => {
            expect(toRadians(180)).toBeCloseTo(Math.PI);
        });

        it('should convert 90 degrees to PI/2 radians', () => {
            expect(toRadians(90)).toBeCloseTo(Math.PI / 2);
        });

        it('should convert 360 degrees to 2*PI radians', () => {
            expect(toRadians(360)).toBeCloseTo(2 * Math.PI);
        });
    });

    describe('toDegrees', () => {
        it('should convert 0 radians to 0 degrees', () => {
            expect(toDegrees(0)).toBe(0);
        });

        it('should convert PI radians to 180 degrees', () => {
            expect(toDegrees(Math.PI)).toBeCloseTo(180);
        });

        it('should convert PI/2 radians to 90 degrees', () => {
            expect(toDegrees(Math.PI / 2)).toBeCloseTo(90);
        });
    });

    describe('normalizeHeading', () => {
        it('should keep valid headings unchanged', () => {
            expect(normalizeHeading(45)).toBe(45);
            expect(normalizeHeading(180)).toBe(180);
            expect(normalizeHeading(0)).toBe(0);
        });

        it('should normalize headings >= 360', () => {
            expect(normalizeHeading(360)).toBe(0);
            expect(normalizeHeading(450)).toBe(90);
            expect(normalizeHeading(720)).toBe(0);
        });

        it('should normalize negative headings', () => {
            expect(normalizeHeading(-45)).toBe(315);
            expect(normalizeHeading(-90)).toBe(270);
            // -360 % 360 = -0 in JS, which is equivalent to 0
            expect(Math.abs(normalizeHeading(-360))).toBe(0);
        });
    });

    describe('getShortestTurnDirection', () => {
        it('should return right for clockwise turns under 180 degrees', () => {
            expect(getShortestTurnDirection(0, 90)).toBe('right');
            expect(getShortestTurnDirection(45, 180)).toBe('right');
            expect(getShortestTurnDirection(270, 0)).toBe('right');
        });

        it('should return left for counter-clockwise turns under 180 degrees', () => {
            expect(getShortestTurnDirection(90, 0)).toBe('left');
            expect(getShortestTurnDirection(180, 45)).toBe('left');
            expect(getShortestTurnDirection(0, 270)).toBe('left');
        });

        it('should handle same heading', () => {
            expect(getShortestTurnDirection(90, 90)).toBe('right');
        });
    });

    describe('calculateDistance', () => {
        it('should return 0 for same point', () => {
            const point: LatLng = { latitude: 10.0, longitude: 106.0 };
            expect(calculateDistance(point, point)).toBe(0);
        });

        it('should calculate distance between two points', () => {
            // Ho Chi Minh City area coordinates
            const point1: LatLng = { latitude: 10.8231, longitude: 106.6297 };
            const point2: LatLng = { latitude: 10.9231, longitude: 106.6297 };

            // ~1 degree latitude ≈ 60 nautical miles, so 0.1 degree ≈ 6 NM
            const distance = calculateDistance(point1, point2);
            expect(distance).toBeGreaterThan(5);
            expect(distance).toBeLessThan(7);
        });

        it('should be symmetric', () => {
            const point1: LatLng = { latitude: 10.0, longitude: 106.0 };
            const point2: LatLng = { latitude: 11.0, longitude: 107.0 };

            expect(calculateDistance(point1, point2)).toBeCloseTo(calculateDistance(point2, point1));
        });
    });

    describe('calculateBearing', () => {
        it('should return 0 for due north', () => {
            const point1: LatLng = { latitude: 10.0, longitude: 106.0 };
            const point2: LatLng = { latitude: 11.0, longitude: 106.0 };

            expect(calculateBearing(point1, point2)).toBeCloseTo(0, 0);
        });

        it('should return 90 for due east', () => {
            const point1: LatLng = { latitude: 10.0, longitude: 106.0 };
            const point2: LatLng = { latitude: 10.0, longitude: 107.0 };

            expect(calculateBearing(point1, point2)).toBeCloseTo(90, 0);
        });

        it('should return 180 for due south', () => {
            const point1: LatLng = { latitude: 11.0, longitude: 106.0 };
            const point2: LatLng = { latitude: 10.0, longitude: 106.0 };

            expect(calculateBearing(point1, point2)).toBeCloseTo(180, 0);
        });

        it('should return 270 for due west', () => {
            const point1: LatLng = { latitude: 10.0, longitude: 107.0 };
            const point2: LatLng = { latitude: 10.0, longitude: 106.0 };

            expect(calculateBearing(point1, point2)).toBeCloseTo(270, 0);
        });
    });

    describe('calculateDestination', () => {
        it('should return same point for 0 distance', () => {
            const origin: LatLng = { latitude: 10.0, longitude: 106.0 };
            const destination = calculateDestination(origin, 0, 45);

            expect(destination.latitude).toBeCloseTo(origin.latitude);
            expect(destination.longitude).toBeCloseTo(origin.longitude);
        });

        it('should move north correctly', () => {
            const origin: LatLng = { latitude: 10.0, longitude: 106.0 };
            const destination = calculateDestination(origin, 60, 0); // 60 NM north ≈ 1 degree

            expect(destination.latitude).toBeGreaterThan(origin.latitude);
            expect(destination.longitude).toBeCloseTo(origin.longitude, 1);
        });

        it('should move east correctly', () => {
            const origin: LatLng = { latitude: 10.0, longitude: 106.0 };
            const destination = calculateDestination(origin, 60, 90); // 60 NM east

            expect(destination.latitude).toBeCloseTo(origin.latitude, 1);
            expect(destination.longitude).toBeGreaterThan(origin.longitude);
        });
    });

    describe('isPointInPolygon', () => {
        const square: LatLng[] = [
            { latitude: 10, longitude: 106 },
            { latitude: 10, longitude: 107 },
            { latitude: 11, longitude: 107 },
            { latitude: 11, longitude: 106 },
        ];

        it('should return true for point inside polygon', () => {
            const point: LatLng = { latitude: 10.5, longitude: 106.5 };
            expect(isPointInPolygon(point, square)).toBe(true);
        });

        it('should return false for point outside polygon', () => {
            const point: LatLng = { latitude: 12, longitude: 108 };
            expect(isPointInPolygon(point, square)).toBe(false);
        });

        it('should return false for point clearly outside', () => {
            const point: LatLng = { latitude: 5, longitude: 100 };
            expect(isPointInPolygon(point, square)).toBe(false);
        });
    });

    describe('latLngToScreen and screenToLatLng', () => {
        const center: LatLng = { latitude: 10.5, longitude: 106.5 };
        const canvasSize = { width: 800, height: 600 };
        const zoom = 1;

        it('should place center point at canvas center', () => {
            const screen = latLngToScreen(center, center, zoom, canvasSize);

            expect(screen.x).toBeCloseTo(400);
            expect(screen.y).toBeCloseTo(300);
        });

        it('should be reversible', () => {
            const testPoint: LatLng = { latitude: 10.6, longitude: 106.6 };
            const screen = latLngToScreen(testPoint, center, zoom, canvasSize);
            const recovered = screenToLatLng(screen, center, zoom, canvasSize);

            expect(recovered.latitude).toBeCloseTo(testPoint.latitude, 2);
            expect(recovered.longitude).toBeCloseTo(testPoint.longitude, 2);
        });
    });
});
