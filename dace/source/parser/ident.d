module parser.ident;

import std.ascii;
import std.conv;
import parser.ast_kind;
import parser.parser;
import parser.combine;
import parser.primitive;
import parser.basic_words;
import parser.literal_util;
import parser.number_literal;
import parser.string_literal;
import parser.other_literal;
import parser.expr;

public ParserSpawner ident = ()=>satisfy((dchar c)=>isAlpha(c) | (c.to!string() == "_")).then(optional(alphanumWord())).
    map!(strStreamCombine).setKind(AstKind.IDENT);


public ParserSpawner genericsParams = ()=>token("<").
    then(optional(
        ident().
        then(
            many(
                expect(token(",")).
                then(ident().or( token("(").then(expr()).then(token(")")))).
                    map!((ParserContent c) => c.isLeaf ? createLeaf(c.node[1].leaf) : createNode(c.node[1].node))
            )
        )
    )).
    then(token(">")).
    setKind(AstKind.GENERICS_PARAMS);

public ParserSpawner identInstance = ()=>ident().then(optional(genericsParams()));