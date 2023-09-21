#!/usr/bin/env node
const colors = require('colors');
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
      if (aux.length === 1){
        console.log(`${aux}`.red.bold, `no es una opción válida.`);
      } else{
        console.log(`${aux}`.red.bold, `no son opciones válidas.`);
      }
      console.log('\nLas opciones válidas son ', '--validate'.green.bold, ' y ', '--stats'.green.bold);
    } else if(options.includes('--stats')) {
      const fileStats = stats(links, options.includes('--validate'));
      console.log('**********************************'.rainbow)
      console.log('Total: '.cyan.bold, `${fileStats.Total}`.italic);
      console.log('Unique: '.cyan.bold, `${fileStats.Total}`.italic);
      if(options.includes('--validate')){
        console.log('OK: '.green.bold, `${fileStats.OK}`.italic);
        console.log('Broken: '.red.bold, `${fileStats.Broken}`.italic);
      }
      console.log('**********************************'.rainbow)
    } else {
      console.log('Se encontraron los siguientes enlaces'.magenta.bold)
      links.forEach(link => {
        console.log('**********************************'.rainbow)
        console.log('href: '.cyan.bold, link.href.italic);
        console.log('text: '.cyan.bold, link.text.italic);
        console.log('file: '.cyan.bold, link.file.italic);
        if(options.includes('--validate')){
          console.log('status: '.cyan.bold, link.status);
          if(link.request === 'ok'){
            console.log('request '.cyan.bold, link.request.italic.green);
          } else {
            console.log('request '.cyan.bold, link.request.italic.red);
          }
        }
      });
      console.log('**********************************'.rainbow)
    }
  })
  .catch((error) => {
    console.log(error.red.bold);
  }); 