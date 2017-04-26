import {UriWithProtocol} from "../rechtspraak_metadata";
import {getResourceId} from "../convert-to-typed";
import {mustHaveTextAndAttributes} from "../../util/validations";

export type RsDocumentType = "uitspraak" | "conclusie";

export function getType(t: any, _id?: string): RsDocumentType {
    if (t["@attributes"]["resourceIdentifier"] === "" && t["#text"] === "Uitspraak") {
        t["@attributes"]["resourceIdentifier"] = "http://psi.rechtspraak.nl/uitspraak";
    } else if (t["@attributes"]["resourceIdentifier"] === "" && t["#text"] === "Conclusie") {
        // Eg:
        // ECLI:NL:PHR:2013:1282
        // ECLI:NL:PHR:2013:1284
        // ECLI:NL:PHR:2013:1288
        // ECLI:NL:PHR:2013:1317
        // ECLI:NL:PHR:2013:1318
        // ECLI:NL:PHR:2013:1433
        // ECLI:NL:PHR:2013:1465
        // ECLI:NL:PHR:2013:15
        // ECLI:NL:PHR:2013:1528
        // ECLI:NL:PHR:2013:1653
        // ECLI:NL:PHR:2013:1985
        // ECLI:NL:PHR:2013:2034
        // ECLI:NL:PHR:2013:2149
        // ECLI:NL:PHR:2013:2276
        // ECLI:NL:PHR:2013:2280
        t["@attributes"]["resourceIdentifier"] = "http://psi.rechtspraak.nl/conclusie";
    }

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