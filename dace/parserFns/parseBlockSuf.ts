import type { ParseData } from "../ParseData"
import { parseElifBlockSuf } from "./parseElifBlockSuf"
import { parseElseBlockSuf } from "./parseElseBlockSuf"

export function parseBlockSuf(code: string): ParseData{
    let result:ParseData

    if((result = parseElseBlockSuf(code)) !== undefined){
    }else if((result = parseElifBlockSuf(code)) !== undefined){
    }

    return result
}