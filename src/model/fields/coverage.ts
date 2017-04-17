import {UriWithProtocol} from "../rechtspraak_metadata";

//noinspection JSUnusedLocalSymbols

export function getCoverage(c: string, id?: string): UriWithProtocol {
    const trimmed = c.trim();
    if (trimmed !== "NL")
        throw new Error("Expected coverage to be NL, was " + trimmed);

    return "muhCoverage:" + "nl";
}