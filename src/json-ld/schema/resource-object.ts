import {
    URI,
    FORMAT,
    OBJECT,
    ARRAY,
    STRING,
    _REF,
    _DEF_LABEL
} from "./constants/json-ld";
import {_ID, RDFS_LABEL} from "./constants/rdf";
import {SchemaTypeDefinition} from "./schema-type-definition";

function resourceObject(idIsUri = true,
                        hasLabels = true,
                        extraMandatoryProperties: any = {}, // todo
                        extraOptionalProperties: any = {} // todo
): SchemaTypeDefinition {
    const resource = {
        type: OBJECT,
        properties: {
            [_ID]: {
                type: STRING
            },
            [RDFS_LABEL]: {
                type: ARRAY,
                items: {[_REF]: _DEF_LABEL}
            },
            originalIdentifier: {
                type: "string",
                pattern: "^https?://"
            },
            schemeIdentifier: {
                type: "string",
                pattern: "^https?://"
            },
            additionalIdentifier: {
                type: STRING,
                pattern: "^https?://"
            },
        },
        required: [_ID],
        additionalProperties: false
    };
    let properties: any = resource.properties; // TODO give explicit type?!?
    if (idIsUri) properties[_ID][FORMAT] = URI;
    if (hasLabels) resource.required.push(RDFS_LABEL);
    for (let ke of Object.keys(extraOptionalProperties)) {
        properties[ke] = extraOptionalProperties[ke];
    }
    for (let k of Object.keys(extraMandatoryProperties)) {
        properties[k] = extraMandatoryProperties[k];
        resource.required.push(k);
    }
    // if (Object.keys(extraOptionalProperties).length > 0)
    //console.log(resource);
    return resource;
}
export default resourceObject;