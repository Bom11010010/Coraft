import type { AstCodeBlock } from "../Ast/AstCodeBlock"
import type { AstExpr } from "../Ast/AstExpr"
import { parseCodeBlock } from "./parseCodeBlock"
import type { ParseData } from "../ParseData"
import { parseExpr } from "./parseExpr"
import { parseKeyword } from "./parseKeyword"
import { parseWs } from "./parseWs"

export function parseSayStmt(code: string): ParseData{
    let result:ParseData;

    let remain: string;

    let keyword = parseKeyword(code);

    if(keyword === undefined || keyword.deliverable.nodeType !== "KEYWORD"){
        return undefined;
    }

    if (keyword.deliverable.name !== "say"){
        return undefined;
    }

    let args:string = keyword.remain;

    let t = parseWs(args)
    
    remain = args
    if(t !== undefined){
        remain = t.remain
    }

    const expr = parseExpr(remain)
    if(expr === undefined){
        return undefined
    }

    t = parseWs(expr.remain)
    
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
        deliverable: {nodeType: "SAY_STMT", body: expr.deliverable as AstExpr, block: block.deliverable as AstCodeBlock}
    }

    return result
}