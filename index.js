"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var to_json_ld_1 = require("./lib/model/json-ld/to-json-ld");
exports.toJsonLd = to_json_ld_1.toJsonLd;
exports.toJsonLdFromXmlString = to_json_ld_1.toJsonLdFromXmlString;
__export(require("./lib/model/rechtspraak_metadata"));
var schema_1 = require("./lib/model/json-ld/schema");
exports.documentSchema = schema_1.documentSchema;
//# sourceMappingURL=index.js.map