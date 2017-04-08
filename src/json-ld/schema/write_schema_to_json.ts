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
