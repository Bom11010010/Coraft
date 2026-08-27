module parser.basic_words;

import parser.parser;
import parser.combine;
import parser.primitive;
import std.ascii;

public auto decimalNumber = ()=>many(satisfy(&isDigit));
public auto hexNumber = ()=>many(satisfy(&isHexDigit));

public auto alphabetWord = ()=>many(satisfy(&isAlpha));
public auto alphanumWord = ()=>many(satisfy(&isAlphaNum));

public auto ws = ()=>many(satisfy(&isWhite));