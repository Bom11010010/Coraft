module parser.number_literal;

import parser.parser;
import parser.combine;
import parser.primitive;
import parser.basic_words;

import std.typecons;

public alias decimalNaturalNumber = ()=>choice([token("0d"), pureValue("0d")]).then(decimalNumber());
public alias binNaturalNumber = ()=>token("0b").then(binNumber());
public alias octNaturalNumber = ()=>token("0o").then(octNumber());
public alias hexNaturalNumber = ()=>token("0x").then(hexNumber());

public alias numberSign = ()=>choice([
        choiceToken(["+", "-"]),
        pureValue("+")
    ]);

public alias naturalNumber = ()=>choice([
        binNaturalNumber(),
        octNaturalNumber(),
        hexNaturalNumber(),
        decimalNaturalNumber()
]);

public alias intValue = ()=>numberSign().then(naturalNumber()).map!(
    ( Tuple!(string, Tuple!(string, string)) t) => Tuple!(string, string, string)(t[0], t[1][0], t[1][1])
);

public alias decimalPositiveFloatNumber = ()=>choice([token("0d"), pureValue("0d")]).
    then(decimalNumber()).
    thenExpect(token(".")).
    then(choice([decimalNumber(), pureValue("0")]));

public alias binPositiveFloatNumber = ()=>token("0b").
    then(binNumber()).
    thenExpect(token(".")).
    then(choice([binNumber(), pureValue("0")]));

public alias octPositiveFloatlNumber = ()=>token("0o").
    then(octNumber()).
    thenExpect(token(".")).
    then(choice([octNumber(), pureValue("0")]));

public alias hexPositiveFloatlNumber = ()=>token("0x").
    then(hexNumber()).
    thenExpect(token(".")).
    then(choice([hexNumber(), pureValue("0")]));

public alias positiveFloatlNumber = ()=>choice([
        binPositiveFloatNumber(),
        octPositiveFloatlNumber(),
        hexPositiveFloatlNumber(),
        decimalPositiveFloatNumber()
]).map!((Tuple!(Tuple!(string, string), string) t) => Tuple!(string, string, string)(t[0][0], t[0][1], t[1]));

public alias floatlNumber = ()=>numberSign().then(positiveFloatlNumber()).
    map!(
        (Tuple!(string, Tuple!(string, string, string)) t) => 
        Tuple!(string, string, string, string)(t[0], t[1][0], t[1][1], t[1][2])
    );

public alias numberLiteralBody = ()=>choice([
    floatlNumber(), 
    intValue().map!(
        (Tuple!(string, string, string) t) => Tuple!(string, string, string, string)(t[0], t[1], t[2], "_") // An underscore is added to the fractional part of integer literals
                                                                                                            // to distinguish them from floating-point literals.
    )
]);

public alias numberLiteralSuf = ()=>choiceToken(["U", "_8", "_16", "_32", "_64"]);

public alias numberLiteral = ()=>numberLiteralBody().
    then(many(numberLiteralSuf())
    );