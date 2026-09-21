import type { AstTypeExpr } from "./AstTypeExpr"

export type AstStructDecl = {
    nodeType: "STRUCT_DECL",
    name: string,
    entryNames: string[],
    entryTypes: AstTypeExpr[]
}