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


app.get('/', (req, res) => {
  console.log('index')
  res.render('index');
});

app.get('/shorten', (req, res) => {
  res.redirect('/');
});



app.post('/shorten', upload.single('htmlFile'), (req, res) => {
  console.log('shorten');
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    // Get HTML content as string from memory buffer
    const htmlContent = req.file.buffer.toString('utf8');
    console.log('htmlContent', htmlContent)

    // Extract URLs from HTML (you can use regex or a proper HTML parser)
    const urlRegex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;
    const urls = htmlContent.match(urlRegex) || [];
    console.log('urls', urls);
    
    // Process URLs here (shorten them, etc.)
    // const processedUrls = urls.map(url => ({
    //   original: url,
    //   shortened: `https://short.ly/${Math.random().toString(36).substr(2, 8)}` // Example shortening
    // }));
    
    // Replace URLs in the HTML content
    // let processedHtml = htmlContent;
    // processedUrls.forEach(({ original, shortened }) => {
    //   processedHtml = processedHtml.replace(new RegExp(original, 'g'), shortened);
    // });
    
    res.render('result', {
      processedHtml: htmlContent,
    });
    
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Error processing file');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
