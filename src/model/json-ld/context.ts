export const _context = {
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
    "nl": {
        "@id": "http://dbpedia.org/resource/Netherlands",
        "rdfs:label": [{"@value": "Nederland", "@language": "nl"}]
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

    "latereAanleg": {
        "@id": "latereAanleg",
        "owl:sameAs": "http://psi.rechtspraak.nl/latereAanleg",
        "rdfs:label": [{"@value": "Latere aanleg", "@language": "nl"}]
    },
    "eerdereAanleg": {
        "@id": "eerdereAanleg",
        "owl:sameAs": "http://psi.rechtspraak.nl/eerdereAanleg",
        "rdfs:label": [{"@value": "Eerdere aanleg", "@language": "nl"}]
    },

    "procedure#eersteAanlegMeervoudig": {
        "@id": "procedure#eersteAanlegMeervoudig",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#eersteAanlegMeervoudig",
        "rdfs:label": [{"@value": "Eerste aanleg - meervoudig", "@language": "nl"}]
    },
    "procedure#verzet": {
        "@id": "procedure#verzet",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#verzet",
        "rdfs:label": [{"@value": "Verzet", "@language": "nl"}]
    },

    "procedure#hogerBeroep": {
        "@id": "procedure#hogerBeroep",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#hogerBeroep",
        "rdfs:label": [{"@value": "Hoger beroep", "@language": "nl"}]
    },
    "procedure#voorlopigeVoorzieningbodemzaak": {
        "@id": "procedure#voorlopigeVoorzieningbodemzaak",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#voorlopigeVoorzieningbodemzaak",
        "rdfs:label": [{"@value": "Voorlopige voorziening+bodemzaak", "@language": "nl"}]
    },
    "procedure#vereenvoudigdeBehandeling": {
        "@id": "procedure#vereenvoudigdeBehandeling",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#vereenvoudigdeBehandeling",
        "rdfs:label": [{"@value": "Vereenvoudigde behandeling", "@language": "nl"}]
    },
    "procedure#procesverbaal": {
        "@id": "procedure#procesverbaal",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#procesverbaal",
        "rdfs:label": [{"@value": "Proces-verbaal", "@language": "nl"}]
    },
    "procedure#proceskostenveroordeling": {
        "@id": "procedure#proceskostenveroordeling",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#proceskostenveroordeling",
        "rdfs:label": [{"@value": "Proceskostenveroordeling", "@language": "nl"}]
    },
    "procedure#versneldeBehandeling": {
        "@id": "procedure#versneldeBehandeling",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#versneldeBehandeling",
        "rdfs:label": [{"@value": "Versnelde behandeling", "@language": "nl"}]
    },
    "procedure#schadevergoedingsuitspraak": {
        "@id": "procedure#schadevergoedingsuitspraak",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#schadevergoedingsuitspraak",
        "rdfs:label": [{"@value": "Schadevergoedingsuitspraak", "@language": "nl"}]
    },
    "procedure#cassatie": {
        "@id": "procedure#cassatie",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#cassatie",
        "rdfs:label": [{"@value": "Cassatie", "@language": "nl"}]
    },
    "procedure#mondelingeUitspraak": {
        "@id": "procedure#mondelingeUitspraak",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#mondelingeUitspraak",
        "rdfs:label": [{"@value": "Mondelinge uitspraak", "@language": "nl"}]
    },
    "procedure#hogerBeroepKortGeding": {
        "@id": "procedure#hogerBeroepKortGeding",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#hogerBeroepKortGeding",
        "rdfs:label": [{"@value": "Hoger beroep kort geding", "@language": "nl"}]
    },
    "procedure#wraking": {
        "@id": "procedure#wraking",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#wraking",
        "rdfs:label": [{"@value": "Wraking", "@language": "nl"}]
    },

    "procedure#bodemzaak": {
        "@id": "procedure#bodemzaak",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#bodemzaak",
        "rdfs:label": [{"@value": "Bodemzaak", "@language": "nl"}]
    },
    "procedure#herziening": {
        "@id": "procedure#herziening",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#herziening",
        "rdfs:label": [{"@value": "Herziening", "@language": "nl"}]
    },
    "procedure#eersteEnEnigeAanleg": {
        "@id": "procedure#eersteEnEnigeAanleg",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#eersteEnEnigeAanleg",
        "rdfs:label": [{"@value": "Eerste en enige aanleg", "@language": "nl"}]
    },
    "procedure#eersteAanlegEnkelvoudig": {
        "@id": "procedure#eersteAanlegEnkelvoudig",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#eersteAanlegEnkelvoudig",
        "rdfs:label": [{"@value": "Eerste aanleg - enkelvoudig", "@language": "nl"}]
    },
    "procedure#voorlopigeVoorziening": {
        "@id": "procedure#voorlopigeVoorziening",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#voorlopigeVoorziening",
        "rdfs:label": [{"@value": "Voorlopige voorziening", "@language": "nl"}]
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

    "rechtsgebied#bestuursrecht_vreemdelingenrecht": {
        "@id": "rechtsgebied#bestuursrecht_vreemdelingenrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_vreemdelingenrecht",
        "rdfs:label": [{"@value": "Bestuursrecht; Vreemdelingenrecht", "@language": "nl"}]
    },
    "rechtsgebied#bestuursrecht_socialezekerheidsrecht": {
        "@id": "rechtsgebied#bestuursrecht_socialezekerheidsrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_socialezekerheidsrecht",
        "rdfs:label": [{"@value": "Bestuursrecht; Socialezekerheidsrecht", "@language": "nl"}]
    },
    "rechtsgebied#civielRecht": {
        "@id": "rechtsgebied#civielRecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht",
        "rdfs:label": [{"@value": "Civiel recht", "@language": "nl"}]
    },
    "rechtsgebied#bestuursrecht_europeesBestuursrecht": {
        "@id": "rechtsgebied#bestuursrecht_europeesBestuursrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_europeesBestuursrecht",
        "rdfs:label": [{"@value": "Bestuursrecht; Europees bestuursrecht", "@language": "nl"}]
    },
    "rechtsgebied#bestuursrecht_bestuursstrafrecht": {
        "@id": "rechtsgebied#bestuursrecht_bestuursstrafrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_bestuursstrafrecht",
        "rdfs:label": [{"@value": "Bestuursrecht; Bestuursstrafrecht", "@language": "nl"}]
    },

    "rechtsgebied#bestuursrecht_belastingrecht": {
        "@id": "rechtsgebied#bestuursrecht_belastingrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_belastingrecht",
        "rdfs:label": [{"@value": "Bestuursrecht; Belastingrecht", "@language": "nl"}]
    },
    "rechtsgebied#bestuursrecht": {
        "@id": "rechtsgebied#bestuursrecht_belastingrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht",
        "rdfs:label": [{"@value": "Bestuursrecht", "@language": "nl"}]
    },

    "title": "dcterms:title",

    "type": {
        "@id": "dcterms:type",
        "@type": "@vocab"
    },
    "uitspraak": {
        "@id": "type/uitspraak",
        "owl:sameAs": "http://psi.rechtspraak.nl/uitspraak",
        "rdfs:label": [{"@value": "Uitspraak", "@language": "nl"}]
    },
    "conclusie": {
        "@id": "type/conclusie",
        "owl:sameAs": "http://psi.rechtspraak.nl/conclusie",
        "rdfs:label": [{"@value": "Conclusie", "@language": "nl"}]
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

    "gevolg#meerdere afhandelingswijzen": {
        "@id": "gevolg#meerdere%20afhandelingswijzen",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#meerdere afhandelingswijzen",
        "rdfs:label": [{"@value": "Meerdere afhandelingswijzen", "@language": "nl"}]
    },
    "gevolg#overig": {
        "@id": "gevolg#overig",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#overig",
        "rdfs:label": [{"@value": "Overig", "@language": "nl"}]
    },
    "gevolg#(Gedeeltelijke) vernietiging en zelf afgedaan": {
        "@id": "gevolg#%28Gedeeltelijke%29%20vernietiging%20en%20zelf%20afgedaan",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#(Gedeeltelijke) vernietiging en zelf afgedaan",
        "rdfs:label": [{"@value": "(Gedeeltelijke) vernietiging en zelf afgedaan", "@language": "nl"}]
    },
    "gevolg#bekrachtiging/bevestiging": {
        "@id": "gevolg#bekrachtiging%2Fbevestiging",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#bekrachtiging/bevestiging",
        "rdfs:label": [{"@value": "Bekrachtiging / bevestiging", "@language": "nl"}]
    },


    "psi:typeRelatie": {
        "@type": "@id"
    },
    "cassatie": {
        "@id": "relation/cassatie",
        "owl:sameAs": "http://psi.rechtspraak.nl/cassatie",
        "rdfs:label": [{"@value": "Cassatie", "@language": "nl"}]
    },
    "hogerBeroep": {
        "@id": "relation/hogerBeroep",
        "owl:sameAs": "http://psi.rechtspraak.nl/hogerBeroep",
        "rdfs:label": [{"@value": "Hoger beroep", "@language": "nl"}]
    },

    "Vervangt": "http://purl.org/dc/terms/replaces",
    "Procedure": "http://psi.rechtspraak.nl/procedure",
    "Instantie": "http://purl.org/dc/terms/creator",
    "Zaaknr": "http://psi.rechtspraak.nl/zaaknummer"
};

export default _context;