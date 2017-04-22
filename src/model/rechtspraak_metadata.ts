import {Label} from "./fields/label";
import {StandardResourceObject} from "./fields/standard-resource-object";
import {Reference} from "./fields/reference";
import {Temporal} from "./fields/temporal";
import {Publisher} from "./fields/publisher";
import {Spatial} from "./fields/spatial";
import {Subject} from "./fields/subject";
import {Relation} from "./fields/relation";
import {HasVersion} from "./fields/hasVersion";

const URI_WITH_PROTOCOL_REGEX = /^(([^:/?#]+):)(\/\/([^/?#]*))([^?#]*)(\?([^#]*))?(#(.*))?/;

const YEAR_REGEX = /[0-9]{4}/;
/**
 * 9999-99-99
 *
 * @type {RegExp}
 */
const DATE_REGEX =
    /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])$/;
/**
 * 9999-99-99T00:00:00
 *
 * @type {RegExp}
 */
const DATETIME_REGEX =
    /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d|60)$/;

export type UriWithProtocol = string;

export function isUriWithProtocol(s: string): s is UriWithProtocol {
    return !!s.match(URI_WITH_PROTOCOL_REGEX);
}

export type Date = string;
export type Year = string;
export type DateTime = string;

export function isDate(s: string): s is Date {
    return !!s.match(DATE_REGEX);
}

export function isDateTime(s: string): s is DateTime {
    return !!s.match(DATETIME_REGEX);
}

export function isYear(s: string): s is DateTime {
    return !!s.match(YEAR_REGEX);
}

export interface HasPart {
    "@type": string;
    "@id": string;
    name?: string;
    alternateName?: string;
    position?: string;
    url: string;
    hasPart?: HasPart[];
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
    "@context": any;
    "@type": string;
    "_id": string;
    "issued": Date;
    "htmlIssued"?: Date;
    "date": Date;
    "owl:sameAs": UriWithProtocol;
    "abstract": Abstract;
    /**
     *  always "public"
     */
    "accessRights": string;
    "metadataModified": string;
    "contentModified"?: string;
    "publisher": Publisher[];
    "language": string;
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
    "hasVersion"?: HasVersion[];
    "corpus": string;
    "couchDbUpdated": string;
    "source": UriWithProtocol;
    "about": UriWithProtocol;
    "page": UriWithProtocol;
    "title": Label;
    "spatial"?: Spatial;
    "innerText"?: string;
    "hasPart"?: HasPart[];
}
