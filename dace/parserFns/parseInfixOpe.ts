import type { AstInfixOpe } from "../Ast/AstInfixOpe";
import type { ParseData } from "../ParseData"

export function parseInfixOpe(code: string): ParseData{
    let result:ParseData;

    let ast: AstInfixOpe = {
        nodeType: "INFIX_OPE",
        body: ""
    }
    let valid = false;
    let body = "";
    const opeList = ["+", "-", "*", "/", "=", "%", "<", ">", "==", "!=", ">=", "<="];
    for(let i = 0; i < opeList.length; i++){
        if(opeList[i] == code.substring(0, opeList[i]?.length)){
            valid = true;
            body = opeList[i] as string;
        }
    }
    if(!valid){
        return undefined;
    }
    

    if(valid){
        ast.body = body
        result = {
            remain: code.substring(body.length),
            deliverable: ast
        }
    }
    

    return result
}