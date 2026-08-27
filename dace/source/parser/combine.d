module parser.combine;

import parser.parser;
import std.typecons;

Parser!(Tuple!(T, U)) then(T, U)(Parser!T p, Parser!U q){
    return Parser!(Tuple!(T, U))(
        delegate(string src){
            auto pResult = p.parse(src);
            if(!pResult.success){
                return ParserResult!(Tuple!(T, U))(
                    false,
                    Tuple!(T, U)(pResult.content, q.parse("").content),
                    src,
                    pResult.errMsg,
                );
            }else{
                auto qResult = q.parse(pResult.remaining);
                if(!qResult.success){
                    return ParserResult!(Tuple!(T, U))(
                        false,
                        Tuple!(T, U)(pResult.content, qResult.content),
                        pResult.remaining,
                        qResult.errMsg,
                    );
                }
                return ParserResult!(Tuple!(T, U))(
                    true,
                    Tuple!(T, U)(pResult.content, qResult.content),
                    qResult.remaining,
                    "",
                );
            }
        }
    );
}

enum WHICH_NODE
{
    LEFT,
    RIGHT,
}

Parser!(Tuple!(WHICH_NODE, T, U)) or(T, U)(Parser!T p, Parser!U q){
    return Parser!(Tuple!(WHICH_NODE, T, U))(
        delegate(string src){
            auto pResult = p.parse(src);
            if(!pResult.success){
                auto qResult = q.parse(src);
                if(!qResult.success){
                    return ParserResult!(Tuple!(WHICH_NODE, T, U))(
                        false,
                        Tuple!(WHICH_NODE, T, U)(WHICH_NODE.LEFT, pResult.content, qResult.content),
                        src,
                        pResult.errMsg ~ "\n" ~ qResult.errMsg,
                    );
                }
                return ParserResult!(Tuple!(WHICH_NODE, T, U))(
                    true,
                    Tuple!(WHICH_NODE, T, U)(WHICH_NODE.RIGHT, pResult.content, qResult.content),
                    qResult.remaining,
                    "",
                );
            }else{
                auto qResult = q.parse("");
                return ParserResult!(Tuple!(WHICH_NODE, T, U))(
                    true,
                    Tuple!(WHICH_NODE, T, U)(WHICH_NODE.LEFT, pResult.content, qResult.content),
                    pResult.remaining,
                    "",
                );
            }
        }
    );
}

Parser!U map(T, U)(Parser!T p, U function(T) f){
    return Parser!U(
        delegate(string src){
            auto result = p.parse(src);
            if(result.success){
                return ParserResult!U(
                    true,
                    f(result.content),
                    result.remaining,
                    "",
                );
            }else{
                return ParserResult!U(
                    false,
                    f(result.content),
                    result.remaining,
                    result.errMsg,
                );
            }
        }
    );
}

Parser!(T[]) many(T)(Parser!T p){
    return Parser!(T[])(
        delegate(string src){
            auto cond = true;
            auto remaining = src;
            T[] content = [];
            while(cond){
                if(remaining.length == 0){
                    break;
                }
                auto result = p.parse(remaining);
                if (result.success){
                    content ~= result.content;
                    remaining = result.remaining;
                }
                cond = result.success;
            }
            return ParserResult!(T[])(
                true,
                content,
                remaining,
                "",
            );
        }
    );
}

Parser!(T[]) many1(T)(Parser!T p){
    return Parser!(T[])(
        delegate(string src){
            auto manyP = many!T(p);
            auto result = manyP.parse(src);
            if(result.content.length == 0){
                auto singleResult = p.parse(src);
                return ParserResult!(T[])(
                    false,
                    [],
                    src,
                    singleResult.errMsg,
                );
            }else{
                return ParserResult!(T[])(
                    true,
                    result.content,
                    result.remaining,
                    "",
                );
            }
        }
    );
}

Parser!(Nullable!T) optional(T)(Parser!T p){
    return Parser!(Nullable!T)(
        delegate(string src){
            auto result = p.parse(src);
            if(result.success){
                Nullable!T content = result.content;
                return ParserResult!(Nullable!T)(
                    true,
                    content,
                    result.remaining,
                    "",
                );
            }else{
                Nullable!T n;
                return ParserResult!(Nullable!T)(
                    true,
                    n,
                    result.remaining,
                    "",
                );
            }
        }
    );

}