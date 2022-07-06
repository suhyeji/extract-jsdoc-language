const fs = require('fs');
const path = require('path');

const language = process.argv[process.argv.indexOf('-l') + 1];

if (!fs.existsSync(path.join('destDir', language))) {
    fs.mkdirSync(path.join('destDir', language));
}

const sourcePath = 'sourceDir';
const destPath = path.join('destDir', language);

function exportFiles(sourceDir) {
    const files = fs.readdirSync(sourceDir);
    
    files.forEach(file => {
        exportFile(file);
    });
}

function exportFile(file) {
    if (fs.statSync(path.join(sourcePath, file)).isDirectory()) {
        let dir = file

        if (!fs.existsSync(path.join(destPath, dir))) {
            fs.mkdirSync(path.join(destPath, dir));
        }
        
        fs.readdirSync(path.join(sourcePath, dir)).forEach((subfile) => {
            return exportFile(path.join(dir, subfile));
        });

    } else {
        const pattern = /\$i18n{.*}/g;
        const startPattern = new RegExp(`${language}:.*}`);
        const endPattern = /, ?..:/;

        let data = fs.readFileSync(path.join(sourcePath, file)).toString();

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

exportFiles(sourcePath);