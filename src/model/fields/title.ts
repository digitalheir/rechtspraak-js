import {mustHaveTextAndAttributes} from "../../util/validations";
import {LabelWithLanguage} from "./label";
import {Creator} from "../rechtspraak_metadata";

//noinspection JSUnusedLocalSymbols
export function getTitle(t: any, id: string, creator: Creator, issued: string): LabelWithLanguage {

    if (!t) {
        const title = [id];
        const creatorLabels = creator['rdfs:label'];
        if (creatorLabels && creatorLabels.length > 0)
            title.push(creatorLabels[0]['@value']);
        if (issued)
            title.push(issued);
        // TODO etc
        return {
            "@value": title.join(", "),
            "@language": "nl",
        }
    } else {

        mustHaveTextAndAttributes(t, true, "rdf:language");
        return {
            '@value': t['#text'].trim(),
            '@language': t['@attributes']['rdf:language'].trim(),
        };
    }
}