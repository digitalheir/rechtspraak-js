import {throwIfContainsUnexpectedEncodedChars, throwIfNotString} from "../../util/validations";
import {idResourceNoUriCheck, StandardResourceObject} from "./standard-resource-object";
import {makeLabel} from "./label";

export interface Spatial extends StandardResourceObject {
}

export function getSpatial(meta: any, _id: string): Spatial | undefined {
    if (!meta) return undefined;
    const spat = throwIfNotString(meta, "spatial");

    // todo verify
    return idResourceNoUriCheck(
        "muhSpatial:" + throwIfContainsUnexpectedEncodedChars(spat),
        makeLabel(spat, "nl")
    );
}