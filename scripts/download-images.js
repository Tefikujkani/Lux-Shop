const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  // Hero and category images
  'hero-fashion.jpg': 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04',
  'category-men.jpg': 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59',
  'category-women.jpg': 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
  'category-accessories.jpg': 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49',

  // Men's Products
  'mens-casual-shirt-1.jpg': 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf',
  'mens-casual-shirt-2.jpg': 'https://images.unsplash.com/photo-1604695573706-53170668f6a6',
  'mens-casual-shirt-3.jpg': 'https://images.unsplash.com/photo-1603252109303-2751441dd157',
  'mens-jacket-1.jpg': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
  'mens-jacket-2.jpg': 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
  'mens-jacket-3.jpg': 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504',
  'mens-watch-1.jpg': 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7',
  'mens-watch-2.jpg': 'https://images.unsplash.com/photo-1622434641406-a158123450f9',
  'mens-shoes-1.jpg': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  'mens-shoes-2.jpg': 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3',
  'mens-shoes-3.jpg': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
  'mens-suit-1.jpg': 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc',
  'mens-suit-2.jpg': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35',
  'mens-jeans-1.jpg': 'https://images.unsplash.com/photo-1542272604-787c3835535d',
  'mens-jeans-2.jpg': 'https://images.unsplash.com/photo-1604176354204-9268737828e4',
  'mens-polo-1.jpg': 'https://images.unsplash.com/photo-1581655353564-df123a1eb820',
  'mens-sweater-1.jpg': 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2',
  'mens-shorts-1.jpg': 'https://images.unsplash.com/photo-1563643021-fc79b9e02867',
  'mens-track-pants-1.jpg': 'https://images.unsplash.com/photo-1517940310602-26535839fe84',

  // Women's Products
  'womens-dress-1.jpg': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
  'womens-dress-2.jpg': 'https://images.unsplash.com/photo-1612336307429-8a898d10e223',
  'womens-dress-3.jpg': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1',
  'womens-bag-1.jpg': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
  'womens-bag-2.jpg': 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d',
  'womens-bag-3.jpg': 'https://images.unsplash.com/photo-1591561954557-26941169b49e',
  'womens-shoes-1.jpg': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
  'womens-shoes-2.jpg': 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95',
  'womens-shoes-3.jpg': 'https://images.unsplash.com/photo-1581101767113-1677fc2beaa8',
  'womens-jacket-1.jpg': 'https://images.unsplash.com/photo-1525450824786-227cbef70703',
  'womens-jacket-2.jpg': 'https://images.unsplash.com/photo-1551489186-cf8726f514f8',
  'womens-blouse-1.jpg': 'https://images.unsplash.com/photo-1624206112918-f140f087f9b5',
  'womens-blouse-2.jpg': 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f',
  'womens-skirt-1.jpg': 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa',
  'womens-suit-1.jpg': 'https://images.unsplash.com/photo-1632149877166-f75d49000351',
  'womens-yoga-pants-1.jpg': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
  'womens-hat-1.jpg': 'https://images.unsplash.com/photo-1521369909029-2afed882baee',

  // Accessories
  'sunglasses-1.jpg': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
  'sunglasses-2.jpg': 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a',
  'belt-1.jpg': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
  'belt-2.jpg': 'https://images.unsplash.com/photo-1624222247344-550fb60583dc',
  'jewelry-1.jpg': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338',
  'jewelry-2.jpg': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
  'jewelry-3.jpg': 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a',
  'jewelry-4.jpg': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e',
  'watch-luxury-1.jpg': 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e',
  'watch-luxury-2.jpg': 'https://images.unsplash.com/photo-1526045431048-f857369baa09',
  'wallet-1.jpg': 'https://images.unsplash.com/photo-1627123424574-724758594e93',
  'wallet-2.jpg': 'https://images.unsplash.com/photo-1517254797898-04edd251bfb3',
  'tie-1.jpg': 'https://images.unsplash.com/photo-1589756823695-278bc923f962',
  'gloves-1.jpg': 'https://images.unsplash.com/photo-1578116922645-3976907a7671'
};

const publicDir = path.join(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');

// Create directories if they don't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Delete all existing images
fs.readdirSync(imagesDir).forEach(file => {
  fs.unlinkSync(path.join(imagesDir, file));
});

// Download images with better error handling
const downloadImage = (filename, url) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(imagesDir, filename);
    console.log(`Downloading ${filename}...`);
    
    const request = https.get(`${url}?w=800&q=80`, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        // Verify file size
        const stats = fs.statSync(filepath);
        if (stats.size < 1000) { // If file is too small, likely an error
          fs.unlinkSync(filepath);
          reject(new Error(`Downloaded file too small for ${filename}`));
          return;
        }
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