import {documentSchema} from './index';
import * as fs from 'fs';

fs.writeFile(
    'nl_judgment_metadata_schema.json',
    JSON.stringify(documentSchema, null, 2),
    "utf8",
    (err) => {
        if (err)throw(err);
        console.log("Schema written");
    }
);
import {compileFromFile} from 'json-schema-to-typescript'

compileFromFile('nl_judgment_metadata_schema.json').then((r)=>{fs.writeFileSync('rechtspraak_metadata.ts', r)
}).catch(r => {
    throw r
});
