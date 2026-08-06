import type { AstNode } from "./Ast/AstNode"


export type TranspileContext = {
    coraftCode : string
    corraftAst : AstNode

    ir         : any  //型は未定

    cppAst     : AstNode
    cppCode    : string
    
    hppAst     : AstNode
    hppCode    : string

    includeListForCpp: string[]
    includeListForHpp: string[]
}