import type { AstCodeBlock } from "./AstCodeBlock"
import type { AstExpr } from "./AstExpr"

export type AstSayStmt = {
    nodeType: "SAY_STMT"
    body: AstExpr
    block: AstCodeBlock
}