import {
    mustHaveTextAndAttributes, REGEX_CVDR, REGEX_JURICONNECT,
    throwIfNotExactlyXAreTruthy
} from "../../util/validations";
import {idResource, StandardResourceObject} from "./standard-resource-object";
import {Label, makeLabel} from "./label";


export interface Reference extends StandardResourceObject {
    "jdi"?: string;
    "cvdr"?: string;
}

function getBwbRef(bwbVal: any, label: Label): Reference {
    const id = "https://id.lawreader.nl/juriconnect/" + encodeURI(bwbVal.trim().replace(/\s/g, '_'));
    if (!bwbVal.match(REGEX_JURICONNECT))throw new Error("Expected Juriconnect: " + bwbVal);

    const resour: Reference = idResource(id, label);

    resour.jdi = bwbVal;
    return resour;
}

function getCvdrRef(cvdrVal: any, label: Label): Reference {
    const id = "https://id.lawreader.nl/cvdr/" + encodeURI(cvdrVal);
    if (!cvdrVal.match(REGEX_CVDR))throw new Error("Expected CVDR: " + cvdrVal);
    const resour: Reference = idResource(id, label);
    resour.cvdr = cvdrVal;
    return resour;
}

export function getReferences(refs: any[], id?: string): Reference[] | undefined {
    return refs ? refs.map((ref: any) => {
        mustHaveTextAndAttributes(ref, true, "rdfs:label", ["cvdr:resourceIdentifier", "bwb:resourceIdentifier"]);

        const cvdrVal = ref['@attributes']["cvdr:resourceIdentifier"];
        const bwbVal = ref['@attributes']["bwb:resourceIdentifier"];

        throwIfNotExactlyXAreTruthy(1, cvdrVal, bwbVal);

        const label = makeLabel(ref['#text'], 'nl');

        if (bwbVal) return getBwbRef(bwbVal, label);
        else if (cvdrVal) return getCvdrRef(cvdrVal, label);
        else throw new Error(id + ": Could not handle ref " + JSON.stringify(ref));
    }) : undefined;
}