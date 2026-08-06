import type { AstCodeBlock } from "./AstCodeBlock";
import type { AstDecl } from "./AstDecl";
import type { AstExprStmt } from "./AstExprStmt";
import type { AstForStmt } from "./AstForStmt";
import type { AstIfStmt } from "./AstIfStmt";
import type { AstReturnStmt } from "./AstReturnStmt";
import type { AstSayStmt } from "./AstSayStmt";

export type AstStmt = AstExprStmt | AstSayStmt | AstDecl | AstCodeBlock | AstReturnStmt | AstForStmt | AstIfStmt