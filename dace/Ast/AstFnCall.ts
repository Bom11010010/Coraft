import type { AstExpr } from "./AstExpr"
import type { AstIdent } from "./AstIdent"

export type AstFnCall = {
    nodeType: "FN_CALL"
    name: AstIdent
    args: AstExpr[]
}