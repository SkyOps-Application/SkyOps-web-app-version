import {
    isValidCallsign,
    isValidFlightLevel,
    isValidHeading,
    isValidSpeed,
    isValidMach,
    isValidSquawk,
    isValidICAO,
    isValidFrequency,
} from '../src/utils/validation';

describe('Validation Utilities', () => {
    describe('isValidCallsign', () => {
        it('should accept valid callsigns', () => {
            expect(isValidCallsign('VNA123')).toBe(true);
            expect(isValidCallsign('UAL456')).toBe(true);
            expect(isValidCallsign('BA1')).toBe(true);
            expect(isValidCallsign('QF32A')).toBe(true);
            expect(isValidCallsign('SQ1234')).toBe(true);
        });

        it('should reject invalid callsigns', () => {
            expect(isValidCallsign('V123')).toBe(false);     // Too few letters
            expect(isValidCallsign('ABCD123')).toBe(false);  // Too many letters
            expect(isValidCallsign('VNA')).toBe(false);      // No numbers
            expect(isValidCallsign('123VNA')).toBe(false);   // Numbers first
            expect(isValidCallsign('vna123')).toBe(false);   // Lowercase
            expect(isValidCallsign('')).toBe(false);          // Empty
        });
    });

    describe('isValidFlightLevel', () => {
        it('should accept valid flight levels', () => {
            expect(isValidFlightLevel(0)).toBe(true);
            expect(isValidFlightLevel(350)).toBe(true);
            expect(isValidFlightLevel(410)).toBe(true);
            expect(isValidFlightLevel(999)).toBe(true);
        });

        it('should reject invalid flight levels', () => {
            expect(isValidFlightLevel(-1)).toBe(false);
            expect(isValidFlightLevel(1000)).toBe(false);
            expect(isValidFlightLevel(35.5)).toBe(false);  // Not an integer
        });
    });

    describe('isValidHeading', () => {
        it('should accept valid headings', () => {
            expect(isValidHeading(0)).toBe(true);
            expect(isValidHeading(180)).toBe(true);
            expect(isValidHeading(359)).toBe(true);
            expect(isValidHeading(45.5)).toBe(true);  // Decimals allowed
        });

        it('should reject invalid headings', () => {
            expect(isValidHeading(-1)).toBe(false);
            expect(isValidHeading(360)).toBe(false);
            expect(isValidHeading(400)).toBe(false);
        });
    });

    describe('isValidSpeed', () => {
        it('should accept valid speeds', () => {
            expect(isValidSpeed(50)).toBe(true);
            expect(isValidSpeed(250)).toBe(true);
            expect(isValidSpeed(500)).toBe(true);
        });

        it('should reject invalid speeds', () => {
            expect(isValidSpeed(49)).toBe(false);
            expect(isValidSpeed(501)).toBe(false);
            expect(isValidSpeed(0)).toBe(false);
        });
    });

    describe('isValidMach', () => {
        it('should accept valid Mach numbers', () => {
            expect(isValidMach(0.30)).toBe(true);
            expect(isValidMach(0.78)).toBe(true);
            expect(isValidMach(0.82)).toBe(true);
            expect(isValidMach(0.99)).toBe(true);
        });

        it('should reject invalid Mach numbers', () => {
            expect(isValidMach(0.29)).toBe(false);
            expect(isValidMach(1.0)).toBe(false);
            expect(isValidMach(0)).toBe(false);
        });
    });

    describe('isValidSquawk', () => {
        it('should accept valid squawk codes', () => {
            expect(isValidSquawk('0000')).toBe(true);
            expect(isValidSquawk('1234')).toBe(true);
            expect(isValidSquawk('7700')).toBe(true);
            expect(isValidSquawk('7777')).toBe(true);
        });

        it('should reject invalid squawk codes', () => {
            expect(isValidSquawk('8000')).toBe(false);  // 8 not valid in octal
            expect(isValidSquawk('9999')).toBe(false);  // 9 not valid in octal
            expect(isValidSquawk('123')).toBe(false);   // Too short
            expect(isValidSquawk('12345')).toBe(false); // Too long
            expect(isValidSquawk('abcd')).toBe(false);  // Letters
        });
    });

    describe('isValidICAO', () => {
        it('should accept valid ICAO codes', () => {
            expect(isValidICAO('VVTS')).toBe(true); // Ho Chi Minh City
            expect(isValidICAO('VVNB')).toBe(true); // Hanoi Noi Bai
            expect(isValidICAO('KJFK')).toBe(true); // JFK
            expect(isValidICAO('EGLL')).toBe(true); // Heathrow
        });

        it('should reject invalid ICAO codes', () => {
            expect(isValidICAO('VVT')).toBe(false);    // Too short
            expect(isValidICAO('VVTSS')).toBe(false);  // Too long
            expect(isValidICAO('VVT1')).toBe(false);   // Contains number
            expect(isValidICAO('vvts')).toBe(false);   // Lowercase
        });
    });

    describe('isValidFrequency', () => {
        it('should accept valid frequencies', () => {
            expect(isValidFrequency(118.0)).toBe(true);
            expect(isValidFrequency(121.5)).toBe(true);   // Guard frequency
            expect(isValidFrequency(119.1)).toBe(true);
            expect(isValidFrequency(136.975)).toBe(true);
        });

        it('should reject invalid frequencies', () => {
            expect(isValidFrequency(117.999)).toBe(false);
            expect(isValidFrequency(137.0)).toBe(false);
            expect(isValidFrequency(100.0)).toBe(false);
        });
    });
});
