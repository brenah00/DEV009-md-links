const fs = require('fs');
const path = require('path');

// llama a la función getFileContent con filePath = 'README.md';
// getFileContent('README.md')

//Función que valida si el path es relativo, retorna true o false
function isRelativePath(filePath) {
    return !path.isAbsolute(filePath);
}
function convertToAbsolutePath(relativePath) {
    return path.resolve(relativePath);
}
function getFileLinks(markdownText, filePath){
    // console.log('markdown text', markdownText);
    const linkRegex = /\[([^\]]+)\]\s?\((https?:\/\/[^\)]+)\)/g;
    const allMarkdownLinks = markdownText.match(linkRegex);
    let allLinks = [];
    if (allMarkdownLinks) {    
        allMarkdownLinks.forEach(markdownLink => {
            allLinks.push({
                linkText: (markdownLink.match(/\[([^\]]+)\]/g))[0].slice(1, -1),
                link: (markdownLink.match(/(https?:\/\/[^\s]+)/g))[0].slice(0, -1),
                linkFile: filePath,
            })
        });
    }
    return allLinks;
        /* console.log('Enlaces encontrados:');
        allLinks.forEach(link => {
            console.log(link.link,'link a ', link.linkText);
        });*/ 
    // }/* else {
    //    console.error('Links are not found. Try with another markdown file.');
    // } 
}
function getFileContent(filePath){
    return new Promise((resolve, reject) => {
        //Extensiones válidas
        const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];  
        // Obtener la extensión del archivo
        const fileExtension = path.extname(filePath);

        fs.readFile(filePath, 'utf-8', (errorPath, markdownText) => {
            // Validación de si la extensión está dentro del arreglo de extensiones válidas
            if(validExtensions.includes(fileExtension)){
                resolve(getFileLinks(markdownText, filePath));
                // return;
            } else{
                reject('Error reading the file, is not a markdown file.')
                // return;
            }
        });
    });
}
module.exports = { isRelativePath, convertToAbsolutePath, getFileLinks, getFileContent};