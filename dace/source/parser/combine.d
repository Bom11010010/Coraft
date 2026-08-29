module parser.combine;

import parser.ast_kind;
import parser.parser;
import std.typecons;
import std.stdio;

Parser then(lazy Parser p, lazy Parser q){
    return Parser(
        delegate(string src){
            auto pResult = p.parse(src);
            if(!pResult.success){
                return ParserResult(
                    false,
                    createNode([pResult.content, q.parse("").content]),
                    src,
                    pResult.errMsg,
                );
            }else{
                auto qResult = q.parse(pResult.remaining);
                if(!qResult.success){
                    return ParserResult(
                        false,
                        createNode([pResult.content, qResult.content]),
                        pResult.remaining,
                        qResult.errMsg,
                    );
                }
                return ParserResult(
                    true,
                    createNode([pResult.content, qResult.content]),
                    qResult.remaining,
                    "",
                );
            }
        }
    );
}

Parser or(lazy Parser p, lazy Parser q){
    return Parser(
        delegate(string src){
            auto pResult = p.parse(src);
            if(!pResult.success){
                auto qResult = q.parse(src);
                if(!qResult.success){
                    return ParserResult(
                        false,
                        createLeaf([]),
                        src,
                        pResult.errMsg ~ "\n" ~ qResult.errMsg,
                    );
                }
                return qResult;
            }else{
                return pResult;
            }
        }
    );
}

auto map(alias f)(lazy Parser p){
    return Parser(
        delegate(string src){
            auto result = p.parse(src);
            if(result.success){
                return ParserResult(
                    true,
                    f(result.content),
                    result.remaining,
                    "",
                );
            }else{
                return ParserResult(
                    false,
                    createLeaf(""),
                    result.remaining,
                    result.errMsg,
                );
            }
        }
    );
}

Parser many(lazy Parser p){
    return Parser(
        delegate(string src){
            auto cond = true;
            auto remaining = src;
            ParserContent[] content = [];
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
            return ParserResult(
                true,
                createNode(content),
                remaining,
                "",
            );
        }
    );
}

Parser many1(lazy Parser p){
    return Parser(
        delegate(string src){
            auto manyP = many(p);
            auto result = manyP.parse(src);
            if(result.content.node.length == 0){
                auto singleResult = p.parse(src);
                return ParserResult(
                    false,
                    createNode([]),
                    src,
                    singleResult.errMsg,
                );
            }else{
                return ParserResult(
                    true,
                    result.content,
                    result.remaining,
                    "",
                );
            }
        }
    );
}

Parser optional(lazy Parser p){
    return Parser(
        delegate(string src){
            auto result = p.parse(src);
            if(result.success){
                auto content = result.content;
                return ParserResult(
                    true,
                    content,
                    result.remaining,
                    "",
                );
            }else{
                return ParserResult(
                    true,
                    createLeaf(""),
                    result.remaining,
                    "",
                );
            }
        }
    );
}

Parser expect(lazy Parser p){
    return Parser(
        delegate(string src){
            auto result = p.parse(src);
            return ParserResult(
                result.success,
                createLeaf(""),
                result.remaining,
                result.errMsg
            );
        }
    );
}

Parser thenExpect(lazy Parser p, lazy Parser q){
    return Parser(
        delegate(string src){
            auto pResult = p.parse(src);
            if (!pResult.success){
                return pResult;
            }else{
                auto qResult = q.parse(pResult.remaining);

                if (qResult.success){
                    return ParserResult(
                        true,
                        pResult.content,
                        qResult.remaining,
                        "",
                    );
                }else{
                    return ParserResult(
                        false,
                        createLeaf(""),
                        qResult.remaining,
                        qResult.errMsg,
                    );
                }
            }
        }
    );
}

Parser setKind(lazy Parser p, AstKind k){
    return Parser(
        delegate(string src){
            auto pResult = p.parse(src);

            pResult.content.kind = k;
            
            return ParserResult(
                pResult.success,
                pResult.content,
                pResult.remaining,
                pResult.errMsg,
            );
        }
    );
}

Parser wrap(lazy Parser p, AstKind k){
    return Parser(
        delegate(string src){
            auto pResult = p.parse(src);

            auto subNode = createNode([pResult.content]);
            subNode.kind = k;
            
            return ParserResult(
                pResult.success,
                subNode,
                pResult.remaining,
                pResult.errMsg,
            );
        }
    );
}