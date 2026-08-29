module parser.primitive;

import parser.parser;
import std.conv;
import std.utf;

Parser glyph(){
    return Parser(
        delegate(string src){
            dchar g = decodeFront(src);
            return ParserResult(
                true,
                createLeaf(g.to!string()),
                src,
                "",
            );
        }
    );
}

Parser token(string s){
    return Parser(
        delegate(string src){
            if(src.length < s.length){
                return ParserResult(
                    false,
                    createLeaf(""),
                    src,
                    "\"" ~ s ~ "\" is not exist."
                );
            }
            string t = src[0 .. s.length];
            string remaining = src[s.length .. $];
            if (t == s){
                return ParserResult(
                    true,
                    createLeaf(t),
                    remaining,
                    "",
                );  
            }else{
                return ParserResult(
                    false,
                    createLeaf(""),
                    src,
                    "\"" ~ s ~ "\" is not exist."
                );
            }
        }
    );
}

Parser choice(lazy Parser[] ps){
    return Parser(
        delegate(string src){
            string err = "";
            foreach (v; ps)
            {
                auto pResult = v.parse(src);
                if(pResult.success){
                    return pResult;
                }else{
                    err ~= pResult.errMsg ~ "\n";
                }
            }
            return ParserResult(
                false,
                createLeaf(""),
                src,
                err,
            );
        }
    );
}

Parser choiceToken(string[] strs){
    return Parser(
        delegate(string src){
            string err = "exepted one of:";
            foreach (s; strs){
                auto pResult = token(s).parse(src);
                if(pResult.success){
                    return pResult;
                }else{
                    err ~= " \"" ~ s ~ "\" |";
                }
            }
            return ParserResult(
                false,
                createLeaf(""),
                src,
                err[0 .. $ - 1],
            );
        }
    );
}

Parser satisfy(bool function(dchar) f){
    return Parser(
        delegate(string src){
            if (src == ""){
                return ParserResult(
                    false,
                    createLeaf("_"),
                    src,
                    "src is empty",
                );
            }
            dchar g = decodeFront(src);
            if (f(g)){
                return ParserResult(
                    true,
                    createLeaf(g.to!string()),
                    src,
                    "",
                );
            }else{
                return ParserResult(
                    false,
                    createLeaf("_"),
                    g.to!string ~ src,
                    "'" ~ (g.to!string()) ~ "' does not meet the conditions.",
                );
            }
        }
    );
}

Parser pureValue(lazy ParserContent v){
    return Parser(
        delegate(string src){
            return ParserResult(
                true,
                v,
                src,
                "",
            );
        }
    );
}

Parser fail(string msg){
    return Parser(
        delegate(string src){
            return ParserResult(
                false,
                createLeaf(""),
                src,
                msg,
            );
        }
    );
}