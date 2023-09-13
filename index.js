const fs = require('fs');
const path = require('path');
const axios = require('axios'); 
const { requestLink, getFileLinks, readAllFiles, getFileContent } = require('./fileInformation.js')

function mdlinks(filePath, validate) {
// validar que un archivo sea directorio

// console.log('Directorio actual:', __dirname);
  return new Promise((resolve, reject) => {
    try {
      if (fs.statSync(filePath).isFile()) {
        getFileContent(filePath, validate)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } else if (fs.statSync(filePath).isDirectory()) {
        resolve(readAllFiles(filePath, validate));
      }/* else {
        reject('The markdown file or directory does not exist.');
      } */
    } catch (error) {
      reject('The markdown file or directory does not exist.');
    } 
  });
}

/* mdlinks('../DEV009-md-links', true)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.log(error);
  }); */

module.exports = mdlinks;