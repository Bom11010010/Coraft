import type { ParseData } from "../ParseData";
import { parseBuiltinType } from "./parseBuiltinType";
import { parseIdent } from "./parseIdent";
import { parseInstantStructTypeExpr } from "./parseInstantStructTypeExpr";
import { parseTypeExpr } from "./parseTypeExpr";
import { parseWs } from "./parseWs";

export function parseTypeTerm(code: string): ParseData{
    let result:ParseData;

    if((result = parseBuiltinType(code)) !== undefined){
    }else if((result = parseInstantStructTypeExpr(code)) !== undefined){
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
        let content = parseTypeExpr(remain);    
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

    return result;
}