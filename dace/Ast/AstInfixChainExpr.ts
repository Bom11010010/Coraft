import type { AstExpr } from "./AstExpr"
import type { AstInfixOpe } from "./AstInfixOpe"

export type AstInfixChainExpr = {
    nodeType: "INFIX_CHAIN"
    terms: AstExpr[]
    opes: AstInfixOpe[]
}