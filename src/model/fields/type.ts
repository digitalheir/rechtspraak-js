import {UriWithProtocol} from "../rechtspraak_metadata";
import {getResourceId} from "../convert-to-typed";
import {mustHaveTextAndAttributes} from "../../util/validations";

export type RsDocumentType = "uitspraak" | "conclusie";

export function getType(t: any, _id?: string): RsDocumentType {
    if (t["@attributes"]["resourceIdentifier"] === "" && t["#text"] === "Uitspraak")
        t["@attributes"]["resourceIdentifier"] = "http://psi.rechtspraak.nl/uitspraak";

    mustHaveTextAndAttributes(t, true, "rdf:language", "resourceIdentifier");
    const resourceId: string = getResourceId(t["@attributes"], "type");
    switch (resourceId) {
        case "http://psi.rechtspraak.nl/uitspraak":
            return "uitspraak";
        case "http://psi.rechtspraak.nl/conclusie":
            return "conclusie";
        default:
            throw new Error(_id + ": Unkown document type " + resourceId);
    }
}