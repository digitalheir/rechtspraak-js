import {coverageTypes} from "../json-ld/context";

export type CoverageType = keyof typeof coverageTypes;

function isCoverage(x: string): x is CoverageType {
    return coverageTypes.hasOwnProperty(x);
}
/**
 * NOTE: Must be IETF BCP 47 compliant
 *
 * @param c
 * @param id
 * @returns {string}
 */
export function getCoverage(c: string, id?: string): CoverageType {
    const trimmed = c.trim().toLowerCase();
    if (isCoverage(trimmed))
        return trimmed;
    else
        throw new Error(id + ": Expected coverage to be known, was " + trimmed);
}