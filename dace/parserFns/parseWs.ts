import type { AstWs } from "../Ast/AstWs";
import type { ParseData } from "../ParseData"
import type { TranspileContext } from "../TranspileContext"

export function parseWs(code: string): ParseData{
    let result:ParseData

    let i = 0;

    for (const c of code) {
        if (" \t\r\n".includes(c)){
            i++
        }else{
            break
        }
    }
    let ast: AstWs = {
        nodeType: "WS",
        body: code.substring(0,i)
    }

    result = {
        remain: code.substring(i),
        deliverable: ast
    }

    return result
}