import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer({ 
  storage: multer.memoryStorage() // Store in memory instead of disk
});

app.set('view engine', 'ejs');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // Needed for forms

let processedHtmlContent = ''; // FIXME: Temproary to get things working, then need to make scalable

app.get('/', (req, res) => {
  console.log('index')
  res.render('index');
});

app.get('/result', (req, res) => {
  console.log('result')
  res.render('result', { processedHtml: processedHtmlContent });
});

app.post('/shorten', upload.single('htmlFile'), (req, res) => {
  console.log('shorten');
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // console.log('req.file', req.file)

  try {
    // Get HTML content as string from memory buffer
    const htmlContent = req.file.buffer.toString('utf8');
    console.log('htmlContent', htmlContent)

    processedHtmlContent = htmlContent;
    
  //   // Extract URLs from HTML (you can use regex or a proper HTML parser)
  //   const urlRegex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;
  //   const urls = htmlContent.match(urlRegex) || [];
    
  //   console.log('Found URLs:', urls);
    
  //   // Process URLs here (shorten them, etc.)
  //   const processedUrls = urls.map(url => ({
  //     original: url,
  //     shortened: `https://short.ly/${Math.random().toString(36).substr(2, 8)}` // Example shortening
  //   }));
    
  //   // Return the results
  //   res.json({
  //     message: 'URLs extracted and processed',
  //     urls: processedUrls
  //   });
    
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Error processing file');
  }

  // console.log('req', req)
  // console.log('req.body', req.body)
  // console.log('req.files', req.files)
  res.redirect('/result');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
