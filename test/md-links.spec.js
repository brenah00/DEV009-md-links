const mdlinks = require('../index.js');


describe('mdlinks', () => {
  it('should reject with an error -Links are not found. Try with another markdown file.-', () => {
    mdlinks('testwithanylinks.md')
      .then((links) => {
      })
      .catch((error) => {
        expect(error).toBe('Links are not found. Try with another markdown file.');
      })
  });
  it('should reject with an error -Error reading the file, is not a markdown file.-', () => {
    mdlinks('thumb.png')
      .then((links) => {
      })
      .catch((error) => {
        expect(error).toBe('Error reading the file, is not a markdown file.');
      })
  });
  it('should reject with an error -The markdown file does not exist.-', () => {
    mdlinks('dontExist.md')
      .then((links) => {
      })
      .catch((error) => {
        expect(error).toBe('The markdown file does not exist.');
      })
  }); 
  it('should resolve with 2 links', () => {
    mdlinks('README1.md')
      .then((links) => {
        // console.log(links.length);
        expect(links.length).toBe(2);
      })
      .catch((error) => {
      })
  });
});
