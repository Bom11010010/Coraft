module parser.parser;

import parser.ast_kind;
import std.format;

alias ParserSpawner = Parser delegate();


struct ParserContent{
    AstKind kind;
    bool isLeaf;
    string leaf;
    ParserContent[] node;

    string toString() const
    {
        return isLeaf ? "%s: ".format(kind) ~ leaf : "%s: %s".format(kind, node);
    }
}

ParserContent createLeaf(string s){
    return ParserContent(AstKind.TOKEN, true, s, null);
}

ParserContent createNode(ParserContent[] node...){
    return ParserContent(AstKind.UNKNOWN, false, "", node.dup);
}

struct ParserResult
{
    bool success;
    ParserContent content;
    string remaining;
    string errMsg;

    string toString() const
    {
        return success
            ? "Success(%s, remaining = %s)".format(content, remaining)
            : "Failure(errMsg = %s, remaining = %s)".format(errMsg, remaining);
    }
}

struct Parser {
    ParserResult delegate(string src) parse;
}