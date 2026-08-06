import type { AstNumberLiteral } from "../Ast/AstNumberLiteral";
import type { ParseData } from "../ParseData";

export function parseNumberLiteral(code: string): ParseData{
    let result:ParseData

    let i = 0;

    for (const c of code) {
        if ("0123456789".includes(c)){
            i++
        }else{
            break
        }
    }
    let ast: AstNumberLiteral = {
        nodeType: "NUM_LITERAL",
        radix: 10,
        body: code.substring(0,i)
    }
    if(i == 0){
        return undefined;
    }

    result = {
        remain: code.substring(i),
        deliverable: ast
    }

    return result
}