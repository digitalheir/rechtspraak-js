import {throwIfNotString} from "../../util/validations";

export interface Temporal {
    startDate: string,
    endDate: string,
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
                    case 'rdfs:label':
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
    return {
        'startDate': throwIfNotString(t.start['#text']),
        'endDate': throwIfNotString(t.end['#text'])
    };
}