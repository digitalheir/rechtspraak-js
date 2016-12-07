var assert = require('assert');
var RS = require('../lib/index');
var fs = require('fs');

describe('XML should parse', function () {
    it('should render', function () {
        const xmlString = fs.readFileSync(
            './test/test_docs/ECLI_NL_RBZWB_2016_1440.xml',
            {encoding: 'utf8'}
        );
        RS.toJsonLdFromXmlString(xmlString);
    });

});
