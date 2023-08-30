const fs = require('fs');
const { isRelativePath, convertToAbsolutePath, getFileLinks, getFileContent} = require('./fileInformation.js')

function mdlinks(filePath) {
  return new Promise((resolve, reject) => {
    // Transforma la ruta reloativa a absoluta
    if(isRelativePath(filePath)){
      filePath = convertToAbsolutePath(filePath); 
    }
    // Validar si la ruta absoluta existe
    if (!fs.existsSync(filePath)) {
      reject('The markdown file does not exist: ', filePath);
      // return; demas, creo
    }
    const fileContent = getFileContent(filePath);
    if(fileContent != false){
      const allLinks = getFileLinks(fileContent, filePath);
      if(allLinks.length > 0) {
        resolve(allLinks);
      } else {
        reject('Links are not found. Try with another markdown file.');
      }
    }
    else{
      reject('Error reading the file, is not a markdown file.');
    }
  });
}

module.exports = mdlinks ;
