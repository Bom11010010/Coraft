import type { AstDecl } from "./AstDecl"

export type AstCode = {
    nodeType: "CODE"
    decls: AstDecl[]
}