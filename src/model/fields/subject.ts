import {mustHaveTextAndAttributes, throwIfDivergentLabel, unexpectedUri} from "../../util/validations";
import {getResourceId} from "../convert-to-typed";
import {makeLabel} from "./label";
import {idResource, StandardResourceObject} from "./standard-resource-object";
import {_context} from "../json-ld/context";

export type Subject =
    "rechtsgebied#bestuursrecht_belastingrecht"
    | "rechtsgebied#bestuursrecht"
    | "rechtsgebied#bestuursrecht_vreemdelingenrecht"
    | "rechtsgebied#bestuursrecht_socialezekerheidsrecht"
    | "rechtsgebied#civielRecht"
    | "rechtsgebied#bestuursrecht_europeesBestuursrecht"
    | "rechtsgebied#bestuursrecht_bestuursstrafrecht"
    | "rechtsgebied#bestuursrecht_vreemdelingenrecht"
    | "rechtsgebied#bestuursrecht_socialezekerheidsrecht"
    | "rechtsgebied#civielRecht"
    | "rechtsgebied#bestuursrecht_europeesBestuursrecht"
    | "rechtsgebied#bestuursrecht_bestuursstrafrecht"
    | "rechtsgebied#bestuursrecht_ambtenarenrecht"
    | "rechtsgebied#civielRecht_personenEnFamilierecht"
    | "rechtsgebied#bestuursrecht_omgevingsrecht"
    | "rechtsgebied#civielRecht_insolventierecht"
    | "rechtsgebied#strafrecht"
    | "rechtsgebied#bestuursrecht_bestuursprocesrecht"
    | "rechtsgebied#internationaalPubliekrecht"
    | "rechtsgebied#internationaalPubliekrecht_mensenrechten"
    | "rechtsgebied#civielRecht_ondernemingsrecht"
    | "rechtsgebied#strafrecht_strafprocesrecht"
    | "rechtsgebied#civielRecht_internationaalPrivaatrecht"
    | "rechtsgebied#strafrecht_materieelStrafrecht"
    | "rechtsgebied#strafrecht_europeesStrafrecht"
    | "rechtsgebied#strafrecht_penitentiairStrafrecht"
    | "rechtsgebied#civielRecht_arbeidsrecht"
    | "rechtsgebied#civielRecht_goederenrecht"
    | "rechtsgebied#civielRecht_burgerlijkProcesrecht"
    | "rechtsgebied#civielRecht_aanbestedingsrecht"
    | "rechtsgebied#civielRecht_verbintenissenrecht"
    | "rechtsgebied#civielRecht_intellectueeleigendomsrecht"
    | "rechtsgebied#civielRecht_mededingingsrecht"
    | "rechtsgebied#civielRecht_europeesCivielRecht"
    | "rechtsgebied#strafrecht_internationaalStrafrecht"
    | "rechtsgebied#bestuursrecht_mededingingsrecht"
    ;

export const uriMappingSubject: { [uri: string]: Subject } = {
    "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_belastingrecht": "rechtsgebied#bestuursrecht_belastingrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht": "rechtsgebied#bestuursrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_vreemdelingenrecht": "rechtsgebied#bestuursrecht_vreemdelingenrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_socialezekerheidsrecht": "rechtsgebied#bestuursrecht_socialezekerheidsrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#civielRecht": "rechtsgebied#civielRecht",
    "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_europeesBestuursrecht": "rechtsgebied#bestuursrecht_europeesBestuursrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_bestuursstrafrecht": "rechtsgebied#bestuursrecht_bestuursstrafrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_ambtenarenrecht": "rechtsgebied#bestuursrecht_ambtenarenrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_personenEnFamilierecht": "rechtsgebied#civielRecht_personenEnFamilierecht",
    "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_omgevingsrecht": "rechtsgebied#bestuursrecht_omgevingsrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_insolventierecht": "rechtsgebied#civielRecht_insolventierecht",
    "http://psi.rechtspraak.nl/rechtsgebied#strafrecht": "rechtsgebied#strafrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_bestuursprocesrecht": "rechtsgebied#bestuursrecht_bestuursprocesrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#internationaalPubliekrecht": "rechtsgebied#internationaalPubliekrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#internationaalPubliekrecht_mensenrechten": "rechtsgebied#internationaalPubliekrecht_mensenrechten",
    "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_ondernemingsrecht": "rechtsgebied#civielRecht_ondernemingsrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#strafrecht_strafprocesrecht": "rechtsgebied#strafrecht_strafprocesrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_internationaalPrivaatrecht": "rechtsgebied#civielRecht_internationaalPrivaatrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#strafrecht_materieelStrafrecht": "rechtsgebied#strafrecht_materieelStrafrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#strafrecht_europeesStrafrecht": "rechtsgebied#strafrecht_europeesStrafrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#strafrecht_penitentiairStrafrecht": "rechtsgebied#strafrecht_penitentiairStrafrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_arbeidsrecht": "rechtsgebied#civielRecht_arbeidsrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_goederenrecht": "rechtsgebied#civielRecht_goederenrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_burgerlijkProcesrecht": "rechtsgebied#civielRecht_burgerlijkProcesrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_aanbestedingsrecht": "rechtsgebied#civielRecht_aanbestedingsrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_verbintenissenrecht": "rechtsgebied#civielRecht_verbintenissenrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_intellectueeleigendomsrecht": "rechtsgebied#civielRecht_intellectueeleigendomsrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_mededingingsrecht": "rechtsgebied#civielRecht_mededingingsrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#civielRecht_europeesCivielRecht": "rechtsgebied#civielRecht_europeesCivielRecht",
    "http://psi.rechtspraak.nl/rechtsgebied#strafrecht_internationaalStrafrecht": "rechtsgebied#strafrecht_internationaalStrafrecht",
    "http://psi.rechtspraak.nl/rechtsgebied#bestuursrecht_mededingingsrecht": "rechtsgebied#bestuursrecht_mededingingsrecht"
};

const getSingleSubject = (subj: any, id?: string): Subject => {
    mustHaveTextAndAttributes(subj, true, "rdfs:label", "resourceIdentifier");
    const resourceId = getResourceId(subj["@attributes"], id + ": subject");

    const label = subj["#text"].trim();
    if (!uriMappingSubject.hasOwnProperty(resourceId)) throw new Error(unexpectedUri("subject", resourceId, label, id));

    const subject: Subject = uriMappingSubject[resourceId];

    const contextLabel: string = _context[subject]["rdfs:label"][0]["@value"];
    throwIfDivergentLabel(subject, label, contextLabel);

    return subject;
};

export function getSubject(sub: any[], id?: string): Subject[] | undefined {
    if (!sub) return undefined;

    return sub.map(sub => getSingleSubject(sub, id));
}