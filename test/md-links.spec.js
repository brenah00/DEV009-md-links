const mdlinks = require('../index.js');

describe('mdlinks', () => {
  it('should reject with an error -Links are not found. Try with another markdown file.-', () => {
    expect(mdlinks('testwithanylinks.md', true)).rejects.toMatch('Links are not found. Try with another markdown file.');
  });
  it('should reject with an error -Error reading the file, is not a markdown file.-', () => {
    expect(mdlinks('thumb.png', true)).rejects.toMatch('Error reading the file, is not a markdown file.');
  });
  it('should reject with an error -The markdown file does not exist.-', () => {
    expect(mdlinks('dontExist.md', false)).rejects.toMatch('The markdown file does not exist.');
  }); 
  it('debe devolver una promesa resuelta con los enlaces si validate es verdadero', () => {
    // Simula un archivo markdown válido y conexiones exitosas
    return mdlinks('README1.md', true).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBe(2);
      links.forEach((link) => {
        expect(link.status).toBeDefined();
        expect(link.request).toBeDefined();
      });
    });
  });

  it('debe devolver una promesa resuelta con los enlaces si validate es falso', () => {
    return mdlinks('README1.md', false).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBe(2);
      links.forEach((link) => {
        expect(link.status).not.toBeDefined();
        expect(link.request).not.toBeDefined();
      });
    });
  });
});