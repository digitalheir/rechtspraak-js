import {UriWithProtocol} from "../rechtspraak_metadata";
import {getResourceId} from "../convert-to-typed";
import {mustHaveTextAndAttributes, REGEX_DCTERMS} from "../../util/validations";

export function getType(t:any, _id?:string):UriWithProtocol{
    if (t['@attributes']["resourceIdentifier"] === "" && t['#text'] === "Uitspraak")
        t['@attributes']["resourceIdentifier"] = 'http://psi.rechtspraak.nl/uitspraak';
    // e.g. ECLI:NL:RBMNE:2016:1637 todo notify rechtspraak

    mustHaveTextAndAttributes(t, true, "rdf:language", "resourceIdentifier");
    return getResourceId(t["@attributes"], 'type');
}