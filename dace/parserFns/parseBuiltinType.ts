import type { ParseData } from "../ParseData";
import { parseName } from "./parseName";

const typeList = ["i8", "i16", "i32", "i64", "auto", "bool", "null", "str", "void", "char"];

export function parseBuiltinType(code: string): ParseData{
    let result:ParseData

    if((result = parseName(code)) === undefined){
        return undefined;
    }

    if(result.deliverable.nodeType !== "ABSTRACT_NAME"){
        return undefined;
    }

    if(typeList.includes(result.deliverable.name)){
        result.deliverable = {
            nodeType: "BUILTIN_TYPE",
            body: result.deliverable.name
        };

        return result;
    }else{
        return undefined;
    }
}