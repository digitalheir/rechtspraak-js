import {
    HTTPS_RECHTSPRAAK_LAWREADER_VOCAB, mustHaveTextAndAttributes, REGEX_PSI_RECHTSPRAAK,
    REGEX_STANDAARDEN_OVERHEID, throwIfNotString, throwIfNotUriWithProtocol
} from "../../util/validations";
import {Creator, Procedure} from "../rechtspraak_metadata";
import {getResourceId} from "../convert-to-typed";
import {idResource} from "./standard-resource-object";
import {makeLabel} from "./label";


export function getProcedure(procedure: any[], id?: string): Procedure[] {
    return procedure.map((proc: any) => {
        mustHaveTextAndAttributes(proc, true, "rdf:language", "rdfs:label", "resourceIdentifier");
        const language:string = proc['@attributes']["rdf:language"];
        if (!language) throw new Error("Expected language: " + JSON.stringify(proc));
        return idResource(
            getResourceId(proc['@attributes'], id + ": procedure"),
            makeLabel(proc['#text'].trim(), language.trim())
        );
    });
}