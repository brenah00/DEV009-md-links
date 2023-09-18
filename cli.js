#!/usr/bin/env node
require('colors');
const process = require('process');
const mdlinks = require('./index.js');
const {stats} = require('./fileInformation.js');
const path = process.argv[2];
const options = process.argv.slice(3);
if(options.length === 0){
  mdlinks(path)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.log(error);
  }); 
} else{
  mdlinks(path, true)
  .then((links) => {
    const aux = options.filter(option => {
        return option !== '--validate' && option !== '--stats';
    })
    if(aux.length > 0){
        console.log(`Introduce opciones validas. ${aux} no existe`);
    } else if(options.includes('--stats')){
      console.log(stats(links, options.includes('--validate')));
    } else if(options.includes('--validate')){
      console.log(links);
    }
  })
  .catch((error) => {
    console.log(error);
  });
}