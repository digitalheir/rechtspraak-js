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
        "rdfs:label": [{"@value": "Latere aanleg", "@language": "nl"}],
        "key": "aanleg"

    },
    "eerdereAanleg": {
        "@id": "eerdereAanleg",
        "owl:sameAs": "http://psi.rechtspraak.nl/eerdereAanleg",
        "rdfs:label": [{"@value": "Eerdere aanleg", "@language": "nl"}],
        "key": "aanleg"

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

    "procedure#tussenuitspraakBestuurlijkeLus": {
        "@id": "procedure#tussenuitspraakBestuurlijkeLus",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#tussenuitspraakBestuurlijkeLus",
        "rdfs:label": [{"@value": "Tussenuitspraak bestuurlijke lus", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:CBB:2013:184"
    },
    "procedure#prejudicieelVerzoek": {
        "@id": "procedure#prejudicieelVerzoek",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#prejudicieelVerzoek",
        "rdfs:label": [{"@value": "Prejudicieel verzoek", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:CBB:2013:37"
    },
    "procedure#beschikking": {
        "@id": "procedure#beschikking",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#beschikking",
        "rdfs:label": [{"@value": "Beschikking", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:CBB:2014:381"
    },
    "procedure#prejudicieleBeslissing": {
        "@id": "procedure#prejudicieleBeslissing",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#prejudicieleBeslissing",
        "rdfs:label": [{"@value": "Prejudiciële beslissing", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:CBB:2015:353"
    },
    "procedure#kortGeding": {
        "@id": "procedure#kortGeding",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#kortGeding",
        "rdfs:label": [{"@value": "Kort geding", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:CRVB:2002:AE6588"
    },
    "procedure#verwijzingNaHogeRaad": {
        "@id": "procedure#verwijzingNaHogeRaad",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#verwijzingNaHogeRaad",
        "rdfs:label": [{"@value": "Verwijzing na Hoge Raad", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:GHAMS:2003:AL2188"
    },
    "procedure#raadkamer": {
        "@id": "procedure#raadkamer",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#raadkamer",
        "rdfs:label": [{"@value": "Raadkamer", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:GHSHE:2001:AB2378"
    },
    "procedure#opTegenspraak": {
        "@id": "procedure#opTegenspraak",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#opTegenspraak",
        "rdfs:label": [{"@value": "Op tegenspraak", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:GHSHE:2016:1127"
    },
    "procedure#verstek": {
        "@id": "procedure#verstek",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#verstek",
        "rdfs:label": [{"@value": "Verstek", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:HR:2010:BO1723"
    },
    "procedure#artikel80aROzaken": {
        "@id": "procedure#artikel80aROzaken",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#artikel80aROzaken",
        "rdfs:label": [{"@value": "Artikel 80a RO-zaken", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:HR:2013:1044"
    },
    "procedure#artikel81ROzaken": {
        "@id": "procedure#artikel81ROzaken",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#artikel81ROzaken",
        "rdfs:label": [{"@value": "Artikel 81 RO-zaken", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:HR:2013:1047"
    },
    "procedure#uitspraakNaPrejudicieleBeslissing": {
        "@id": "procedure#uitspraakNaPrejudicieleBeslissing",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#uitspraakNaPrejudicieleBeslissing",
        "rdfs:label": [{"@value": "Uitspraak na prejudiciële beslissing", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:HR:2015:1174"
    },
    "procedure#prejudicieleSpoedprocedure(PPU)": {
        "@id": "procedure#prejudicieleSpoedprocedure%28PPU%29",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#prejudicieleSpoedprocedure(PPU)",
        "rdfs:label": [{"@value": "Prejudiciële spoedprocedure (PPU)", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:RBDHA:2014:3073"
    },
    "procedure#conservatoireMaatregel": {
        "@id": "procedure#conservatoireMaatregel",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#conservatoireMaatregel",
        "rdfs:label": [{"@value": "Conservatoire maatregel", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:RBLEE:2005:AU4361"
    },
    "procedure#rekestprocedure": {
        "@id": "procedure#rekestprocedure",
        "owl:sameAs": "http://psi.rechtspraak.nl/procedure#rekestprocedure",
        "rdfs:label": [{"@value": "Rekestprocedure", "@language": "nl"}],
        "key": "procedure",
        "example": "ECLI:NL:RBNNE:2016:1328"
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
        "rdfs:label": [{"@value": "Bestuursrecht; Vreemdelingenrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:CBB:1994:ZA1203"
    },
    "rechtsgebied#bestuursrecht_socialezekerheidsrecht": {
        "@id": "rechtsgebied#bestuursrecht_socialezekerheidsrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_socialezekerheidsrecht",
        "rdfs:label": [{"@value": "Bestuursrecht; Socialezekerheidsrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:CBB:2000:AA7124"
    },
    "rechtsgebied#civielRecht": {
        "@id": "rechtsgebied#civielRecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht",
        "rdfs:label": [{"@value": "Civiel recht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:CBB:2000:AA8268"
    },
    "rechtsgebied#bestuursrecht_europeesBestuursrecht": {
        "@id": "rechtsgebied#bestuursrecht_europeesBestuursrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_europeesBestuursrecht",
        "rdfs:label": [{"@value": "Bestuursrecht; Europees bestuursrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:CBB:2002:AF0513"
    },
    "rechtsgebied#bestuursrecht_bestuursstrafrecht": {
        "@id": "rechtsgebied#bestuursrecht_bestuursstrafrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_bestuursstrafrecht",
        "rdfs:label": [{"@value": "Bestuursrecht; Bestuursstrafrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:CBB:2004:AR5343"
    },
    "rechtsgebied#bestuursrecht_ambtenarenrecht": {
        "@id": "rechtsgebied#bestuursrecht_ambtenarenrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_ambtenarenrecht",
        "rdfs:label": [{"@value": "Bestuursrecht; Ambtenarenrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:CRVB:1970:1"
    },
    "rechtsgebied#civielRecht_personenEnFamilierecht": {
        "@id": "rechtsgebied#civielRecht_personenEnFamilierecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_personenEnFamilierecht",
        "rdfs:label": [{"@value": "Civiel recht; Personen- en familierecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:CRVB:1991:ZB1136"
    },
    "rechtsgebied#bestuursrecht_omgevingsrecht": {
        "@id": "rechtsgebied#bestuursrecht_omgevingsrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_omgevingsrecht",
        "rdfs:label": [{"@value": "Bestuursrecht; Omgevingsrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:CRVB:2005:AU6611"
    },
    "rechtsgebied#civielRecht_insolventierecht": {
        "@id": "rechtsgebied#civielRecht_insolventierecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_insolventierecht",
        "rdfs:label": [{"@value": "Civiel recht; Insolventierecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:CRVB:2008:BG9543"
    },
    "rechtsgebied#strafrecht": {
        "@id": "rechtsgebied#strafrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#strafrecht",
        "rdfs:label": [{"@value": "Strafrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:CRVB:2013:CA1665"
    },
    "rechtsgebied#bestuursrecht_bestuursprocesrecht": {
        "@id": "rechtsgebied#bestuursrecht_bestuursprocesrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_bestuursprocesrecht",
        "rdfs:label": [{"@value": "Bestuursrecht; Bestuursprocesrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:CRVB:2014:1796"
    },
    "rechtsgebied#internationaalPubliekrecht": {
        "@id": "rechtsgebied#internationaalPubliekrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#internationaalPubliekrecht",
        "rdfs:label": [{"@value": "Internationaal publiekrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:CRVB:2015:1243"
    },
    "rechtsgebied#civielRecht_ondernemingsrecht": {
        "@id": "rechtsgebied#civielRecht_ondernemingsrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_ondernemingsrecht",
        "rdfs:label": [{"@value": "Civiel recht; Ondernemingsrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHAMS:2011:BU7820"
    },
    "rechtsgebied#strafrecht_strafprocesrecht": {
        "@id": "rechtsgebied#strafrecht_strafprocesrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#strafrecht_strafprocesrecht",
        "rdfs:label": [{"@value": "Strafrecht; Strafprocesrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHAMS:2013:2553"
    },
    "rechtsgebied#civielRecht_internationaalPrivaatrecht": {
        "@id": "rechtsgebied#civielRecht_internationaalPrivaatrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_internationaalPrivaatrecht",
        "rdfs:label": [{"@value": "Civiel recht; Internationaal privaatrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHAMS:2013:3955"
    },
    "rechtsgebied#strafrecht_materieelStrafrecht": {
        "@id": "rechtsgebied#strafrecht_materieelStrafrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#strafrecht_materieelStrafrecht",
        "rdfs:label": [{"@value": "Strafrecht; Materieel strafrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHAMS:2013:4706"
    },
    "rechtsgebied#strafrecht_europeesStrafrecht": {
        "@id": "rechtsgebied#strafrecht_europeesStrafrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#strafrecht_europeesStrafrecht",
        "rdfs:label": [{"@value": "Strafrecht; Europees strafrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHAMS:2014:6069"
    },
    "rechtsgebied#strafrecht_penitentiairStrafrecht": {
        "@id": "rechtsgebied#strafrecht_penitentiairStrafrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#strafrecht_penitentiairStrafrecht",
        "rdfs:label": [{"@value": "Strafrecht; Penitentiair strafrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHAMS:2015:1456"
    },
    "rechtsgebied#civielRecht_arbeidsrecht": {
        "@id": "rechtsgebied#civielRecht_arbeidsrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_arbeidsrecht",
        "rdfs:label": [{"@value": "Civiel recht; Arbeidsrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHAMS:2015:1829"
    },
    "rechtsgebied#civielRecht_goederenrecht": {
        "@id": "rechtsgebied#civielRecht_goederenrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_goederenrecht",
        "rdfs:label": [{"@value": "Civiel recht; Goederenrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHAMS:2015:3017"
    },
    "rechtsgebied#civielRecht_burgerlijkProcesrecht": {
        "@id": "rechtsgebied#civielRecht_burgerlijkProcesrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_burgerlijkProcesrecht",
        "rdfs:label": [{"@value": "Civiel recht; Burgerlijk procesrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHAMS:2016:790"
    },
    "rechtsgebied#civielRecht_aanbestedingsrecht": {
        "@id": "rechtsgebied#civielRecht_aanbestedingsrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_aanbestedingsrecht",
        "rdfs:label": [{"@value": "Civiel recht; Aanbestedingsrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHARL:2013:4664"
    },
    "rechtsgebied#civielRecht_verbintenissenrecht": {
        "@id": "rechtsgebied#civielRecht_verbintenissenrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_verbintenissenrecht",
        "rdfs:label": [{"@value": "Civiel recht; Verbintenissenrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHARL:2013:4718"
    },
    "rechtsgebied#civielRecht_intellectueeleigendomsrecht": {
        "@id": "rechtsgebied#civielRecht_intellectueeleigendomsrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_intellectueeleigendomsrecht",
        "rdfs:label": [{"@value": "Civiel recht; Intellectueel-eigendomsrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHARL:2013:6389"
    },
    "rechtsgebied#civielRecht_mededingingsrecht": {
        "@id": "rechtsgebied#civielRecht_mededingingsrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_mededingingsrecht",
        "rdfs:label": [{"@value": "Civiel recht; Mededingingsrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHARL:2014:6766"
    },
    "rechtsgebied#civielRecht_europeesCivielRecht": {
        "@id": "rechtsgebied#civielRecht_europeesCivielRecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_europeesCivielRecht",
        "rdfs:label": [{"@value": "Civiel recht; Europees civiel recht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHARL:2015:1563"
    },
    "rechtsgebied#strafrecht_internationaalStrafrecht": {
        "@id": "rechtsgebied#strafrecht_internationaalStrafrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#strafrecht_internationaalStrafrecht",
        "rdfs:label": [{"@value": "Strafrecht; Internationaal strafrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:GHARL:2015:9891"
    },
    "rechtsgebied#bestuursrecht_mededingingsrecht": {
        "@id": "rechtsgebied#bestuursrecht_mededingingsrecht",
        "owl:sameAs": "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_mededingingsrecht",
        "rdfs:label": [{"@value": "Bestuursrecht; Mededingingsrecht", "@language": "nl"}],
        "key": "subject",
        "example": "ECLI:NL:RBGEL:2014:7763"
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
        "rdfs:label": [{"@value": "Meerdere afhandelingswijzen", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#overig": {
        "@id": "gevolg#overig",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#overig",
        "rdfs:label": [{"@value": "Overig", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#(Gedeeltelijke) vernietiging en zelf afgedaan": {
        "@id": "gevolg#%28Gedeeltelijke%29%20vernietiging%20en%20zelf%20afgedaan",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#(Gedeeltelijke) vernietiging en zelf afgedaan",
        "rdfs:label": [{"@value": "(Gedeeltelijke) vernietiging en zelf afgedaan", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#niet ontvankelijk": {
        "@id": "gevolg#niet%20ontvankelijk",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#niet ontvankelijk",
        "rdfs:label": [{"@value": "Niet ontvankelijk", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#niet bevoegd": {
        "@id": "gevolg#niet%20bevoegd",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#niet bevoegd",
        "rdfs:label": [{"@value": "Niet bevoegd", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#gevolgd": {
        "@id": "gevolg#gevolgd",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#gevolgd",
        "rdfs:label": [{"@value": "Gevolgd", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#(Gedeeltelijke) vernietiging met verwijzen": {
        "@id": "gevolg#%28Gedeeltelijke%29%20vernietiging%20met%20verwijzen",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#(Gedeeltelijke) vernietiging met verwijzen",
        "rdfs:label": [{"@value": "(Gedeeltelijke) vernietiging met verwijzen", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#(Gedeeltelijke) vernietiging met terugwijzen": {
        "@id": "gevolg#%28Gedeeltelijke%29%20vernietiging%20met%20terugwijzen",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#(Gedeeltelijke) vernietiging met terugwijzen",
        "rdfs:label": [{"@value": "(Gedeeltelijke) vernietiging met terugwijzen", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#onduidelijk": {
        "@id": "gevolg#onduidelijk",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#onduidelijk",
        "rdfs:label": [{"@value": "Onduidelijk", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#contrair": {
        "@id": "gevolg#contrair",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#contrair",
        "rdfs:label": [{"@value": "Contrair", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#gedeeltelijk contrair": {
        "@id": "gevolg#gedeeltelijk%20contrair",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#gedeeltelijk contrair",
        "rdfs:label": [{"@value": "Gedeeltelijk contrair", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#toewijzing": {
        "@id": "gevolg#toewijzing",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#toewijzing",
        "rdfs:label": [{"@value": "Toewijzing", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#verzet toegewezen": {
        "@id": "gevolg#verzet%20toegewezen",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#verzet toegewezen",
        "rdfs:label": [{"@value": "Verzet toegewezen", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#afwijzing": {
        "@id": "gevolg#afwijzing",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#afwijzing",
        "rdfs:label": [{"@value": "Afwijzing", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#verzet ongegrond": {
        "@id": "gevolg#verzet%20ongegrond",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#verzet ongegrond",
        "rdfs:label": [{"@value": "Verzet ongegrond", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#afwijzing vordering": {
        "@id": "gevolg#afwijzing%20vordering",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#afwijzing vordering",
        "rdfs:label": [{"@value": "Afwijzing vordering", "@language": "nl"}],
        "key": "gevolg"

    },
    "gevolg#gegrondverklaring": {
        "@id": "gevolg#gegrondverklaring",
        "owl:sameAs": "http://psi.rechtspraak.nl/gevolg#gegrondverklaring",
        "rdfs:label": [{"@value": "Gegrondverklaring", "@language": "nl"}],
        "key": "gevolg"

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