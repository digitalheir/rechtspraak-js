import {_VALUE} from "./constants/rdf";
import {ObjectTypeDefinition} from "./schema-type-definition";

const PATTERN_BCP47 = "^[a-z]{2}$";
/**
 * ECLI:NL:XX:1993:AD1977
 *
 * {
 *   "@value": "Europees Hof voor de Rechten van de Mens",
 *   "@language": "nl"
 * }
 * @type {{}}
 */
export const label:ObjectTypeDefinition = {
    type: "object",
    properties: {
        "@value": {
            type: "string"
        },
        "@language": {
            type: "string",
            pattern: PATTERN_BCP47
        }
    },
    required: [_VALUE],
    additionalProperties: false
};

export default label;