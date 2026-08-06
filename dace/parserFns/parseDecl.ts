import type { ParseData } from "../ParseData";
import { parseFnDecl } from "./parseFnDecl";
import { parseVarDecl } from "./parseVarDecl";

export function parseDecl(code: string): ParseData{
    let result:ParseData

    if((result = parseVarDecl(code)) !== undefined){
    }else if((result = parseFnDecl(code)) !== undefined){
    }
    
    return result
}