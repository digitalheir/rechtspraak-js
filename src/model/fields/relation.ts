import {
    HTTPS_RECHTSPRAAK_LAWREADER_VOCAB, matchesAny, mustHaveTextAndAttributes,
    REGEX_HTTPS, REGEX_URI
} from "../../util/validations";
import {Label, makeLabel} from "./label";
import {idResource, StandardResourceObject} from "./standard-resource-object";

function idResourceWithOriginal(id: string, originalId: string): StandardResourceObject {
    const o: StandardResourceObject = idResource(id);
    o.originalIdentifier = originalId;
    return o;
}


export interface Aanleg extends StandardResourceObject {
}
export interface Gevolg extends StandardResourceObject {
}
export interface Relation extends StandardResourceObject {
    "gevolg"?: Gevolg;
    "aanleg": Aanleg;
    "type": {
        "@id": string;
        "rdfs:label"?: Label[];
        "originalIdentifier"?: string;
        "schemeIdentifier"?: string;
        "additionalIdentifier"?: string;
    };
}

export const getRelation = (arr: any[]): Relation[] | undefined => arr ? arr.map((rel: any) => {
    const attrs = [
        "rdfs:label",
        ["ecli:resourceIdentifier"/*, "bwb:resourceIdentifier"*/],
        "psi:type",
        "psi:aanleg"
    ];
    const rattrs = rel['@attributes'];
    let gevolg = rattrs['psi:gevolg'];
    if (!!rattrs && !!gevolg) attrs.push('psi:gevolg');
    mustHaveTextAndAttributes(rel, true, ...attrs);
    const id = rattrs["ecli:resourceIdentifier"];
    if (!matchesAny(id, REGEX_HTTPS, REGEX_URI)) throw new Error("Unexpected resource identifier: " + id);
    const aanlegUri = rattrs["psi:aanleg"];
    if (!aanlegUri.match(/^http:\/\/psi\.rechtspraak\.nl\//)) throw new Error("Expected valid aanleg URI");
    const typeUri = rattrs["psi:type"];
    return {
        '@id': id,
        aanleg: idResourceWithOriginal(
            HTTPS_RECHTSPRAAK_LAWREADER_VOCAB + 'dcterms:relation' + "/" +
            encodeURI(aanlegUri.replace(/^http:\/\/psi\.rechtspraak\.nl\//, "")),
            aanlegUri
        ),
        type: idResourceWithOriginal(
            HTTPS_RECHTSPRAAK_LAWREADER_VOCAB + 'dcterms:relation' + "/" +
            encodeURI(typeUri.replace(/^http:\/\/psi\.rechtspraak\.nl\//, "")),
            typeUri
        ),
        'rdfs:label': [makeLabel(rel['#text'], 'nl')],
        gevolg: gevolg ? idResourceWithOriginal(
            HTTPS_RECHTSPRAAK_LAWREADER_VOCAB + 'dcterms:relation' + "/" +
            encodeURI(gevolg.replace(/^http:\/\/psi\.rechtspraak\.nl\//, "")),
            gevolg
        ) : undefined
    };
}) : undefined;