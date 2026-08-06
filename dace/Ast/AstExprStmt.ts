import type { AstCodeBlock } from "./AstCodeBlock"
import type { AstExpr } from "./AstExpr"

export type AstExprStmt = {
    nodeType: "EXPR_STMT"
    body: AstExpr
    block: AstCodeBlock
}