import {
    Date,
    RechtspraakMetadata,
    Relation,
    UriWithProtocol
} from "./rechtspraak_metadata";

import {
    throwIfNotString,
    matchesAny, REGEX_HTTPS, REGEX_URI,
    mustHaveTextAndAttributes, HTTPS_RECHTSPRAAK_LAWREADER_VOCAB,
    throwIfNotUriWithProtocol, throwIfNotDate, throwIfNotArray,
    HTTPS_RECHTSPTRAAK_LAWREADER
} from "../util/validations";
import {deepEqual} from "assert";
import {getCreator} from "./fields/creator";
import {getProcedure} from "./fields/procedure";
import {getReferences} from "./fields/reference";
import {idResource, StandardResourceObject} from "./fields/standard-resource-object";
import {makeLabel} from "./fields/label";
import {getSubject} from "./fields/subject";
import {getType} from "./fields/type";
import {getCoverage} from "./fields/coverage";
import {getTemporal} from "./fields/temporal";
import {getTitle} from "./fields/title";
import {getPublisher} from "./fields/publisher";
import {getSpatial} from "./fields/spatial";


export function getResourceId(attrz: any/*todo*/, key?: string): string {
    if (!attrz)
        throw new Error("No attributes found!" + (key ? " (" + key + ")" : ""));
    if (attrz['resourceIdentifier'])
        if (!!attrz['psi:resourceIdentifier'])
            throw new Error("Unexpected psi:resourceIdentifier");
        else
            return attrz['resourceIdentifier'];
    else if (attrz['psi:resourceIdentifier'])
        if (!!attrz['resourceIdentifier'])
            throw new Error("Unexpected resourceIdentifier");
        else
            return attrz['psi:resourceIdentifier'];
    else
        throw new Error("No resourceIdentifier could be found: " + JSON.stringify(attrz));
}

function idResourceWithOriginal(id: string, originalId: string): StandardResourceObject {
    const o: StandardResourceObject = idResource(id);
    o.originalIdentifier = originalId;
    return o;
}


