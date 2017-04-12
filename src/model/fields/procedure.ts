import {
    mustHaveTextAndAttributes
} from "../../util/validations";
import {Procedure} from "../rechtspraak_metadata";
import {getResourceId} from "../convert-to-typed";
import {idResource} from "./standard-resource-object";
import {makeLabel} from "./label";


export function getProcedure(procedure: any[], id?: string): Procedure[] | undefined {
    if (!procedure) return undefined;
    else return procedure.map((proc: any) => {
        mustHaveTextAndAttributes(proc, true, "rdf:language", "rdfs:label", "resourceIdentifier");
        const language: string = proc['@attributes']["rdf:language"];
        if (!language) throw new Error("Expected language: " + JSON.stringify(proc));
        return idResource(
            getResourceId(proc['@attributes'], id + ": procedure"),
            makeLabel(proc['#text'].trim(), language.trim())
        );
    });
}