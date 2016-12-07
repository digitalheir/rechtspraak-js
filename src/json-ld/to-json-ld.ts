import {DOMParser} from "xmldom";
import {deepEqual} from "assert";
import throwIfNotString from "../util/throwIfNotString";

// import convertToHtml from "./to-html";

const REGEX_DCTERMS = /^dcterms:/;
const REGEX_HTTPS = /^https?:\/\//;
const REGEX_URI = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/;
const REGEX_JURICONNECT = /^((?:jci)?[0-9](?:\.(?:[0-9]+)))?:([cv]):(BWB):/;
const REGEX_CVDR = /^(CVDR):([0-9_]+)/;
const REGEX_ECLI = /^(ECLI)(?::([A-Z0-9]+))+/;
const REGEX_PSI_RECHTSPRAAK = /^https?:\/\/psi\.rechtspraak\.nl\//;
//noinspection JSUnusedLocalSymbols
const REGEX_STANDAARDEN_OVERHEID = /^https?:\/\/standaarden\.overheid\.nl\//;
const HTTPS_RECHTSPRAAK_LAWREADER_VOCAB = "https://rechtspraak.lawreader.nl/vocab/";

export interface Label {
    ["@value"]: string,
    ["@language"]?: string
}

function makeLabel(value: string, lang: string): Label {
    return {
        '@value': value,
        '@language': lang
    };
}

export interface IdResource {
    '@id': string;
    'rdfs:label'?: Label[];
    // TODO all for subclasses of idresource
    aanleg?: IdResource;
    type?: IdResource;
    gevolg?: IdResource;
    cvdr?: any;
    jdi?: any;
    originalIdentifier?: string;
}

function makeIdResourceFunction(checkUri: boolean) {
    return function (id: string, ...labels: Label[]): IdResource {
        if (checkUri && !matchesAny(id, REGEX_HTTPS, REGEX_URI))
            throw new Error("Unexpected resource identifier: " + id);

        const obj: IdResource = {
            '@id': id,
        };
        if (labels.length > 0)
            obj['rdfs:label'] = labels;
        return obj;
    };
}


function idResourceNoUriCheck(id: string, ...labels: Label[]): IdResource {
    return makeIdResourceFunction(false)(id, ...labels);
}
function idResource(id: string, ...labels: Label[]): IdResource {
    return makeIdResourceFunction(true)(id, ...labels);
}
function matchesAny(val: string, ...regexes: RegExp[]) {
    for (let regex of regexes) if (val.match(regex))return true;
    return false;
}

