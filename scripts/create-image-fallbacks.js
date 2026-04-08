const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');

// Mapping of simplified names to actual files with suffixes
const fallbackMappings = {
  'mens-casual-shirt.jpg': 'mens-casual-shirt-1.jpg',
  'womens-bag.jpg': 'womens-bag-1.jpg',
  'mens-watch.jpg': 'mens-watch-1.jpg',
  'womens-dress.jpg': 'womens-dress-1.jpg',
};

// Create fallback images by copying the -1 versions
Object.entries(fallbackMappings).forEach(([fallbackName, actualName]) => {
  const actualPath = path.join(imagesDir, actualName);
  const fallbackPath = path.join(imagesDir, fallbackName);

  if (fs.existsSync(actualPath)) {
    if (!fs.existsSync(fallbackPath)) {
      fs.copyFileSync(actualPath, fallbackPath);
      console.log(`Created fallback: ${fallbackName} -> ${actualName}`);
    } else {
      console.log(`Fallback already exists: ${fallbackName}`);
    }
  } else {
    console.warn(`Source file not found: ${actualName}`);
  }
});

console.log('Fallback image creation complete!');


