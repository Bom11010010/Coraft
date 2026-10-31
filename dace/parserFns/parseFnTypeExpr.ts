import type { AstIdent } from "../Ast/AstIdent";
import type { AstName } from "../Ast/AstName";
import type { AstNode } from "../Ast/AstNode";
import type { AstTypeExpr } from "../Ast/AstTypeExpr";
import type { ParseData } from "../ParseData";
import { parseIdent } from "./parseIdent";
import { parseTypeExpr } from "./parseTypeExpr";
import { parseWs } from "./parseWs";

export function parseFnTypeExpr(code: string): ParseData{
    let result:ParseData
    let remain = code;

    let paramTypes = [];
    let paramNames = undefined;
    
    let t = parseWs(remain);
        
    if (t !== undefined){
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

    if(remain[0] !== undefined && remain[0] === ")"){
    }else{
        let isNamed = false; //are params named?
        let temporaryRemain = remain;
        let temporaryIdent = parseIdent(temporaryRemain);
        if(temporaryIdent === undefined){ // 識別子じゃないなら型式であることを期待する。
            isNamed = false;
        }else{
            temporaryRemain = temporaryIdent.remain;
            
            t = parseWs(temporaryRemain);
            if(t !== undefined){
                temporaryRemain = t.remain;
            }

            let temporaryTypeExpr = parseTypeExpr(temporaryRemain);

            if(temporaryTypeExpr === undefined){ //一項目の次の項が型式じゃないなら仮引数に名前をつけていないということ。
                isNamed = false;
            }else{
                paramNames = [];
                isNamed = true;
            }
        }

        while (1){
            if(isNamed){
                let paramName = parseIdent(remain)
                if(paramName === undefined){
                    return undefined;
                }
                if(paramNames !== undefined){
                    paramNames.push(paramName.deliverable as AstIdent);
                }
                let typeExpr = parseTypeExpr(remain)
                if(typeExpr === undefined){
                    return undefined;
                }
                paramTypes.push(typeExpr.deliverable as AstTypeExpr);

                remain = typeExpr.remain;

                t = parseWs(remain);
                if(t !== undefined){
                    remain = t.remain;
                }
                
            }else{
                let typeExpr = parseTypeExpr(remain)
                if(typeExpr === undefined){
                    return undefined;
                }
                paramTypes.push(typeExpr.deliverable as AstTypeExpr);

                remain = typeExpr.remain;

                t = parseWs(remain);
                if(t !== undefined){
                    remain = t.remain;
                }
            }
            
            if(remain[0] !== undefined && remain[0] === ","){
                remain = remain.substring(1);
                
                t = parseWs(remain);
                if(t !== undefined){
                    remain = t.remain;
                }
                
                continue;
            }else if(remain[0] !== undefined && remain[0] === ")"){
                remain = remain.substring(1);
                break;
            }else{
                return undefined;
            }
        }
        

    }
    
    t = parseWs(remain);
    if (t !== undefined){
        remain = t.remain;
    }

    if(remain.substring(0, 2) === undefined && remain.substring(0, 2) !== "->"){
        return undefined;
    }
    remain = remain.substring(2);
    
    t = parseWs(remain);
    if (t !== undefined){
        remain = t.remain;
    }

    let returnTypeExpr = parseTypeExpr(remain);
    if(returnTypeExpr === undefined){
        return undefined
    }
    remain = returnTypeExpr.remain;
    let returnType = returnTypeExpr.deliverable;

    result = {
        remain: remain,
        deliverable: {
            nodeType: "FN_TYPE_EXPR",
            returnType: returnType as AstTypeExpr,
            paramTypes: paramTypes,
            paramNames: paramNames
        }
    }

    return result;
}