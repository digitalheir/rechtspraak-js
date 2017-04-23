import {
    matchesAny, mustHaveTextAndAttributes,
    REGEX_HTTPS, REGEX_URI, throwUnexpectedUri
} from "../../util/validations";
import {makeLabel} from "./label";
import {idResource, StandardResourceObject} from "./standard-resource-object";

export function idResourceWithOriginal(id: string, originalId: string): StandardResourceObject {
    const o: StandardResourceObject = idResource(id);
    o.originalIdentifier = originalId;
    return o;
}


export type Aanleg = "latereAanleg";
export type Gevolg = "bekrachtiging/bevestiging";
export type RelationType = "conclusieVoorCassatie";

export interface Relation extends StandardResourceObject {
    "gevolg"?: Gevolg;
    "aanleg": Aanleg;
    "type": RelationType;
}

function getGevolg(gevolg?: string): Gevolg | undefined {
    if (!gevolg)
        return undefined;
    else
        switch (gevolg.replace(/^http:\/\/psi\.rechtspraak\.nl\/gevolg#/, "")) {
            case "bekrachtiging/bevestiging":
                return "bekrachtiging/bevestiging";
            default:
                throwUnexpectedUri("gevolg", gevolg);
        }
}

function getRelationType(uri: string): RelationType {
    switch (uri.replace(/^http:\/\/psi\.rechtspraak\.nl\//, "")) {
        case "conclusieVoorCassatie":
            return "conclusieVoorCassatie";
        default:
            throw new Error(
                "Unexpected relation type: "
                + uri
                + ". Leave an issue here: https://github.com/digitalheir/rechtspraak-js/issues to request to add it to the context."
            );
    }
}

function getAanleg(aanlegUri: string): Aanleg {
    switch (aanlegUri.replace(/^http:\/\/psi\.rechtspraak\.nl\/gevolg#/, "")) {
        case "latereAanleg":
            return "latereAanleg";
        default:
            throw new Error(
                "Unexpected gevolg: "
                + aanlegUri
                + ". Leave an issue here: https://github.com/digitalheir/rechtspraak-js/issues to request to add it to the context."
            );
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

    const aanleg: Aanleg = getAanleg(rattrs["psi:aanleg"]);

    const type: RelationType = getRelationType(rattrs["psi:type"]);

    // eg http://data.rechtspraak.nl/uitspraken/content?id=ECLI:NL:GHARN:2007:BA0218
    return {
        "@id": id,
        aanleg,
        type,
        "rdfs:label": [makeLabel(rel["#text"], "nl")],
        gevolg
    };
}) : undefined;