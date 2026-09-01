import type { ParseData } from "../ParseData"
import { parseExpr } from "./parseExpr"
import { parseFnCall } from "./parseFnCall"
import { parseIdent } from "./parseIdent"
import { parseLiteral } from "./parseLiteral"
import { parsePrefixOpeExpr } from "./parsePrefixOpeExpr"
import { parseWs } from "./parseWs"

export function parseTerm(code: string): ParseData{
    let result:ParseData
    if((result = parseFnCall(code)) !== undefined){
    }else if((result = parsePrefixOpeExpr(code)) !== undefined){
    }else if((result = parseLiteral(code)) !== undefined){
    }else if((result = parseIdent(code)) !== undefined){
    }else{
        if(code[0] !== "("){
            return undefined
        }
        let remain = code.substring(1);
        
        let t = parseWs(remain)
        
        if(t !== undefined){
            remain = t.remain;
        }
        let content = parseExpr(remain);

        if (content === undefined){
            return undefined
        }

        remain = content.remain;

        t = parseWs(remain)
        
        if(t !== undefined){
            remain = t.remain;
        }
        if (remain[0] !== ")"){
            return undefined
        }

        return {
            remain: remain.substring(1),
            deliverable: content.deliverable
        }
    }

    return result
}