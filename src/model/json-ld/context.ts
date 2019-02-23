import {relationTypes} from "./context/relationTypes";
import {subjectTypes} from "./context/subjectTypes";
import {procedureTypes} from "./context/procedureTypes";
import {gevolgTypes} from "./context/gevolgTypes";
import {aanlegTypes} from "./context/aanlegTypes";

export const coverageTypes = {
    "nl": {
        "@id": "http://dbpedia.org/resource/Netherlands",
        "rdfs:label": [{"@value": "Nederland", "@language": "nl"}]
    }
};
export const documentTypes = {
    "uitspraak": {
        "@id": "lawly:type/uitspraak",
        "owl:sameAs": "http://psi.rechtspraak.nl/uitspraak",
        "rdfs:label": [{"@value": "Uitspraak", "@language": "nl"}]
    }
};
export const _context = Object.assign(aanlegTypes, procedureTypes, gevolgTypes, subjectTypes, relationTypes, documentTypes, coverageTypes, {
    "@base": "https://rechtspraak.lawreader.nl/vocab/",
    "schema": "http://schema.org/",
    "foaf": "http://xmlns.com/foaf/0.1/",
    "frbr": "http://purl.org/vocab/frbr/core#",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "dcterms": "http://purl.org/dc/terms/",
    "psi": "http://psi.rechtspraak.nl/",
    "ecli": "https://e-justice.europa.eu/ecli",
    "cvdr": "http://decentrale.regelgeving.overheid.nl/cvdr/",
    "eu": "http://publications.europa.eu/celex/",
    "tr": "http://tuchtrecht.overheid.nl/",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "owl": "http://www.w3.org/2002/07/owl#",
    "lawly": "https://rechtspraak.lawreader.nl/vocab/",
    "ECLI": "https://rechtspraak.lawreader.nl/ecli/ECLI:",
    "_id": "@id",
    "abstract": "dcterms:abstract",
    "muhAccessRights": "lawly:accessRights/",
    "muhCoverage": "lawly:coverage/",
    "muhHasVersion": "lawly:hasVersion/",
    "muhSpatial": "lawly:spatial/",
    "accessRights": {
        "@id": "dcterms:accessRights",
        "@type": "@id"
    },
    "contentModified": {
        "@id": "dcterms:modified",
        "@type": "xsd:dateTime"
    },
    "metadataModified": {
        "@id": "lawly:metadataModified",
        "@type": "xsd:dateTime"
    },
    "coverage": {
        "@id": "dcterms:coverage",
        "@type": "@vocab"
    },
    "creator": {
        "@id": "dcterms:creator"
    },
    "date": {
        "@id": "dcterms:date",
        "@type": "xsd:date"
    },
    "htmlIssued": {
        "@id": "lawly:htmlIssued",
        "@type": "xsd:date"
    },
    "hasVersion": "dcterms:hasVersion",
    "issued": {
        "@id": "dcterms:issued",
        "@type": "xsd:date"
    },
    "language": {
        "@id": "dcterms:language",
        "@type": "@id"
    },
    "procedure": {
        "@id": "psi:procedure",
        "@type": "@vocab"
    },
    "references": "dcterms:references",
    "replaces": {
        "@id": "dcterms:replaces",
        "@type": "@id"
    },
    "spatial": "dcterms:spatial",
    "subject": {
        "@id": "dcterms:subject",
        "@type": "@vocab"
    },
    "title": "dcterms:title",
    "type": {
        "@id": "dcterms:type",
        "@type": "@vocab"
    },
    "zaaknummer": "psi:zaaknummer",
    "dcterms:source": {
        "@type": "@id"
    },
    "dcterms:isReferencedBy": {
        "@type": "@id"
    },
    "dcterms:modified": {
        "@id": "dcterms:modified",
        "@type": "xsd:dateTime"
    },
    "dcterms:issued": {
        "@id": "dcterms:issued",
        "@type": "xsd:date"
    },
    "dcterms:date": {
        "@id": "dcterms:date",
        "@type": "xsd:date"
    },
    "owl:sameAs": {
        "@type": "@id"
    },
    "psi:aanleg": {
        "@type": "@id"
    },
    "psi:gevolg": {
        "@type": "@vocab"
    },
    "psi:typeRelatie": {
        "@type": "@id"
    },
    "Vervangt": "http://purl.org/dc/terms/replaces",
    "Procedure": "http://psi.rechtspraak.nl/procedure",
    "Instantie": "http://purl.org/dc/terms/creator",
    "Zaaknr": "http://psi.rechtspraak.nl/zaaknummer"
});
export default _context;