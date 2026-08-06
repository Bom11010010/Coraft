import type { AstStmt } from "./AstStmt"

export type AstConcreteBlock = {
    nodeType: "CONCRETE_BLOCK",
    stmts: AstStmt[]
}