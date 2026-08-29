module parser.term;

import parser.ast_kind;
import parser.number_literal;
import parser.parser;
import parser.combine;
import parser.primitive;
import std.typecons;
import std.stdio;

public ParserSpawner prefixOpeTerm = ()=>choiceToken(["++", "--", "~", "!", "+", "-"]).then(term()).
    setKind(AstKind.PRE_OPE_TERM);

public ParserSpawner term = ()=> numberLiteral().wrap(AstKind.LITERAL_TERM).or(prefixOpeTerm());