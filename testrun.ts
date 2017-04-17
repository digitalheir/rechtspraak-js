import * as fs from "fs";
import {DOMParser} from "xmldom";
import {toJsonLd} from "./src/model/json-ld/to-json-ld";

const folder = "/home/maarten/OpenDataUitspraken/";
// const folder = "/media/maarten/E0E68667E6863DB2/OpenDataUitspraken/";

function handleFolder(inFolder: string) {
    let docs = 0;
    console.log("in " + inFolder);
    fs.readdirSync(inFolder).forEach(file => {
        const path = inFolder + file;
        const stat = fs.statSync(path);
        if (stat.isDirectory()) {
            handleFolder(path + "/");
        } else {
            if (file.match(/\.xml$/)) {
                docs++;
                if (docs % 10000 === 0)
                    console.log("Found at least " + docs + " docs in " + inFolder + " (" + file + ")");

                handleDocument(path);
            }
        }
    });
    if (docs)
        console.log("Found " + docs + " docs in " + inFolder);
}

const domParser: DOMParser = new DOMParser();
function handleDocument(path: string): any {
    try {
        const xmlString = fs.readFileSync(
            path,
            {encoding: "utf8"}
        );
        const xml = domParser.parseFromString(xmlString);
        toJsonLd(xml);
        // etc
    } catch (error) {
        // reject({path, error});

        console.error(path);
        console.error(error);
    }
}

handleFolder(folder);
// handleFolder(folder + "2013/");
// handleFolder(folder + "2014/");
// handleFolder(folder + "2015/");
// handleFolder(folder + "2016/");
// handleFolder(folder + "2017/");

// function getDocsOnDisk() {
//     return new Promise((resolve: any, reject: any) => {
//         const globo = folder + "**/*.xml";
//         glob(globo, {}, (err, files) => {
//             console.log(files.length + " files on " + globo);
//             if (err)
//                 reject(err);
//             else resolve(
//                 {
//                     paths: (max && max > 0) ? files.splice(0, max) : files
//                 }
//             );
//         });
//     });
// }