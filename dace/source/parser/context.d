module parser.context;

import ast_node;

struct Context {
    string remaining;
    ast_node.AstNode node;
}
