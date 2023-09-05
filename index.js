const fs = require('fs');
const { isRelativePath, convertToAbsolutePath, getFileContent, requestLink} = require('./fileInformation.js')

function mdlinks(filePath, validate) {
  return new Promise((resolve, reject) => {
    // Transforma la ruta reloativa a absoluta
    // console.log('RELATIVO: ', filePath);
    if(isRelativePath(filePath)){
      filePath = convertToAbsolutePath(filePath); 
    }
    // console.log('ABSOLUTO:', filePath);
    // Validar si la ruta absoluta existe
    if (!fs.existsSync(filePath)) {
      reject('The markdown file does not exist.');
      return;
    }
    getFileContent(filePath)
      .then(links => {
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

            // Esperar a que todas las solicitudes se completen antes de resolver la promesa principal
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
          reject('Links are not found. Try with another markdown file.');
          // return;
        }
      })
      .catch((error) => {
        reject(error);
        // return;
      })
  });
}

mdlinks('README1.md', true)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.log(error);
  })
module.exports = mdlinks ;
