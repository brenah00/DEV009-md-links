const process = require('process');
const mdlinks = require('./index.js');
const {stats} = require('./fileInformation.js');
const path = process.argv[2];
const options = process.argv.slice(3);

/* console.log(process.argv);
console.log(path)
console.log(options) */
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
    //console.log(options);
    /*if(!options.includes('--validate') || !options.includes('--stats')){
        console.log('Introduce opciones validas. ', options.filter(option => {
            return option !== '--validate' && option !== '--stats';
        }), 'no existe');
    } else*/ /* if(options.includes('--validate') && options.includes('--stats')){
      console.log(stats(links, true));
    } else*/ if(options.includes('--stats')){
      console.log(stats(links, options.includes('--validate')));
    } else if(options.includes('--validate')){
      console.log(links);
    }
  })
  .catch((error) => {
    console.log(error);
  });
}