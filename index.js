const fs = require('fs');
const { isRelativePath, convertToAbsolutePath, getFileLinks, getFileContent} = require('./fileInformation.js')

function mdlinks(filePath) {
  return new Promise((resolve, reject) => {
    // Transforma la ruta reloativa a absoluta
    // console.log('RELATIVO: ', filePath);
    if(isRelativePath(filePath)){
      filePath = convertToAbsolutePath(filePath); 
    }
    // console.log('ABSOLUTO:', filePath);
    // Validar si la ruta absoluta existe
    if (!fs.existsSync(filePath)) {
      reject('The markdown file does not exist: ', filePath);
      // return; demas, creo
    }
    getFileContent(filePath)
      .then(links => {
        if(links.length > 0) {
          resolve(links);
        } else {
          reject('Links are not found. Try with another markdown file.');
        }
      })
      .catch((error) => {
        reject(error);
      })
  });
}

module.exports = mdlinks ;
