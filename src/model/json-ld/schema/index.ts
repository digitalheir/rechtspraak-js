import hasPart from './hasPart'
import label from './label'

import {
    _REF,
    _REF_LABEL,
    OBJECT,
    ADDITIONAL_PROPERTIES,
    PROPERTIES,
    TYPE,
    PATTERN,
    FORMAT,
    _REF_RESOURCE_OBJECT,
    _REF_DATE,
    _DEF_HASPART,
    STRING,
    URI,
    _REF_URI_STRING,
    DATE,
    DATE_TIME,
    DEFINITIONS,
    URI_STRING,
    RESOURCE_OBJECT
} from "./constants/json-ld";
import {_VALUE} from "./constants/rdf";
import {
    TITLE,
    HAS_PART, PATTERN_DATETIME
} from "./constants/schema-org";
import resourceObject from "./resource-object";
import array from "./array";

const ABSTRACT_XML = "abstractXml";

const ID = "id";
const LABEL = "label";


const PATTERN_XML = "^<\\?xml version";


const ACCESS_RIGHTS = "accessRights";
const _SCHEMA = "$schema";


const reg = /^[0-9](\.([0-9]+)):([cv]):(BWB):BWB[A-Z0-9]+(&[a-z]+=[():.,a-z0-9- ]+)*$/;
const PATTERN_JURICONNECT = "^[0-9](\.([0-9]+)):([cv]):(BWB):BWB[A-Z0-9]+(&[a-z]+=[():.,a-z0-9- ]+)*$";
const PATTERN_CVDR = "^(CVDR)(:([0-9_]+))+$";


// TODO more typing?

const ISSUED = "issued";
export const documentSchema: any = {
    "@context": {},
    [_SCHEMA]: "http://json-schema.org/schema#",
    [DEFINITIONS]: {
        [HAS_PART]: hasPart,
        [LABEL]: label,
        [RESOURCE_OBJECT]: resourceObject(),
        [URI_STRING]: {
            [TYPE]: STRING,
            [FORMAT]: URI
        },
        [DATE]: {
            [TYPE]: STRING,
            [FORMAT]: DATE
        }
    },
    [ID]: "https://rechtspraak.lawreader.nl/schema/doc-ld.json",
    [PROPERTIES]: {
        ["_id"]: {
            [TYPE]: STRING,
            [PATTERN]: "^ECLI(:[xA-Z0-9]+)+$"
        },
        ["owl:sameAs"]: _REF_URI_STRING,
        ["abstract"]: {
            [TYPE]: OBJECT,
            [PROPERTIES]: {
                [ABSTRACT_XML]: {
                    [TYPE]: STRING,
                    [PATTERN]: PATTERN_XML
                },
                [_VALUE]: {
                    [TYPE]: STRING
                },
            },
            [ADDITIONAL_PROPERTIES]: false
        },
        // ["innertext"]: {
        //     [TYPE]: STRING
        // },
        [HAS_PART]: array({[_REF]: _DEF_HASPART}),
        [ACCESS_RIGHTS]: _REF_URI_STRING,
        ["metadataModified"]: {
            [TYPE]: STRING,
            [PATTERN]: PATTERN_DATETIME
        },
        ["contentModified"]: {
            [TYPE]: STRING,
            [PATTERN]: PATTERN_DATETIME
        },
        [ISSUED]: _REF_DATE,
        ["htmlIssued"]: _REF_DATE,
        ["publisher"]: array(_REF_RESOURCE_OBJECT),
        ["language"]: _REF_URI_STRING,
        ["replaces"]: array(_REF_URI_STRING),
        ["relation"]: array(resourceObject(true, true, {
            "aanleg": resourceObject(),
            "type": resourceObject(true, false, {}, {})
        }, {
            "gevolg": resourceObject(true, false, {}, {})
        })),
        ["creator"]: resourceObject(
            true,
            true,
            {

                "scheme": {
                    [TYPE]: STRING,
                    [PATTERN]: "^[a-zA-Z\.]+$"
                }
            }),
        ["procedure"]: array(_REF_RESOURCE_OBJECT),
        ["isReplacedBy"]: array(_REF_URI_STRING),
        ["references"]: array(resourceObject(true, true, {}, {
            "jdi": {[TYPE]: STRING, [PATTERN]: PATTERN_JURICONNECT},
            "cvdr": {[TYPE]: STRING, [PATTERN]: PATTERN_CVDR}
        })),
        ["subject"]: array(_REF_RESOURCE_OBJECT),
        [DATE]: _REF_DATE,
        ["zaaknummer"]: array({[TYPE]: STRING}),
        [TYPE]: _REF_URI_STRING,
        ["coverage"]: _REF_URI_STRING,
        ["temporal"]: {
            [TYPE]: STRING,
            [PATTERN]: "[0-9]{4}"
        },
        ["hasVersion"]: array({[TYPE]: STRING}),
        ["corpus"]: {
            [TYPE]: STRING,
            [PATTERN]: "Rechtspraak.nl"
        },
        ["couchDbUpdated"]: {
            [TYPE]: STRING,
            [FORMAT]: DATE_TIME
        },
        source: _REF_URI_STRING,
        about: _REF_URI_STRING,
        page: _REF_URI_STRING,
        [TITLE]: _REF_LABEL,
        // spatial: _REF_RESOURCE_OBJECT,
        spatial: _REF_URI_STRING
    },
    required: [
        ISSUED
    ],
    additionalProperties: false
};
