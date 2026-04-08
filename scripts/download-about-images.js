const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  // Hero Image
  'images/hero-fashion.jpg': 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04',

  // Technology Icons
  'icons/nextjs.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
  'icons/typescript.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
  'icons/mongodb.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
  'icons/tailwind.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg',
  
  // Team Member Images
  'team/john.jpg': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
  'team/jane.jpg': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  'team/mike.jpg': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
  
  // Social Media Icons
  'icons/facebook.svg': 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/facebook.svg',
  'icons/twitter.svg': 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/x.svg',
  'icons/instagram.svg': 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/instagram.svg',
  'icons/linkedin.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original.svg'
};

const publicDir = path.join(__dirname, '..', 'public');

// Create directories if they don't exist
const createDirIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

createDirIfNotExists(publicDir);
createDirIfNotExists(path.join(publicDir, 'icons'));
createDirIfNotExists(path.join(publicDir, 'team'));

// Download images with better error handling
const downloadImage = (filename, url) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(publicDir, filename);
    console.log(`Downloading ${filename}...`);
    
    const request = https.get(url.includes('unsplash') ? `${url}?w=400&q=80` : url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Successfully downloaded ${filename}`);
        resolve();
      });
    });

    request.on('error', (err) => {
      reject(new Error(`Error downloading ${filename}: ${err.message}`));
    });

    // Set timeout
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error(`Timeout downloading ${filename}`));
    });
  });
};

// Download all images sequentially
async function downloadAllImages() {
  for (const [filename, url] of Object.entries(images)) {
    try {
      await downloadImage(filename, url);
    } catch (error) {
      console.error(error.message);
      // Try one more time if failed
      try {
        await downloadImage(filename, url);
      } catch (retryError) {
        console.error(`Failed retry for ${filename}: ${retryError.message}`);
      }
    }
  }
}

downloadAllImages().then(() => {
  console.log('All downloads completed');
}).catch(error => {
  console.error('Download process failed:', error);
}); 