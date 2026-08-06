import type { AstExpr } from "./AstExpr"
import type { AstTypeExpr } from "./AstTypeExpr"

export type AstArgList = {
    nodeType: "ARG_LIST",
    names: string[],
    types: AstTypeExpr[],
    defaults: (AstExpr | undefined)[]
}