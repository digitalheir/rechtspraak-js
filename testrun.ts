import * as fs from "fs";
import * as glob from "glob";
import {DOMParser} from "xmldom";
import {toJsonLd} from "./src/model/json-ld/to-json-ld";

const folder = "/home/maarten/OpenDataUitspraken/";

getDocsOnDisk()
    .then(({paths}: {paths: string[]}) => {
        console.log("Found " + paths.length + " docs.");
        return new Promise((resolve: any, reject: any) => {
            paths.forEach((path: string) => {
                try {
                    const xmlString = fs.readFileSync(
                        path,
                        {encoding: "utf8"}
                    );
                    const domParser: DOMParser = new DOMParser();
                    const xml = domParser.parseFromString(xmlString);
                    toJsonLd(xml);
                } catch (error) {
                    // reject({path, error});

                    console.error(path);
                    console.error(error);
                }
            });
        });
    })
    .catch(({path, error}) => {
        console.error(path);
        console.error(error);
    });

function getDocsOnDisk(max: number = -1) {
    return new Promise((resolve: any, reject: any) => {
        const globo = folder + "**/*.xml";
        glob(globo, {}, (err, files) => {
            console.log(files.length + " files on " + globo);
            if (err) reject(err);
            else resolve(
                {
                    paths: (max && max > 0) ? files.splice(0, max) : files
                }
            );
        });
    });
}