import {Date, isUriWithProtocol, UriWithProtocol} from "../model/rechtspraak_metadata";
import {isDate} from "util";
export const REGEX_DCTERMS = /^dcterms:/;
export const REGEX_URI = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/;
export const REGEX_PSI_RECHTSPRAAK = /^https?:\/\/psi\.rechtspraak\.nl\//;
export const HTTPS_RECHTSPTRAAK_LAWREADER = "";
export const HTTPS_RECHTSPRAAK_LAWREADER_VOCAB = HTTPS_RECHTSPTRAAK_LAWREADER + "vocab/";
export const REGEX_HTTPS = /^https?:\/\//;
export const REGEX_JURICONNECT = /^((?:jci)?[0-9](?:\.(?:[0-9]+)))?:([cv]):(BWB):/;
export const REGEX_CVDR = /^(CVDR):([0-9_]+)/;
export const REGEX_ECLI = /^(ECLI)(?::([A-Z0-9]+))+/;
export const REGEX_STANDAARDEN_OVERHEID = /^https?:\/\/standaarden\.overheid\.nl\//;


export function throwIfNotArray(array: any, name?: string): any[] {
    if (Object.prototype.toString.call(array) !== '[object Array]')
        throw new Error("Expected an array for " + name + ", instead got " + JSON.stringify(array));
    return array;
}

export function throwIfNotExactlyXAreTruthy(x: number, ...things: any[]) {
    return things.reduce((prev, obj) => !!obj ? prev + 1 : prev, 0) === x;
}

export function throwIfNotString(str: any, extra?: string, ...extras: string[]): string {
    if (typeof str === 'string') return str;
    else throw new Error("Expected " + JSON.stringify(str) + " to be a string. (" + extra + ")");
}

export function throwIfNotDate(str: any, extra?: string, ...extras: string[]): Date {
    if (isDate(str)) return str;
    else throw new Error("Expected " + JSON.stringify(str) + " to be a date. (" + extra + ")");
}

export function throwIfNotUriWithProtocol(str: any, extra?: string, ...extras: string[]): UriWithProtocol {
    if (isUriWithProtocol(str)) return str;
    else throw new Error("Expected " + JSON.stringify(str) + " to be a uri. (" + extra + ")");
}

export function isStringArray(x: string | string[]): x is string[] {
    return Object.prototype.toString.call(x) === '[object Array]'
        && (<any[]>x).reduce(
            (sofar: boolean, y: any) => sofar && typeof y === 'string', true
        );
}

export function matchesAny(val: string, ...regexes: RegExp[]) {
    for (let regex of regexes) if (val.match(regex))return true;
    return false;
}

export function mustHaveTextAndAttributes(object: any/*todo*/, mustHaveText: boolean, ...attrs: (string | string[])[]) {
    if (attrs.length > 0) {
        if (!object['@attributes'])
            throw new Error("Expected object to have " + attrs.length + " attributes: " + JSON.stringify(object));
        if (attrs.length != Object.keys(object['@attributes']).length)
            throw new Error("Expected object to have " + attrs.length + " attributes: " + JSON.stringify(object));
        mustHaveTextAndAtLeastAttributes(object, ...attrs);
    }

    if (mustHaveText && !object['#text'])
        throw new Error("Expected object to have text: " + JSON.stringify(object));
}

export function mustHaveTextAndAtLeastAttributes(object: any/*todo*/, ...attrs: (string | string[])[]) {
    if (!object['@attributes'] && attrs.length > 0)
        throw new Error("Expected object to have " + attrs.length + " attributes: " + JSON.stringify(object));
    attrs.forEach(attr => {
        if (isStringArray(attr)) {
            if (!attr.reduce((cum, att) => {
                    const val = object['@attributes'][att];
                    if (val) if (att.match(/resourceIdentifier$/)
                        && !(matchesAny(val, REGEX_HTTPS, REGEX_JURICONNECT, REGEX_CVDR, REGEX_ECLI))) throw new Error("Expected URI for resource id: " + JSON.stringify(object));
                    return cum || !!val
                }, false)) {
                throw new Error("Expected object to have attribute " + attr + ": " + JSON.stringify(object));
            }
        } else {
            if (!(object['@attributes'][attr] ))
                throw new Error("Expected object to have attribute " + attr + ": "
                    + JSON.stringify(object)
                    + " (" + JSON.stringify(attrs) + ")");
            if (attr.match(/resourceIdentifier$/)
                && !(object['@attributes'][attr].match(REGEX_HTTPS)))throw new Error("Expected URI for resource id");
        }
    });
}