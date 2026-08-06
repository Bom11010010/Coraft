import type { AstCodeBlock } from "../Ast/AstCodeBlock";
import type { AstDecl } from "../Ast/AstDecl";
import type { AstExpr } from "../Ast/AstExpr";
import type { AstExprStmt } from "../Ast/AstExprStmt";
import type { AstForStmt } from "../Ast/AstForStmt";
import type { ParseData } from "../ParseData";
import { parseCodeBlock } from "./parseCodeBlock";
import { parseExpr } from "./parseExpr";
import { parseExprStmt } from "./parseExprStmt";
import { parseKeyword } from "./parseKeyword";
import { parseVarDecl } from "./parseVarDecl";
import { parseWs } from "./parseWs";

export function parseForStmt(code: string): ParseData{
    let result:ParseData;
    let remain: string = code;

    const kw = parseKeyword(remain);
    if(kw === undefined || kw.deliverable.nodeType !== "KEYWORD" || kw.deliverable.name !== "for"){
        return undefined;
    }
    remain = kw.remain;

    let t = parseWs(remain);
    if(t !== undefined){
        remain = t.remain;
    }

    if(remain[0] === undefined || remain[0] !== "("){
        return undefined
    }
    remain = remain.substring(1);

    t = parseWs(remain);
    if(t !== undefined){
        remain = t.remain;
    }

    const init = parseVarDecl(remain);
    if(init === undefined){
        return undefined;
    }
    remain = init.remain;

    t = parseWs(remain);
    if(t !== undefined){
        remain = t.remain;
    }

    const cond = parseExprStmt(remain);

    if(cond === undefined){
        return undefined;
    }
    remain = cond.remain;

    t = parseWs(remain);
    if(t !== undefined){
        remain = t.remain;
    }

    const update = parseExpr(remain);
    if(update === undefined){
        return undefined;
    }
    remain = update.remain;
    
    t = parseWs(remain);
    if(t !== undefined){
        remain = t.remain;
    }

    if(remain[0] === undefined || remain[0] !== ")"){
        return undefined
    }
    remain = remain.substring(1);

    t = parseWs(remain);
    if(t !== undefined){
        remain = t.remain;
    }

    const block = parseCodeBlock(remain);
    if(block === undefined){
        return undefined;
    }
    remain = block.remain;

    const ast:AstForStmt = {
        nodeType: "FOR_STMT",
        init: init.deliverable as AstDecl,
        cond: cond.deliverable as AstExprStmt,
        update: update.deliverable as AstExpr,
        block: block.deliverable as AstCodeBlock
    }
    result = {
        deliverable: ast,
        remain: remain
    }

    return result;
}