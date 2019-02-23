export interface RdfsLabel {
    "@value": string;
    "@language": "nl";
}

export interface JsonLdProcedure {
    "@id": string;
    "owl:sameAs": string;
    "rdfs:label": [RdfsLabel];
    key?: string;
    example?: string;
}

const createProcedure = (label: string,
                         id: string,
                         sameAs: string,
                         key?: string,
                         example?: string): JsonLdProcedure => {
    const l: [RdfsLabel] = [{"@value": label, "@language": "nl"}];
    const r: JsonLdProcedure = {
        "@id": id,
        "owl:sameAs": sameAs,
        "rdfs:label": l,
    };
    if (key) r.key = key;
    if (example) r.example = example;
    return r;
};

export const procedureTypes = {
    "procedure#eersteAanlegMeervoudig": createProcedure("Eerste aanleg - meervoudig", "lawly:procedure#eersteAanlegMeervoudig", "http://psi.rechtspraak.nl/procedure#eersteAanlegMeervoudig"),
    "procedure#peek": createProcedure("Peek", "lawly:procedure#peek", "http://psi.rechtspraak.nl/procedure#peek"),
    "procedure#cassatieInHetBelangDerWet": createProcedure("Cassatie in het belang der wet", "lawly:procedure#cassatieInHetBelangDerWet", "http://psi.rechtspraak.nl/procedure#cassatieInHetBelangDerWet"),
    "procedure#verzet": createProcedure("Verzet", "lawly:procedure#verzet", "http://psi.rechtspraak.nl/procedure#verzet"),
    "procedure#hogerBeroep": createProcedure("Hoger beroep", "lawly:procedure#hogerBeroep", "http://psi.rechtspraak.nl/procedure#hogerBeroep"),
    "procedure#voorlopigeVoorzieningbodemzaak": createProcedure("Voorlopige voorziening+bodemzaak", "lawly:procedure#voorlopigeVoorzieningbodemzaak", "http://psi.rechtspraak.nl/procedure#voorlopigeVoorzieningbodemzaak"),
    "procedure#vereenvoudigdeBehandeling": createProcedure("Vereenvoudigde behandeling", "lawly:procedure#vereenvoudigdeBehandeling", "http://psi.rechtspraak.nl/procedure#vereenvoudigdeBehandeling"),
    "procedure#tussenuitspraakBestuurlijkeLus": createProcedure("Tussenuitspraak bestuurlijke lus", "lawly:procedure#tussenuitspraakBestuurlijkeLus", "http://psi.rechtspraak.nl/procedure#tussenuitspraakBestuurlijkeLus", "procedure", "ECLI:NL:CBB:2013:184"),
    "procedure#tussenbeschikking": createProcedure("Tussenbeschikking", "lawly:procedure#tussenbeschikking", "http://psi.rechtspraak.nl/procedure#tussenbeschikking", "procedure", "ECLI:NL:RBMNE:2016:1780"),
    "procedure#prejudicieelVerzoek": createProcedure("Prejudicieel verzoek", "lawly:procedure#prejudicieelVerzoek", "http://psi.rechtspraak.nl/procedure#prejudicieelVerzoek", "procedure", "ECLI:NL:CBB:2013:37"),
    "procedure#beschikking": createProcedure("Beschikking", "lawly:procedure#beschikking", "http://psi.rechtspraak.nl/procedure#beschikking", "procedure", "ECLI:NL:CBB:2014:381"),
    "procedure#prejudicieleBeslissing": createProcedure("Prejudiciële beslissing", "lawly:procedure#prejudicieleBeslissing", "http://psi.rechtspraak.nl/procedure#prejudicieleBeslissing", "procedure", "ECLI:NL:CBB:2015:353"),
    "procedure#kortGeding": createProcedure("Kort geding", "lawly:procedure#kortGeding", "http://psi.rechtspraak.nl/procedure#kortGeding", "procedure", "ECLI:NL:CRVB:2002:AE6588"),
    "procedure#verwijzingNaHogeRaad": createProcedure("Verwijzing na Hoge Raad", "lawly:procedure#verwijzingNaHogeRaad", "http://psi.rechtspraak.nl/procedure#verwijzingNaHogeRaad", "procedure", "ECLI:NL:GHAMS:2003:AL2188"),
    "procedure#raadkamer": createProcedure("Raadkamer", "lawly:procedure#raadkamer", "http://psi.rechtspraak.nl/procedure#raadkamer", "procedure", "ECLI:NL:GHSHE:2001:AB2378"),
    "procedure#opTegenspraak": createProcedure("Op tegenspraak", "lawly:procedure#opTegenspraak", "http://psi.rechtspraak.nl/procedure#opTegenspraak", "procedure", "ECLI:NL:GHSHE:2016:1127"),
    "procedure#verstek": createProcedure("Verstek", "lawly:procedure#verstek", "http://psi.rechtspraak.nl/procedure#verstek", "procedure", "ECLI:NL:HR:2010:BO1723"),
    "procedure#artikel80aROzaken": createProcedure("Artikel 80a RO-zaken", "lawly:procedure#artikel80aROzaken", "http://psi.rechtspraak.nl/procedure#artikel80aROzaken", "procedure", "ECLI:NL:HR:2013:1044"),
    "procedure#artikel81ROzaken": createProcedure("Artikel 81 RO-zaken", "lawly:procedure#artikel81ROzaken", "http://psi.rechtspraak.nl/procedure#artikel81ROzaken", "procedure", "ECLI:NL:HR:2013:1047"),
    "procedure#uitspraakNaPrejudicieleBeslissing": createProcedure("Uitspraak na prejudiciële beslissing", "lawly:procedure#uitspraakNaPrejudicieleBeslissing", "http://psi.rechtspraak.nl/procedure#uitspraakNaPrejudicieleBeslissing", "procedure", "ECLI:NL:HR:2015:1174"),
    "procedure#prejudicieleSpoedprocedure(PPU)": createProcedure("Prejudiciële spoedprocedure (PPU)", "lawly:procedure#prejudicieleSpoedprocedure%28PPU%29", "http://psi.rechtspraak.nl/procedure#prejudicieleSpoedprocedure(PPU)", "procedure", "ECLI:NL:RBDHA:2014:3073"),
    "procedure#conservatoireMaatregel": createProcedure("Conservatoire maatregel", "lawly:procedure#conservatoireMaatregel", "http://psi.rechtspraak.nl/procedure#conservatoireMaatregel", "procedure", "ECLI:NL:RBLEE:2005:AU4361"),
    "procedure#rekestprocedure": createProcedure("Rekestprocedure", "lawly:procedure#rekestprocedure", "http://psi.rechtspraak.nl/procedure#rekestprocedure", "procedure", "ECLI:NL:RBNNE:2016:1328"),
    "procedure#procesverbaal": createProcedure("Proces-verbaal", "lawly:procedure#procesverbaal", "http://psi.rechtspraak.nl/procedure#procesverbaal"),
    "procedure#proceskostenveroordeling": createProcedure("Proceskostenveroordeling", "lawly:procedure#proceskostenveroordeling", "http://psi.rechtspraak.nl/procedure#proceskostenveroordeling"),
    "procedure#versneldeBehandeling": createProcedure("Versnelde behandeling", "lawly:procedure#versneldeBehandeling", "http://psi.rechtspraak.nl/procedure#versneldeBehandeling"),
    "procedure#schadevergoedingsuitspraak": createProcedure("Schadevergoedingsuitspraak", "lawly:procedure#schadevergoedingsuitspraak", "http://psi.rechtspraak.nl/procedure#schadevergoedingsuitspraak"),
    "procedure#cassatie": createProcedure("Cassatie", "lawly:procedure#cassatie", "http://psi.rechtspraak.nl/procedure#cassatie"),
    "procedure#mondelingeUitspraak": createProcedure("Mondelinge uitspraak", "lawly:procedure#mondelingeUitspraak", "http://psi.rechtspraak.nl/procedure#mondelingeUitspraak"),
    "procedure#hogerBeroepKortGeding": createProcedure("Hoger beroep kort geding", "lawly:procedure#hogerBeroepKortGeding", "http://psi.rechtspraak.nl/procedure#hogerBeroepKortGeding"),
    "procedure#wraking": createProcedure("Wraking", "lawly:procedure#wraking", "http://psi.rechtspraak.nl/procedure#wraking"),
    "procedure#bodemzaak": createProcedure("Bodemzaak", "lawly:procedure#bodemzaak", "http://psi.rechtspraak.nl/procedure#bodemzaak"),
    "procedure#herziening": createProcedure("Herziening", "lawly:procedure#herziening", "http://psi.rechtspraak.nl/procedure#herziening"),
    "procedure#herroeping": createProcedure("Herroeping", "lawly:procedure#herroeping", "http://psi.rechtspraak.nl/procedure#herroeping"),
    "procedure#eersteEnEnigeAanleg": createProcedure("Eerste en enige aanleg", "lawly:procedure#eersteEnEnigeAanleg", "http://psi.rechtspraak.nl/procedure#eersteEnEnigeAanleg"),
    "procedure#eersteAanlegEnkelvoudig": createProcedure("Eerste aanleg - enkelvoudig", "lawly:procedure#eersteAanlegEnkelvoudig", "http://psi.rechtspraak.nl/procedure#eersteAanlegEnkelvoudig"),
    "procedure#voorlopigeVoorziening": createProcedure("Voorlopige voorziening", "lawly:procedure#voorlopigeVoorziening", "http://psi.rechtspraak.nl/procedure#voorlopigeVoorziening")
};