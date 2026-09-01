import { parseCodeBlock } from "./parseCodeBlock"
import type { ParseData } from "../ParseData"
import { parseDecl } from "./parseDecl"
import { parseExprStmt } from "./parseExprStmt"
import { parseReturnStmt } from "./parseReturnStmt"
import { parseSayStmt } from "./parseSayStmt"
import { parseForStmt } from "./parseForStmt"
import { parseIfStmt } from "./parseIfStmt"

export function parseStmt(code: string): ParseData{
    let result:ParseData

    if((result = parseSayStmt(code)) !== undefined){
    }else if((result = parseExprStmt(code)) !== undefined){
    }else if((result = parseDecl(code)) !== undefined){
    }else if((result = parseCodeBlock(code)) !== undefined){
    }else if((result = parseReturnStmt(code)) !== undefined){
    }else if((result = parseForStmt(code)) !== undefined){
    }else if((result = parseIfStmt(code)) !== undefined){
    }

    return result
}