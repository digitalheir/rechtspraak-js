import {
    matchesAny, mustHaveTextAndAttributes,
    REGEX_HTTPS, REGEX_URI, unexpectedUri
} from "../../util/validations";
import {makeLabel} from "./label";
import {idResource, StandardResourceObject} from "./standard-resource-object";
import {_context} from "../json-ld/context";
import {aanlegTypes} from "../json-ld/context/aanlegTypes";
import {gevolgTypes} from "../json-ld/context/gevolgTypes";
import {relationTypes} from "../json-ld/context/relationTypes";

// export function idResourceWithOriginal(id: string, originalId: string): StandardResourceObject {
//     const o: StandardResourceObject = idResource(id);
//     o.originalIdentifier = originalId;
//     return o;
// }

export type Aanleg = keyof typeof aanlegTypes;

export function isAanleg(x: string): x is Aanleg {
    return aanlegTypes.hasOwnProperty(x);
}

export type Gevolg = keyof typeof gevolgTypes;
export function isGevolg(x: string): x is Gevolg {
    return gevolgTypes.hasOwnProperty(x);
}

export interface Relation extends StandardResourceObject {
    "gevolg"?: Gevolg;
    "aanleg": Aanleg;
    "type": RelationType;
}

function getGevolg(gevolgUri?: string, label?: string): Gevolg | undefined {
    if (!gevolgUri)
        return undefined;
    else {
        const id = gevolgUri.replace(/^http:\/\/psi\.rechtspraak\.nl\//, "");

        if (isGevolg(id)) {
            const id0: Gevolg = id;
            const contextLabel: string = gevolgTypes[id0]["rdfs:label"][0]["@value"];
            if (!contextLabel) throw new Error("Expected label for " + id);

            return id0;
        } else throw new Error(unexpectedUri("gevolg", gevolgUri, label || "???"));
    }
}


export type RelationType = keyof typeof relationTypes;

function isRelationType(shortId: string): shortId is RelationType {
    return relationTypes.hasOwnProperty(shortId);
}

function getRelationType(uri: string, label: string, id?: string): RelationType {
    const shortId = uri.replace(/^http:\/\/psi\.rechtspraak(\.nl)?\//, "");
    if (isRelationType(shortId)) {
        const type: RelationType = shortId;

        const contextLabel: string = _context[type]["rdfs:label"][0]["@value"];
        if (!contextLabel) throw new Error("Expected label for " + type);

        return type;
    } else throw new Error(
        unexpectedUri("relation", uri, label, id)
    );
}


function getAanleg(aanlegUri: string, label: string): Aanleg {
    const id = aanlegUri.replace(/^http:\/\/psi\.rechtspraak\.nl\//, "");

    if (isAanleg(id)) {
        const contextLabel: string = _context[id]["rdfs:label"][0]["@value"];
        if (!contextLabel) throw new Error("Expected label for " + id);

        return id;
    } else throw new Error(unexpectedUri("aanleg", aanlegUri, label || "???"));
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
    } as Relation;
}) : undefined;