const mdlinks = require('../index.js');
const { stats } = require('../fileInformation.js')

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
  it('Debería resolver con un arreglo de 2 enlaces con status y request definidos', () => {
    return mdlinks('./test/testing-files/README1.md', true).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBe(2);
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
  it('Debería resolver con un arreglo de 6 enlaces cuando el argumento es el directorio ./test/testing-files', () => {
    return mdlinks('./test/testing-files', true).then((links) => {
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBe(6);
    });
  });
});
describe('stats', () => {
  const links = [{
    href: 'https://test.com.mx',
    text: 'md-links',
    file: 'C:\\Users\\LaboratorianX\\Laboratoria\\DEV009-md-links\\testing-file.text',
    status: 200,
    request: 'ok'
  },
  {
    href: 'https://test1.com.mx',
    text: 'Arreglos',
    file: 'C:\\Users\\LaboratorianX\\Laboratoria\\DEV009-md-links\\testing-file.text',
    status: 200,
    request: 'ok'
  },
  {
    href: 'https://test2.com.mx',
    text: 'md-links-test',
    file: 'C:\\Users\\LaboratorianX\\Laboratoria\\DEV009-md-links\\testing-file.text',
    status: 404,
    request: 'fail'
  }];

  it('Debería retornar un objeto con Total = 3 e Unique = 3, OK y Broken no deben estar definidos', () => {
    const linkStats = stats(links);
    // console.log(linkStats)
    expect(linkStats.Total).toBe(3);
    expect(linkStats.Unique).toBe(3);
    expect(linkStats.OK).not.toBeDefined();
    expect(linkStats.Broken).not.toBeDefined();
  });
  it('Debería retornar un objeto con OK = 2 y Broken = 1', () => {
    const linkStats = stats(links, true);
     // console.log(linkStats)
    expect(linkStats.OK).toBeDefined();
    expect(linkStats.Broken).toBeDefined();

    expect(linkStats.OK).toBe(2);
    expect(linkStats.Broken).toBe(1);
  });
});