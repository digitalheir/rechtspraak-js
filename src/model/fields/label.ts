import {throwIfNotString} from "../../util/validations";
export interface Label {
    "@value": string;
    "@language"?: string;
}

export interface LabelWithLanguage extends Label {
    "@language": string;
}

export function makeLabel(value: string, lang: string): Label {
    return {
        '@value': throwIfNotString(value),
        '@language': throwIfNotString(lang)
    };
}