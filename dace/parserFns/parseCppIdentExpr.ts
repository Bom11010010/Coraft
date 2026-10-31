import type { AstNode } from "../Ast/AstNode";
import type { AstTypeExpr } from "../Ast/AstTypeExpr";
import type { ParseData } from "../ParseData";
import { parseFnTypeExpr } from "./parseFnTypeExpr";
import { parseKeyword } from "./parseKeyword";
import { parseStrLiteral } from "./parseStrLiteral";
import { parseTypeExpr } from "./parseTypeExpr";
import { parseWs } from "./parseWs";

export function parseCppIdentExpr(code: string): ParseData{
    let result:ParseData;
    let remain: string = code;

    const kw = parseKeyword(remain);
    if(kw === undefined || kw.deliverable.nodeType !== "KEYWORD" || kw.deliverable.name !== "cpp_import"){
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
    console.log(remain)

    t = parseWs(remain);
    if (t !== undefined){
        remain = t.remain;
    }

    const headerData = parseStrLiteral(remain);
    let header = "";
    if (headerData === undefined || headerData.deliverable.nodeType !== "STR_LITERAL"){
        return undefined;
    }
    header = headerData.deliverable.body;
    remain = headerData.remain;
    
    t = parseWs(remain);
    if (t !== undefined){
        remain = t.remain;
    }
    
    if(remain[0] === undefined || remain[0] !== ","){
        return undefined;
    }
    remain = remain.substring(1);
    
    t = parseWs(remain);
    if (t !== undefined){
        remain = t.remain;
    }

    const nameData = parseStrLiteral(remain);
    let name = "";
    if (nameData === undefined || nameData.deliverable.nodeType !== "STR_LITERAL"){
        return undefined;
    }

    name = nameData.deliverable.body;
    remain = nameData.remain;

    t = parseWs(remain);
    if (t !== undefined){
        remain = t.remain;
    }
    
    if(remain[0] === undefined || remain[0] !== ","){
        return undefined;
    }
    remain = remain.substring(1);
    
    t = parseWs(remain);
    if (t !== undefined){
        remain = t.remain;
    }

    const typeBody = parseTypeExpr(remain);
    let type:AstTypeExpr;
    
    if (typeBody === undefined || typeBody.deliverable.nodeType !== "FN_TYPE_EXPR"){
        return undefined;
    }
    
    type = typeBody.deliverable;
    remain = typeBody.remain;
    
    t = parseWs(remain);
    if (t !== undefined){
        remain = t.remain;
    }

    if(remain[0] === undefined && remain[0] !== "]"){
        return undefined;
    }
    remain = remain.substring(1);

    result = {
        deliverable: {
            nodeType: "CPP_IDENT_EXPR",
            header: header,
            name: name,
            type: type
        },
        remain: remain
    }

    return result;
}