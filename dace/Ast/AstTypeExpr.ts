import type { AstBuiltinType } from "./AstBuiltinType";
import type { AstIdent } from "./AstIdent";
import type { AstInstantStructTypeExpr } from "./AstInstantStructTypeExpr";
import type { AstSumTypeExpr } from "./AstSumTypeExpr";

export type AstTypeExpr = AstBuiltinType | AstSumTypeExpr | AstInstantStructTypeExpr | AstIdent