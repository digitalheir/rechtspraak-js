import {HAS_PART, LABEL} from "./schema-org";
import {SchemaReference} from "../schema-type-definition";

export const TYPE = "type";
export const STRING = "string";
export const OBJECT = "object";
export const ARRAY = "array";
export const PROPERTIES = "properties";
export const ITEMS = "items";
export const PATTERN = "pattern";
export const FORMAT = "format";
export const REQUIRED = "required";
export const ADDITIONAL_PROPERTIES = "additionalProperties";
export const ADDITIONAL_ITEMS = "additionalItems";
export const URI = "uri";
export const DATE_TIME = "date-time";
export const DATE = "date";
export const URI_STRING = "uri-string";
export const RESOURCE_OBJECT = "standard-resource-object";


export const DEFINITIONS = "definitions";

export const _DEF = "#/" + DEFINITIONS + "/";

export const _DEF_HASPART = _DEF + HAS_PART;
export const _DEF_LABEL = _DEF + LABEL;
export const _DEF_URI_STRING = _DEF + URI_STRING;
export const _DEF_RESOURCE_OBJECT = _DEF + RESOURCE_OBJECT;

export const _REF = "$ref";

export const _REF_URI_STRING:SchemaReference = {$ref: _DEF_URI_STRING};
export const _REF_LABEL:SchemaReference = {$ref: _DEF_LABEL};
export const _REF_RESOURCE_OBJECT:SchemaReference = {$ref: _DEF_RESOURCE_OBJECT};
