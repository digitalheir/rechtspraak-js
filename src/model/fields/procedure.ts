import {
    mustHaveTextAndAttributes, throwIfDivergentLabel, unexpectedUri
} from "../../util/validations";
import {getResourceId} from "../convert-to-typed";
import {_context} from "../json-ld/context";

export type Procedure =
    "procedure#eersteAanlegMeervoudig"
    | "procedure#eersteAanlegEnkelvoudig"
    | "procedure#verzet"
    | "procedure#bodemzaak"
    | "procedure#eersteEnEnigeAanleg"
    | "procedure#voorlopigeVoorziening"
    | "procedure#herziening"
    | "procedure#hogerBeroep"
    | "procedure#voorlopigeVoorzieningbodemzaak"
    | "procedure#vereenvoudigdeBehandeling"
    | "procedure#procesverbaal"
    | "procedure#proceskostenveroordeling"
    | "procedure#versneldeBehandeling"
    | "procedure#schadevergoedingsuitspraak"
    | "procedure#cassatie"
    | "procedure#mondelingeUitspraak"
    | "procedure#hogerBeroepKortGeding"
    | "procedure#wraking"
    | "procedure#tussenuitspraakBestuurlijkeLus"
    | "procedure#prejudicieelVerzoek"
    | "procedure#beschikking"
    | "procedure#prejudicieleBeslissing"
    | "procedure#kortGeding"
    | "procedure#verwijzingNaHogeRaad"
    | "procedure#raadkamer"
    | "procedure#opTegenspraak"
    | "procedure#verstek"
    | "procedure#artikel80aROzaken"
    | "procedure#artikel81ROzaken"
    | "procedure#uitspraakNaPrejudicieleBeslissing"
    | "procedure#prejudicieleSpoedprocedure(PPU)"
    | "procedure#conservatoireMaatregel"
    | "procedure#rekestprocedure"
    | "procedure#tussenbeschikking"
    ;

const uriMappingProcedure: { [k: string]: Procedure } = {
    "eersteAanlegMeervoudig": "procedure#eersteAanlegMeervoudig",
    "eersteAanlegEnkelvoudig": "procedure#eersteAanlegEnkelvoudig",
    "voorlopigeVoorziening": "procedure#voorlopigeVoorziening",
    "verzet": "procedure#verzet",
    "bodemzaak": "procedure#bodemzaak",
    "eersteEnEnigeAanleg": "procedure#eersteEnEnigeAanleg",
    "herziening": "procedure#herziening",
    "hogerBeroep": "procedure#hogerBeroep",
    "voorlopigeVoorzieningbodemzaak": "procedure#voorlopigeVoorzieningbodemzaak",
    "vereenvoudigdeBehandeling": "procedure#vereenvoudigdeBehandeling",
    "procesverbaal": "procedure#procesverbaal",
    "proceskostenveroordeling": "procedure#proceskostenveroordeling",
    "versneldeBehandeling": "procedure#versneldeBehandeling",
    "schadevergoedingsuitspraak": "procedure#schadevergoedingsuitspraak",
    "cassatie": "procedure#cassatie",
    "mondelingeUitspraak": "procedure#mondelingeUitspraak",
    "hogerBeroepKortGeding": "procedure#hogerBeroepKortGeding",
    "wraking": "procedure#wraking",
    "tussenbeschikking": "procedure#tussenbeschikking",
    "\ntussenbeschikking": "procedure#tussenbeschikking",
    "\ntussenbeschikking\n": "procedure#tussenbeschikking",
    "tussenuitspraakBestuurlijkeLus": "procedure#tussenuitspraakBestuurlijkeLus",
    "prejudicieelVerzoek": "procedure#prejudicieelVerzoek",
    "beschikking": "procedure#beschikking",
    "prejudicieleBeslissing": "procedure#prejudicieleBeslissing",
    "kortGeding": "procedure#kortGeding",
    "verwijzingNaHogeRaad": "procedure#verwijzingNaHogeRaad",
    "raadkamer": "procedure#raadkamer",
    "opTegenspraak": "procedure#opTegenspraak",
    "verstek": "procedure#verstek",
    "artikel80aROzaken": "procedure#artikel80aROzaken",
    "artikel81ROzaken": "procedure#artikel81ROzaken",
    "uitspraakNaPrejudicieleBeslissing": "procedure#uitspraakNaPrejudicieleBeslissing",
    "prejudicieleSpoedprocedure(PPU)": "procedure#prejudicieleSpoedprocedure(PPU)",
    "conservatoireMaatregel": "procedure#conservatoireMaatregel",
    "rekestprocedure": "procedure#rekestprocedure"
};

// todo check if label in context is correct ... ;)

export function getSingleProcedure(proc: any, id?: string): Procedure {
    mustHaveTextAndAttributes(proc, true, "rdf:language", "rdfs:label", "resourceIdentifier");
    const language: string = proc["@attributes"]["rdf:language"];
    if (!language) throw new Error("Expected language: " + JSON.stringify(proc));
    const resourceId = getResourceId(proc["@attributes"], id + ": procedure");
    const procedureShortId = resourceId.replace("http://psi.rechtspraak.nl/procedure#", "");

    const label = proc["#text"].trim();
    if (!uriMappingProcedure.hasOwnProperty(procedureShortId))
        throw new Error(unexpectedUri("procedure", resourceId, label, id));

    const procedure = uriMappingProcedure[procedureShortId];
    const contextLabel: string = _context[procedure]["rdfs:label"][0]["@value"];
    throwIfDivergentLabel(procedure, label, contextLabel);

    return procedure;
}

export function getProcedure(procedure: any[], id?: string): Procedure[] | undefined {
    if (!procedure) return undefined;
    else return procedure.map(p => getSingleProcedure(p, id));
}