import type { AstPrefixOpe } from "../Ast/AstPrefixOpe";
import type { ParseData } from "../ParseData"

export function parsePrefixOpe(code: string): ParseData{
    let result:ParseData;

    let ast: AstPrefixOpe = {
        nodeType: "PREFIX_OPE",
        body: ""
    }
    
    let probablyOperator = code[0];
    if(probablyOperator === undefined){
        return undefined;
    }

    if(["-","!","~"].includes(probablyOperator)){
        ast.body = probablyOperator
        result = {
            remain: code.substring(1),
            deliverable: ast
        }
    }
    

    return result
}