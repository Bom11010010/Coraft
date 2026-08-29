module parser.other_literal;

import parser.ast_kind;
import parser.parser;
import parser.combine;
import parser.primitive;
import parser.basic_words;

public ParserSpawner boolLiteral = ()=>choiceToken(["true", "false"]).setKind(AstKind.BOOL_LITERAL);

public ParserSpawner nullLiteral = ()=>token("null").setKind(AstKind.NULL_LITERAL);