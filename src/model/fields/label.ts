import {throwIfNotString} from "../../util/validations";
export interface Label {
    "@value": string;
    "@language"?: string;
}

export interface LabelWithLanguage extends Label {
    "@language": string;
}

export interface LabelWithLanguageNl extends LabelWithLanguage {
    "@language": "nl";
}

export function makeLabel(value: string, lang: string): Label {
    return {
        '@value': throwIfNotString(value).trim(),
        '@language': throwIfNotString(lang).trim()
    };
}