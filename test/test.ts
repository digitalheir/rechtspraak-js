import "mocha";
import * as RS from "../src/index";
import {_context} from "../src/model/json-ld/context";
import * as fs from "fs";
import * as assert from "assert";

let readFileToString = function (src: string) {
    return fs.readFileSync(
        src,
        {encoding: "utf8"}
    );
};
let determineTestDocFileName = function (docName: string, ext: string) {
    return "./test/test_docs/" + docName + "." + ext;
};

let generateJsonFromXml = function (docName: string) {
    const xmlString = readFileToString(determineTestDocFileName(docName, "xml"));
    // serialize & deserialize to get rid of fields set to undefined
    const asJson = JSON.stringify(RS.toJsonLdFromXmlString(xmlString));
    return JSON.parse(asJson);
};

let getExpectedJson = function (docName: string) {
    const json = JSON.parse(readFileToString(determineTestDocFileName(docName, "json")));
    json["@context"] = _context;
    return json;
};
let generateJsonFromXmlAndLoadExpectedJson = function (docName: string) {
    const expectedJson = getExpectedJson(docName);
    const generatedJson = generateJsonFromXml(docName);

    generatedJson.couchDbUpdated = expectedJson.couchDbUpdated;
    return {expectedJson, generatedJson};
};

describe("XML should convert to JSON-LD", function () {
    it("given any document, should render correctly", function () {
        const docName = "ECLI_NL_RBZWB_2016_1440";

        const {expectedJson, generatedJson} = generateJsonFromXmlAndLoadExpectedJson(docName);
        // console.log(JSON.stringify(generatedJson));

        assert.deepEqual(
            generatedJson,
            expectedJson
        );
    });
    it("given any (artificial) document, should render correctly", function () {
        const docName = "complete_artificial_example";

        const {expectedJson, generatedJson} = generateJsonFromXmlAndLoadExpectedJson(docName);
        // console.log(JSON.stringify(generatedJson));


        assert.deepEqual(
            generatedJson,
            expectedJson
        );
    });

    it("given no abstract, should render no abstract", function () {
        const docName = "no_abstract";

        const {expectedJson, generatedJson} = generateJsonFromXmlAndLoadExpectedJson(docName);
        // console.log(JSON.stringify(generatedJson));


        assert.deepEqual(
            generatedJson,
            expectedJson
        );
    });

    it("given tussenbeschikking, should render no abstract", function () {
        const docName = "ECLI_NL_RBMNE_2016_1780";

        const {expectedJson, generatedJson} = generateJsonFromXmlAndLoadExpectedJson(docName);
        // console.log(JSON.stringify(generatedJson));


        assert.deepEqual(
            generatedJson,
            expectedJson
        );
    });

    it("given verzet, should render correctly", function () {
        const docName = "ECLI_NL_RBAMS_2010_BO3979";

        const {expectedJson, generatedJson} = generateJsonFromXmlAndLoadExpectedJson(docName);
        console.log(JSON.stringify(generatedJson));


        assert.deepEqual(
            generatedJson,
            expectedJson
        );
    });

    it("given bestuursrecht, should render correctly", function () {
        const docName = "ECLI_NL_CBB_1997_ZG0125";

        const {expectedJson, generatedJson} = generateJsonFromXmlAndLoadExpectedJson(docName);
        // console.log(JSON.stringify(generatedJson));


        assert.deepEqual(
            generatedJson,
            expectedJson
        );
    });

    it("given \"-\" for abstract, should render no abstract", function () {
        const docName = "ignore_abstract";

        const {expectedJson, generatedJson} = generateJsonFromXmlAndLoadExpectedJson(docName);
        // console.log(JSON.stringify(generatedJson));


        assert.deepEqual(
            generatedJson,
            expectedJson
        );
    });

    it("given inline abstract, should render abstract", function () {
        const docName = "inline_abstract";

        try {
            generateJsonFromXmlAndLoadExpectedJson(docName); //noinspection ExceptionCaughtLocallyJS
            throw new Error("Test should have failed");
        } catch (e) {
            assert.equal(
                "Expected different dcterms:abstract",
                e.message
            );
        }
    });

    it("given second description not present, should generate valid document", function () {
        const docName = "no_html_metadata";
        const {expectedJson, generatedJson} = generateJsonFromXmlAndLoadExpectedJson(docName);
        // console.log(JSON.stringify(generatedJson));


        assert.deepEqual(
            generatedJson,
            expectedJson
        );
    });
// TODO the other cases in test_docs
});
