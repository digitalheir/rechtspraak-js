import {Label} from "./fields/label";
import {StandardResourceObject} from "./fields/standard-resource-object";
import {Reference} from "./fields/reference";
import {Temporal} from "./fields/temporal";
import {Publisher} from "./fields/publisher";
import {Spatial} from "./fields/spatial";
import {Subject} from "./fields/subject";
import {Relation} from "./fields/relation";

const URI_WITH_PROTOCOL_REGEX = /^(([^:/?#]+):)(\/\/([^/?#]*))([^?#]*)(\?([^#]*))?(#(.*))?/;
const DATE_REGEX = /^(\d+)-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])(\s([01]\d|2[0-3]):([0-5]\d):([0-5]\d|60)(\.\d+)?(([Zz])|([+|\-]([01]\d|2[0-3]))))?$/;

export type UriWithProtocol = string;

export function isUriWithProtocol(s: string): s is UriWithProtocol {
    return !!s.match(URI_WITH_PROTOCOL_REGEX);
}

export type Date = string;

export function isDate(s: string): s is Date {
    return !!s.match(DATE_REGEX);
}

export interface HasPart {
    "@type": string;
    "@id": string;
    "name": string;
    "alternateName"?: string;
}
export interface Procedure extends StandardResourceObject {
}

export interface Creator extends StandardResourceObject {
    "scheme": string;
}


export interface Abstract {
    "abstractXml": string;
    "@value": string;
}

export interface RechtspraakMetadata {
    "_id": string;
    "issued": Date;
    "htmlIssued"?: Date;
    "date": Date;
    "owl:sameAs": UriWithProtocol;
    "abstract": Abstract;
    "hasPart": HasPart[];
    "accessRights": UriWithProtocol;
    "metadataModified": string;
    "contentModified"?: string;
    "publisher": Publisher[];
    "language": UriWithProtocol;
    "replaces"?: UriWithProtocol[];
    "relation"?: Relation[];
    "creator": Creator;
    "procedure"?: Procedure[];
    "isReplacedBy"?: UriWithProtocol[];
    "references"?: Reference[];
    "subject"?: Subject[];
    "temporal"?: Temporal;
    "zaaknummer"?: string[];
    "type": UriWithProtocol;
    "coverage": UriWithProtocol;
    "hasVersion"?: string[];
    "corpus": string;
    "couchDbUpdated": string;
    "source": UriWithProtocol;
    "about": UriWithProtocol;
    "page": UriWithProtocol;
    "title": Label;
    "spatial"?: Spatial;
}