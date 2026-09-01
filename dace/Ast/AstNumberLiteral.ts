export type AstNumberLiteral = {
    nodeType: "NUM_LITERAL"
    radix: 2 | 8 | 10 | 16
    body: string
}