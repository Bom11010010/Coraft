module parser.basic_words;

import parser.parser;
import parser.combine;
import parser.primitive;
import std.ascii;
import std.conv;
import std.stdio;
import std.algorithm.searching;

ParserContent combineCharStreamContent(ParserContent content){
    return content.isLeaf ? 
        content :
        createLeaf(((ParserContent[] contents){
            string s = "";
            foreach(c; contents){
                s ~= c.leaf;
            }
            return s;
        })(content.node));
}

public alias decimalNumber = ()=>many1(satisfy(&isDigit)).map!(
    (ParserContent ast) => ast.isLeaf ? createLeaf(ast.leaf) : combineCharStreamContent(ast)
    );
public alias binNumber = ()=>many1(satisfy((dchar c)=>c == '0' || c == '1')).map!(
    (ParserContent ast) => ast.isLeaf ? createLeaf(ast.leaf) : combineCharStreamContent(ast)
    );
public alias octNumber = ()=>many1(satisfy((dchar c)=>"01234567".canFind(c))).map!(
    (ParserContent ast) => ast.isLeaf ? createLeaf(ast.leaf) : combineCharStreamContent(ast)
    );
public alias hexNumber = ()=>many1(satisfy(&isHexDigit)).map!(
    (ParserContent ast) => ast.isLeaf ? createLeaf(ast.leaf) : combineCharStreamContent(ast)
    );

public alias alphabetWord = ()=>many1(satisfy(&isAlpha)).map!(
    (ParserContent ast) => ast.isLeaf ? createLeaf(ast.leaf) : combineCharStreamContent(ast)
    );
public alias alphanumWord = ()=>many1(satisfy(&isAlphaNum)).map!(
    (ParserContent ast) => ast.isLeaf ? createLeaf(ast.leaf) : combineCharStreamContent(ast)
    );

public alias ws = ()=>many1(satisfy(&isWhite)).map!(
    (ParserContent ast) => ast.isLeaf ? createLeaf(ast.leaf) : combineCharStreamContent(ast)
    );

public alias infixOpe = ()=>choiceToken([
    "+", "-", "*", "/", "%", 
    "<<", ">>", 
    "==", "!=", ">=", "<=", ">", "<", 
    "||", "&&",
    "|", "&", "^",
    ]);