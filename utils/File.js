const fs = require('fs');

const File = {
  read: (filePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, contents) => {
        if (!err) {
          resolve(contents);
        } else {
          reject(err);
        }
      });
    });
  },
  write: (filePath, contents) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, contents, (err) => {
        if(err) {
          reject(err);
        }
        resolve();
      });
    });
  },
};

module.exports = File;
