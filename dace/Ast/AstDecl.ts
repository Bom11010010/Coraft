import type { AstFnDecl } from "./AstFnDecl";
import type { AstStructDecl } from "./AstStructDecl";
import type { AstTypeDecl } from "./AstTypeDecl";
import type { AstVarDecl } from "./AstVarDecl";

export type AstDecl = AstTypeDecl | AstVarDecl | AstFnDecl | AstStructDecl