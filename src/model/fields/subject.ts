import {mustHaveTextAndAttributes, throwIfDivergentLabel, unexpectedUri} from "../../util/validations";
import {getResourceId} from "../convert-to-typed";
import {makeLabel} from "./label";
import {idResource, StandardResourceObject} from "./standard-resource-object";
import {_context, subjectTypes} from "../json-ld/context";

export type Subject = keyof typeof subjectTypes;


function isSubject(x: string): x is Subject {
    return subjectTypes.hasOwnProperty(x);
}
const getSingleSubject = (subj: any, id?: string): Subject => {
    mustHaveTextAndAttributes(subj, true, "rdfs:label", "resourceIdentifier");
    const resourceId = getResourceId(subj["@attributes"], id + ": subject")
        .replace(/^http:\/\/psi\.rechtspraak(\.nl)?\//, "");

    const label = subj["#text"].trim();
    if (!isSubject(resourceId))
        throw new Error(unexpectedUri("subject", resourceId, label, id));
    else {
        const contextLabel: string = _context[resourceId]["rdfs:label"][0]["@value"];
        throwIfDivergentLabel(resourceId, label, contextLabel);
        return resourceId;
    }
};

export function getSubject(sub: any[], id?: string): Subject[] | undefined {
    if (!sub) return undefined;

    return sub.map(sub => getSingleSubject(sub, id));
}