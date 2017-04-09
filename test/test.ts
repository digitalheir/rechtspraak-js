import 'mocha';
import RS from '../src/index';
import * as fs from 'fs';
import * as assert from "assert";
import {RechtspraakMetadata} from "../lib/model/rechtspraak_metadata";

describe('XML should convert to JSON-LD', function () {
    it('should render', function () {
        const xmlString = fs.readFileSync(
            './test/test_docs/ECLI_NL_RBZWB_2016_1440.xml',
            {encoding: 'utf8'}
        );

        const expectedJson = JSON.parse(fs.readFileSync(
            './test/test_docs/ECLI_NL_RBZWB_2016_1440.jsonld',
            {encoding: 'utf8'}
        ));

        // serialize & deserialize to get rid of fields set to undefined
        let generatedJson = JSON.parse(JSON.stringify(RS.toJsonLdFromXmlString(xmlString)));
        generatedJson.couchDbUpdated = expectedJson.couchDbUpdated;

        assert.deepEqual(
            generatedJson,
            expectedJson
        );
    });

});
