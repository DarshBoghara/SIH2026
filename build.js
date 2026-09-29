const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else if (exists) {
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

console.log('--- BioSync Universal Static Build Script ---');

const coreFiles = ['index.html', 'styles.css', 'script.js'];
const imgFiles = ['img1.jpeg', 'img2.jpeg', 'img3.jpeg', 'img4.jpeg', 'img5.jpeg'];

// Target directories that Vercel might use as output
const targetDirs = [
  path.join(__dirname, 'public'),
  path.join(__dirname, 'dist'),
  path.join(__dirname, 'biosync-site'),
  path.join(__dirname, 'biosync-site', 'public'),
  path.join(__dirname, 'biosync-site', 'dist')
];

targetDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Copy core files
  coreFiles.forEach((file) => {
    const src = path.join(__dirname, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(dir, file));
    }
  });

  // Copy images
  imgFiles.forEach((img) => {
    const src = path.join(__dirname, img);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(dir, img));
    }
  });

  // Ensure molecular images exist in both images/ and public/images/
  const molecularSrc = path.join(__dirname, 'public', 'images', 'molecular');
  if (fs.existsSync(molecularSrc)) {
    copyRecursiveSync(molecularSrc, path.join(dir, 'images', 'molecular'));
    copyRecursiveSync(molecularSrc, path.join(dir, 'public', 'images', 'molecular'));
  }
});

console.log('Build completed: Assets synchronized to all static output directories.');
