# Markdown Links

## Índice

* [1. Resumen del proyecto](#1-resumen-del-proyecto)
* [2. Instalación](#2-instalación)
* [3. Funcionamiento](#3-funcionamiento)

***

## 1. Resumen del proyecto

[![mdlinks-start.png](https://i.postimg.cc/fysmvZ54/mdlinks-start.png)](https://postimg.cc/WF9d2BQS)

**Markdown** es un lenguaje de marcado ligero utilizado en diferentes plataformas que manejan texto planopor lo que es común encontrar variedad de archivos en ese formato en cualquier tipo de repositorio.

Generalmente en estos archivos se comparte información relevante del desarrollo y puede venir acompañado de *links*, los cuales en diferentes casos pueden estar rotos por lo que afecta en la comunicación con quién está leyendo.

Aunado a este planteamiento, en este proyecto se desarrolló una librería en Node.js, su función es analizar los archivos markdown y extraer los enlaces que se encuentran dentro de estos.

Esta librería estará disponible de dos formas: 

* Módulo publicado en GitHub, para que las usuarias puedan instalar e importar en otros proyectos.

* *Interfaz de línea de comandos* (CLI) para poder ser usada desde la terminal. La cual puede proporcionar la validación de enlaces y estadísticas.

## 2. Instalación

Ejecuta este comando en la terminal

```
npm install brenah00/DEV009-md-links
```
## 3. Funcionamiento

Una vez que se haya completado la instalación, puedes usarla en:

### Terminal

Para ejecutarlo escribe lo siguiente:

```
mdlinks ruta-archivo-o-directorio
```

Esto te mostrará todos los enlaces encontrados en el archivo o  directorio proporcionado con los siguientes parámetros:
 * **href** - Enlace 
 * **text** - Texto al que hace referencia el enlace
 * **file** - Ruta en la que el enlace fue encontrado

[V-deo-sin-t-tulo-Hecho-con-Clipchamp.gif](https://postimg.cc/ZC3vtM5t)

Esta librería tiene 2 opciones para su ejecución:

#### `--validate`

Validará si el link funciona correctamente o si está roto, añadiendo a cada enlace los parámetros:
 * **status** - Códigos de respuesta HTTP
 * **request** - La solicitud fue exitosa o falló

#### `--stats`

Mostrará estadísticas de los links como:
 * **Total** - Cantidad de enlaces encontrados
 * **Unique** - Cantidad de enlaces únicos, es decir, sin repetición.

En caso de que esta opción se combine con `--validate`, se agregarán dos estadísticas: 
* **OK** - Cantidad de enlaces que redirigen correctamente.
* **Broken** - Cantidad de enlaces rotos.

## Implementación

Esta librería fue desarrolla con nodeJS y Javascript. 

[![mdlinks.jpg](https://i.postimg.cc/tgQNLm6q/mdlinks.jpg)](https://postimg.cc/qNwKKwQS)
