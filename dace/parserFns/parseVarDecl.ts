import type { AstBuiltinType } from "../Ast/AstBuiltinType"
import type { AstCodeBlock } from "../Ast/AstCodeBlock"
import type { AstExpr } from "../Ast/AstExpr"
import type { AstTypeExpr } from "../Ast/AstTypeExpr"
import { parseBuiltinType } from "./parseBuiltinType"
import { parseCodeBlock } from "./parseCodeBlock"
import type { ParseData } from "../ParseData"
import { parseExpr } from "./parseExpr"
import { parseIdent } from "./parseIdent"
import { parseKeyword } from "./parseKeyword"
import { parseWs } from "./parseWs"

export function parseVarDecl(code: string): ParseData{
    let result:ParseData;

    let remain: string;

    let keyword = parseKeyword(code);

    if(keyword === undefined || keyword.deliverable.nodeType !== "KEYWORD"){
        return undefined;
    }

    if (keyword.deliverable.name !== "var"){
        return undefined;
    }

    remain = keyword.remain;

    let t = parseWs(remain)
    if(t !== undefined){
        remain = t.remain
    }

    const ident = parseIdent(remain)
    if(ident === undefined || ident.deliverable.nodeType !== "IDENT"){
        return undefined
    }

    remain = ident.remain
    t = parseWs(remain)
    if(t !== undefined){
        remain = t.remain
    }

    let typeData = parseBuiltinType(remain)
    let type:AstTypeExpr = {
        nodeType: "BUILTIN_TYPE",
        body: "auto"
    }
    if(typeData === undefined){
    }else if(typeData.deliverable.nodeType !== "BUILTIN_TYPE"){
        return undefined
    }else{
        type = typeData.deliverable;
        remain = typeData.remain
        t = parseWs(remain)
        if(t !== undefined){
            remain = t.remain
        }
    }

    if (remain[0] === undefined || remain[0] !== "="){
        return undefined
    }
    remain = remain.substring(1);

    t = parseWs(remain)
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
        deliverable: {nodeType: "VAR_DECL", name: ident.deliverable.name, type: type as AstBuiltinType, initial: expr.deliverable as AstExpr, block: block.deliverable as AstCodeBlock}
    }

    return result
}