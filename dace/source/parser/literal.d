module parser.literal;

import parser.ast_kind;
import parser.parser;
import parser.combine;
import parser.primitive;
import parser.basic_words;
import parser.literal_util;
import parser.number_literal;
import parser.string_literal;
import parser.other_literal;

public ParserSpawner literal = ()=>choice([strLiteral(), numberLiteral(), nullLiteral(), boolLiteral()]);

