import {makeLabel} from "./label";
import {getResourceId} from "../convert-to-typed";
import {idResource, StandardResourceObject} from "./standard-resource-object";
import {mustHaveTextAndAttributes} from "../../util/validations";

export interface Publisher extends StandardResourceObject {
}
export const getPublisher = (publisher: any, _id?: string): Publisher[] => publisher.map((publisher: any) => {
    mustHaveTextAndAttributes(publisher, true, 'resourceIdentifier');
    return idResource(
        getResourceId(
            publisher['@attributes'],
            _id + ": " + 'dcterms:publisher'
        ),
        makeLabel(publisher['#text'], 'nl')
    );
});
