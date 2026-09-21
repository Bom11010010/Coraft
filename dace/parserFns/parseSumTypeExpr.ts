import type { AstSumTypeExpr } from "../Ast/AstSumTypeExpr";
import type { AstTypeExpr } from "../Ast/AstTypeExpr";
import type { ParseData } from "../ParseData";
import { parseTypeTerm } from "./parseTypeTerm";
import { parseWs } from "./parseWs";

export function parseSumTypeExpr(code: string): ParseData{
    let result:ParseData;

    let operands: AstTypeExpr[] = [];

    let temporaryTerm:ParseData;
    let remain: string = "";

    temporaryTerm = parseTypeTerm(code);
    if(temporaryTerm === undefined){
        return undefined;
    }else{
        operands[0] = temporaryTerm.deliverable as AstTypeExpr;
        remain = temporaryTerm.remain;
    }

    let t = parseWs(remain);

    if (t !== undefined){
        remain = t.remain;
    }

    if(remain[0] !== "|"){
        return undefined;
    }else{
        remain = remain.substring(1);
    }

    t = parseWs(remain);

    if (t !== undefined){
        remain = t.remain;
    }

    temporaryTerm = parseTypeTerm(remain);
    if(temporaryTerm === undefined){
        return undefined;
    }else{
        operands[1] = temporaryTerm.deliverable as AstTypeExpr;
        remain = temporaryTerm.remain;
    }

    let aditionalTerms:ParseData;
    while(1){

        t = parseWs(remain);
        if(t !== undefined){
            remain = t.remain;
        }
    
        if(remain[0] !== "|"){
            break;
        }else{
            remain = remain.substring(1);
        }
        
        t = parseWs(remain);
        if(t !== undefined){
            remain = t.remain;
        }
    
        aditionalTerms = parseTypeTerm(remain);
        if(aditionalTerms === undefined){
            return undefined;
        }else{
            operands.push(aditionalTerms.deliverable as AstTypeExpr);
            remain = aditionalTerms.remain;
        }
    }

    let ast: AstSumTypeExpr = {
        nodeType: "SUM_TYPE_EXPR",
        typeTerms: operands
    }

    result = {
        remain: remain,
        deliverable: ast
    }
    
    return result;
}