module parser.ast_kind;

enum AstKind
{
    UNKNOWN,
    TOKEN,
    TERM,
    PRE_OPE_TERM,
    LITERAL_TERM,
    BOOL_LITERAL,
    NULL_LITERAL,
    NUMBER_LITERAL_BODY,
    NUMBER,
    INT,
    LITERAL_SUF,
    LITERAL_SUF_STREAM,
    FLOAT,
    INT_LITERAL,
    FLOAT_LOTERAL,
    OTHER,
}