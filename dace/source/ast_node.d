module ast_node;

import std.sumtype;

public alias NodeChildren = SumType!(AstNode[], string);

public struct AstNode {
    string kind;
    NodeChildren* node;
}

