import type { AstTypeExpr } from "./AstTypeExpr"

export type AstUnionTypeExpr = {
    nodeType: "UNION_TYPE_EXPR"
    types: AstTypeExpr[]
}