import {Subject} from "../rechtspraak_metadata";
import {mustHaveTextAndAttributes} from "../../util/validations";
import {getResourceId, idResource} from "../convert-to-typed";
import {makeLabel} from "./label";

export function getSubject(sub:any[], id?:string):Subject[] {
    return sub.map((subj: any) => {
        mustHaveTextAndAttributes(subj, true, "rdfs:label", "resourceIdentifier");
        return idResource(
            getResourceId(subj['@attributes'], id + ": subject"),
            makeLabel(subj['#text'], 'nl')
        );
    });
}