export type Coverage = "nl";

/**
 * NOTE: Must be IETF BCP 47 compliant
 *
 * @param c
 * @param id
 * @returns {string}
 */
export function getCoverage(c: string, id?: string): Coverage {
    const trimmed = c.trim();
    if (trimmed !== "NL")
        throw new Error(id + ":Expected coverage to be NL, was " + trimmed);

    return "nl";
}