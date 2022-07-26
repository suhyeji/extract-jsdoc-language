const fs = require('fs');
const path = require('path');

const language = process.argv[process.argv.indexOf('-l') + 1];
const srcPath = process.argv[process.argv.indexOf('-src') + 1];
const destPath = path.join('localeDocs', language);

if (!fs.existsSync(destPath)) {
  fs.mkdirSync(destPath, {recursive: true});
}

function exportFiles(sourceDir) {
  const files = fs.readdirSync(sourceDir);
  
  files.forEach(file => {
    exportFile(file);
  });
}

function exportFile(file) {
  if (fs.statSync(path.join(srcPath, file)).isDirectory()) {
    let dir = file

    if (!fs.existsSync(path.join(destPath, dir))) {
      fs.mkdirSync(path.join(destPath, dir), {recursive: true});
    }
    
    fs.readdirSync(path.join(srcPath, dir)).forEach((subfile) => {
      return exportFile(path.join(dir, subfile));
    });

  } else {
    const pattern = /\$i18n{.*}/g;
    const startPattern = new RegExp(`${language}:.*}`);
    const endPattern = /, ?..:/;

    let data = fs.readFileSync(path.join(srcPath, file)).toString();

    if (pattern.test(data)) {
      data.match(pattern).forEach((comment) => {
        startIdx = comment.search(startPattern) + 3;
        langComment = comment.slice(startIdx,);
    
        if (endPattern.test(langComment)) {
            const idx = langComment.search(endPattern);
            langComment = langComment.slice(0, idx);
        } else {
            langComment = langComment.slice(0, -1);
        }

        data = data.replace(comment, langComment);
      });
    }

    fs.writeFileSync(path.join(destPath, file), data);
  }
}

exportFiles(srcPath);