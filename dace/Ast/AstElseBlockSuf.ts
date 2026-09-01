import type { AstCodeBlock } from "./AstCodeBlock"

export type AstElseBlockSuf = {
    nodeType: "ELSE_BLOKC_SUF"
    block: AstCodeBlock
}