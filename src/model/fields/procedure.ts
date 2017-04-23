import {
    mustHaveTextAndAttributes, throwUnexpectedUri, unexpectedUri
} from "../../util/validations";
import {getResourceId} from "../convert-to-typed";
import {idResource} from "./standard-resource-object";
import {makeLabel} from "./label";

export type Procedure =
    "eersteAanlegMeervoudig"
    | "eersteAanlegEnkelvoudig"
    | "voorlopigeVoorziening"
    ;

export function getSingleProcedure(proc: any, id?: string): Procedure {
    mustHaveTextAndAttributes(proc, true, "rdf:language", "rdfs:label", "resourceIdentifier");
    const language: string = proc["@attributes"]["rdf:language"];
    if (!language) throw new Error("Expected language: " + JSON.stringify(proc));
    const resourceId = getResourceId(proc["@attributes"], id + ": procedure");
    switch (resourceId) {
        case "http://psi.rechtspraak.nl/procedure#eersteAanlegMeervoudig":
            return "eersteAanlegMeervoudig";
        case "http://psi.rechtspraak.nl/procedure#eersteAanlegEnkelvoudig":
            return "eersteAanlegEnkelvoudig";
        case "http://psi.rechtspraak.nl/procedure#voorlopigeVoorziening":
            return "voorlopigeVoorziening";
        default:
            throw new Error(unexpectedUri("procedure", resourceId, id));
    }
}

export function getProcedure(procedure: any[], id?: string): Procedure[] | undefined {
    if (!procedure) return undefined;
    else return procedure.map(p => getSingleProcedure(p, id));
}