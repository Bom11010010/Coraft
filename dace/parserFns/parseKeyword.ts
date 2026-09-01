import type { ParseData } from "../ParseData";
import { parseName } from "./parseName";

const kwList = ["say", "if", "else", "elif", "for", "var", "fn", "return", "true", "false", "null"];

export function parseKeyword(code: string): ParseData{
    let result:ParseData

    if((result = parseName(code)) === undefined){
        return undefined;
    }

    if(result.deliverable.nodeType !== "ABSTRACT_NAME"){
        return undefined;
    }


    if(kwList.includes(result.deliverable.name)){
        result.deliverable = {
            nodeType: "KEYWORD",
            name: result.deliverable.name
        };

        return result;
    }else{
        return undefined;
    }


    return result
}