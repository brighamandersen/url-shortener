import { pool } from './db-connection.js';

// Single URL operations
export async function saveUrl(originalUrl) {
  const client = await pool.connect();
  try {
    // First, check if the URL already exists
    const existingResult = await client.query(
      'SELECT id FROM url WHERE original_url = $1',
      [originalUrl]
    );
    
    // If it exists, return the existing ID
    if (existingResult.rows.length > 0) {
      return existingResult.rows[0].id;
    }
    
    // If it doesn't exist, create a new one
    const result = await client.query(
      'INSERT INTO url (original_url) VALUES ($1) RETURNING id',
      [originalUrl]
    );
    return result.rows[0].id;
  } catch (err) {
    console.error('Error saving URL:', err);
    throw err;
  } finally {
    client.release();
  }
}

export async function getUrlById(id) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT original_url FROM url WHERE id = $1',
      [id]
    );
    
    if (result.rows.length > 0) {
      return result.rows[0].original_url;
    }
    return null;
  } catch (err) {
    console.error('Error getting URL:', err);
    throw err;
  } finally {
    client.release();
  }
}