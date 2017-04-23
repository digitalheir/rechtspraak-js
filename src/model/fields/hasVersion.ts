import {mustHaveTextAndAttributes, throwIfContainsUnexpectedEncodedChars} from "../../util/validations";
import {getResourceId} from "../convert-to-typed";
import {makeLabel} from "./label";
import {idResource, StandardResourceObject} from "./standard-resource-object";

export interface HasVersion extends StandardResourceObject {
}

export function getHasVersion(hasVersion: any[], id?: string): HasVersion[] | undefined {
    if (!hasVersion)
        return undefined;

    return hasVersion.map((str: any) => {
        return idResource(
            "muhHasVersion:" + throwIfContainsUnexpectedEncodedChars(str),
            makeLabel(str, "nl")
        );
    });
}