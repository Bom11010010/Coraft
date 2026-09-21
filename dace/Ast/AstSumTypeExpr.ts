import type { AstTypeExpr } from "./AstTypeExpr"

export type AstSumTypeExpr = {
    nodeType: "SUM_TYPE_EXPR"
    typeTerms: AstTypeExpr[]
}