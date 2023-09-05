const fs = require('fs');
const path = require('path');
const axios = require('axios'); 
const { requestLink, getFileLinks } = require('./fileInformation.js')

function mdlinks(filePath, validate) {
  return new Promise((resolve, reject) => {
    // Transforma la ruta reloativa a absoluta
    if(!path.isAbsolute(filePath)){
      filePath = path.resolve(filePath); 
    }
    // Validar si la ruta absoluta existe
    if (!fs.existsSync(filePath)) {
      reject('The markdown file does not exist.');
      return;
    }
    const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];  
    // Obtener la extensión del archivo
    const fileExtension = path.extname(filePath);
    fs.readFile(filePath, 'utf-8', (errorPath, markdownText) => {
      // Validación de si la extensión está dentro del arreglo de extensiones válidas
      if(validExtensions.includes(fileExtension)){
        const links = getFileLinks(markdownText, filePath);
        if(links.length > 0) {
          if(validate === true) {
            const promises = links.map(linkRequested => {
              return requestLink(linkRequested.href)
                .then(response => {
                  linkRequested.status = response;
                  linkRequested.request = 'ok';
                })
                .catch(error => {
                  linkRequested.status = error.response.status;
                  linkRequested.request = 'fail';
                });
            });
            Promise.all(promises)
              .then(() => {
                resolve(links);
              })
              .catch(err => {
                reject(err);
              });
          } else {
            resolve(links);
          } 
        // return;
        } else {
          reject('Links are not found. Try with another markdown file.'); // return;
        }
      } else{
        reject('Error reading the file, is not a markdown file.'); // return;
      }
    });
  });
}

/* mdlinks('README1.md', true)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.log(error);
  }); */

module.exports = mdlinks;