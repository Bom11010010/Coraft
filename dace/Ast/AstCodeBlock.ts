import type { AstBlockBody } from "./AstBlockBody";
import type { AstBlockSuf } from "./AstBlockSuf";

export type AstCodeBlock = {
    nodeType: "CODE_BLOCK"
    body: AstBlockBody
    suf: AstBlockSuf | undefined
}