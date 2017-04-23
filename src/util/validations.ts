import {Date, DateTime, isDate, isDateTime, isUriWithProtocol, UriWithProtocol} from "../model/rechtspraak_metadata";

export const REGEX_DCTERMS = /^dcterms:/;
export const REGEX_URI = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/;
export const REGEX_PSI_RECHTSPRAAK = /^https?:\/\/psi\.rechtspraak\.nl\//;
export const HTTPS_DEEPLINK_RECHTSPRAAK_ID = "http://deeplink.rechtspraak.nl/uitspraak?id=";
export const HTTPS_RECHTSPRAAK_LAWREADER = "https://rechtspraak.lawreader.nl/";
export const HTTPS_ID_LAWREADER = "https://id.lawreader.nl/";
export const HTTPS_RECHTSPRAAK_LAWREADER_VOCAB = HTTPS_RECHTSPRAAK_LAWREADER + "vocab/";
export const REGEX_HTTPS = /^https?:\/\//;
export const REGEX_JURICONNECT = /^((?:jci)?[0-9](?:\.(?:[0-9]+)))?:([cv]):(BWB):/;
export const REGEX_CVDR = /^(CVDR):([0-9_]+)/;
export const REGEX_ECLI = /^(ECLI)(?::([A-Z0-9]+))+/;
export const REGEX_STANDAARDEN_OVERHEID = /^https?:\/\/standaarden\.overheid\.nl\//;

const REGEX_UNEXPECTED_ENCODED_CHARS = /[^._:a-zA-Z0-9-]/;


export function throwIfContainsUnexpectedEncodedChars(str: string, id?: string) {
    const encoded = encodeURI(str)
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
    ;
    if (encoded.match(REGEX_UNEXPECTED_ENCODED_CHARS)) throw new Error(id + ": Unexpected encoded URI: \"" + str
        + "\". Leave an issue here: https://github.com/digitalheir/rechtspraak-js/issues ");
}

export function throwIfNotArray(array: any, name?: string, id?: string): any[] {
    if (Object.prototype.toString.call(array) !== "[object Array]")
        throw new Error((id ? (id + ": ") : "") + "Expected an array for " + name + ", instead got " + JSON.stringify(array));
    return array;
}

export function throwIfNotExactlyXAreTruthy(x: number, ...things: any[]) {
    return things.reduce((prev, obj) => !!obj ? prev + 1 : prev, 0) === x;
}

export function throwIfNotString(str: any, extra?: string, ...extras: string[]): string {
    if (typeof str === "string") return str.trim();
    else throw new Error("Expected " + JSON.stringify(str) + " to be a string. (" + extra + ")" + (extras.length ? " " + extras : ""));
}

export function throwIfNotDate(str: any, extra?: string, ...extras: string[]): Date {
    if (typeof str === "string") {
        const trimmed = str.trim();
        if (isDate(trimmed)) return trimmed;
    }

    throw new Error("Expected " + JSON.stringify(str) + " to be a date. (" + extra + ")" + (extras.length ? " " + extras : ""));
}

export function unexpectedUri(k: string, uri: string, label: string, ecli?: string) {
    return ecli + ": Unexpected " + k + ": "
        + uri
        + ". Label: "
        + label
        + ". Leave an issue here: https://github.com/digitalheir/rechtspraak-js/issues to request to add it to the context.";
}

export function throwIfDivergentLabel(key: string, label: string, contextLabel: string) {
    if (contextLabel !== label) throw new Error("Divergent label for " + key + ": " + label + " != " + contextLabel);
}


export function throwIfNotDateTime(str: any, extra?: string, ...extras: string[]): DateTime {
    if (typeof str === "string") {
        const trimmed = str.trim();
        if (isDateTime(trimmed))
            return trimmed;
    }
    throw new Error("Expected " + JSON.stringify(str) + " to be a datetime. (" + extra + ")" + (extras.length ? " " + extras : ""));
}

export function throwIfNotUriWithProtocol(str: any, extra?: string, ...extras: string[]): UriWithProtocol {
    if (isUriWithProtocol(str)) return str.trim();
    else throw new Error("Expected " + JSON.stringify(str) + " to be a uri. (" + extra + ")" + (extras.length ? " " + extras : ""));
}

export function isStringArray(x: string | string[]): x is string[] {
    return Object.prototype.toString.call(x) === "[object Array]"
        && (<any[]>x).reduce(
            (sofar: boolean, y: any) => sofar && typeof y === "string", true
        );
}

export function matchesAny(val: string, ...regexes: RegExp[]) {
    for (let regex of regexes) if (val.match(regex))return true;
    return false;
}

export function mustHaveTextAndAttributes(object: any/*todo*/, mustHaveText: boolean, ...attrs: (string | string[])[]) {
    if (attrs.length > 0) {
        if (!object["@attributes"])
            throw new Error("Expected object to have " + attrs.length + " attributes: " + JSON.stringify(object));
        if (attrs.length != Object.keys(object["@attributes"]).length)
            throw new Error("Expected object to have " + attrs.length + " attributes: " + JSON.stringify(object));
        mustHaveTextAndAtLeastAttributes(object, ...attrs);
    }

    if (mustHaveText && !object["#text"])
        throw new Error("Expected object to have text: " + JSON.stringify(object));
}

export function mustHaveTextAndAtLeastAttributes(object: any/*todo*/, ...attrs: (string | string[])[]) {
    if (!object["@attributes"] && attrs.length > 0)
        throw new Error("Expected object to have " + attrs.length + " attributes: " + JSON.stringify(object));
    attrs.forEach(attr => {
        if (isStringArray(attr)) {
            if (!attr.reduce((cum, att) => {
                    const val = object["@attributes"][att];
                    if (val) if (att.match(/resourceIdentifier$/)
                        && !(matchesAny(val, REGEX_HTTPS, REGEX_JURICONNECT, REGEX_CVDR, REGEX_ECLI))) throw new Error("Expected URI for resource id: " + JSON.stringify(object));
                    return cum || !!val;
                }, false)) {
                throw new Error("Expected object to have attribute " + attr + ": " + JSON.stringify(object));
            }
        } else {
            if (!(object["@attributes"][attr] ))
                throw new Error("Expected object to have attribute " + attr + ": "
                    + JSON.stringify(object)
                    + " (" + JSON.stringify(attrs) + ")");
            if (attr.match(/resourceIdentifier$/)
                && !(object["@attributes"][attr].match(REGEX_HTTPS)))throw new Error("Expected URI for resource id");
        }
    });
}