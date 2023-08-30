const mdlinks = require('../index.js');


describe('mdlinks', () => {
  it('should resolve with 2 links', () => {
    mdlinks('README1.md')
      .then((links) => {
        expect(links.length).toBe(2);
      })
      .catch((error) => {
        console.log('Error: ', error);
      })
  });
  it('should reject with an error -Links are not found. Try with another markdown file.-', () => {
    mdlinks('testwithanylinks.md')
      .then((links) => {
        // expect(links.length).toBe(2);
      })
      .catch((error) => {
        expect(error).toBe('Links are not found. Try with another markdown file.');
      })
  });
});
