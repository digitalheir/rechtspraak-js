import {mustHaveTextAndAttributes, unexpectedUri} from "../../util/validations";
import {getResourceId} from "../convert-to-typed";
import {makeLabel} from "./label";
import {idResource, StandardResourceObject} from "./standard-resource-object";

export type Subject = "bestuursrecht_belastingrecht"
    | "bestuursrecht"
    ;

export function getSubject(sub: any[], id?: string): Subject[] | undefined {
    if (!sub) return undefined;
    return sub.map((subj: any): Subject => {
        mustHaveTextAndAttributes(subj, true, "rdfs:label", "resourceIdentifier");
        const resourceId = getResourceId(subj["@attributes"], id + ": subject");

        switch (resourceId) {
            case "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_belastingrecht":
                return "bestuursrecht_belastingrecht";
            case "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht":
                return "bestuursrecht";
            default:
                throw new Error(unexpectedUri("subject", resourceId, id));
        }
    });
}