module parser.literal_util;


import parser.ast_kind;
import parser.parser;
import parser.combine;
import parser.primitive;
import parser.basic_words;

public alias numberLiteralFlatten = (ParserContent c)=>createNode(c.node[0].node[0], c.node[0].node[1], c.node[1]);

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
public alias strStreamCombine = 
    (ParserContent ast) => ast.isLeaf ? createLeaf(ast.leaf) : combineCharStreamContent(ast);