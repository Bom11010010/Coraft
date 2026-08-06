import type { AstArgList } from "./AstArgList"
import type { AstBlockBody } from "./AstBlockBody"
import type { AstBlockSuf } from "./AstBlockSuf"
import type { AstCode } from "./AstCode"
import type { AstCodeBlock } from "./AstCodeBlock"
import type { AstExpr } from "./AstExpr"
import type { AstName } from "./AstName"
import type { AstOpe } from "./AstOpe"
import type { AstStmt } from "./AstStmt"
import type { AstTrivia } from "./AstTrivia"
import type { AstTypeExpr } from "./AstTypeExpr"

export type AstNode = AstExpr | {nodeType: "EMPTY"} | AstOpe | AstTrivia | AstStmt | AstCodeBlock | AstName | AstTypeExpr | AstArgList | AstCode | AstBlockSuf | AstBlockBody