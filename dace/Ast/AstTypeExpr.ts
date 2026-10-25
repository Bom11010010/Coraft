import type { AstBuiltinType } from "./AstBuiltinType";
import type { AstFnTypeExpr } from "./AstFnTypeExpr";
import type { AstIdent } from "./AstIdent";
import type { AstInstantStructTypeExpr } from "./AstInstantStructTypeExpr";
import type { AstSumTypeExpr } from "./AstSumTypeExpr";
import type { AstVectorTypeExpr } from "./AstVectorTypeExpr";

export type AstTypeExpr = AstBuiltinType | AstSumTypeExpr | AstInstantStructTypeExpr | AstIdent | AstVectorTypeExpr | AstFnTypeExpr