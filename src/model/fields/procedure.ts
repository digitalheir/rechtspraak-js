import {
    mustHaveTextAndAttributes, throwIfDivergentLabel, unexpectedUri
} from "../../util/validations";
import {getResourceId} from "../convert-to-typed";
import {JsonLdProcedure, procedureTypes} from "../json-ld/context/procedureTypes";

export type Procedure = keyof typeof procedureTypes;

// Normalization of type:
const uriMappingProcedure: { [k: string]: Procedure } = {
    "procedure#\ntussenbeschikking": "procedure#tussenbeschikking",
    "procedure#\ntussenbeschikking\n": "procedure#tussenbeschikking"
};

// todo check if label in context is correct ... ;)

function isProcedure(x: string): x is Procedure {
    return procedureTypes.hasOwnProperty(x);
}

function getProcedureId(procedureId: string): Procedure | undefined {
    if (uriMappingProcedure.hasOwnProperty(procedureId))
        return uriMappingProcedure[procedureId];
    else if (isProcedure(procedureId))
        return procedureId;
}

export function getSingleProcedure(proc: any, id?: string): Procedure {
    mustHaveTextAndAttributes(proc, true, "rdf:language", "rdfs:label", "resourceIdentifier");
    const language: string = proc["@attributes"]["rdf:language"];
    if (!language) throw new Error("Expected language: " + JSON.stringify(proc));
    const resourceId = getResourceId(proc["@attributes"], id + ": procedure");
    const procedureId = resourceId.replace("http://psi.rechtspraak.nl/", "");

    const label = proc["#text"].trim();
    const procedure = getProcedureId(procedureId);
    if (procedure) {
        const contextLabel: string = procedureTypes[procedure]["rdfs:label"][0]["@value"];
        throwIfDivergentLabel(procedure, label, contextLabel);

        return procedure;
    } else throw new Error(unexpectedUri("procedure", resourceId, label, id));
}

export function getProcedure(procedure: any[], id?: string): Procedure[] | undefined {
    if (!procedure) return undefined;
    else return procedure.map(p => getSingleProcedure(p, id));
}