import {toJsonLd as t1, toJsonLdFromXmlString as t2} from './json-ld/to-json-ld'
import {documentSchema as docSchema} from './json-ld/schema'

export function toJsonLd(doc: Document): any {
    return t1(doc);
}

export function toJsonLdFromXmlString(xml: string): any {
    return t2(xml);
}

export const documentSchema = docSchema;

export default {
    toJsonLd,
    toJsonLdFromXmlString,
    documentSchema
}