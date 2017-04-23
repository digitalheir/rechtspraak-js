import {
    Creator,
    Date,
    RechtspraakMetadata,
    UriWithProtocol
} from "./rechtspraak_metadata";

import {
    throwIfNotString,
    throwIfNotUriWithProtocol, throwIfNotDate, throwIfNotArray,
    HTTPS_RECHTSPRAAK_LAWREADER,
    HTTPS_DEEPLINK_RECHTSPRAAK_ID,
    REGEX_ECLI, throwIfNotDateTime, throwIfContainsUnexpectedEncodedChars
} from "../util/validations";
import _context from "./json-ld/context";
import {deepEqual} from "assert";
import {getCreator} from "./fields/creator";
import {getProcedure} from "./fields/procedure";
import {getReferences} from "./fields/reference";
import {getSubject} from "./fields/subject";
import {getType} from "./fields/type";
import {getCoverage} from "./fields/coverage";
import {getTemporal} from "./fields/temporal";
import {getTitle} from "./fields/title";
import {getPublisher} from "./fields/publisher";
import {getSpatial} from "./fields/spatial";
import {getRelation} from "./fields/relation";
import {getHasVersion} from "./fields/hasVersion";

export function getResourceId(attrz: any/*todo*/, key?: string): string {
    if (!attrz)
        throw new Error("No attributes found!" + (key ? " (" + key + ")" : ""));
    if (attrz["resourceIdentifier"])
        if (!!attrz["psi:resourceIdentifier"])
            throw new Error("Unexpected psi:resourceIdentifier");
        else
            return attrz["resourceIdentifier"].trim();
    else if (attrz["psi:resourceIdentifier"])
        if (!!attrz["resourceIdentifier"])
            throw new Error("Unexpected resourceIdentifier");
        else
            return attrz["psi:resourceIdentifier"].trim();
    else
        throw new Error("No resourceIdentifier could be found: " + JSON.stringify(attrz));
}

