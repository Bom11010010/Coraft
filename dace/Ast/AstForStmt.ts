import type { AstCodeBlock } from "./AstCodeBlock"
import type { AstDecl } from "./AstDecl"
import type { AstExpr } from "./AstExpr"
import type { AstExprStmt } from "./AstExprStmt"

export type AstForStmt = {
    nodeType: "FOR_STMT"
    init: AstDecl
    cond: AstExprStmt
    update: AstExpr | undefined
    block: AstCodeBlock
}