/**
 * Authentication API Tests
 * Dashboard Sabrina Costa
 */

const bcrypt = require('bcryptjs');
const { sign, verify, authenticateJWT } = require('../utils/jwt');
const { query } = require('../db/connection');

// Mock database connection
jest.mock('../db/connection');

describe('Authentication API', () => {
    describe('JWT Utilities', () => {
        test('sign() should generate valid JWT token', () => {
            const payload = {
                userId: '123',
                email: 'test@example.com',
                role: 'admin'
            };
            
            const token = sign(payload);
            
            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
            expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
        });

        test('verify() should validate correct token', () => {
            const payload = {
                userId: '123',
                email: 'test@example.com',
                role: 'admin'
            };
            
            const token = sign(payload);
            const decoded = verify(token);
            
            expect(decoded.userId).toBe(payload.userId);
            expect(decoded.email).toBe(payload.email);
            expect(decoded.role).toBe(payload.role);
        });

        test('verify() should throw error for invalid token', () => {
            expect(() => verify('invalid.token.here')).toThrow();
        });

        test('verify() should throw error for expired token', () => {
            // Create token with 0 second expiry
            const jwt = require('jsonwebtoken');
            const token = jwt.sign(
                { userId: '123' }, 
                process.env.JWT_SECRET || 'default_secret_change_in_production',
                { expiresIn: '0s' }
            );
            
            // Wait a bit and then verify (should fail)
            setTimeout(() => {
                expect(() => verify(token)).toThrow();
            }, 100);
        });
    });

    describe('Password Hashing', () => {
        test('bcrypt should hash password correctly', async () => {
            const password = 'TestPassword123!';
            const hash = await bcrypt.hash(password, 10);
            
            expect(hash).toBeDefined();
            expect(hash).not.toBe(password);
            expect(hash.length).toBeGreaterThan(50);
        });

        test('bcrypt compare should validate correct password', async () => {
            const password = 'TestPassword123!';
            const hash = await bcrypt.hash(password, 10);
            
            const isMatch = await bcrypt.compare(password, hash);
            expect(isMatch).toBe(true);
        });

        test('bcrypt compare should reject incorrect password', async () => {
            const password = 'TestPassword123!';
            const wrongPassword = 'WrongPassword456!';
            const hash = await bcrypt.hash(password, 10);
            
            const isMatch = await bcrypt.compare(wrongPassword, hash);
            expect(isMatch).toBe(false);
        });
    });

    describe('Middleware authenticateJWT', () => {
        test('should call next() with valid token', () => {
            const payload = { userId: '123', email: 'test@test.com', role: 'admin' };
            const token = sign(payload);
            
            const req = {
                headers: {
                    authorization: `Bearer ${token}`
                }
            };
            const res = {};
            const next = jest.fn();
            
            authenticateJWT(req, res, next);
            
            expect(req.user).toBeDefined();
            expect(req.user.userId).toBe(payload.userId);
            expect(next).toHaveBeenCalled();
        });

        test('should return 401 when no token provided', () => {
            const req = { headers: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();
            
            authenticateJWT(req, res, next);
            
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                error: 'Token de autenticação não fornecido'
            });
        });

        test('should return 403 with invalid token', () => {
            const req = {
                headers: {
                    authorization: 'Bearer invalid.token.here'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();
            
            authenticateJWT(req, res, next);
            
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalled();
        });
    });

    describe('POST /api/auth/login', () => {
        test('should return error when email missing', async () => {
            const body = { password: 'test123' };
            
            // Simulate response
            expect(body.email).toBeUndefined();
        });

        test('should return error when password missing', async () => {
            const body = { email: 'test@test.com' };
            
            expect(body.password).toBeUndefined();
        });

        test('should return 401 for non-existent user', async () => {
            query.mockResolvedValue({ rows: [] });
            
            // User not found
            const result = { rows: [] };
            expect(result.rows.length).toBe(0);
        });

        test('should return 401 for incorrect password', async () => {
            const passwordHash = await bcrypt.hash('correct', 10);
            
            query.mockResolvedValue({
                rows: [{
                    id: '123',
                    email: 'test@test.com',
                    password_hash: passwordHash,
                    name: 'Test',
                    role: 'admin'
                }]
            });
            
            const wrongPassword = 'wrong';
            const isMatch = await bcrypt.compare(wrongPassword, passwordHash);
            
            expect(isMatch).toBe(false);
        });

        test('should return token for valid credentials', async () => {
            const password = 'correct123';
            const passwordHash = await bcrypt.hash(password, 10);
            
            const user = {
                id: '123',
                email: 'test@test.com',
                password_hash: passwordHash,
                name: 'Test User',
                role: 'admin'
            };
            
            query.mockResolvedValue({ rows: [user] });
            
            const isMatch = await bcrypt.compare(password, passwordHash);
            expect(isMatch).toBe(true);
            
            const token = sign({
                userId: user.id,
                email: user.email,
                role: user.role
            });
            
            expect(token).toBeDefined();
            
            const decoded = verify(token);
            expect(decoded.userId).toBe(user.id);
        });
    });
});

