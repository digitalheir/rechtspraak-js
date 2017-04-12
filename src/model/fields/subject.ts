import {mustHaveTextAndAttributes} from "../../util/validations";
import {getResourceId} from "../convert-to-typed";
import {makeLabel} from "./label";
import {idResource, StandardResourceObject} from "./standard-resource-object";

export interface Subject extends StandardResourceObject {
}
export function getSubject(sub: any[], id?: string): Subject[] | undefined {
    if (!sub) return undefined;
    return sub.map((subj: any) => {
        mustHaveTextAndAttributes(subj, true, "rdfs:label", "resourceIdentifier");
        return idResource(
            getResourceId(subj['@attributes'], id + ": subject"),
            makeLabel(subj['#text'], 'nl')
        );
    });
}