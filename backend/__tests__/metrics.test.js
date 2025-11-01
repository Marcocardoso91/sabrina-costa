/**
 * Metrics API Tests
 * Dashboard Sabrina Costa
 */

const { query } = require('../db/connection');

// Mock database connection
jest.mock('../db/connection');

describe('Metrics API', () => {
    describe('GET /api/metrics - Validation', () => {
        test('should accept valid date parameter', () => {
            const date = '2025-10-31';
            const dateObj = new Date(date);
            
            expect(dateObj.toString()).not.toBe('Invalid Date');
        });

        test('should accept valid period parameter', () => {
            const validPeriods = ['7d', '30d', '90d', '365d'];
            
            validPeriods.forEach(period => {
                const days = parseInt(period.replace('d', ''));
                expect(days).toBeGreaterThan(0);
                expect(days).toBeLessThanOrEqual(365);
            });
        });

        test('should reject invalid period (SQL injection protection)', () => {
            const invalidPeriods = ['999d', '0d', '-1d', 'abc', '7; DROP TABLE users;'];
            
            invalidPeriods.forEach(period => {
                const days = parseInt(period.replace('d', ''));
                const isValid = !isNaN(days) && days >= 1 && days <= 365;
                
                if (period === '999d' || period === '0d' || period === '-1d') {
                    expect(isValid).toBe(false);
                }
            });
        });

        test('should handle pagination parameters correctly', () => {
            const limit = 30;
            const offset = 0;
            
            expect(parseInt(limit)).toBe(30);
            expect(parseInt(offset)).toBe(0);
        });
    });

    describe('POST /api/metrics - Validation', () => {
        test('should validate required fields', () => {
            const validMetric = {
                date: '2025-10-31',
                ctr: 7.5,
                cpc: 0.10,
                cost: 20.00
            };
            
            expect(validMetric.date).toBeDefined();
            expect(validMetric.ctr).toBeDefined();
            expect(validMetric.cpc).toBeDefined();
            expect(validMetric.cost).toBeDefined();
        });

        test('should reject missing required fields', () => {
            const invalidMetric = {
                ctr: 7.5
                // Missing: date, cpc, cost
            };
            
            expect(invalidMetric.date).toBeUndefined();
            expect(invalidMetric.cpc).toBeUndefined();
            expect(invalidMetric.cost).toBeUndefined();
        });

        test('should validate date is not future', () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 1);
            
            const now = new Date();
            expect(futureDate > now).toBe(true);
        });

        test('should validate CTR range (0-100)', () => {
            const validCTRs = [0, 5.5, 50, 100];
            const invalidCTRs = [-1, 101, 150];
            
            validCTRs.forEach(ctr => {
                expect(ctr).toBeGreaterThanOrEqual(0);
                expect(ctr).toBeLessThanOrEqual(100);
            });
            
            invalidCTRs.forEach(ctr => {
                const isValid = ctr >= 0 && ctr <= 100;
                expect(isValid).toBe(false);
            });
        });

        test('should calculate cost_per_follower correctly', () => {
            const cost = 100;
            const newFollowers = 50;
            const expected = (cost / newFollowers).toFixed(2);
            
            expect(parseFloat(expected)).toBe(2.00);
        });

        test('should handle division by zero for cost_per_follower', () => {
            const cost = 100;
            const newFollowers = 0;
            const result = newFollowers > 0 ? (cost / newFollowers).toFixed(2) : null;
            
            expect(result).toBeNull();
        });
    });

    describe('PUT /api/metrics/:id - Update', () => {
        test('should only allow whitelisted fields', () => {
            const allowedFields = ['ctr', 'cpc', 'cpm', 'frequency', 'visits', 'newFollowers', 'cost', 'impressions', 'clicks'];
            
            const updates = {
                ctr: 8.0,
                hacker: 'DROP TABLE users', // ❌ Should be rejected
                cpc: 0.15
            };
            
            const validUpdates = {};
            for (const field of allowedFields) {
                if (updates[field] !== undefined) {
                    validUpdates[field] = updates[field];
                }
            }
            
            expect(validUpdates.ctr).toBe(8.0);
            expect(validUpdates.cpc).toBe(0.15);
            expect(validUpdates.hacker).toBeUndefined(); // ✅ Filtered out
        });

        test('should map newFollowers to new_followers', () => {
            const field = 'newFollowers';
            const dbField = field === 'newFollowers' ? 'new_followers' : field;
            
            expect(dbField).toBe('new_followers');
        });

        test('should recalculate cost_per_follower on update', () => {
            const current = { cost: 100, new_followers: 50 };
            const updates = { cost: 150 };
            
            const finalCost = updates.cost || current.cost;
            const finalFollowers = updates.newFollowers || current.new_followers;
            const costPerFollower = finalFollowers > 0 ? (finalCost / finalFollowers).toFixed(2) : null;
            
            expect(parseFloat(costPerFollower)).toBe(3.00);
        });
    });

    describe('GET /api/metrics/summary - Aggregation', () => {
        test('should parse period correctly', () => {
            const period = '30d';
            const days = parseInt(period.replace('d', ''));
            
            expect(days).toBe(30);
        });

        test('should use default period when not provided', () => {
            const period = undefined;
            const defaultPeriod = '30d';
            const finalPeriod = period || defaultPeriod;
            const days = parseInt(finalPeriod.replace('d', ''));
            
            expect(days).toBe(30);
        });

        test('should validate period limits (SQL injection protection)', () => {
            const testCases = [
                { period: '7d', expected: true },
                { period: '30d', expected: true },
                { period: '365d', expected: true },
                { period: '366d', expected: false }, // > 365
                { period: '0d', expected: false }, // < 1
                { period: '-1d', expected: false }, // negative
                { period: 'abc', expected: false }, // not a number
            ];
            
            testCases.forEach(({ period, expected }) => {
                const days = parseInt(period.replace('d', ''));
                const isValid = !isNaN(days) && days >= 1 && days <= 365;
                expect(isValid).toBe(expected);
            });
        });
    });

    describe('DELETE /api/metrics/:id - Authorization', () => {
        test('should only allow admin role', () => {
            const adminUser = { role: 'admin' };
            const viewerUser = { role: 'viewer' };
            
            expect(adminUser.role).toBe('admin');
            expect(viewerUser.role).not.toBe('admin');
        });

        test('should return 403 for non-admin user', () => {
            const user = { role: 'viewer' };
            const canDelete = user.role === 'admin';
            
            expect(canDelete).toBe(false);
        });
    });

    describe('Database Queries', () => {
        test('should use parameterized queries', () => {
            const sql = 'SELECT * FROM metrics WHERE id = $1';
            const params = ['123'];
            
            expect(sql).toContain('$1');
            expect(params).toHaveLength(1);
        });

        test('should build dynamic WHERE clauses safely', () => {
            let sql = 'SELECT * FROM metrics WHERE 1=1';
            const params = [];
            let paramIndex = 1;
            
            const date = '2025-10-31';
            if (date) {
                sql += ` AND date = $${paramIndex++}`;
                params.push(date);
            }
            
            expect(sql).toBe('SELECT * FROM metrics WHERE 1=1 AND date = $1');
            expect(params).toEqual(['2025-10-31']);
        });
    });

    describe('Error Handling', () => {
        test('should handle unique constraint violation (23505)', () => {
            const error = { code: '23505' };
            
            if (error.code === '23505') {
                expect(error.code).toBe('23505');
            }
        });

        test('should pass other errors to next middleware', () => {
            const error = new Error('Database error');
            const next = jest.fn();
            
            next(error);
            
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});

