const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, extensions, fileList = []) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        getAllFiles(filePath, extensions, fileList);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  }

  return fileList;
}

function extractClasses(content) {
  const classes = new Set();
  
  const patterns = [
    /class\s*=\s*"([^"]*)"/g,
    /class\s*=\s*'([^']*)'/g,
    /className\s*=\s*"([^"]*)"/g,
    /className\s*=\s*'([^']*)'/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const classString = match[1];
      const individualClasses = classString.split(/\s+/).filter(c => c.length > 0);
      for (const cls of individualClasses) {
        classes.add(cls);
      }
    }
  }

  return classes;
}

function scanFiles(paths, extensions = ['.html', '.jsx', '.tsx', '.vue', '.js', '.ts']) {
  const allClasses = new Set();

  for (const inputPath of paths) {
    const fullPath = path.resolve(inputPath);

    if (!fs.existsSync(fullPath)) {
      console.warn(`Warning: Path does not exist: ${fullPath}`);
      continue;
    }

    const stat = fs.statSync(fullPath);
    let filesToScan = [];

    if (stat.isDirectory()) {
      filesToScan = getAllFiles(fullPath, extensions);
    } else {
      filesToScan = [fullPath];
    }
    
    for (const file of filesToScan) {
      console.log(`Scanning: ${file}`);
      const content = fs.readFileSync(file, 'utf-8');
      const classes = extractClasses(content);

      for (const cls of classes) {
        allClasses.add(cls);
      }
    }
  }

  console.log(`\nFound ${allClasses.size} unique classes`);
  return allClasses;
}

module.exports = { scanFiles, extractClasses };