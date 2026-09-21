import type { ParseData } from "../ParseData";
import { parseFnDecl } from "./parseFnDecl";
import { parseStructDecl } from "./parseStructDecl";
import { parseTypeDecl } from "./parseTypeDecl";
import { parseVarDecl } from "./parseVarDecl";

export function parseDecl(code: string): ParseData{
    let result:ParseData

    if((result = parseVarDecl(code)) !== undefined){
    }else if((result = parseFnDecl(code)) !== undefined){
    }else if((result = parseTypeDecl(code)) !== undefined){
    }else if((result = parseStructDecl(code)) !== undefined){
    }
    
    return result
}