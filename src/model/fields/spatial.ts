import {throwIfNotString} from "../../util/validations";
import {idResourceNoUriCheck, StandardResourceObject} from "./standard-resource-object";
import {makeLabel} from "./label";

export interface Spatial extends StandardResourceObject {
}

export function getSpatial(meta2: any, _id: string): Spatial {
    const spat = throwIfNotString(meta2, "spatial");

    // todo verify
    return idResourceNoUriCheck(
        encodeURI(spat),
        makeLabel(spat, 'nl')
    );
}