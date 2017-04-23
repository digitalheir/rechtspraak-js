# Rechtspraak.js
A bunch of utility functions to work with the open data in [Rechtspraak.nl](http://www.rechtspraak.nl/) and create pretty, well-formed JSON-LD. 

Written in TypeScript, compiled to a Javascript commonjs module.

## Why?
Rechtspraak.nl publishes information about a lot of Dutch court judgments. Although the source XML suggests that the data is valid [RDF](https://www.w3.org/2001/sw/wiki/RDF), the truth is not so. Furthermore, Rechtspraak.nl provides no schema for its documents other than an incomplete PDF in natural language. So it's hard to know what to expect, especially for some esoteric metadata fields. 

In this project, we analyze all existing documents on Rechtspraak.nl to generate a [JSON Schema](https://spacetelescope.github.io/understanding-json-schema/) and [Typescript typings](https://www.typescriptlang.org/) for the metadata associated with Dutch case law documents. We correct some common errors in the source files and generate valid [JSON-LD](http://json-ld.org/) (which is compatible with RDF).

## Data
A dump of the metadata in sanitized JSON-LD is available at https://rechtspraak.lawreader.nl/_all.

You can use most of the API from [CouchDB views](http://guide.couchdb.org/draft/views.html), ie: https://rechtspraak.lawreader.nl/_all?limit=100&skip=50 will limit your request to 100 docs after the first 50. Mind that you can also use `startkey` to paginate faster: https://rechtspraak.lawreader.nl/_all?startkey=%22ECLI:NL:CBB:2015:5%22&limit=50 will fetch the first 50 docs starting at [ECLI:NL:CBB:2015:5](https://rechtspraak.lawreader.nl/ecli/ECLI:NL:CBB:2015:5). The documents are ordered alphabetically by their ids.

This URL will load the complete knowledge graph of Rechtspraak.nl, making use mostly of [dcterms](http://www.dublincore.org/documents/dcmi-terms/) and [schema.org](https://schema.org). I've invented my own URIs where appropriate. I'm planning to make them resolvable as well.

## License

[GPL v3](https://www.gnu.org/licenses/gpl.html). Note that this is a viral open source license. If you create derivatives, 
you **must** publish your code under compatible license terms. 
Please support free software. 
