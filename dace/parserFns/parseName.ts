import type { AstAbstractName } from "../Ast/AstAbstractName";
import type { ParseData } from "../ParseData";

export function parseName(code: string): ParseData{
    let result:ParseData

    let i = 0;

    const initialChar = code[0];
    if(initialChar === undefined){
        return undefined;
    }

    if(!("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_".includes(initialChar))){
        return undefined;
    }

    for (const c of code) {
        if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789".includes(c)){
            i++
        }else{
            break
        }
    }
    let ast: AstAbstractName = {
        nodeType: "ABSTRACT_NAME",
        name: code.substring(0,i)
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