function isStringArray(x: string|string[]): x is string[] {
    return Object.prototype.toString.call(x) === '[object Array]'
        && (<any[]>x).reduce(
            (sofar: boolean, y: any) => sofar && typeof y === 'string', true
        );
}
function mustHaveTextAndAtLeastAttributes(object: any/*todo*/, ...attrs: (string|string[])[]) {
    if (!object['@attributes'])
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
function mustHaveTextAndAttributes(object: any/*todo*/, mustHaveText: boolean, ...attrs: (string|string[])[]) {
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
function getResourceId(attrz: any/*todo*/, key?: string): string {
    if (!attrz) throw new Error("No attributes found!" + (key ? " (" + key + ")" : ""));
    if (attrz['resourceIdentifier'])
        if (!!attrz['psi:resourceIdentifier']) throw new Error("Unexpected psi:resourceIdentifier");
        else return attrz['resourceIdentifier'];
    else if (attrz['psi:resourceIdentifier'])
        if (!!attrz['resourceIdentifier']) throw new Error("Unexpected resourceIdentifier");
        else return attrz['psi:resourceIdentifier'];
    else throw new Error("No resourceIdentifier could be found: " + JSON.stringify(attrz));
}
function getLanguageForCourt(txt: string): string {
    if (txt.match(/\b(?:court|Appellate)\b/gi))return 'en';
    if (txt.match(/\bAdministrativa|Augstakas\b/gi))return 'lv';
    if (txt.match(/\b(?:Anotato)\b/gi))return 'gr';
    if (txt.match(/\b(?:Audiencia)\b/gi))return 'sp';
    else    return 'nl';
}
function idResourceWithOriginal(id: string, originalId: string): IdResource {
    const o: IdResource = idResource(id);
    o.originalIdentifier = originalId;
    return o;
}
function refineMetadata(rdf: any, doc: any) {//TODO not any
    if (rdf.abstract) doc.abstract = rdf.abstract;
    rdf.abstract = undefined;

    let o: any; // TODOO not any
    let description = rdf['rdf:Description'];
    if (Object.prototype.toString.call(description) !== '[object Array]') description = [description, {}];
    if (description.length !== 2) throw new Error();
    const a = description[0];
    const b = description[1];
    if (typeof a !== 'object')throw new Error(JSON.stringify(a));
    if (typeof b !== 'object')throw new Error(JSON.stringify(b));
    if (!(a['dcterms:format'] === 'text/xml' && (Object.keys(b).length === 0 || b['dcterms:format'] === 'text/html')))
        throw new Error(a['dcterms:format'] + " and " + b['dcterms:format']);

    o = {};
    Object.keys(a).forEach(k => {
        if (b[k]) {
            switch (k) {
                case 'dcterms:issued':
                    o.issued = a[k];
                    o.htmlIssued = b[k];
                    break;
                case 'dcterms:modified':
                    o.metadataModified = a[k];
                    o.contentModified = b[k];
                    break;
                case 'dcterms:format':
                    break;
                case 'dcterms:publisher':
                    if (!(
                        (Object.prototype.toString.call(a[k]) === '[object Array]') &&
                        a[k].length === 1 &&
                        (Object.prototype.toString.call(b[k]) === '[object Array]') &&
                        b[k].length === 1))
                        throw new Error(" > Expected just 1 resourceIdentifier for publisher: \n" + JSON.stringify(a[k]) + "\n" + JSON.stringify(b[k]));
                    if (a[k][0]['@attributes']['resourceIdentifier'] !== b[k][0]['@attributes']['resourceIdentifier'])
                        o[k] = a[k].concat(b[k]);
                    else o[k] = a[k];
                    break;
                case 'dcterms:identifier':
                    if (!(a[k].match(/^ECLI:/))) throw new Error(JSON.stringify(a[k]));
                    if (!(b[k].match(/^http:\/\//))) throw new Error(JSON.stringify(b[k]));
                    o[k] = a[k];
                    o['owl:sameAs'] = b[k];
                    break;
                default:
                    try {
                        deepEqual(a[k], b[k]);
                        o[k] = a[k];
                    } catch (e) {
                        console.error(k + ":");
                        console.error("\t" + JSON.stringify(a[k]));
                        console.error("\t" + JSON.stringify(b[k]));
                        throw e;
                    }
            }
            b[k] = undefined;
        } else switch (k) {
            case 'dcterms:issued':
                o.issued = a[k];
                break;
            case 'dcterms:modified':
                o.metadataModified = a[k];
                break;
            case 'dcterms:format':
                break;
            case 'dcterms:identifier':
                if (!(a[k].match(/^ECLI:/))) throw new Error(JSON.stringify(a[k]));
                o[k] = a[k];
                break;
            default:
                o[k] = a[k];
        }
    });
    Object.keys(b).forEach(key => {
        if (b[key] !== undefined) switch (key) {
            case 'dcterms:format':
                break;
            default:
                o[key] = b[key]
        }
    });


    if (typeof o !== 'object') throw new Error("Expected meta to be of type 'object'");

    const simpleMappingForStringValue: any/*todo*/ = {
        'dcterms:accessRights': 'accessRights',
        'dcterms:identifier': '_id',
        'owl:sameAs': 'owl:sameAs',
        "metadataModified": "metadataModified",
        "contentModified": "contentModified",
        "issued": "issued",
        "htmlIssued": "htmlIssued",
        "dcterms:language": "language",
        "dcterms:date": "date",
    };
    const simpleMappingForStringArrayValue: any/*todo*/ = {
        "dcterms:hasVersion": "hasVersion",
        "dcterms:replaces": "replaces",
        "dcterms:isReplacedBy": "isReplacedBy",
        "psi:zaaknummer": "zaaknummer",
    };
    Object.keys(o).forEach((k) => {
        if (simpleMappingForStringValue[k])
            doc[simpleMappingForStringValue[k]] = throwIfNotString(o[k], k);
        else if (simpleMappingForStringArrayValue[k] && o[k]) {
            if (Object.prototype.toString.call(o[k]) !== '[object Array]')
                throw new Error("Expected an array for " + k + ", instead got " + JSON.stringify(o[k]));
            doc[simpleMappingForStringArrayValue[k]] = o[k]
                .map((s: any) => throwIfNotString(s, k, JSON.stringify(o[k])));
        } else switch (k) {
            case '@attributes':
                break;
            case 'dcterms:abstract':
                if (!o[k]['@attributes'] && o[k]['@attributes']['resourceIdentifier'] === "../../rs:inhoudsindicatie")
                    throw new Error('Expected different ' + k);
                break;
            case 'dcterms:publisher':
                doc[k.replace(REGEX_DCTERMS, '')] = o[k].map((publ: any) => {
                    mustHaveTextAndAttributes(publ, true, 'resourceIdentifier');
                    return idResource(
                        getResourceId(publ['@attributes'], o['dcterms:identifier'] + ": " + k),
                        makeLabel(publ['#text'], 'nl'));
                });
                break;
            case 'dcterms:subject':
                doc[k.replace(REGEX_DCTERMS, '')] = o[k].map((subj: any) => {
                    mustHaveTextAndAttributes(subj, true, "rdfs:label", "resourceIdentifier");
                    return idResource(
                        getResourceId(subj['@attributes'], o['dcterms:identifier'] + ": " + k),
                        makeLabel(subj['#text'], 'nl')
                    );
                });
                break;
            case 'dcterms:coverage':
                if (o[k] !== 'NL') throw new Error("Expected coverage to be NL");
                doc[k.replace(REGEX_DCTERMS, '')] = 'nl';
                break;
            case 'dcterms:title':
                mustHaveTextAndAttributes(o[k], true, "rdf:language");
                doc[k.replace(REGEX_DCTERMS, '')] = {
                    '@value': o[k]['#text'],
                    '@language': o[k]['@attributes']['rdf:language'],
                };
                break;
            case 'dcterms:temporal':
                // TODO verify   e.g.
                // ECLI:NL:RBZWB:2016:1440
                // ECLI:NL:RBZWB:2016:1473
                // {
                //     "@attributes": {"rdfs:label": "Periode"},
                //     "start": {"@attributes": {"rdfs:label": "van"}, "#text": "2009"},
                //     "end": {"@attributes": {"rdfs:label": "tot"}, "#text": "2013"}
                // };
                doc[k.replace(REGEX_DCTERMS, '')] = {
                    'startDate': o[k].start['#text'],
                    'endDate': o[k].end['#text']
                };
                for (let temporField of Object.keys(o[k]))
                    switch (temporField) {
                        case "start":
                        case "end":
                        case "#text":
                            break;
                        case "@attributes":
                            let attrs = o[k][temporField];
                            for (let att of Object.keys(attrs)) {
                                switch (att) {
                                    case 'rdfs:label':
                                        break;
                                    default:
                                        throw new Error("Unexpected field " + temporField + " in " + k + ": " + JSON.stringify(o[k][temporField]));
                                }
                            }
                            break;
                        default:
                            throw new Error("Unexpected field " + temporField + " in " + k + ": " + JSON.stringify(o[k][temporField]));

                    }
                break;
            case 'dcterms:creator':
                const creatorAttrs = o[k]['@attributes'];
                if (!creatorAttrs) throw new Error(o['dcterms:identfier'] + ": Expected attributes for " + k);
                mustHaveTextAndAttributes(o[k], true, "rdfs:label", ["resourceIdentifier", "psi:resourceIdentifier"], "scheme");
                const idFromRechtspraakNl = getResourceId(creatorAttrs);
                if (!idFromRechtspraakNl) throw new Error("No resource identifier found for " + k + ": " + JSON.stringify(o[k]));
                const txt = o[k]['#text'].trim();
                const lang = getLanguageForCourt(txt);

                let lawreaderId = idFromRechtspraakNl;

                if (idFromRechtspraakNl.match(REGEX_PSI_RECHTSPRAAK)) {
                    lawreaderId = HTTPS_RECHTSPRAAK_LAWREADER_VOCAB + k + "/" +
                        encodeURI(idFromRechtspraakNl.replace(REGEX_PSI_RECHTSPRAAK, ""));
                } else if (idFromRechtspraakNl.match(REGEX_STANDAARDEN_OVERHEID)) {
                } else {
                    console.warn("How to handle creator URI " + idFromRechtspraakNl + "?");
                }
                doc['creator'] = idResource(
                    lawreaderId, makeLabel(txt, lang)
                );
                doc['creator'].scheme = o[k]['@attributes'].scheme;
                doc['creator'].originalIdentifier = idFromRechtspraakNl;
                break;
            case 'dcterms:spatial':
                const spat = throwIfNotString(o[k], k);
                doc[k.replace(REGEX_DCTERMS, '')] = idResourceNoUriCheck(encodeURI(spat), makeLabel(spat, 'nl'));
                break;
            case 'dcterms:relation':
                doc['relation'] = o[k].map((rel: any) => {
                    const attrs = ["rdfs:label", ["ecli:resourceIdentifier"/*, "bwb:resourceIdentifier"*/],
                        "psi:type", "psi:aanleg"];
                    const rattrs = rel['@attributes'];
                    if (!!rattrs && !!rattrs['psi:gevolg']) attrs.push('psi:gevolg');
                    mustHaveTextAndAttributes(rel, true, ...attrs);

                    const id = rattrs["ecli:resourceIdentifier"];
                    const resours = idResource(id, makeLabel(rel['#text'], 'nl'));

                    const aanlegUri = rattrs["psi:aanleg"];
                    if (!aanlegUri.match(/^http:\/\/psi\.rechtspraak\.nl\//))
                        throw new Error("Expected ");
                    resours.aanleg = idResourceWithOriginal(
                        HTTPS_RECHTSPRAAK_LAWREADER_VOCAB + k + "/" +
                        encodeURI(aanlegUri.replace(/^http:\/\/psi\.rechtspraak\.nl\//, "")),
                        aanlegUri
                    );
                    const typeUri = rattrs["psi:type"];
                    resours.type = idResourceWithOriginal(
                        HTTPS_RECHTSPRAAK_LAWREADER_VOCAB + k + "/" +
                        encodeURI(typeUri.replace(/^http:\/\/psi\.rechtspraak\.nl\//, "")),
                        typeUri
                    );
                    if (rattrs['psi:gevolg']) {
                        const gevolgUri = rattrs['psi:gevolg'];
                        resours.gevolg = idResourceWithOriginal(
                            HTTPS_RECHTSPRAAK_LAWREADER_VOCAB + k + "/" +
                            encodeURI(gevolgUri.replace(/^http:\/\/psi\.rechtspraak\.nl\//, "")),
                            gevolgUri
                        );
                    }
                    return resours;
                });
                break;
            case 'dcterms:references':
                doc['references'] = o[k].map((ref: any) => {
                    mustHaveTextAndAttributes(ref, true, "rdfs:label", ["cvdr:resourceIdentifier", "bwb:resourceIdentifier"]);
                    const cvdrVal = ref['@attributes']["cvdr:resourceIdentifier"];
                    const bwbVal = ref['@attributes']["bwb:resourceIdentifier"];
                    const label = makeLabel(ref['#text'], 'nl');
                    if (bwbVal) {
                        if (cvdrVal)throw new Error("Expected only one identifier");
                        const id = "https://id.lawreader.nl/juriconnect/" + encodeURI(bwbVal.trim().replace(/\s/g, '_'));
                        if (!bwbVal.match(REGEX_JURICONNECT))throw new Error("Expected Juriconnect: " + bwbVal);

                        const resour = idResource(id, label);

                        resour.jdi = bwbVal;
                        return resour;
                    } else if (cvdrVal) {
                        const id = "https://id.lawreader.nl/cvdr/" + encodeURI(cvdrVal);
                        if (!cvdrVal.match(REGEX_CVDR))throw new Error("Expected CVDR: " + cvdrVal);
                        const resour = idResource(id, label);
                        resour.cvdr = cvdrVal;
                        return resour;
                    }
                });
                break;
            case 'dcterms:type':
                if (o[k]['@attributes']["resourceIdentifier"] === ""
                    && o[k]['#text'] === "Uitspraak")
                    o[k]['@attributes']["resourceIdentifier"] = 'http://psi.rechtspraak.nl/uitspraak'; // e.g. ECLI:NL:RBMNE:2016:1637 todo notify rechtspraak

                mustHaveTextAndAttributes(o[k], true, "rdf:language", "resourceIdentifier");
                doc[k.replace(REGEX_DCTERMS, '')] = getResourceId(o[k]["@attributes"], k);
                break;
            case 'psi:procedure':
                doc['procedure'] = o[k].map((proc: any) => {
                    mustHaveTextAndAttributes(proc, true, "rdf:language", "rdfs:label", "resourceIdentifier");
                    const proclang = proc['@attributes']["rdf:language"];
                    if (!proclang) throw new Error("Expected language: " + JSON.stringify(proc));
                    return idResource(
                        getResourceId(proc['@attributes'], o['dcterms:identifier'] + ": " + k),
                        makeLabel(proc['#text'].trim(), proclang));
                });
                break;
            default:
                if (!!o[k])
                    throw new Error(o['dcterms:identifier'] + ": Did not know how to handle metadata item " + k + " (" + JSON.stringify(o[k]) + ")");
            // obj[k] = o[k];
        }
    });
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
function textValueWithCommonLabel(obj: any, label: (string|string[]), keyName?: string) {
    let thr;
    if (isStringArray(label)) {
        thr = label.reduce((cum, lab) => {
            return cum && !(obj['@attributes'] && lab === obj['@attributes']['rdfs:label'])
        }, true);
    } else
        thr = !obj['@attributes'] || obj['@attributes']['rdfs:label'] !== label;
    if (thr)
        throw new Error("Expected " + (keyName ? keyName : JSON.stringify(obj)) + " to look different than " + JSON.stringify(obj));
    return obj['#text'];
}

function setTextValueWithCommonLabel(obj: any, key: string, label: (string|string[])) {
    if (!obj[key]) return;
    mustHaveTextAndAttributes(obj[key], true, 'rdfs:label');
    obj[key] = textValueWithCommonLabel(obj[key], label, key);
}
function forceToArray(possibleList: any): any[] {
    if (possibleList === null || possibleList === undefined) return [];
    else if (Object.prototype.toString.call(possibleList) === '[object Array]') return possibleList;
    else return [possibleList];
}
function forcePropertyToArray(obj: any, propname: string): void {
    if (!!obj[propname])
        obj[propname] = forceToArray(obj[propname]);
}
/**
 * Changes XML to JSON
 * @param xml
 * @param depth node depth
 * @returns {{}}
 */
export function xmlToJson(xml: Node, depth: number = 0) {
    // Create the return object
    let obj: any = {}; // TODO formalize type?

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
                const attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType === 3) {
        if (xml.nodeValue && xml.nodeValue.trim().length > 0) { // text
            obj = xml.nodeValue;
        } else {
            obj = undefined;
        }
    }

    // do children
    if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
            const item = xml.childNodes.item(i);
            if (item.nodeType !== 7) { // Processing Instruction
                const nodeName: string = item.nodeName;
                //if (nodeName.match(/inhoudsindicatie/))console.log(depth, xml.nodeName);
                if (depth === 1 && nodeName.match(/inhoudsindicatie/) && xml.nodeName === 'open-rechtspraak') {
                    const value: string = item.textContent.trim().replace(/\s\s+/g, ' ');
                    if (value.length > 1 && value !== '-') {
                        obj.abstract = {
                            abstractXml: '<?xml version="1.0" encoding="utf-8"?>' + item.toString(),
                            "@value": value
                        };
                    }
                } else {
                    if (nodeName.match(/uitspraak|conclusie/)) {
                        //TODO
                        // obj.innerText = item.textContent.trim().replace(/\s\s+/g, ' ');
                        // const {innerHtml, toc} =  convertToHtml(item);
                        // if (!innerHtml)
                        //     throw new Error("Expected innerHTML to be set");
                        // obj.innerHtml = innerHtml;
                        // obj.hasPart = toc;
                    } else {
                        if (typeof(obj[nodeName]) == "undefined") {
                            obj[nodeName] = xmlToJson(item, depth + 1);
                        } else {
                            if (typeof(obj[nodeName].push) == "undefined") {
                                const old = obj[nodeName];
                                obj[nodeName] = [];
                                if (!(old && old.trim && old.trim().length <= 0))
                                    obj[nodeName].push(old);
                            }
                            if (!(item && item.nodeType === 3 && item.nodeValue.trim().length <= 0)) {
                                //if(item.nodeValue) console.log(item.nodeType, item.nodeValue.trim().length, item.nodeValue);
                                obj[nodeName].push(xmlToJson(item, depth + 1));
                            }
                        }
                    }
                }
            }
        }
        if (obj['#text']) {
            if (obj['#text'].push) obj['#text'] = obj['#text'].join('');
            if (obj['#text'].length <= 0) obj['#text'] = undefined;
        }
    }

    ////
    // Specific interventions
    ////

    if (obj != undefined) {
        if (depth === 0 && obj['open-rechtspraak']) {
            if (
                Object.keys(obj).length > 2
                ||
                (Object.keys(obj).length === 2 && !!obj['#text'])
            ) {
                console.error(Object.keys(obj));
                throw new Error("Expected 1 key in 'open-rechtspraak'");
            }
            obj = obj['open-rechtspraak'];
        }
        if (depth === 3) {
            forcePropertyToArray(obj, 'psi:procedure');
            forcePropertyToArray(obj, 'dcterms:references');
            forcePropertyToArray(obj, 'dcterms:relation');
            forcePropertyToArray(obj, 'dcterms:isReplacedBy');
            forcePropertyToArray(obj, 'dcterms:replaces');
            if (obj['dcterms:replaces'])
                obj['dcterms:replaces'] = obj['dcterms:replaces'].map(
                    (replaces: any) => textValueWithCommonLabel(replaces, "Vervangt")
                );

            setTextValueWithCommonLabel(obj, 'dcterms:issued', 'Publicatiedatum');
            setTextValueWithCommonLabel(obj, 'dcterms:spatial', 'Zittingsplaats');
            setTextValueWithCommonLabel(obj, 'dcterms:date', ['Uitspraakdatum', 'Datum genomen']);

            forcePropertyToArray(obj, 'psi:zaaknummer');
            if (!!obj['psi:zaaknummer'])
                obj['psi:zaaknummer'] = obj['psi:zaaknummer'].map(
                    (z: any) => textValueWithCommonLabel(z, 'Zaaknr')
                );

            if (obj['dcterms:subject']) obj['dcterms:subject'] = forceToArray(obj['dcterms:subject']);
            // if (obj['psi:zaaknummer']) {
            // TODO parse in app
            // obj['psi:zaaknummer'] = obj['psi:zaaknummer'].split(/[,;]|(?: en )/).map(s=>s.trim()).filter(s=>s !== '');
            // obj['psi:zaaknummer'].filter(s=>!s.match(/^(?:[A-Z]+\s*)?[0-9]+\/[0-9-]+(?:\s[A-Z])?$/)).map(s =>
            //     console.error(obj['dcterms:identifier'] + ": Possible multiple values '" + s + "'")
            // )
            // }
            if (obj['dcterms:hasVersion']) {
                mustHaveTextAndAttributes(obj['dcterms:hasVersion'], false, 'rdfs:label', 'resourceIdentifier');
                let hasVersionList = obj['dcterms:hasVersion']["rdf:list"];
                if (!!hasVersionList)
                    obj['dcterms:hasVersion'] = forceToArray(hasVersionList['rdf:li']).map(s => throwIfNotString(s, 'dcterms:hasVersion'));
            }

            if (obj['dcterms:publisher'])
                obj['dcterms:publisher'] = forceToArray(obj['dcterms:publisher']);
        }


        if (Object.keys(obj).length === 1 && !!obj['#text']) obj = obj['#text'];
    }

    ////
    //
    ////

    if (typeof obj === 'object' && obj['@attributes'])
        if (Object.keys(obj['@attributes']).filter(k => !!obj['@attributes'][k]).length <= 0)
            obj['@attributes'] = undefined;
    return obj;
}

export function toJsonLd(xml: Document): any {
    const doc = xmlToJson(
        xml, 0
    );

    const rdf = doc['rdf:RDF'];
    if (!rdf) throw new Error('Expected rdf node to exist');
    if (!rdf['rdf:Description']) throw new Error('Expected rdf:Description node to exist');
    doc['rdf:RDF'] = undefined;

    refineMetadata(rdf, doc);

    if (doc['language'] && doc['language'] !== 'nl') throw new Error("Expected language to be 'nl' ");
    if (doc['coverage'] && doc['coverage'] !== 'nl') throw new Error("Expected coverage to be 'nl' ");

    doc.corpus = 'Rechtspraak.nl';
    doc.couchDbUpdated = new Date().toISOString();

    return doc;
}

export function toJsonLdFromXmlString(xmlString: string) {
    let domParser: DOMParser = new DOMParser();
    let xml = domParser.parseFromString(xmlString);
    return toJsonLd(xml);
}

export default toJsonLdFromXmlString;
