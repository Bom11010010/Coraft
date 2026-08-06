import { idText } from "typescript";
import type { ParseData } from "../ParseData";

export function parseStrLiteral(code: string): ParseData{
    let result:ParseData

    if(code[0] === undefined || code[0] !== "\""){
        return undefined;
    }

    let endPoint = 1;
    while(1){
        if(code[endPoint] === undefined){
            return undefined;
        }
        if(code[endPoint] === "\""){
            endPoint++;
            break;
        }
        if(code[endPoint] === "\\"){
            endPoint += 2;
        }else{
            endPoint++;
        }
    }

    const str = code.substring(0, endPoint);

    result = {
        deliverable: {
            nodeType: "STR_LITERAL",
            body: str
        },
        remain: code.substring(endPoint)
    }

    
    return result;
}