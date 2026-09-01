module parser.expr;

import parser.ast_kind;
import parser.literal;
import parser.parser;
import parser.combine;
import parser.primitive;
import parser.ident;
import parser.term;

public ParserSpawner termExpr = ()=>term().wrap(AstKind.TERM_EXPR);

public ParserSpawner expr = ()=>termExpr();