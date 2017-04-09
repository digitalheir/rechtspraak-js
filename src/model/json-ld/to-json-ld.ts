import {DOMParser} from "xmldom";

import {Abstract, RechtspraakMetadata} from "../rechtspraak_metadata";
import {isStringArray, mustHaveTextAndAttributes, throwIfNotString} from "../../util/validations";
import refineMetadata from "../convert-to-typed";

// import convertToHtml from "./to-html";


function textValueWithCommonLabel(obj: any, label: (string | string[]), keyName?: string) {
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

function setTextValueWithCommonLabel(obj: any, key: string, label: (string | string[])) {
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

function forEach(nodes: NodeList, f: (s: Node) => any) {
    for (let i = 0; i < nodes.length; i++) {
        let s2 = nodes.item(i);
        if (s2 === null)throw new Error();
        else f(s2);
    }
}

function extractAbstract(item: Node): (Abstract | undefined) {
    if (item.textContent !== null) {
        const value: string = item.textContent.trim().replace(/\s\s+/g, ' ');
        if (value.length > 1 && value !== '-') return {
            abstractXml: '<?xml version="1.0" encoding="utf-8"?>' + item.toString(),
            "@value": value
        };
    }
}

function flattenOutRootElement(depth: number, obj: any) {
    if (depth === 0 && obj['open-rechtspraak']) {
        if (Object.keys(obj).length > 2
            ||
            (Object.keys(obj).length === 2 && !!obj['#text'])
        ) {
            console.error(Object.keys(obj));
            throw new Error("Expected 1 key in 'open-rechtspraak'");
        }
        obj = obj['open-rechtspraak'];
    }
    return obj;
}

/**
 * Changes XML to JSON
 * @param parent
 * @param depth node depth
 * @returns {{}}
 */
export function xmlToJson(parent: Node, depth: number = 0): any {
    // Create the return object
    let obj: any = {}; // TODO formalize type?

    if (parent.nodeType == 1) { // element
        // do attributes
        if (parent.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < parent.attributes.length; j++) {
                const attribute = parent.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (parent.nodeType === 3) {
        if (parent.nodeValue && parent.nodeValue.trim().length > 0) { // text
            obj = parent.nodeValue;
        } else {
            obj = undefined;
        }
    }

    if (parent.hasChildNodes()) {
        forEach(parent.childNodes, (item) => {
            if (item.nodeType !== 7) { // Processing Instruction
                const childNodeName: string = item.nodeName;
                //if (nodeName.match(/inhoudsindicatie/))console.log(depth, xml.nodeName);
                if (depth === 1
                    && childNodeName==='inhoudsindicatie'
                    && parent.nodeName === 'open-rechtspraak') {
                    obj.abstract = extractAbstract(item);
                } else {
                    if (childNodeName.match(/uitspraak|conclusie/)) {
                        //TODO
                        // obj.innerText = item.textContent.trim().replace(/\s\s+/g, ' ');
                        // const {innerHtml, toc} =  convertToHtml(item);
                        // if (!innerHtml)
                        //     throw new Error("Expected innerHTML to be set");
                        // obj.innerHtml = innerHtml;
                        // obj.hasPart = toc;
                    } else {
                        if (typeof(obj[childNodeName]) === "undefined") {
                            // child doesn't exist yet
                            obj[childNodeName] = xmlToJson(item, depth + 1);
                        } else {
                            // Add child to array
                            if (typeof(obj[childNodeName].push) === "undefined") {
                                const old = obj[childNodeName];
                                obj[childNodeName] = [];
                                if (!(old && old.trim && old.trim().length <= 0)) obj[childNodeName].push(old);
                            }
                            if (item.nodeValue === null) throw new Error("Expected nodeValue to be set");
                            if (!(item && item.nodeType === 3 && item.nodeValue.trim().length <= 0)) {
                                obj[childNodeName].push(xmlToJson(item, depth + 1));
                            }
                        }
                    }
                }
            }
        });
        if (obj['#text']) {
            if (obj['#text'].push) obj['#text'] = obj['#text'].join('');
            if (obj['#text'].length <= 0) obj['#text'] = undefined;
        }
    }

    ////
    // Specific interventions
    ////

    if (obj != undefined) {
        obj = flattenOutRootElement(depth, obj);


        if (depth === 3) {
            forcePropertyToArray(obj, 'psi:procedure');
            forcePropertyToArray(obj, 'dcterms:references');
            forcePropertyToArray(obj, 'dcterms:relation');
            forcePropertyToArray(obj, 'dcterms:isReplacedBy');
            forcePropertyToArray(obj, 'dcterms:replaces');
            if (obj['dcterms:replaces'])  obj['dcterms:replaces'] = obj['dcterms:replaces'].map(
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

export function toJsonLd(xml: Document): RechtspraakMetadata {
    const doc = xmlToJson(
        xml, 0
    );


    const rdf = doc['rdf:RDF'];
    if (!rdf) throw new Error('Expected rdf node to exist');
    if (!rdf['rdf:Description']) throw new Error('Expected rdf:Description node to exist');
    doc['rdf:RDF'] = undefined;

    doc = refineMetadata(rdf, doc);

    if (doc['language'] && doc['language'] !== 'nl') throw new Error("Expected language to be 'nl' ");
    if (doc['coverage'] && doc['coverage'] !== 'nl') throw new Error("Expected coverage to be 'nl' ");

    // doc.corpus = 'Rechtspraak.nl';
    //  doc.couchDbUpdated = new Date().toISOString();

    return doc;
}

export function toJsonLdFromXmlString(xmlString: string): RechtspraakMetadata {
    let domParser: DOMParser = new DOMParser();
    let xml = domParser.parseFromString(xmlString);
    return toJsonLd(xml);
}

export default toJsonLdFromXmlString;
