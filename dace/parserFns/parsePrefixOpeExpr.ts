import type { ParseData } from "../ParseData"
import { parsePrefixOpe } from "./parsePrefixOpe"
import { parseWs } from "./parseWs"
import type { AstPrefixOpeExpr } from "../Ast/AstPrefixOpeExpr"
import type { AstPrefixOpe } from "../Ast/AstPrefixOpe"
import type { AstExpr } from "../Ast/AstExpr"
import { parseTerm } from "./parseTerm"

export function parsePrefixOpeExpr(code: string): ParseData{
    let result:ParseData

    const ope = parsePrefixOpe(code)
    if(ope === undefined){
        return undefined
    }
    const t = parseWs(ope.remain)

    let rawOperand = ope.remain
    if(t !== undefined){
        rawOperand = t.remain
    }
    const operand = parseTerm(rawOperand)

    if(operand === undefined){
        return undefined
    }

    const ast:AstPrefixOpeExpr = {
        nodeType: "PREFIX_OPE_EXPR",
        ope: ope.deliverable as AstPrefixOpe,
        operand: operand.deliverable as AstExpr
    }


    result = {
        deliverable: ast,
        remain: operand.remain
    }

    return result
}