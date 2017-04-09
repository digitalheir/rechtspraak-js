import {UriWithProtocol} from "../rechtspraak_metadata";
import {REGEX_DCTERMS} from "../../util/validations";
export function getCoverage (c:string, id?:string):UriWithProtocol {
    if (c !== 'NL')
        throw new Error("Expected coverage to be NL");

    return 'nl';
}