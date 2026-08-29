module parser.number_literal;

import parser.ast_kind;
import parser.parser;
import parser.combine;
import parser.primitive;
import parser.basic_words;
import std.array;
import std.stdio;
import std.conv;

import std.typecons;

public alias decimalNaturalNumber = ()=>choice([token("0d"), pureValue(createLeaf("0d"))]).
    then(decimalNumber());

public ParserSpawner binNaturalNumber = ()=>token("0b").
    then(binNumber());

public ParserSpawner octNaturalNumber = ()=>token("0o").
    then(octNumber());

public ParserSpawner hexNaturalNumber = ()=>token("0x").
    then(hexNumber());

public ParserSpawner numberSign = ()=>choice([
        choiceToken(["+", "-"]),
        pureValue(createLeaf("+"))
    ]);

public ParserSpawner naturalNumber = ()=>choice([
        binNaturalNumber(),
        octNaturalNumber(),
        hexNaturalNumber(),
        decimalNaturalNumber()
]);

public ParserSpawner intValue = ()=>numberSign().then(naturalNumber()).setKind(AstKind.INT);

public ParserSpawner decimalPositiveFloatNumber = ()=>choice([token("0d"), pureValue(createLeaf("0d"))]).
    then(decimalNumber()).
    thenExpect(token(".")).
    then(choice([decimalNumber(), pureValue(createLeaf("0"))])).
    map!((ParserContent c)=>createNode(c.node[0].node[0], c.node[0].node[1], c.node[1]));

public ParserSpawner binPositiveFloatNumber = ()=>token("0b").
    then(binNumber()).
    thenExpect(token(".")).
    then(choice([binNumber(), pureValue(createLeaf("0"))])).
    map!((ParserContent c)=>createNode(c.node[0].node[0], c.node[0].node[1], c.node[1]));

public ParserSpawner octPositiveFloatlNumber = ()=>token("0o").
    then(octNumber()).
    thenExpect(token(".")).
    then(choice([octNumber(), pureValue(createLeaf("0"))])).
    map!((ParserContent c)=>createNode(c.node[0].node[0], c.node[0].node[1], c.node[1]));

public ParserSpawner hexPositiveFloatlNumber = ()=>token("0x").
    then(hexNumber()).
    thenExpect(token(".")).
    then(choice([hexNumber(), pureValue(createLeaf("0"))])).
    map!((ParserContent c)=>createNode(c.node[0].node[0], c.node[0].node[1], c.node[1]));

public ParserSpawner positiveFloatlNumber = ()=>choice([
        binPositiveFloatNumber(),
        octPositiveFloatlNumber(),
        hexPositiveFloatlNumber(),
        decimalPositiveFloatNumber()
]).setKind(AstKind.FLOAT);

public ParserSpawner floatlNumber = ()=>numberSign().then(positiveFloatlNumber());

public ParserSpawner numberLiteralBody = ()=>choice([
    floatlNumber(), 
    intValue()
]).setKind(AstKind.NUMBER_LITERAL_BODY);

public ParserSpawner numberLiteralSuf = ()=>choiceToken(["U", "_8", "_16", "_32", "_64"]).setKind(AstKind.LITERAL_SUF);

public ParserSpawner numberLiteral = ()=>numberLiteralBody().
    then(many(numberLiteralSuf()).setKind(AstKind.LITERAL_SUF_STREAM)
    ).setKind(AstKind.NUMBER);