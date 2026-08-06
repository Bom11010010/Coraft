import type { AstExpr } from "./AstExpr"
import type { AstPrefixOpe } from "./AstPrefixOpe"

export type AstPrefixOpeExpr = {
    nodeType: "PREFIX_OPE_EXPR"
    ope: AstPrefixOpe
    operand: AstExpr
}