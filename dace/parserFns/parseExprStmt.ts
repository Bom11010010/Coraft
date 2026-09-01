import type { AstCodeBlock } from "../Ast/AstCodeBlock"
import type { AstExpr } from "../Ast/AstExpr"
import { parseCodeBlock } from "./parseCodeBlock"
import type { ParseData } from "../ParseData"
import { parseExpr } from "./parseExpr"
import { parseWs } from "./parseWs"

export function parseExprStmt(code: string): ParseData{
    let result:ParseData

    const expr = parseExpr(code)
    if(expr === undefined){
        return undefined
    }

    const t = parseWs(expr.remain)
    
    let rawBlock = expr.remain
    if(t !== undefined){
        rawBlock = t.remain
    }

    const block = parseCodeBlock(rawBlock)

    if(block === undefined){
        return undefined
    }

    result = {
        remain: block.remain,
        deliverable: {nodeType: "EXPR_STMT", body: expr.deliverable as AstExpr, block: block.deliverable as AstCodeBlock}
    }

    return result
}