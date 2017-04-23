import {mustHaveTextAndAttributes, unexpectedUri} from "../../util/validations";
import {getResourceId} from "../convert-to-typed";
import {makeLabel} from "./label";
import {idResource, StandardResourceObject} from "./standard-resource-object";

export type Subject =
    "rechtsgebied#bestuursrecht_belastingrecht"
    | "rechtsgebied#bestuursrecht"
    | "rechtsgebied#bestuursrecht_vreemdelingenrecht"
    | "rechtsgebied#bestuursrecht_socialezekerheidsrecht"
    | "rechtsgebied#civielRecht"
    | "rechtsgebied#bestuursrecht_europeesBestuursrecht"
    | "rechtsgebied#bestuursrecht_bestuursstrafrecht"
    ;

// todo check if label is correct...
export function getSubject(sub: any[], id?: string): Subject[] | undefined {
    if (!sub) return undefined;
    return sub.map((subj: any): Subject => {
        mustHaveTextAndAttributes(subj, true, "rdfs:label", "resourceIdentifier");
        const resourceId = getResourceId(subj["@attributes"], id + ": subject");

        switch (resourceId) {
            case "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_belastingrecht":
                return "rechtsgebied#bestuursrecht_belastingrecht";
            case "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht":
                return "rechtsgebied#bestuursrecht";
            case "http://psi.rechtspraak.nl/rechtsgebied#rechtsgebied#bestuursrecht_vreemdelingenrecht":
                return "rechtsgebied#bestuursrecht_vreemdelingenrecht";
            case "http://psi.rechtspraak.nl/rechtsgebied#rechtsgebied#bestuursrecht_socialezekerheidsrecht":
                return "rechtsgebied#bestuursrecht_socialezekerheidsrecht";
            case "http://psi.rechtspraak.nl/rechtsgebied#rechtsgebied#civielRecht":
                return "rechtsgebied#civielRecht";
            case "http://psi.rechtspraak.nl/rechtsgebied#rechtsgebied#bestuursrecht_europeesBestuursrecht":
                return "rechtsgebied#bestuursrecht_europeesBestuursrecht";
            case "http://psi.rechtspraak.nl/rechtsgebied#rechtsgebied#bestuursrecht_bestuursstrafrecht":
                return "rechtsgebied#bestuursrecht_bestuursstrafrecht";
            default:
                throw new Error(unexpectedUri("subject", resourceId, subj["#text"].trim(), id));
        }
    });
}