import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { extractUrls } from './utils.js';
import { initializeDatabase, closeDatabase } from './db-connection.js';
import { saveUrl, saveUrlsBatch, getUrlById } from './url-operations.js';


const app = express();
const PORT = process.env.PORT || 3006;

const PROD_BASE_URL = 'https://short.brighamandersen.com';
const DEV_BASE_URL = `http://localhost:${PORT}`;
const baseUrl = process.env.NODE_ENV === 'production' ? PROD_BASE_URL : DEV_BASE_URL;

const upload = multer({ 
  storage: multer.memoryStorage() // Store in memory instead of disk
});

app.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // Needed for forms

// Initialize database on startup
initializeDatabase().catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/shorten', (req, res) => {
  res.redirect('/');
});

app.post('/shorten', upload.single('htmlFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    // Get HTML content as string from memory buffer
    const htmlContent = req.file.buffer.toString('utf8');
    // console.log('htmlContent', htmlContent)

    // Extract URLs from HTML (you can use regex or a proper HTML parser)
    const urls = extractUrls(htmlContent);
    console.log('urls', urls);
    
    // Process all URLs in a single batch operation (much faster!)
    const ids = await saveUrlsBatch(urls);
    
    const processedUrls = urls.map((originalUrl, index) => {
      const id = ids[index];
      const newUrl = `${baseUrl}/${id}`;
      
      return { id, originalUrl, newUrl };
    });
    console.log('processedUrls', processedUrls);
    
    // Replace URLs in the HTML content
    let processedHtml = htmlContent;
    processedUrls.forEach(({ originalUrl, newUrl }) => {
      // Escape special regex characters in the URL
      const escapedUrl = originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      processedHtml = processedHtml.replace(new RegExp(escapedUrl, 'g'), newUrl);
    });
    
    res.render('result', {
      processedHtml,
    });
    
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Error processing file');
  }
});

// --- REDIRECT SHORT LINKS ---
app.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).send('URL not found');
  
  try {
    const originalUrl = await getUrlById(id);
    if (!originalUrl) return res.status(404).send('URL not found');

    res.redirect(originalUrl);
  } catch (error) {
    console.error('Error retrieving URL:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await closeDatabase();
  process.exit(0);
});