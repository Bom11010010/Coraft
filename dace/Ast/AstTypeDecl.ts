
import type { AstTypeExpr } from "./AstTypeExpr"

export type AstTypeDecl = {
    nodeType: "TYPE_DECL",
    name: string,
    body: AstTypeExpr
}