export interface SchemaTypeDefinition {
}

export interface ObjectTypeDefinition extends SchemaTypeDefinition {
    type: "object",
    properties?: any; // TODO better type? it's a dictionary
    required?: string[],
    additionalProperties?: any,//TODO better type? it's a dictionary
}

export interface SchemaReference extends SchemaTypeDefinition {
    $ref: string
}

export interface StringTypeDefinition extends SchemaTypeDefinition {
    type: "string",
    pattern?: "string"
}

export interface ArrayTypeDefinition extends SchemaTypeDefinition {
    type: "array",
    items?: SchemaTypeDefinition,
    additionalItems: SchemaTypeDefinition|boolean
}