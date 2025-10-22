import { Pool } from 'pg';

// Database configuration
const dbConfig = {
  user: process.env.DB_USER || 'url_shortener_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'url_shortener',
  password: process.env.DB_PASSWORD || 'BMT7yTm@bsZ2*iByy4c@E3i%Ftw7#s',
  port: process.env.DB_PORT || 5432,
};

// Create connection pool
const pool = new Pool(dbConfig);

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Initialize database schema
export async function initializeDatabase() {
  try {
    const client = await pool.connect();
    
    // Create URLs table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS url (
        id VARCHAR(10) PRIMARY KEY DEFAULT substring(md5(random()::text) from 1 for 8),
        original_url TEXT NOT NULL
      );
    `);
    
    // Check if the table exists and update the schema if needed
    const tableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'url'
      );
    `);
    
    if (tableExists.rows[0].exists) {
      // Check if the id column has a default value
      const columnInfo = await client.query(`
        SELECT column_default 
        FROM information_schema.columns 
        WHERE table_name = 'url' 
        AND column_name = 'id'
        AND table_schema = 'public';
      `);
      
      // If no default value exists, add it
      if (!columnInfo.rows[0]?.column_default) {
        await client.query(`
          ALTER TABLE url 
          ALTER COLUMN id SET DEFAULT substring(md5(random()::text) from 1 for 8);
        `);
        console.log('Updated id column to have auto-generated default value');
      }
    }
    
    console.log('Database schema initialized successfully');
    client.release();
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  }
}

// Close the pool when the application shuts down
export async function closeDatabase() {
  await pool.end();
}

// Export the pool for use in other modules
export { pool };
