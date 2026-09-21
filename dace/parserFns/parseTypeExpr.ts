import type { ParseData } from "../ParseData";
import { parseSumTypeExpr } from "./parseSumTypeExpr";
import { parseTypeTerm } from "./parseTypeTerm";

export function parseTypeExpr(code: string): ParseData{
    let result:ParseData;
    if((result = parseSumTypeExpr(code)) !== undefined){
    }else if((result = parseTypeTerm(code)) !== undefined){
    }

    return result;
}