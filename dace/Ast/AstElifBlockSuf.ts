import type { AstCodeBlock } from "./AstCodeBlock"
import type { AstExpr } from "./AstExpr"

export type AstElifBlockSuf = {
    nodeType: "ELIF_BLOCK_SUF"
    cond: AstExpr
    block: AstCodeBlock
}