import type { AstExpr } from "../Ast/AstExpr";
import type { AstFnCall } from "../Ast/AstFnCall";
import type { AstIdent } from "../Ast/AstIdent";
import type { ParseData } from "../ParseData";
import { parseExpr } from "./parseExpr";
import { parseIdent } from "./parseIdent";
import { parseWs } from "./parseWs";

export function parseFnCall(code: string): ParseData{
    let result:ParseData
    let remain = code;
    let args:AstExpr[] = [];

    const fnName = parseIdent(remain);
    if(fnName === undefined || fnName.deliverable.nodeType !== "IDENT"){
        return undefined;
    }
    remain = fnName.remain;
    let t = parseWs(remain);
    if(t !== undefined){
        remain = t.remain;
    }
    
    if(remain[0] === undefined || remain[0] !== "("){
        return undefined;
    }
    remain = remain.substring(1);
    t = parseWs(remain);
    if(t !== undefined){
        remain = t.remain;
    }
    if(remain[0] !== undefined && remain[0] !== ")"){
        while(1){
            t = parseWs(remain);
            if(t !== undefined){
                remain = t.remain;
            }

            let arg = parseExpr(remain);
            if(arg === undefined){
                return undefined;
            }
            args.push(arg.deliverable as AstExpr);
            remain = arg.remain;

            if(remain[0] === ")"){
                remain = remain.substring(1);
                break;
            }else if(remain[0] !== ","){
                return undefined;
            }
            remain = remain.substring(1);
            
        }
    }else{
        remain = remain.substring(1);
    }

    const ast:AstFnCall = {
        nodeType: "FN_CALL",
        name: fnName.deliverable as AstIdent,
        args: args
    }

    result = {
        deliverable: ast,
        remain: remain
    }
    

    return result;
}