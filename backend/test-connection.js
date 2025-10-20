const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres:KGpLvZ4erc3MMYJn@db.ddadyebnnbwqrjjtvgca.supabase.co:5432/postgres',
    ssl: { rejectUnauthorized: false }
});

async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('✓ Database connected successfully:', result.rows[0]);
        await pool.end();
    } catch (err) {
        console.error('✗ Database connection failed:', err.message);
        await pool.end();
    }
}

testConnection();
