import type { AstCodeBlock } from "../Ast/AstCodeBlock";
import type { AstElifBlockSuf } from "../Ast/AstElifBlockSuf";
import type { AstElseBlockSuf } from "../Ast/AstElseBlockSuf";
import type { AstExpr } from "../Ast/AstExpr";
import type { ParseData } from "../ParseData";
import { parseCodeBlock } from "./parseCodeBlock";
import { parseExpr } from "./parseExpr";
import { parseKeyword } from "./parseKeyword";
import { parseWs } from "./parseWs";

export function parseElifBlockSuf(code: string): ParseData{
    let result:ParseData
    let remain = code;
    const kw = parseKeyword(remain);
    if(kw === undefined || kw.deliverable.nodeType !== "KEYWORD" || kw.deliverable.name !== "elif"){
        return undefined;
    }
    remain = kw.remain;

    let t = parseWs(remain);
    if(t !== undefined){
        remain = t.remain;
    }

    const cond = parseExpr(remain);
    if(cond === undefined){
        return cond;
    }
    remain = cond.remain;

    t = parseWs(remain);
    if(t !== undefined){
        remain = t.remain;
    }

    const block = parseCodeBlock(remain);
    if(block === undefined){
        return undefined
    }
    remain = block.remain

    const ast: AstElifBlockSuf = {
        nodeType: "ELIF_BLOCK_SUF",
        cond: cond.deliverable as AstExpr,
        block: block.deliverable as AstCodeBlock
    }

    result = {
        deliverable: ast,
        remain: remain
    }

    return result;
}