import {
    OBJECT,
    PROPERTIES,
    TYPE,
    PATTERN,
    STRING,
    REQUIRED,
    _DEF_HASPART,
    _REF,
    ADDITIONAL_PROPERTIES
} from "./constants/json-ld";
import {_ID, _TYPE} from "./constants/rdf";
import {HAS_PART} from "./constants/schema-org";


const NAME = "name";
const ALTERNATE_NAME = "alternateName";
const PATTERN_HTML_ID = "^[0-9](:[0-9])*$";
const PATTERN_TYPE = "^Report";


export default {
    [TYPE]: OBJECT,
    [PROPERTIES]: {
        [_TYPE]: {
            [TYPE]: STRING,
            [PATTERN]: PATTERN_TYPE
        },
        [_ID]: {
            [TYPE]: STRING,
            [PATTERN]: PATTERN_HTML_ID
        },
        [NAME]: {
            [TYPE]: STRING
        },
        [ALTERNATE_NAME]: {
            [TYPE]: STRING
        }
    },
    [REQUIRED]: [_TYPE, _ID, NAME],
    [HAS_PART]: {[_REF]: _DEF_HASPART},
    [ADDITIONAL_PROPERTIES]: false
};