import {UriWithProtocol} from "../rechtspraak_metadata";

//noinspection JSUnusedLocalSymbols

export function getCoverage(c: string, id?: string): UriWithProtocol {
    if (c !== "NL")
        throw new Error("Expected coverage to be NL");

    return "muhCoverage:" + "nl";
}