function mergeDescriptionTags(rdf: any) {
    let description = rdf["rdf:Description"];
    if (Object.prototype.toString.call(description) !== "[object Array]") description = [description, {}];
    if (description.length !== 2) throw new Error("Expected 2 descriptions");
    const description0 = description[0];
    const description1 = description[1];
    if (typeof description0 !== "object")throw new Error(JSON.stringify(description0));
    if (typeof description1 !== "object")throw new Error(JSON.stringify(description1));
    if (!(description0["dcterms:format"].trim() === "text/xml"
        && (Object.keys(description1).length === 0 || description1["dcterms:format"].trim() === "text/html")))
        throw new Error(description0["dcterms:format"] + " and " + description1["dcterms:format"]);

    const o: any = {};
    Object.keys(description0).forEach(k => {
        if (description1[k]) {
            switch (k) {
                case "dcterms:issued":
                    o.issued = description0[k];
                    o.htmlIssued = description1[k];
                    break;
                case "dcterms:modified":
                    o.metadataModified = description0[k];
                    o.contentModified = description1[k];
                    break;
                case "dcterms:format":
                    break;
                case "dcterms:publisher":
                    if (!(
                        (Object.prototype.toString.call(description0[k]) === "[object Array]") &&
                        description0[k].length === 1 &&
                        (Object.prototype.toString.call(description1[k]) === "[object Array]") &&
                        description1[k].length === 1))
                        throw new Error(" > Expected just 1 resourceIdentifier for publisher: \n" + JSON.stringify(description0[k]) + "\n" + JSON.stringify(description1[k]));
                    if (description0[k][0]["@attributes"]["resourceIdentifier"] !== description1[k][0]["@attributes"]["resourceIdentifier"])
                        o[k] = description0[k].concat(description1[k]);
                    else o[k] = description0[k];
                    break;
                case "dcterms:identifier":
                    const ecli = description0[k].trim();
                    if (!(ecli.match(/^ECLI:/))) throw new Error(JSON.stringify(ecli));
                    if (!(description1[k].trim().match(/^http:\/\//))) throw new Error(JSON.stringify(description1[k]));
                    o[k] = ecli;
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
            case "dcterms:issued":
                o.issued = description0[k];
                break;
            case "dcterms:modified":
                o.metadataModified = description0[k];
                break;
            case "dcterms:format":
                break;
            case "dcterms:identifier":
                if (!(description0[k].match(/^ECLI:/))) throw new Error(JSON.stringify(description0[k]));
                o[k] = description0[k];
                break;
            default:
                o[k] = description0[k];
        }
    });
    Object.keys(description1).forEach(key => {
        if (description1[key] !== undefined) switch (key) {
            case "dcterms:format":
                break;
            default:
                o[key] = description1[key];
        }
    });
    return o;
}

function throwIfUnexpectedFieldInDoc(doc: any) {
    Object.keys(doc).map(k => {
        switch (k) {
            case "#text":
            case "abstract":
            case "rdf:RDF":
                break;
            default:
                if (!doc[k])
                    throw new Error("Did not expect " + JSON.stringify(doc[k]) + " for " + k);
                else if (Object.prototype.toString.call(doc[k]) === "[object Array]")
                    doc[k].forEach((ol: any) => {
                        if (!ol)throw new Error("Did not expect array 2 contain " + ol);
                    });
        }
    });
}
export default function refineMetadata(doc: any): RechtspraakMetadata {
    const rdf = doc["rdf:RDF"];
    if (!rdf) throw new Error("Expected rdf node to exist");
    if (!rdf["rdf:Description"]) throw new Error("Expected rdf:Description node to exist");
    doc["rdf:RDF"] = undefined;


    throwIfUnexpectedFieldInDoc(doc);
    let meta = mergeDescriptionTags(rdf);
    if (rdf.abstract) meta.abstract = rdf.abstract;
    else if (doc.abstract) meta.abstract = doc.abstract;
    return refineMetadata2(meta);
}


function refineMetadata2(meta: any): RechtspraakMetadata {
    if (typeof meta !== "object") throw new Error("Expected meta to be of type 'object'");


    const _id = throwIfNotString(meta["dcterms:identifier"]);

    const str = (k: any): string => throwIfNotString(meta[k], _id);
    // const optStr = (k: any): string | undefined => meta[k] ? throwIfNotString(meta[k], _id) : undefined;
    const optDate = (k: any): Date | undefined => meta[k] ? throwIfNotDate(meta[k]) : undefined;
    const optDateTime = (k: any): Date | undefined => meta[k] ? throwIfNotDateTime(meta[k]) : undefined;
    const date = (k: any): Date => throwIfNotDate(meta[k]);
    const datetime = (k: any): Date => throwIfNotDateTime(meta[k]);
    // const uriWithProtocol = (k: any, prefix?: string): Date => (prefix ? prefix : "") + throwIfNotUriWithProtocol(meta[k], _id);


    const strArr = (k: any, prefix?: string): string[] => {
        return throwIfNotArray(meta[k], k).map(
            (s: any) => (prefix || "") + throwIfNotString(s, k, JSON.stringify(meta[k])).trim()
        );
    };

    const optStrArr = (k: any): string[] | undefined => {
        return meta[k] ? strArr(k) : undefined;
    };

    //noinspection JSUnusedLocalSymbols
    const optUriPArr = (k: any): undefined | UriWithProtocol[] => {
        const object = meta[k];
        if (!object) return undefined;
        return throwIfNotArray(object, k, _id).map((s: any) => throwIfNotUriWithProtocol(s, k, JSON.stringify(object)));
    };

    if (
        meta["dcterms:abstract"]
        && !(
            meta["dcterms:abstract"]["@attributes"]
            && meta["dcterms:abstract"]["@attributes"]["resourceIdentifier"] === "../../rs:inhoudsindicatie"
        )
    ) throw new Error("Expected different " + "dcterms:abstract");

    Object.keys(meta).forEach((k) => {
        switch (k) {
            case "@attributes":
            case "dcterms:accessRights":
            case "dcterms:abstract":
            case "dcterms:identifier":
            case "owl:sameAs":
            case "metadataModified":
            case "contentModified":
            case "issued":
            case "htmlIssued":
            case "dcterms:language":
            case "dcterms:date":
            case "abstract":
            case "dcterms:hasVersion":
            case "dcterms:replaces":
            case "dcterms:isReplacedBy":
            case "psi:zaaknummer":
            case "hasPart":
            case "dcterms:publisher":
            case "dcterms:relation":
            case "dcterms:creator":
            case "psi:procedure":
            case "dcterms:references":
            case "dcterms:subject":
            case "dcterms:type":
            case "dcterms:coverage":
            case "dcterms:temporal":
            case "dcterms:title":
            case "dcterms:spatial":
            case "rdf:about":
                break;
            default:
                if (!!meta[k])
                    throw new Error(
                        meta["dcterms:identifier"] + ": Did not know how to handle metadata item " + k
                        + " (" + JSON.stringify(meta[k]) + ")"
                    );
        }
    });


    const attrs = meta["@attributes"];

    const about: UriWithProtocol = !!attrs ? throwIfNotUriWithProtocol(attrs["rdf:about"]) : HTTPS_DEEPLINK_RECHTSPRAAK_ID + _id;

    const creator: Creator = getCreator(meta["dcterms:creator"], _id);

    const issued = date("issued");
    return {
        "@context": _context,
        _id,
        "@type": "schema:Report",
        "accessRights": "muhAccessRights:" + throwIfContainsUnexpectedEncodedChars(str("dcterms:accessRights")),
        "issued": issued,
        "metadataModified": datetime("metadataModified"),
        "contentModified": optDateTime("contentModified"),
        "htmlIssued": optDate("htmlIssued"),
        "owl:sameAs": about,
        "language": /*HTTPS_RECHTSPRAAK_LAWREADER_VOCAB + "language/" + */str("dcterms:language"),
        creator,
        "date": date("dcterms:date"),
        "zaaknummer": optStrArr("psi:zaaknummer"),
        // todo test
        "type": getType(meta["dcterms:type"], _id),
        "temporal": getTemporal(meta["dcterms:temporal"], _id),
        "spatial": getSpatial(meta["dcterms:spatial"], _id),
        "subject": getSubject(meta["dcterms:subject"], _id),
        "hasVersion": getHasVersion(meta["dcterms:hasVersion"]),


        "replaces": optStrArr("dcterms:replaces"),
        "isReplacedBy": meta["dcterms:isReplacedBy"] ? strArr("dcterms:isReplacedBy").map(id => {
            if (!id.match(REGEX_ECLI)) throw new Error("Is not replaced by an ECLI: " + _id);
            return HTTPS_DEEPLINK_RECHTSPRAAK_ID + id;
        }) : undefined,
        // "schema:hasPart": meta["hasPart"], // never set

        "publisher": getPublisher(meta["dcterms:publisher"], _id),
        "relation": getRelation(meta["dcterms:relation"]),
        "procedure": getProcedure(meta["psi:procedure"], _id),
        "references": getReferences(meta["dcterms:references"], _id),
        "coverage": getCoverage(meta["dcterms:coverage"], _id),
        // TODO test whitespacing
        "title": getTitle(meta["dcterms:title"], _id, creator, issued),

        // TODO test 2 forms
        "abstract": meta["abstract"],

        "source": about,
        "about": about,


        "couchDbUpdated": new Date().toISOString(),
        "corpus": "Rechtspraak.nl",
        "page": HTTPS_RECHTSPRAAK_LAWREADER + "ecli/" + _id
    };
}
