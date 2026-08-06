import type { ParseData } from "../ParseData";
import { parseKeyword } from "./parseKeyword";
import { parseName } from "./parseName";

export function parseIdent(code: string): ParseData{
    let result:ParseData

    if((result = parseName(code)) === undefined){
        return undefined;
    }

    if(result.deliverable.nodeType !== "ABSTRACT_NAME"){
        return undefined;
    }

    if(parseKeyword(code) !== undefined){
        return undefined;
    }else{
        result.deliverable = {
            nodeType: "IDENT",
            name: result.deliverable.name
        };

        return result;
    }
}