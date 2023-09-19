const mdlinks = require('../index.js');

describe('mdlinks', () => {
  it('Debería rechazar con un error -No existen enlaces, intenta con otro archivo markdown.-', () => {
    expect(mdlinks('./test/testing-files/testwithanylinks.md', true)).rejects.toMatch('No existen enlaces, intenta con otro archivo markdown.');
  });
  it('Debería rechazar con un error -Error al leer el archivo, ingresa un archivo markdown.-', () => {
    expect(mdlinks('thumb.png', true)).rejects.toMatch('Error al leer el archivo, ingresa un archivo markdown.');
  });
  it('Debería rechazar con un error -El archivo markdown o directorio no existe.-', () => {
    expect(mdlinks('dontExist.md', false)).rejects.toMatch('El archivo markdown o directorio no existe.');
  });
  it('Debería resolver con un arreglo de 6 enlaces cuando el argumento es un directorio', () => {
    return mdlinks('./test/testing-files', true).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBe(6);
      links.forEach((link) => {
        expect(link.status).toBeDefined();
        expect(link.request).toBeDefined();
      });
    });
  });
  it('Debería resolver con un arreglo de 2 enlaces con status y request no definidos', () => {
    return mdlinks('./test/testing-files/README1.md', false).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBe(2);
      links.forEach((link) => {
        expect(link.status).not.toBeDefined();
        expect(link.request).not.toBeDefined();
      });
    });
  });
  it('Debería resolver con un arreglo de 2 enlaces', () => {
    return mdlinks('./test/testing-files', true).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      links.forEach((link) => {
        expect(link.status).toBeDefined();
        expect(link.request).toBeDefined();
      });
    });
  });
});