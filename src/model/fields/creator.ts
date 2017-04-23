import {
    HTTPS_RECHTSPRAAK_LAWREADER_VOCAB, mustHaveTextAndAttributes, REGEX_PSI_RECHTSPRAAK,
    REGEX_STANDAARDEN_OVERHEID, throwIfNotString, throwIfNotUriWithProtocol
} from "../../util/validations";
import {Creator} from "../rechtspraak_metadata";
import {getResourceId} from "../convert-to-typed";
import {makeLabel} from "./label";

function getLawReaderId(idFromRechtspraakNl: string) {
    let lawreaderId = idFromRechtspraakNl;
    if (idFromRechtspraakNl.match(REGEX_PSI_RECHTSPRAAK)) {
        lawreaderId = HTTPS_RECHTSPRAAK_LAWREADER_VOCAB + "creator" + "/" +
            throwIfContainsUnexpectedEncodedChars(idFromRechtspraakNl.replace(REGEX_PSI_RECHTSPRAAK, ""));
    } else if (idFromRechtspraakNl.match(REGEX_STANDAARDEN_OVERHEID)) {
    } else {
        console.warn("How to handle creator URI " + idFromRechtspraakNl + "?");
    }
    return lawreaderId;
}

function getLanguageForCourt(txt: string): string {
    if (txt.match(/\b(?:court|Appellate)\b/gi))return "en";
    if (txt.match(/\bAdministrativa|Augstakas\b/gi))return "lv";
    if (txt.match(/\b(?:Anotato)\b/gi))return "gr";
    if (txt.match(/\b(?:Audiencia)\b/gi))return "sp";
    else return "nl";
}

export function getCreator(creator: any, id?: string): Creator {
    const creatorAttrs = creator["@attributes"];
    if (!creatorAttrs)
        throw new Error(id + ": Expected attributes for " + "dcterms:creator");
    mustHaveTextAndAttributes(creator, true, "rdfs:label", ["resourceIdentifier", "psi:resourceIdentifier"], "scheme");
    const idFromRechtspraakNl = getResourceId(creatorAttrs);
    if (!idFromRechtspraakNl) throw new Error("No resource identifier found for " + "dcterms:creator" + ": " + JSON.stringify(creator));
    const txt = creator["#text"].trim();
    const lang = getLanguageForCourt(txt);

    return {
        "@id": throwIfNotUriWithProtocol(getLawReaderId(idFromRechtspraakNl)),
        "rdfs:label": [makeLabel(txt, lang)],
        scheme: throwIfNotString(creator["@attributes"].scheme),
        originalIdentifier: idFromRechtspraakNl
    };
}