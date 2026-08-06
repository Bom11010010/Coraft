import type { AstCodeBlock } from "../Ast/AstCodeBlock";
import type { AstElseBlockSuf } from "../Ast/AstElseBlockSuf";
import type { ParseData } from "../ParseData";
import { parseCodeBlock } from "./parseCodeBlock";
import { parseKeyword } from "./parseKeyword";
import { parseWs } from "./parseWs";

export function parseElseBlockSuf(code: string): ParseData{
    let result:ParseData
    let remain = code;
    const kw = parseKeyword(remain);
    if(kw === undefined || kw.deliverable.nodeType !== "KEYWORD" || kw.deliverable.name !== "else"){
        return undefined;
    }
    remain = kw.remain;

    let t = parseWs(remain);
    if(t !== undefined){
        remain = t.remain;
    }

    if(remain[0] === undefined || remain[0] !== "("){
        return undefined;
    }
    remain = remain.substring(1);

    const block = parseCodeBlock(remain);
    if(block === undefined){
        return undefined
    }
    remain = block.remain
    

    if(remain[0] === undefined || remain[0] !== ")"){
        return undefined;
    }
    remain = remain.substring(1);


    const ast: AstElseBlockSuf = {
        nodeType: "ELSE_BLOKC_SUF",
        block: block.deliverable as AstCodeBlock
    }

    result = {
        deliverable: ast,
        remain: remain
    }

    return result;
}