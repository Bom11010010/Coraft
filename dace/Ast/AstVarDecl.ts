
import type { AstCodeBlock } from "./AstCodeBlock"
import type { AstExpr } from "./AstExpr"
import type { AstTypeExpr } from "./AstTypeExpr"

export type AstVarDecl = {
    nodeType: "VAR_DECL",
    name: string,
    initial: AstExpr,
    type: AstTypeExpr,
    block: AstCodeBlock
}