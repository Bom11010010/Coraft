import type { AstCodeBlock } from "./AstCodeBlock"
import type { AstExpr } from "./AstExpr"

export type AstReturnStmt = {
    nodeType: "RETURN_STMT"
    body: AstExpr
    block: AstCodeBlock
}