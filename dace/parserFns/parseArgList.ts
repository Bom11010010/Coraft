import type { AstArgList } from "../Ast/AstArgList";
import type { AstExpr } from "../Ast/AstExpr";
import type { AstTypeExpr } from "../Ast/AstTypeExpr";
import { parseBuiltinType } from "./parseBuiltinType";
import type { ParseData } from "../ParseData";
import { parseIdent } from "./parseIdent";
import { parseWs } from "./parseWs";

export function parseArgList(code: string): ParseData{
    let result:ParseData
    let remain: string = code;

    if(remain[0] === undefined || remain[0] !== "("){
        return undefined;
    }

    remain = remain.substring(1);

    let names: string[] = [];
    let types: AstTypeExpr[] = [];
    let defaults: (AstExpr | undefined)[] = [];

    let t: ParseData;
    
    if(remain[0] !== undefined && remain[0] === ")"){
        remain = remain.substring(1);
        return {
            remain: remain,
            deliverable: {
                nodeType: "ARG_LIST",
                names: [],
                types: [],
                defaults: []
            }
        };
    }
    while(1){
        t = parseWs(remain);
        if(t !== undefined){
            remain = t.remain;
        }
        

        let name = parseIdent(remain);
        if(name === undefined || name.deliverable.nodeType !== "IDENT"){
            return undefined;
        }
        names.push(name.deliverable.name);
        remain = name.remain;

        t = parseWs(remain);
        if(t !== undefined){
            remain = t.remain;
        }
        
        let type = parseBuiltinType(remain);
        if(type === undefined){
            return undefined;
        }
        types.push(type.deliverable as AstTypeExpr);
        remain = type.remain;

        t = parseWs(remain);
        if(t !== undefined){
            remain = t.remain;
        }

        if(remain[0] !== undefined){
            if(remain[0] === ")"){
                remain = remain.substring(1);
                break; 
            }else if(remain[0] !== ","){
                return undefined;
            }
        }
        remain = remain.substring(1);

    }

    const ast:AstArgList = {
        nodeType: "ARG_LIST",
        names: names,
        types: types,
        defaults: []
    }

    result = {
        deliverable: ast,
        remain: remain
    }

    return result;
}