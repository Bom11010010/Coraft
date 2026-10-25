import type { AstTypeExpr } from "./AstTypeExpr"

export type AstVectorTypeExpr = {
    nodeType: "VECTOR_TYPE_EXPR"
    type: AstTypeExpr
}