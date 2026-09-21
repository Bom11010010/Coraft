import type { AstIdent } from "../Ast/AstIdent";
import type { AstNode } from "../Ast/AstNode";
import type { AstTypeExpr } from "../Ast/AstTypeExpr";
import type { ParseData } from "../ParseData";
import { parseBuiltinType } from "./parseBuiltinType";
import { parseCodeBlock } from "./parseCodeBlock";
import { parseIdent } from "./parseIdent";
import { parseKeyword } from "./parseKeyword";
import { parseTypeExpr } from "./parseTypeExpr";
import { parseWs } from "./parseWs";

export function parseTypeDecl(code: string): ParseData{
    let result:ParseData;

    let remain: string;

    let keyword = parseKeyword(code);

    if(keyword === undefined || keyword.deliverable.nodeType !== "KEYWORD"){
        return undefined;
    }

    if (keyword.deliverable.name !== "type"){
        return undefined;
    }

    remain = keyword.remain;


    let t = parseWs(remain)
            
    if(t !== undefined){
        remain = t.remain;
    }

    let name = parseIdent(remain);
      
    if(name === undefined){
        return undefined;
    }
    
    remain = name.remain;

    t = parseWs(remain)
            
    if(t !== undefined){
        remain = t.remain;
    }

    if(remain[0] !== "="){
        return undefined;
    }else{
        remain = remain.substring(1);
    }
    
    t = parseWs(remain)
            
    if(t !== undefined){
        remain = t.remain;
    }

    let body = parseTypeExpr(remain);

    if(body === undefined){
        return undefined;
    }

    remain = body.remain;
    
    const block = parseCodeBlock(remain)

    if(block === undefined){
        return undefined
    }
    remain = block.remain;

    let nameAst = name.deliverable as AstIdent

    result = {
        remain: remain,
        deliverable: {
            nodeType: "TYPE_DECL",
            name: nameAst.name,
            body: body.deliverable as AstTypeExpr
        }
    }


    return result;
}