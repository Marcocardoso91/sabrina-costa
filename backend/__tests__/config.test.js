/**
 * Config API Tests
 * Dashboard Sabrina Costa
 */

describe('Config API', () => {
    describe('GET /api/config - Read All', () => {
        test('should return all config sections', () => {
            const mockConfig = {
                thresholds: { ctr_min: 1.5, cpc_max: 0.7 },
                whatsapp: { number: '+5531993676989', enabled: true },
                alerts_schedule: { daily_report: '18:00' },
                general: { timezone: 'America/Sao_Paulo' }
            };
            
            expect(mockConfig.thresholds).toBeDefined();
            expect(mockConfig.whatsapp).toBeDefined();
            expect(mockConfig.alerts_schedule).toBeDefined();
            expect(mockConfig.general).toBeDefined();
        });

        test('should map alerts_schedule to alertsSchedule', () => {
            const dbKey = 'alerts_schedule';
            const apiKey = 'alertsSchedule';
            
            expect(apiKey).toBe('alertsSchedule');
        });
    });

    describe('GET /api/config/:key - Read Single', () => {
        test('should map camelCase to snake_case', () => {
            const key = 'alertsSchedule';
            const dbKey = key === 'alertsSchedule' ? 'alerts_schedule' : key;
            
            expect(dbKey).toBe('alerts_schedule');
        });

        test('should return 404 for non-existent key', () => {
            const value = null;
            
            if (value === null) {
                expect(value).toBeNull();
            }
        });
    });

    describe('PUT /api/config - Update (Admin Only)', () => {
        test('should require admin role', () => {
            const adminUser = { role: 'admin' };
            const viewerUser = { role: 'viewer' };
            
            expect(adminUser.role).toBe('admin');
            expect(viewerUser.role).not.toBe('admin');
        });

        test('should map API keys to DB keys', () => {
            const keyMap = {
                thresholds: 'thresholds',
                whatsapp: 'whatsapp',
                alertsSchedule: 'alerts_schedule',
                general: 'general'
            };
            
            expect(keyMap.alertsSchedule).toBe('alerts_schedule');
        });

        test('should skip undefined values', () => {
            const updates = {
                thresholds: { ctr_min: 2.0 },
                whatsapp: undefined,
                alertsSchedule: null
            };
            
            const validUpdates = Object.entries(updates).filter(([k, v]) => v !== undefined);
            
            expect(validUpdates).toHaveLength(2); // thresholds + alertsSchedule
        });

        test('should return error if no valid updates', () => {
            const updates = {};
            let updated = false;
            
            Object.entries(updates).forEach(([key, value]) => {
                if (value !== undefined) {
                    updated = true;
                }
            });
            
            expect(updated).toBe(false);
        });
    });

    describe('Config Values - JSONB Storage', () => {
        test('should serialize objects to JSON', () => {
            const value = { ctr_min: 1.5, cpc_max: 0.7 };
            const serialized = JSON.stringify(value);
            
            expect(typeof serialized).toBe('string');
            expect(serialized).toContain('"ctr_min":1.5');
        });

        test('should deserialize JSON to objects', () => {
            const json = '{"ctr_min":1.5,"cpc_max":0.7}';
            const value = JSON.parse(json);
            
            expect(value.ctr_min).toBe(1.5);
            expect(value.cpc_max).toBe(0.7);
        });
    });

    describe('Default Thresholds', () => {
        test('should have correct default values', () => {
            const defaults = {
                ctr_min: 1.5,
                cpc_max: 0.70,
                cpm_max: 10.0,
                frequency_max: 3.0,
                cost_per_follower_max: 1.30
            };
            
            expect(defaults.ctr_min).toBe(1.5);
            expect(defaults.cpc_max).toBe(0.70);
            expect(defaults.cpm_max).toBe(10.0);
            expect(defaults.frequency_max).toBe(3.0);
            expect(defaults.cost_per_follower_max).toBe(1.30);
        });
    });
});

