import {mustHaveTextAndAttributes} from "../../util/validations";
import {LabelWithLanguage} from "./label";

export function getTitle(t: any, id?:string): LabelWithLanguage {
    mustHaveTextAndAttributes(t, true, "rdf:language");
    return {
        '@value': t['#text'].trim(),
        '@language': t['@attributes']['rdf:language'].trim(),
    };
}