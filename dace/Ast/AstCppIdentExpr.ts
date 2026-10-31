import type { AstTypeExpr } from "./AstTypeExpr"

export type AstCppIdentExpr = {
    nodeType: "CPP_IDENT_EXPR",
    header: string,
    name: string,
    type: AstTypeExpr
}