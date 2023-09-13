const fs = require('fs');
const path = require('path');
const axios = require('axios'); 
const { requestLink, getFileLinks, readAllFiles, getFileContent } = require('./fileInformation.js')

function mdlinks(filePath, validate) {
  return new Promise((resolve, reject) => {
    try {
      // valida si es un archivo o un directorio
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
      }
    } catch (error) {
      reject('The markdown file or directory does not exist.');
    } 
  });
}
module.exports = mdlinks;