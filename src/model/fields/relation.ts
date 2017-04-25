import {
    matchesAny, mustHaveTextAndAttributes,
    REGEX_HTTPS, REGEX_URI, throwIfDivergentLabel, unexpectedUri
} from "../../util/validations";
import {makeLabel} from "./label";
import {idResource, StandardResourceObject} from "./standard-resource-object";
import {_context} from "../json-ld/context";

export function idResourceWithOriginal(id: string, originalId: string): StandardResourceObject {
    const o: StandardResourceObject = idResource(id);
    o.originalIdentifier = originalId;
    return o;
}

export type Aanleg =
    "latereAanleg"
    | "eerdereAanleg"
    ;

export type Gevolg =
    "gevolg#bekrachtiging/bevestiging"
    | "gevolg#overig"
    | "gevolg#gedeeltelijke toewijzing vordering"
    | "gevolg#toewijzing vordering"
    | "gevolg#strekt tot vernietiging"
    | "gevolg#prejudiciële beslissing"
    | "gevolg#meerdere afhandelingswijzen"
    | "gevolg#overig"
    | "gevolg#niet ontvankelijk"
    | "gevolg#niet bevoegd"
    | "gevolg#gevolgd"
    | "gevolg#(Gedeeltelijke) vernietiging en zelf afgedaan"
    | "gevolg#(Gedeeltelijke) vernietiging met verwijzen"
    | "gevolg#(Gedeeltelijke) vernietiging met terugwijzen"
    | "gevolg#onduidelijk"
    | "gevolg#contrair"
    | "gevolg#gedeeltelijk contrair"
    | "gevolg#toewijzing"
    | "gevolg#verzet toegewezen"
    | "gevolg#afwijzing"
    | "gevolg#verzet ongegrond"
    | "gevolg#afwijzing vordering"
    | "gevolg#gegrondverklaring"
    ;

export type RelationType =
    "conclusieVoorCassatie"
    | "tussenuitspraakBestuurlijkeLus"
    | "conclusie"
    | "conclusieVoorSprongcassatie"
    | "prejudicieleVraag"
    | "verzet"
    | "nadereConclusie"
    | "hogerBeroep"
    | "cassatie"
    | "herziening"
    | "verwijzing"
    | "terugverwijzing"
    | "sprongcassatie"
    | "rectificatieBesluit"
    | "ontnemingsvordering"
    | "definitiefNaRectificatie"
    | "vervallenverklaring"
    | "oorspronkelijkBesluitDefinitiefBesluit"
    | "inachtnemingPrejudicieleBeslissing"
    | "tussenuitspraak"
    ;

export interface Relation extends StandardResourceObject {
    "gevolg"?: Gevolg;
    "aanleg": Aanleg;
    "type": RelationType;
}

// todo keymirror
//noinspection JSNonASCIINames
export const uriMappingGevolg: { [k: string]: Gevolg } = {
    "bekrachtiging/bevestiging": "gevolg#bekrachtiging/bevestiging",
    "meerdere afhandelingswijzen": "gevolg#meerdere afhandelingswijzen",
    "prejudiciële beslissing": "gevolg#prejudiciële beslissing",
    "gedeeltelijke toewijzing vordering": "gevolg#gedeeltelijke toewijzing vordering",
    "toewijzing vordering": "gevolg#toewijzing vordering",
    "strekt tot vernietiging": "gevolg#strekt tot vernietiging",
    "overig": "gevolg#overig",
    "(Gedeeltelijke) vernietiging en zelf afgedaan": "gevolg#(Gedeeltelijke) vernietiging en zelf afgedaan",
    "niet ontvankelijk": "gevolg#niet ontvankelijk",
    "niet bevoegd": "gevolg#niet bevoegd",
    "gevolgd": "gevolg#gevolgd",
    "(Gedeeltelijke) vernietiging met verwijzen": "gevolg#(Gedeeltelijke) vernietiging met verwijzen",
    "(Gedeeltelijke) vernietiging met terugwijzen": "gevolg#(Gedeeltelijke) vernietiging met terugwijzen",
    "onduidelijk": "gevolg#onduidelijk",
    "contrair": "gevolg#contrair",
    "gedeeltelijk contrair": "gevolg#gedeeltelijk contrair",
    "toewijzing": "gevolg#toewijzing",
    "verzet toegewezen": "gevolg#verzet toegewezen",
    "afwijzing": "gevolg#afwijzing",
    "verzet ongegrond": "gevolg#verzet ongegrond",
    "afwijzing vordering": "gevolg#afwijzing vordering",
    "gegrondverklaring": "gevolg#gegrondverklaring"
};

