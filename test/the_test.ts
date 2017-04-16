import 'mocha';
import * as RS from '../src/index';
import * as fs from 'fs';
import * as assert from "assert";

let readFileToString = function (src: string) {
    return fs.readFileSync(
        src,
        {encoding: 'utf8'}
    );
};
let determineTestDocFileName = function (docName: string, ext: string) {
    return './test/test_docs/' + docName + '.' + ext;
};

let generateJsonFromXml = function (docName: string) {
    const xmlString = readFileToString(determineTestDocFileName(docName, 'xml'));
    // serialize & deserialize to get rid of fields set to undefined
    const asJson = JSON.stringify(RS.toJsonLdFromXmlString(xmlString));
    return JSON.parse(asJson);
};

let getExpectedJson = function (docName: string) {
    return JSON.parse(readFileToString(determineTestDocFileName(docName, 'json')));
};
let generateJsonFromXmlAndLoadExpectedJson = function (docName: string) {
    const expectedJson = getExpectedJson(docName);
    const generatedJson = generateJsonFromXml(docName);

    generatedJson.couchDbUpdated = expectedJson.couchDbUpdated;
    return {expectedJson, generatedJson};
};

describe('XML should convert to JSON-LD', function () {
    it('given any document, should render correctly', function () {
        const docName = 'ECLI_NL_RBZWB_2016_1440';

        const {expectedJson, generatedJson} = generateJsonFromXmlAndLoadExpectedJson(docName);

        assert.deepEqual(
            generatedJson,
            expectedJson
        );
    });

    it('given second description not present, should generate valid document', function () {
        const docName = 'no_html_metadata';
        const {expectedJson, generatedJson} = generateJsonFromXmlAndLoadExpectedJson(docName);

        console.log(JSON.stringify(generatedJson));

        assert.deepEqual(
            generatedJson,
            expectedJson
        );
    });
// TODO the other cases in test_docs
});
