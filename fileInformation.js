const fs = require('fs');
const path = require('path');
const axios = require('axios'); 

const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
//Función que valida si el path es relativo, retorna true o false
/* function isRelativePath(filePath) {
    return !path.isAbsolute(filePath);
}
function convertToAbsolutePath(relativePath) {
    return path.resolve(relativePath);
} */
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
            // console.error(`Error en el archivo ${filePath}: ${error}`);
            return [];
          });
        promises.push(links);
      }
    }
  
    return Promise.all(promises)
      .then(linkArrays => {
        return linkArrays.reduce((accumulator, links) => accumulator.concat(links), []);
      })
      .catch(error => {
        /* console.error('Error en la función principal:', error);
        throw error; */
      });
}
function getFileContent(filePath, validate){
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
module.exports = {/* isRelativePath, convertToAbsolutePath,*/ getFileLinks, getFileContent, requestLink, readAllFiles};