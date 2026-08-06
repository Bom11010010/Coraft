import type { AstCodeBlock } from "./AstCodeBlock"
import type { AstExpr } from "./AstExpr"

export type AstIfStmt = {
    nodeType: "IF_STMT"
    cond: AstExpr
    block: AstCodeBlock
}