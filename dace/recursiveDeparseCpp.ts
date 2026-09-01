import type { AstCode } from "./Ast/AstCode";
import type { AstDecl } from "./Ast/AstDecl";
import type { AstExpr } from "./Ast/AstExpr";
import type { AstNode } from "./Ast/AstNode";
import type { AstTypeExpr } from "./Ast/AstTypeExpr";

export function recursiveDeparseCpp(ast: AstNode): string{

    if(ast.nodeType === "EXPR_STMT"){
        return `${recursiveDeparseCpp(ast.body)};
`
    }else if(ast.nodeType === "SAY_STMT"){
        return `std::cout << ${recursiveDeparseCpp(ast.body)} << std::endl;
`
    }else if(ast.nodeType === "INFIX_CHAIN"){
        if (ast.terms[0] === undefined){
            return "";
        }
        let expr = "";
        if(ast.terms[0].nodeType === "INFIX_CHAIN"){
            expr += `(${recursiveDeparseCpp(ast.terms[0])})`;
        }else{
            expr += recursiveDeparseCpp(ast.terms[0]);
        }
        for (let i = 0; i < ast.opes.length; i++) {
            const ope = ast.opes[i];
            const term = ast.terms[i + 1]
            if (ope === undefined){
                return "";
            }else if (term === undefined){
                return "";
            }
            expr += ` ${recursiveDeparseCpp(ope)} `;
            if(term.nodeType === "INFIX_CHAIN"){
                expr += `(${recursiveDeparseCpp(term)})`;
            }else{
                expr += recursiveDeparseCpp(term);
            }
        }
        return expr;
    }else if(ast.nodeType === "INFIX_OPE"){
        return ast.body;
    }else if(ast.nodeType === "WS"){
        return ast.body;
    }else if(ast.nodeType === "NUM_LITERAL"){
        return ast.body;
    }else if(ast.nodeType === "PREFIX_OPE_EXPR"){
        let operand = "";
        if(ast.operand.nodeType === "INFIX_CHAIN"){
            operand = `(${recursiveDeparseCpp(ast.operand)})`;
        }else{
            operand = recursiveDeparseCpp(ast.operand);
        }
        return `${recursiveDeparseCpp(ast.ope)}${operand}`
    }else if(ast.nodeType === "PREFIX_OPE"){
        return ast.body;
    }else if(ast.nodeType === "IDENT"){
        return ast.name;
    }else if(ast.nodeType === "EMPTY_CODE_BLOCK"){
        return "\n{\n}\n";
    }else if(ast.nodeType === "VAR_DECL"){
        return `${recursiveDeparseCpp(ast.type)} ${ast.name} = ${recursiveDeparseCpp(ast.initial)};\n`
    }else if(ast.nodeType === "BUILTIN_TYPE"){
        let cppTypeDict = {"i8": "std::int8_t", "i16": "std::int16_t", "i32": "std::int32_t", "i64": "std::int64_t", "null": "std::nullptr_t", "str": "std::string"}
        if (ast.body in cppTypeDict){
            return cppTypeDict[ast.body as keyof typeof cppTypeDict];
        }
        return ast.body
    }else if(ast.nodeType === "RETURN_STMT"){
        return `return ${recursiveDeparseCpp(ast.body)};
`
    }else if(ast.nodeType === "CONCRETE_BLOCK"){
        let code = "\n{\n"
        for (const e of ast.stmts) {
            code += recursiveDeparseCpp(e);
        }
        code += "}\n"
        return code;
    }else if(ast.nodeType === "BOOL_LITERAL"){
        return ast.body;
    }else if(ast.nodeType === "NULL_LITERAL"){
        return "nullptr"
    }else if(ast.nodeType === "FN_DECL"){
        let fnName = ast.name;
        let code = `${recursiveDeparseCpp(ast.returnType)} ${ast.name}${recursiveDeparseCpp(ast.args)}${recursiveDeparseCpp(ast.block)}`
        if(fnName === "main"){
            fnName = "co_main"
            code = `${recursiveDeparseCpp(ast.returnType)} ${fnName}${recursiveDeparseCpp(ast.args)}${recursiveDeparseCpp(ast.block)}
int main(int argc, char *argv[])
{
std::vector<std::string> co_argv(argc);
for(size_t i = 0; i < argc; ++i)
{
co_argv[i] = std::string(argv[i]);
}
return static_cast<int>(co_main());
}`
        }

        
        return code
    }else if(ast.nodeType === "ARG_LIST"){
        let code = "(";
        for (let i = 0; i < ast.names.length; i++) {
            code += recursiveDeparseCpp(ast.types[i] as AstTypeExpr);
            code += " ";
            code += ast.names[i];
            if(ast.names[i + 1] !== undefined){
                code += ", "
            }
        }
        code += ")";
        return code;
    }else if(ast.nodeType === "STR_LITERAL"){
        return ast.body;
    }else if(ast.nodeType === "CODE"){
        let code = "";
        for (let i = 0; i < ast.decls.length; i++) {
            code += recursiveDeparseCpp(ast.decls[i] as AstDecl)
            code += "\n";
        }

        return code;
    }else if(ast.nodeType === "FN_CALL"){
        let code = `${recursiveDeparseCpp(ast.name)}(`
        for (let i = 0; i < ast.args.length; i++) {
            code += recursiveDeparseCpp(ast.args[i] as AstExpr) + ", ";
        }
        if(ast.args.length > 0){
            code = code.substring(0, code.length - 2);
        }
        code += ")"
        return code;
    }else if(ast.nodeType === "FOR_STMT"){
        let update = ast.update;
        let updateCode = ""
        if(update !== undefined){
            updateCode = recursiveDeparseCpp(update);
        }
        let initCode = recursiveDeparseCpp(ast.init);
        let condCode = recursiveDeparseCpp(ast.cond);
        return `for(${initCode.substring(0, initCode.length - 1)} ${condCode.substring(0, condCode.length - 1)} ${updateCode})${recursiveDeparseCpp(ast.block)}`
    }else if(ast.nodeType === "CODE_BLOCK"){
        if(ast.suf === undefined){
            return `${recursiveDeparseCpp(ast.body)}`
        }
        return `${recursiveDeparseCpp(ast.body)}${recursiveDeparseCpp(ast.suf)}`
    }else if(ast.nodeType === "ELSE_BLOKC_SUF"){
        return `else${recursiveDeparseCpp(ast.block)}`
    }else if(ast.nodeType === "ELIF_BLOCK_SUF"){
        return `else if(${recursiveDeparseCpp(ast.cond)})${recursiveDeparseCpp(ast.block)}`
    }else if(ast.nodeType === "IF_STMT"){
        return `if(${recursiveDeparseCpp(ast.cond)})${recursiveDeparseCpp(ast.block)}`
    }else if(ast.nodeType === "PROMPT_BLOCK"){
        let prompt = ast.prompt.replaceAll("\n", "\\\n");

        return "\n#pragma opah " + prompt + "\n";
    }

    
    console.error("Unknown token", ast.nodeType);
    process.exit(-10);
}