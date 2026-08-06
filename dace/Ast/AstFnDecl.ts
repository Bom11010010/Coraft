
import type { AstArgList } from "./AstArgList"
import type { AstCodeBlock } from "./AstCodeBlock"
import type { AstTypeExpr } from "./AstTypeExpr"

export type AstFnDecl = {
    nodeType: "FN_DECL",
    name: string,
    args: AstArgList,
    returnType: AstTypeExpr,
    block: AstCodeBlock
}