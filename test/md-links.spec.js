const mdlinks = require('../index.js');

describe('mdlinks', () => {
  it('should reject with an error -Links are not found. Try with another markdown file.-', () => {
    expect(mdlinks('testwithanylinks.md', true)).rejects.toMatch('Links are not found. Try with another markdown file.');
  });
  it('should reject with an error -Error reading the file, is not a markdown file.-', () => {
    expect(mdlinks('thumb.png', true)).rejects.toMatch('Error reading the file, is not a markdown file.');
  });
  it('should reject with an error -The markdown file or directory does not exist.-', () => {
    expect(mdlinks('dontExist.md', false)).rejects.toMatch('The markdown file or directory does not exist.');
  });
  it('should resolve with an array of 2 links with status and request defined if validate is true', () => {
    return mdlinks('README1.md', true).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBe(2);
      links.forEach((link) => {
        expect(link.status).toBeDefined();
        expect(link.request).toBeDefined();
      });
    });
  });
  it('should resolve with an array of 2 links with status and request not defined if validate is false', () => {
    return mdlinks('README1.md', false).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBe(2);
      links.forEach((link) => {
        expect(link.status).not.toBeDefined();
        expect(link.request).not.toBeDefined();
      });
    });
  });
  it('should resolve with an array of links when a directory is the argument', () => {
    return mdlinks('../DEV009-md-links', true).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      links.forEach((link) => {
        expect(link.status).toBeDefined();
        expect(link.request).toBeDefined();
      });
    });
  });
});