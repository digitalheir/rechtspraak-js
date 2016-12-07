import {SchemaTypeDefinition, ArrayTypeDefinition} from "./schema-type-definition";

export default function (items: SchemaTypeDefinition, additionalItems = false):ArrayTypeDefinition {
    return {
        type: "array",
        items: items,
        additionalItems: additionalItems
    }
}