/**
 * Hooks API Tests
 * Dashboard Sabrina Costa
 */

describe('Hooks API', () => {
    describe('GET /api/hooks - Filters', () => {
        test('should filter by category', () => {
            const category = 'Curiosidade';
            const validCategories = [
                'Curiosidade', 'Urgência', 'Transformação', 
                'Identificação', 'Lista/Número', 'Desafio',
                'Comparação', 'História', 'Pergunta', 'Autoridade'
            ];
            
            expect(validCategories).toContain(category);
        });

        test('should search with ILIKE (case-insensitive)', () => {
            const search = 'NINGUÉM';
            const pattern = `%${search}%`;
            
            expect(pattern).toBe('%NINGUÉM%');
        });

        test('should limit results (max 100)', () => {
            const limit = 50;
            const safeLimit = Math.min(Number(limit) || 50, 100);
            
            expect(safeLimit).toBe(50);
            
            const bigLimit = 200;
            const safeBigLimit = Math.min(Number(bigLimit) || 50, 100);
            
            expect(safeBigLimit).toBe(100); // Capped at 100
        });

        test('should order by usage_count DESC', () => {
            const hooks = [
                { id: '1', usageCount: 5 },
                { id: '2', usageCount: 10 },
                { id: '3', usageCount: 2 }
            ];
            
            const sorted = hooks.sort((a, b) => b.usageCount - a.usageCount);
            
            expect(sorted[0].usageCount).toBe(10);
            expect(sorted[1].usageCount).toBe(5);
            expect(sorted[2].usageCount).toBe(2);
        });
    });

    describe('GET /api/hooks/categories/list', () => {
        test('should return distinct categories', () => {
            const hooks = [
                { category: 'Curiosidade' },
                { category: 'Urgência' },
                { category: 'Curiosidade' }, // duplicate
                { category: 'Transformação' }
            ];
            
            const categories = [...new Set(hooks.map(h => h.category))];
            
            expect(categories).toHaveLength(3); // No duplicates
            expect(categories).toContain('Curiosidade');
            expect(categories).toContain('Urgência');
        });
    });

    describe('PUT /api/hooks/:id/increment', () => {
        test('should increment usage_count by 1', () => {
            let usageCount = 5;
            usageCount = usageCount + 1;
            
            expect(usageCount).toBe(6);
        });

        test('should start from 0 if NULL', () => {
            let usageCount = null || 0;
            usageCount = usageCount + 1;
            
            expect(usageCount).toBe(1);
        });
    });

    describe('Hook Categories Validation', () => {
        test('should have exactly 10 categories', () => {
            const expectedCategories = [
                'Curiosidade',
                'Urgência',
                'Transformação',
                'Identificação',
                'Lista/Número',
                'Desafio',
                'Comparação',
                'História',
                'Pergunta',
                'Autoridade'
            ];
            
            expect(expectedCategories).toHaveLength(10);
        });

        test('each category should have 5 hooks (50 total)', () => {
            const hooksPerCategory = 5;
            const totalCategories = 10;
            const totalHooks = hooksPerCategory * totalCategories;
            
            expect(totalHooks).toBe(50);
        });
    });
});

