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

// Batch URL processing - much faster for multiple URLs
export async function saveUrlsBatch(urls) {
  const client = await pool.connect();
  try {
    // First, check which URLs already exist
    const existingResult = await client.query(
      'SELECT id, original_url FROM url WHERE original_url = ANY($1)',
      [urls]
    );
    
    // Create a map of existing URLs to their IDs
    const existingMap = new Map();
    existingResult.rows.forEach(row => {
      existingMap.set(row.original_url, row.id);
    });
    
    // Find URLs that don't exist yet
    const newUrls = urls.filter(url => !existingMap.has(url));
    
    let newUrlMap = new Map();
    
    // If there are new URLs, insert them
    if (newUrls.length > 0) {
      const insertResult = await client.query(
        'INSERT INTO url (original_url) VALUES ' + 
        newUrls.map((_, index) => `($${index + 1})`).join(', ') + 
        ' RETURNING id, original_url',
        newUrls
      );
      
      // Create map of new URLs to their IDs
      insertResult.rows.forEach(row => {
        newUrlMap.set(row.original_url, row.id);
      });
    }
    
    // Return the ID for each URL (existing or new)
    return urls.map(url => {
      return existingMap.get(url) || newUrlMap.get(url);
    });
    
  } catch (err) {
    console.error('Error saving URLs batch:', err);
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

export async function getAllUrls() {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, original_url FROM url ORDER BY created_at DESC'
    );
    return result.rows;
  } catch (err) {
    console.error('Error getting all URLs:', err);
    throw err;
  } finally {
    client.release();
  }
}
