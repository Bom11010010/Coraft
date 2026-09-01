import type { ParseData } from "../ParseData"

export function parseEmptyCodeBlock(code: string): ParseData{
    let result:ParseData

    if(code[0] === undefined || code[0] !== ";"){
        return undefined
    }

    result = {
        remain: code.substring(1),
        deliverable: {nodeType: "EMPTY_CODE_BLOCK"}
    }

    return result
}