import {throwIfNotString} from "../../util/validations";
import {isYear, Year} from "../rechtspraak_metadata";
import {start} from "repl";

export interface Temporal {
    startDate: Year,
    endDate: Year,
}

function throwErrorForUnexpectedFields(t: any) {
    Object.keys(t).forEach(temporField => {
        switch (temporField) {
            case "start":
            case "end":
            case "#text":
                break;
            case "@attributes":
                let attrs = t[temporField];
                for (let att of Object.keys(attrs))  switch (att) {
                    case "rdfs:label":
                        break;
                    default:
                        throw new Error("Unexpected field " + temporField + " in temporal: " + JSON.stringify(t[temporField]));
                }
                break;
            default:
                throw new Error("Unexpected field " + temporField + " in temporal: " + JSON.stringify(t[temporField]));
        }
    });
}

//noinspection JSUnusedLocalSymbols
export function getTemporal(t: any, _id?: string): Temporal | undefined {
    // TODO verify   e.g.
    // ECLI:NL:RBZWB:2016:1440
    // ECLI:NL:RBZWB:2016:1473
    // {
    //     "@attributes": {"rdfs:label": "Periode"},
    //     "start": {"@attributes": {"rdfs:label": "van"}, "#text": "2009"},
    //     "end": {"@attributes": {"rdfs:label": "tot"}, "#text": "2013"}
    // };

    if (!t) return undefined;

    throwErrorForUnexpectedFields(t);
    const startDate = throwIfNotString(t.start["#text"]).trim();
    const endDate = throwIfNotString(t.end["#text"]).trim();
    if (!isYear(endDate) || !isYear(startDate))
        throw new Error("Invalid temporal: " + startDate + " - " + endDate);
    return {
        startDate,
        endDate
    };
}