export const uriMappingAanleg: { [k: string]: Aanleg } = {
    "http://psi.rechtspraak.nl/latereAanleg": "latereAanleg",
    "http://psi.rechtspraak.nl/eerdereAanleg": "eerdereAanleg"
};

function getGevolg(gevolg?: string, label?: string): Gevolg | undefined {
    if (!gevolg)
        return undefined;
    else {
        const id = gevolg.replace(/^http:\/\/psi\.rechtspraak\.nl\/gevolg#/, "");

        const mappingGevolg = uriMappingGevolg[id];
        if (!mappingGevolg) throw new Error(unexpectedUri("gevolg", gevolg, label || "???"));

        const contextLabel: string = _context[mappingGevolg]["rdfs:label"][0]["@value"];
        if (!contextLabel) throw new Error("Expected label for " + mappingGevolg);

        return mappingGevolg;
    }
}

const uriMappingRelationType: { [k: string]: RelationType } = {
    "conclusieVoorCassatie": "conclusieVoorCassatie",
    "tussenuitspraakBestuurlijkeLus": "tussenuitspraakBestuurlijkeLus",
    "prejudicieleVraag": "prejudicieleVraag",
    "conclusie": "conclusie",
    "nadereConclusie": "nadereConclusie",
    "conclusieVoorSprongcassatie": "conclusieVoorSprongcassatie",
    "verzet": "verzet",
    "sprongcassatie": "sprongcassatie",
    "herziening": "herziening",
    "verwijzing": "verwijzing",
    "ontnemingsvordering": "ontnemingsvordering",
    "hogerBeroep": "hogerBeroep",
    "terugverwijzing": "terugverwijzing",
    "rectificatieBesluit": "rectificatieBesluit",
    "cassatie": "cassatie",
    "definitiefNaRectificatie": "definitiefNaRectificatie",
    "vervallenverklaring": "vervallenverklaring",
    "oorspronkelijkBesluitDefinitiefBesluit": "oorspronkelijkBesluitDefinitiefBesluit",
    "tussenuitspraak": "tussenuitspraak",
    "inachtnemingPrejudicieleBeslissing": "inachtnemingPrejudicieleBeslissing",
    };

function getRelationType(uri: string, label: string, id?:string): RelationType {

    const shortId = uri.replace(/^http:\/\/psi\.rechtspraak(\.nl)?\//, "");
    if (!uriMappingRelationType.hasOwnProperty(shortId)) throw new Error(
        unexpectedUri("relation", uri, label, id)
    );
    const type: RelationType = uriMappingRelationType[shortId];

    const contextLabel: string = _context[type]["rdfs:label"][0]["@value"];
    if (!contextLabel) throw new Error("Expected label for " + type);

    return type;
}

function getAanleg(aanlegUri: string, label: string): Aanleg {
    const id = aanlegUri.replace(/^http:\/\/psi\.rechtspraak\.nl\/gevolg#/, "");

    const aanleg = uriMappingAanleg[id];
    if (!aanleg) throw new Error(unexpectedUri("aanleg", aanlegUri, label || "???"));

    const contextLabel: string = _context[aanleg]["rdfs:label"][0]["@value"];
    if (!contextLabel) throw new Error("Expected label for " + aanleg);

    return aanleg;
}
//todo make sure all sanitized ids decode to the original ids ;) in @context
export const getRelation = (arr: any[]): Relation[] | undefined => arr ? arr.map((rel: any) => {
    const attrs = [
        "rdfs:label",
        ["ecli:resourceIdentifier"/*, "bwb:resourceIdentifier"*/],
        "psi:type",
        "psi:aanleg"
    ];
    const rattrs = rel["@attributes"];
    const gevolg = getGevolg(rattrs["psi:gevolg"]);
    if (!!rattrs && !!gevolg) attrs.push("psi:gevolg");
    mustHaveTextAndAttributes(rel, true, ...attrs);
    const id = rattrs["ecli:resourceIdentifier"];
    if (!matchesAny(id, REGEX_HTTPS, REGEX_URI)) throw new Error("Unexpected resource identifier: " + id);

    const aanleg: Aanleg = getAanleg(rattrs["psi:aanleg"], "???");

    const type: RelationType = getRelationType(rattrs["psi:type"], "???", id);

    // eg http://data.rechtspraak.nl/uitspraken/content?id=ECLI:NL:GHARN:2007:BA0218
    return {
        "@id": id,
        aanleg,
        type,
        "rdfs:label": [makeLabel(rel["#text"], "nl")],
        gevolg
    };
}) : undefined;