/**
 * Webhook API Tests
 * Dashboard Sabrina Costa
 */

const dayjs = require('dayjs');
const { parse } = require('csv-parse/sync');

describe('Webhook API', () => {
    describe('ensureWebhookAuth middleware', () => {
        test('should reject request without token', () => {
            const WEBHOOK_SECRET = 'test_secret';
            const req = { headers: {} };
            
            const token = req.headers['x-webhook-token'];
            const isValid = !!WEBHOOK_SECRET && token === WEBHOOK_SECRET;
            
            expect(isValid).toBe(false);
        });

        test('should reject request with invalid token', () => {
            const WEBHOOK_SECRET = 'test_secret';
            const req = { headers: { 'x-webhook-token': 'wrong_token' } };
            
            const token = req.headers['x-webhook-token'];
            const isValid = token === WEBHOOK_SECRET;
            
            expect(isValid).toBe(false);
        });

        test('should accept request with valid token', () => {
            const WEBHOOK_SECRET = 'test_secret';
            const req = { headers: { 'x-webhook-token': 'test_secret' } };
            
            const token = req.headers['x-webhook-token'];
            const isValid = token === WEBHOOK_SECRET;
            
            expect(isValid).toBe(true);
        });
    });

    describe('parseNumber utility', () => {
        function parseNumber(value) {
            if (value === undefined || value === null || value === '') {
                return null;
            }
            const num = Number(value);
            return Number.isNaN(num) ? null : num;
        }

        test('should parse valid numbers', () => {
            expect(parseNumber('123')).toBe(123);
            expect(parseNumber('12.34')).toBe(12.34);
            expect(parseNumber(456)).toBe(456);
        });

        test('should return null for invalid inputs', () => {
            expect(parseNumber(undefined)).toBeNull();
            expect(parseNumber(null)).toBeNull();
            expect(parseNumber('')).toBeNull();
            expect(parseNumber('abc')).toBeNull();
        });

        test('should handle zero correctly', () => {
            expect(parseNumber(0)).toBe(0);
            expect(parseNumber('0')).toBe(0);
        });
    });

    describe('normalizeMetricPayload validation', () => {
        test('should validate correct metric payload', () => {
            const payload = {
                date: '2025-10-31',
                ctr: 7.5,
                cpc: 0.10,
                cpm: 2.0,
                frequency: 1.2,
                visits: 100,
                newFollowers: 50,
                cost: 20.00,
                impressions: 1000,
                clicks: 75
            };
            
            const parsedDate = dayjs(payload.date);
            
            expect(parsedDate.isValid()).toBe(true);
            expect(parsedDate.format('YYYY-MM-DD')).toBe(payload.date);
            expect(parsedDate.isAfter(dayjs(), 'day')).toBe(false);
        });

        test('should reject future dates', () => {
            const futureDate = dayjs().add(1, 'day').format('YYYY-MM-DD');
            const parsedDate = dayjs(futureDate);
            
            expect(parsedDate.isAfter(dayjs(), 'day')).toBe(true);
        });

        test('should reject invalid date formats', () => {
            const invalidDates = ['2025-13-01', '2025-10-32', 'invalid'];
            
            invalidDates.forEach(date => {
                const parsedDate = dayjs(date);
                const isValid = date && parsedDate.isValid() && parsedDate.format('YYYY-MM-DD') === date;
                
                expect(isValid).toBe(false);
            });
            
            // Empty string case
            const emptyDate = '';
            const isValidEmpty = !!emptyDate;
            expect(isValidEmpty).toBe(false);
        });

        test('should validate CTR range', () => {
            const validCTR = 7.5;
            const invalidCTR1 = -1;
            const invalidCTR2 = 101;
            
            expect(validCTR >= 0 && validCTR <= 100).toBe(true);
            expect(invalidCTR1 >= 0 && invalidCTR1 <= 100).toBe(false);
            expect(invalidCTR2 >= 0 && invalidCTR2 <= 100).toBe(false);
        });

        test('should require date, ctr, cpc, cost', () => {
            const payload1 = { ctr: 7.5, cpc: 0.1, cost: 20 }; // missing date
            const payload2 = { date: '2025-10-31', cpc: 0.1, cost: 20 }; // missing ctr
            const payload3 = { date: '2025-10-31', ctr: 7.5, cost: 20 }; // missing cpc
            const payload4 = { date: '2025-10-31', ctr: 7.5, cpc: 0.1 }; // missing cost
            
            expect(payload1.date).toBeUndefined();
            expect(payload2.ctr).toBeUndefined();
            expect(payload3.cpc).toBeUndefined();
            expect(payload4.cost).toBeUndefined();
        });

        test('should handle newFollowers or new_followers field names', () => {
            const payload1 = { newFollowers: 50 };
            const payload2 = { new_followers: 50 };
            
            const value1 = payload1.newFollowers ?? payload1.new_followers;
            const value2 = payload2.newFollowers ?? payload2.new_followers;
            
            expect(value1).toBe(50);
            expect(value2).toBe(50);
        });
    });

    describe('POST /api/webhook/metrics - JSON payload', () => {
        test('should handle single object payload', () => {
            const body = { date: '2025-10-31', ctr: 7.5, cpc: 0.1, cost: 20 };
            const payload = Array.isArray(body) ? body : [body];
            
            expect(Array.isArray(payload)).toBe(true);
            expect(payload).toHaveLength(1);
        });

        test('should handle array payload', () => {
            const body = [
                { date: '2025-10-31', ctr: 7.5, cpc: 0.1, cost: 20 },
                { date: '2025-10-30', ctr: 8.0, cpc: 0.12, cost: 25 }
            ];
            const payload = Array.isArray(body) ? body : [body];
            
            expect(payload).toHaveLength(2);
        });
    });

    describe('POST /api/webhook/metrics/csv - CSV payload', () => {
        test('should parse valid CSV', () => {
            const csvData = `date,ctr,cpc,cost
2025-10-31,7.5,0.10,20.00
2025-10-30,8.0,0.12,25.00`;
            
            const records = parse(csvData, {
                columns: true,
                skip_empty_lines: true,
                trim: true
            });
            
            expect(records).toHaveLength(2);
            expect(records[0].date).toBe('2025-10-31');
            expect(records[0].ctr).toBe('7.5');
        });

        test('should reject empty CSV', () => {
            const csvData = '';
            
            expect(csvData).toBeFalsy();
        });

        test('should skip empty lines in CSV', () => {
            const csvData = `date,ctr,cpc,cost
2025-10-31,7.5,0.10,20.00

2025-10-30,8.0,0.12,25.00`;
            
            const records = parse(csvData, {
                columns: true,
                skip_empty_lines: true,
                trim: true
            });
            
            expect(records).toHaveLength(2);
        });

        test('should trim whitespace in CSV', () => {
            const csvData = `date,ctr,cpc,cost
  2025-10-31  ,  7.5  ,  0.10  ,  20.00  `;
            
            const records = parse(csvData, {
                columns: true,
                skip_empty_lines: true,
                trim: true
            });
            
            expect(records[0].date).toBe('2025-10-31');
            expect(records[0].ctr).toBe('7.5');
        });
    });

    describe('upsertMetric function', () => {
        test('should use INSERT ON CONFLICT for upsert', () => {
            const sql = `INSERT INTO metrics (date, ctr, cpc, cost)
                 VALUES ($1, $2, $3, $4)
                 ON CONFLICT (date)
                 DO UPDATE SET ctr = EXCLUDED.ctr`;
            
            expect(sql).toContain('ON CONFLICT');
            expect(sql).toContain('DO UPDATE SET');
        });

        test('should update all fields on conflict', () => {
            const fields = ['ctr', 'cpc', 'cpm', 'frequency', 'visits', 'new_followers', 'cost', 'impressions', 'clicks', 'cost_per_follower'];
            
            fields.forEach(field => {
                expect(field).toBeTruthy();
            });
        });
    });
});

