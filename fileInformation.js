const fs = require('fs');
const path = require('path');
const axios = require('axios'); 

const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];

function requestLink(link) {
  return new Promise((resolve, reject) => {
    axios.get(link)
    .then(response => {
      resolve(response.status);
    })
    .catch(error => {
      reject(error);
    });
  });
}
function getFileLinks(markdownText, filePath){
  const linkRegex = /\[([^\]]+)\]\s?\((https?:\/\/[^\)]+)\)/g;
  const allMarkdownLinks = markdownText.match(linkRegex);
  let allLinks = [];
  if (allMarkdownLinks) {    
    allMarkdownLinks.forEach(markdownLink => {
      allLinks.push({
        href: (markdownLink.match(/(https?:\/\/[^\s]+)/g))[0].slice(0, -1),
        text: (markdownLink.match(/\[([^\]]+)\]/g))[0].slice(1, -1),
        file: filePath,
      })
    });
  }
  return allLinks;
}
function readAllFiles(directoryPath, validate){
    const files = fs.readdirSync(directoryPath);
    let promises = [];
  
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileExtension = path.extname(filePath);
  
      if (fs.statSync(filePath).isFile() && validExtensions.includes(fileExtension)) {
        const links = getFileContent(filePath, validate)
          .then(fileLinks => fileLinks)
          .catch(error => {
            return [];
          });
        promises.push(links);
      } else if (fs.statSync(filePath).isDirectory()) {
        const links = readAllFiles(filePath, validate)
        promises.push(links);
      }
    }
  
    return Promise.all(promises)
      .then(linkArrays => {
        return linkArrays.reduce((accumulator, links) => accumulator.concat(links), []);
      })
      .catch(error => {
      });
}
function getFileContent(filePath, validate){
  return new Promise((resolve, reject) => {
    // Transforma la ruta relativa a absoluta
    if(!path.isAbsolute(filePath)){
      filePath = path.resolve(filePath); 
    }
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
        } else {
          reject('No existen enlaces, intenta con otro archivo markdown.');
        }
      } else{
        reject('Error al leer el archivo, ingresa un archivo markdown.');
      }
    });
  });
}
function stats(links, validate){
  const unique = new Set();
  const linkStats = {
    'Total': links.length,
    'Unique': links.filter(link => {
      if (!unique.has(link.href)) {
        unique.add(link.href);
        return true;
      }
      return false;
    }).length
  };
  if(validate === true){
    linkStats.OK = links.filter((link) => link.request === 'ok').length;
    linkStats.Broken = links.filter((link) => link.request === 'fail').length;
  }
  return linkStats;
}
module.exports = { getFileLinks, getFileContent, requestLink, readAllFiles, stats};