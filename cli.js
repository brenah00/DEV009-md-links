#!/usr/bin/env node
require('colors');
const process = require('process');
const mdlinks = require('./index.js');
const {stats} = require('./fileInformation.js');
const path = process.argv[2];
const options = process.argv.slice(3);

mdlinks(path, options.includes('--validate'))
  .then((links) => {
    const aux = options.filter(option => {
      return option !== '--validate' && option !== '--stats';
    })
    if(aux.length > 0) {
      console.log(`${aux} no es una opción válida.`);
    } else if(options.includes('--stats')) {
      console.log(stats(links, options.includes('--validate')));
    } else {
      console.log(links);
    }
  })
  .catch((error) => {
    console.log(error);
  }); 