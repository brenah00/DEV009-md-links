const fs = require('fs');
const path = require('path');

// llama a la función getFileContent con filePath = 'README.md';
getFileContent('README.md')

//Función que valida si el path es relativo, retorna true o false
function isRelativePath(filePath) {
    return !path.isAbsolute(filePath);
}
function convertToAbsolutePath(relativePath) {
    return path.resolve(relativePath);
}
function getFileLinks(markdownText){
    const linkRegex = /\[([^\]]+)\]\s?\((https?:\/\/[^\)]+)\)/g;
    const allMarkdownLinks = markdownText.match(linkRegex);
    if (allMarkdownLinks) {
        let allLinks = [];
            allMarkdownLinks.forEach(markdownLink => {
                allLinks.push({
                    linkText: (markdownLink.match(/\[([^\]]+)\]/g))[0],
                    link: (markdownLink.match(/(https?:\/\/[^\s]+)/g))[0],
                })
            });
            console.log('Enlaces encontrados:');
            allLinks.forEach(link => {
            console.log(link.link,'link a ', link.linkText);
        });
    } else {
        console.log('No se encontraron enlaces.');
    }
}
function getFileContent(filePath){
    if(isRelativePath(filePath)){
        filePath = convertToAbsolutePath(filePath); 
    }
    console.log('File: ', filePath);
    //Extensiones válidas
    const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];  
    // Obtener la extensión del archivo
    const fileExtension = path.extname(filePath);

    fs.readFile(filePath, 'utf-8', (errorPath, markdownText) => {
        // Validación de si la extensión está dentro del arreglo de extensiones válidas
        if(validExtensions.includes(fileExtension)){
            getFileLinks(markdownText);
        }
        else{
            console.error('Error reading the file, is not a markdown file', errorPath);
            return;
        }
    });
}