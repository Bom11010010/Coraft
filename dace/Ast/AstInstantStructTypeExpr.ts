import type { AstTypeExpr } from "./AstTypeExpr"

export type AstInstantStructTypeExpr = {
    nodeType: "INSTANT_STRUCT_TYPE_EXPR"
    name: string | undefined
    entryNames: string[]
    entryTypes: AstTypeExpr[]
}