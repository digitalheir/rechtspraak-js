import {
    matchesAny, mustHaveTextAndAttributes,
    REGEX_HTTPS, REGEX_URI, unexpectedUri
} from "../../util/validations";
import {makeLabel} from "./label";
import {idResource, StandardResourceObject} from "./standard-resource-object";

export function idResourceWithOriginal(id: string, originalId: string): StandardResourceObject {
    const o: StandardResourceObject = idResource(id);
    o.originalIdentifier = originalId;
    return o;
}


export type Aanleg = "latereAanleg";
export type Gevolg = "gevolg#bekrachtiging/bevestiging";
export type RelationType = "conclusieVoorCassatie";

export interface Relation extends StandardResourceObject {
    "gevolg"?: Gevolg;
    "aanleg": Aanleg;
    "type": RelationType;
}

function getGevolg(gevolg?: string, label?: string): Gevolg | undefined {
    if (!gevolg)
        return undefined;
    else
        switch (gevolg.replace(/^http:\/\/psi\.rechtspraak\.nl\/gevolg#/, "")) {
            case "bekrachtiging/bevestiging":
                return "gevolg#bekrachtiging/bevestiging";
            default:
                throw new Error(unexpectedUri("gevolg", gevolg, label || "???"));
        }
}

// todo checkif label correct ;)
function getRelationType(uri: string, label: string): RelationType {
    switch (uri.replace(/^http:\/\/psi\.rechtspraak\.nl\//, "")) {
        case "conclusieVoorCassatie":
            return "conclusieVoorCassatie";
        default:
            throw new Error(
                unexpectedUri("relation", uri, label)
            );
    }
}

function getAanleg(aanlegUri: string, label: string): Aanleg {
    switch (aanlegUri.replace(/^http:\/\/psi\.rechtspraak\.nl\/gevolg#/, "")) {
        case "latereAanleg":
            return "latereAanleg";
        default:
            throw new Error(unexpectedUri("aanleg", aanlegUri, label));
    }
}

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

    const type: RelationType = getRelationType(rattrs["psi:type"], "???");

    // eg http://data.rechtspraak.nl/uitspraken/content?id=ECLI:NL:GHARN:2007:BA0218
    return {
        "@id": id,
        aanleg,
        type,
        "rdfs:label": [makeLabel(rel["#text"], "nl")],
        gevolg
    };
}) : undefined;