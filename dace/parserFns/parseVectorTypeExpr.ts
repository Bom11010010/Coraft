import type { AstTypeDecl } from "../Ast/AstTypeDecl";
import type { AstTypeExpr } from "../Ast/AstTypeExpr";
import type { ParseData } from "../ParseData";
import { parseKeyword } from "./parseKeyword";
import { parseTypeExpr } from "./parseTypeExpr";
import { parseWs } from "./parseWs";

export function parseVectorTypeExpr(code: string): ParseData{
    let result:ParseData;
    let remain: string = code;

    const kw = parseKeyword(remain);
    if(kw === undefined || kw.deliverable.nodeType !== "KEYWORD" || kw.deliverable.name !== "vec"){
        return undefined;
    }
    remain = kw.remain;

    let t = parseWs(remain);
    
    if (t !== undefined){
        remain = t.remain;
    }    
    
    if(remain[0] === undefined || remain[0] !== "["){
        return undefined;
    }

    remain = remain.substring(1);

    t = parseWs(remain);
    if(t !== undefined){
        remain = t.remain;
    }

    const type = parseTypeExpr(remain);

    if(type?.deliverable === undefined){
        return undefined
    }
    remain = type.remain

    t = parseWs(remain);
    if(t !== undefined){
        remain = t.remain;
    }
    
    if(remain[0] === undefined || remain[0] !== "]"){
        return undefined;
    }
    remain = remain.substring(1);

    result = {
        deliverable: {
            nodeType: "VECTOR_TYPE_EXPR",
            type: type.deliverable as AstTypeExpr
        },
        remain: remain
    }

    return result;
}