function mergeDescriptionTags(rdf: any) {
    let description = rdf['rdf:Description'];
    if (Object.prototype.toString.call(description) !== '[object Array]') description = [description, {}];
    if (description.length !== 2) throw new Error("Expected 2 descriptions");
    const description0 = description[0];
    const description1 = description[1];
    if (typeof description0 !== 'object')throw new Error(JSON.stringify(description0));
    if (typeof description1 !== 'object')throw new Error(JSON.stringify(description1));
    if (!(description0['dcterms:format'] === 'text/xml' && (Object.keys(description1).length === 0 || description1['dcterms:format'] === 'text/html')))
        throw new Error(description0['dcterms:format'] + " and " + description1['dcterms:format']);

    const o: any = {};
    Object.keys(description0).forEach(k => {
        if (description1[k]) {
            switch (k) {
                case 'dcterms:issued':
                    o.issued = description0[k];
                    o.htmlIssued = description1[k];
                    break;
                case 'dcterms:modified':
                    o.metadataModified = description0[k];
                    o.contentModified = description1[k];
                    break;
                case 'dcterms:format':
                    break;
                case 'dcterms:publisher':
                    if (!(
                        (Object.prototype.toString.call(description0[k]) === '[object Array]') &&
                        description0[k].length === 1 &&
                        (Object.prototype.toString.call(description1[k]) === '[object Array]') &&
                        description1[k].length === 1))
                        throw new Error(" > Expected just 1 resourceIdentifier for publisher: \n" + JSON.stringify(description0[k]) + "\n" + JSON.stringify(description1[k]));
                    if (description0[k][0]['@attributes']['resourceIdentifier'] !== description1[k][0]['@attributes']['resourceIdentifier'])
                        o[k] = description0[k].concat(description1[k]);
                    else o[k] = description0[k];
                    break;
                case 'dcterms:identifier':
                    if (!(description0[k].match(/^ECLI:/))) throw new Error(JSON.stringify(description0[k]));
                    if (!(description1[k].match(/^http:\/\//))) throw new Error(JSON.stringify(description1[k]));
                    o[k] = description0[k];
                    o['owl:sameAs'] = description1[k];
                    break;
                default:
                    try {
                        deepEqual(description0[k], description1[k]);
                        o[k] = description0[k];
                    } catch (e) {
                        console.error(k + ":");
                        console.error("\t" + JSON.stringify(description0[k]));
                        console.error("\t" + JSON.stringify(description1[k]));
                        throw e;
                    }
            }
            description1[k] = undefined;
        } else switch (k) {
            case 'dcterms:issued':
                o.issued = description0[k];
                break;
            case 'dcterms:modified':
                o.metadataModified = description0[k];
                break;
            case 'dcterms:format':
                break;
            case 'dcterms:identifier':
                if (!(description0[k].match(/^ECLI:/))) throw new Error(JSON.stringify(description0[k]));
                o[k] = description0[k];
                break;
            default:
                o[k] = description0[k];
        }
    });
    Object.keys(description1).forEach(key => {
        if (description1[key] !== undefined) switch (key) {
            case 'dcterms:format':
                break;
            default:
                o[key] = description1[key]
        }
    });
    return o;
}

function throwIfUnexpectedFieldInDoc(doc: any) {
    Object.keys(doc).map(k => {
        switch (k) {
            case '#text':
            case 'rdf:RDF':
                break;
            default:
                if (!doc[k])
                    throw new Error("Did not expect " + JSON.stringify(doc[k]) + " for " + k);
                else if (Object.prototype.toString.call(doc[k]) === '[object Array]')
                    doc[k].forEach((ol: any) => {
                        if (!ol)throw new Error("Did not expect array 2 contain " + ol)
                    });
        }
    })
}
export default function refineMetadata(rdf: any, doc: any): RechtspraakMetadata {
    if (rdf.abstract) doc.abstract = rdf.abstract;
    rdf.abstract = undefined;

    throwIfUnexpectedFieldInDoc(doc);
    return refineMetadata2(mergeDescriptionTags(rdf));
}


function refineMetadata2(meta: any): RechtspraakMetadata {
    if (typeof meta !== 'object') throw new Error("Expected meta to be of type 'object'");


    const str = (k: any): string => throwIfNotString(meta[k]);
    const date = (k: any): Date => throwIfNotDate(meta[k]);
    const same = (k: any): any => meta[k];
    const uriP = (k: any, prefix?: string): Date => throwIfNotUriWithProtocol((prefix ? prefix : "") + meta[k], _id);

    const _id = str('dcterms:identifier');

    const strArr = (k: any): string[] => {
        return throwIfNotArray(meta[k], k).map((s: any) => throwIfNotString(s, k, JSON.stringify(meta[k])));
    };

    const uriPArr = (k: any, _id?: string): UriWithProtocol[] => {
        return throwIfNotArray(meta[k], k).map((s: any) => throwIfNotUriWithProtocol(s, k, JSON.stringify(meta[k])));
    };

    const optionalUriPArr = (k: any, _id?: string): undefined | UriWithProtocol[] => {
        const object = meta[k];
        if (!object) return undefined;
        return throwIfNotArray(object, k).map((s: any) => throwIfNotUriWithProtocol(s, k, JSON.stringify(object)));
    };

    const getRelation = (arr: any[]): Relation[] | undefined => arr ? arr.map((rel: any) => {
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

    if (
        meta['dcterms:abstract'] && !meta['dcterms:abstract']['@attributes'] && meta['dcterms:abstract']['@attributes']['resourceIdentifier'] === "../../rs:inhoudsindicatie"
    ) throw new Error('Expected different ' + 'dcterms:abstract');

    Object.keys(meta).forEach((k) => {
        switch (k) {
            case '@attributes':
            case 'dcterms:accessRights':
            case 'dcterms:abstract':
            case 'dcterms:identifier':
            case     'owl:sameAs':
            case     "metadataModified":
            case     "contentModified":
            case     "issued":
            case     "htmlIssued":
            case     "dcterms:language":
            case     "dcterms:date":
            case     "abstract":
            case     "dcterms:hasVersion":
            case     "dcterms:replaces":
            case     "dcterms:isReplacedBy":
            case     "psi:zaaknummer":
            case     "hasPart":
            case     'dcterms:publisher':
            case     'dcterms:relation':
            case     'dcterms:creator':
            case     'psi:procedure':
            case     'dcterms:references':
            case     'dcterms:subject':
            case     'dcterms:type':
            case     'dcterms:coverage':
            case     'dcterms:temporal':
            case     'dcterms:title':
            case     'dcterms:spatial':
            case     "rdf:about":
                break;
            default:
                if (!!meta[k])
                    throw new Error(
                        meta['dcterms:identifier'] + ": Did not know how to handle metadata item " + k
                        + " (" + JSON.stringify(meta[k]) + ")"
                    );
        }
    });


    return {
        _id,
        "accessRights": str('dcterms:accessRights'),
        "owl:sameAs": str('owl:sameAs'),
        "metadataModified": str("metadataModified"),
        "contentModified": str("contentModified"),
        "issued": date("issued"),
        "htmlIssued": date("htmlIssued"),
        "language": uriP("dcterms:language", HTTPS_RECHTSPRAAK_LAWREADER_VOCAB + "language/"),
        "date": date("dcterms:date"),
        "abstract": same("abstract"),
        "hasVersion": strArr("dcterms:hasVersion"),
        "replaces": optionalUriPArr("dcterms:replaces"),
        "isReplacedBy": optionalUriPArr("dcterms:isReplacedBy"),
        "zaaknummer": strArr("psi:zaaknummer"),
        "hasPart": same("hasPart"),

        "publisher": getPublisher(meta['dcterms:publisher'], _id),
        "relation": getRelation(meta['dcterms:relation']),
        "creator": getCreator(meta['dcterms:creator'], _id),
        "procedure": getProcedure(meta['psi:procedure'], _id),
        "references": getReferences(meta['dcterms:references'], _id),
        "subject": getSubject(meta['dcterms:subject'], _id),
        "type": getType(meta['dcterms:type'], _id),
        "coverage": getCoverage(meta['dcterms:coverage'], _id),
        "temporal": getTemporal(meta['dcterms:temporal'], _id),
        "title": getTitle(meta['dcterms:title'], _id),
        "spatial": getSpatial(meta['dcterms:spatial'], _id),
        "source": uriP("rdf:about"),
        "about": uriP("rdf:about"),


        "couchDbUpdated": new Date().toISOString(),
        "corpus": 'Rechtspraak.nl',
        "page": HTTPS_RECHTSPTRAAK_LAWREADER + "ecli/" + _id,
    };
}
