module parser.primitive;

import parser.parser;
import std.conv;
import std.utf;

Parser!dchar glyph(){
    return Parser!dchar(
        delegate(string src){
            dchar g = decodeFront(src);
            return ParserResult!dchar(
                true,
                g,
                src,
                "",
            );
        }
    );
}

Parser!string token(string s){
    return Parser!string(
        delegate(string src){
            if(src.length < s.length){
                return ParserResult!string(
                    false,
                    "",
                    src,
                    "\"" ~ s ~ "\" is not exist."
                );
            }
            string t = src[0 .. s.length];
            string remaining = src[s.length .. $];
            if (t == s){
                return ParserResult!string(
                    true,
                    t,
                    remaining,
                    "",
                );  
            }else{
                return ParserResult!string(
                    false,
                    "",
                    src,
                    "\"" ~ s ~ "\" is not exist."
                );
            }
        }
    );
}

Parser!dchar satisfy(bool function(dchar) f){
    return Parser!dchar(
        delegate(string src){
            if (src == ""){
                return ParserResult!dchar(
                    false,
                    '_',
                    src,
                    "src is empty",
                );
            }
            dchar g = decodeFront(src);
            if (f(g)){
                return ParserResult!dchar(
                    true,
                    g,
                    src,
                    "",
                );
            }else{
                return ParserResult!dchar(
                    false,
                    '_',
                    g.to!string ~ src,
                    "'" ~ (g.to!string()) ~ "' does not meet the conditions.",
                );
            }
        }
    );
}

Parser!T pureValue(T)(T v){
    return Parser!T(
        delegate(string src){
            return ParserResult!T(
                true,
                v,
                src,
                "",
            );
        }
    );
}

Parser!(typeof(null)) fail(string msg){
    return Parser!(typeof(null))(
        delegate(string src){
            return ParserResult!(typeof(null))(
                false,
                null,
                src,
                msg,
            );
        }
    );
}