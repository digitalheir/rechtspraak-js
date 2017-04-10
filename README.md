# Rechtspraak.js
A bunch of utility functions to work with the open data in [Rechtspraak.nl](http://www.rechtspraak.nl/) and create pretty, well-formed JSON-LD. 

Written in TypeScript, compiled to a Javascript commonjs module.

## Why?
Rechtspraak.nl publishes information about a lot of Dutch court judgments. Although the source XML suggests that the data is valid [RDF](https://www.w3.org/2001/sw/wiki/RDF), the truth is not so. Furthermore, Rechtspraak.nl provides no schema for its documents other than an incomplete PDF in natural language. So it's hard to know what to expect, especially for some esoteric metadata fields. 

In this project, we analyze all existing documents on Rechtspraak.nl to generate a [JSON Schema](https://spacetelescope.github.io/understanding-json-schema/) and [Typescript typings](https://www.typescriptlang.org/) for the metadata associated with Dutch case law documents. We correct some common errors in the source files and generate valid [JSON-LD](http://json-ld.org/) (which is compatible with RDF).

## License

[GPL v3](https://www.gnu.org/licenses/gpl.html). Note that this is a viral open source license. If you create derivatives, 
you **must** publish your code under compatible license terms. 
Please support free software. 
