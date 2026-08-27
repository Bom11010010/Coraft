module parser.basic_words;

import parser.parser;
import parser.combine;
import parser.primitive;
import std.ascii;
import std.conv;
import std.stdio;
import std.algorithm.searching;

public alias decimalNumber = ()=>many1(satisfy(&isDigit)).map!((dchar[] str) => str.to!string());
public alias binNumber = ()=>many1(satisfy((dchar c)=>c == '0' || c == '1')).map!((dchar[] str) => str.to!string());
public alias octNumber = ()=>many1(satisfy((dchar c)=>"01234567".canFind(c))).map!((dchar[] str) => str.to!string());
public alias hexNumber = ()=>many1(satisfy(&isHexDigit)).map!((dchar[] str) => str.to!string());

public alias alphabetWord = ()=>many1(satisfy(&isAlpha)).map!((dchar[] str) => str.to!string());
public alias alphanumWord = ()=>many1(satisfy(&isAlphaNum)).map!((dchar[] str) => str.to!string());

public alias ws = ()=>many1(satisfy(&isWhite)).map!((dchar[] str) => str.to!string());

public alias infixOpe = ()=>choiceToken([
    "+", "-", "*", "/", "%", 
    "<<", ">>", 
    "==", "!=", ">=", "<=", ">", "<", 
    "||", "&&",
    "|", "&", "^",
    ]);