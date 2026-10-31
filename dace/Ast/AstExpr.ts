import type { AstCppIdentExpr } from "./AstCppIdentExpr";
import type { AstFnCall } from "./AstFnCall";
import type { AstIdent } from "./AstIdent";
import type { AstInfixChainExpr } from "./AstInfixChainExpr";
import type { AstLiteral } from "./AstLiteral";
import type { AstPrefixOpeExpr } from "./AstPrefixOpeExpr";

export type AstExpr = AstLiteral | AstInfixChainExpr | AstPrefixOpeExpr | AstFnCall | AstIdent | AstCppIdentExpr