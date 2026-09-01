import type { AstExpr } from "../Ast/AstExpr";
import type { AstInfixChainExpr } from "../Ast/AstInfixChainExpr";
import type { AstInfixOpe } from "../Ast/AstInfixOpe";
import type { ParseData } from "../ParseData";
import { parseInfixOpe } from "./parseInfixOpe";
import { parseTerm } from "./parseTerm";
import { parseWs } from "./parseWs";

export function parseInfixChainExpr(code: string): ParseData{
    let result:ParseData;

    let operands: AstExpr[] = [];
    let opes: AstInfixOpe[] = [];

    let temporaryTerm:ParseData;
    let remain:string = "";
    temporaryTerm = parseTerm(code);
    if(temporaryTerm === undefined){
        return undefined
    }else{
        operands[0] = temporaryTerm.deliverable as AstExpr;
        remain = temporaryTerm.remain;
    }

    
    let t = parseWs(remain)
    
    if(t !== undefined){
        remain = t.remain
    }

    let firstOpe:ParseData;
    firstOpe = parseInfixOpe(remain);
    if(firstOpe === undefined){
        return undefined
    }else{
        opes[0] = firstOpe.deliverable as AstInfixOpe;
        remain = firstOpe.remain;
    }
    
    t = parseWs(remain)
    
    if(t !== undefined){
        remain = t.remain
    }

    temporaryTerm = parseTerm(remain);
    if(temporaryTerm === undefined){
        return undefined
    }else{
        operands[1] = temporaryTerm.deliverable as AstExpr;
        remain = temporaryTerm.remain;
    }

    while(1){
        let aditionalOpe:ParseData;
        let aditionalTerms:ParseData;

        t = parseWs(remain)
    
        if(t !== undefined){
            remain = t.remain
        }

        aditionalOpe  = parseInfixOpe(remain);
        if(aditionalOpe === undefined){
            break;
        }else{
            opes.push(aditionalOpe.deliverable as AstInfixOpe);
            remain = aditionalOpe.remain;
        }

        t = parseWs(remain)
    
        if(t !== undefined){
            remain = t.remain
        }

        aditionalTerms = parseTerm(remain);
        if(aditionalTerms === undefined){
            return undefined
        }else{
            operands.push(aditionalTerms.deliverable as AstExpr);
            remain = aditionalTerms.remain;
        }

    }

    let ast: AstInfixChainExpr = {
        nodeType: "INFIX_CHAIN",
        terms: operands,
        opes: opes
    }

    result = {
        remain: remain,
        deliverable: ast
    }

    return result
}