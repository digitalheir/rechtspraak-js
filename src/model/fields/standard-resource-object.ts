import {Label} from "./label";
import {matchesAny, REGEX_HTTPS, REGEX_URI} from "../../util/validations";

export interface StandardResourceObject {
    "@id": string;
    "rdfs:label"?: Label[];
    "originalIdentifier"?: string;
    "schemeIdentifier"?: string;
    "additionalIdentifier"?: string;
}


export function idResourceNoUriCheck(id: string, ...labels: Label[]): StandardResourceObject {
    return makeIdResourceFunction(false)(id, ...labels);
}
export function idResource(id: string, ...labels: Label[]): StandardResourceObject {
    return makeIdResourceFunction(true)(id, ...labels);
}

function makeIdResourceFunction(checkUri: boolean): (id: string, ...labels: Label[]) => StandardResourceObject {
    return function (id: string, ...labels: Label[]): StandardResourceObject {
        if (checkUri && !matchesAny(id, REGEX_HTTPS, REGEX_URI))
            throw new Error("Unexpected resource identifier: " + id);

        const obj: StandardResourceObject = {
            '@id': id,
        };
        if (!!labels && labels.length > 0)
            obj['rdfs:label'] = labels;
        return obj;
    };
}