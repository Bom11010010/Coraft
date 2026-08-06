import { parseBoolLiteral } from "./parseBoolLiteral";
import type { ParseData } from "../ParseData";
import { parseNumberLiteral } from "./parseNumberLiteral";
import { parseNullLiteral } from "./parseNullLiteral";
import { parseStrLiteral } from "./parseStrLiteral";

export function parseLiteral(code: string): ParseData{
    let result:ParseData

    if((result = parseNumberLiteral(code)) !== undefined){
    }else if((result = parseBoolLiteral(code)) !== undefined){
    }else if((result = parseNullLiteral(code)) !== undefined){
    }else if((result = parseStrLiteral(code)) !== undefined){
    }

    return result
}