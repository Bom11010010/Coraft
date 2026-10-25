import type { AstIdent } from "./AstIdent"
import type { AstTypeExpr } from "./AstTypeExpr"

export type AstFnTypeExpr = {
    nodeType: "FUNCTION_TYPE_EXPR"
    paramTypes: AstTypeExpr[]
    paramNames: AstIdent[] | undefined
    returnType: AstTypeExpr
}