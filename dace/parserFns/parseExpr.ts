import type { ParseData } from "../ParseData"
import { parseInfixChainExpr } from "./parseInfixChainExpr"
import { parseTerm } from "./parseTerm"

export function parseExpr(code: string): ParseData{
    let result:ParseData

    if((result = parseInfixChainExpr(code)) !== undefined){
    }else if((result = parseTerm(code)) !== undefined){
    }

    return result
}