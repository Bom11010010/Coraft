import type { AstBoolLiteral } from "./AstBoolLiteral";
import type { AstNullLiteral } from "./AstNullLiteral";
import type { AstNumberLiteral } from "./AstNumberLiteral";
import type { AstStrLiteral } from "./AstStrLiteral";

export type AstLiteral = AstNumberLiteral | AstBoolLiteral | AstNullLiteral | AstStrLiteral