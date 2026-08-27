module parser.parser;

import std.format;


struct ParserResult(T)
{
    bool success;
    T content;
    string remaining;
    string errMsg;

    string toString() const
    {
        return success
            ? "Success(%s, remaining = %s)".format(content, remaining)
            : "Failure(errMsg = %s, remaining = %s)".format(errMsg, remaining);
    }
}

struct Parser(T) {
    ParserResult!T delegate(string src) parse;
}