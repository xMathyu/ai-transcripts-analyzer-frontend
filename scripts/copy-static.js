const fs = require('fs');
const path = require('path');

function copyDirectorySync(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`Source directory ${src} does not exist`);
    return;
  }
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectorySync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying static files for Azure deployment...');

// Copy static files to standalone directory
const staticSrc = path.join(__dirname, '../.next/static');
const staticDest = path.join(__dirname, '../.next/standalone/.next/static');

// Copy public files to standalone directory  
const publicSrc = path.join(__dirname, '../public');
const publicDest = path.join(__dirname, '../.next/standalone/public');

if (fs.existsSync(staticSrc)) {
  copyDirectorySync(staticSrc, staticDest);
  console.log('✅ Static files copied successfully');
} else {
  console.log('❌ Static source directory not found');
}

if (fs.existsSync(publicSrc)) {
  copyDirectorySync(publicSrc, publicDest);
  console.log('✅ Public files copied successfully');
} else {
  console.log('❌ Public source directory not found');
}

console.log('✅ Azure deployment preparation complete!');
