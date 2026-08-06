import type { AstFnCall } from "./AstFnCall";
import type { AstInfixChainExpr } from "./AstInfixChainExpr";
import type { AstLiteral } from "./AstLiteral";
import type { AstPrefixOpeExpr } from "./AstPrefixOpeExpr";

export type AstExpr = AstLiteral | AstInfixChainExpr | AstPrefixOpeExpr | AstFnCall