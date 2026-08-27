module parser.basic_words;

import parser.parser;
import parser.combine;
import parser.primitive;
import std.ascii;
import std.conv;
import std.stdio;

public auto decimalNumber = ()=>many(satisfy(&isDigit)).map!((dchar[] str) => str.to!string());
public auto hexNumber = ()=>many(satisfy(&isHexDigit)).map!((dchar[] str) => str.to!string());

public auto alphabetWord = ()=>many(satisfy(&isAlpha)).map!((dchar[] str) => str.to!string());
public auto alphanumWord = ()=>many(satisfy(&isAlphaNum)).map!((dchar[] str) => str.to!string());

public auto ws = ()=>many(satisfy(&isWhite)).map!((dchar[] str) => str.to!string());

public auto infixOpe = ()=>choiceToken(["+", "-", "*", "/", "%"]);