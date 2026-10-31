import type { AstDecl } from "./Ast/AstDecl";
import type { AstExpr } from "./Ast/AstExpr";
import type { AstNode } from "./Ast/AstNode";
import type { AstTypeExpr } from "./Ast/AstTypeExpr";

export function recursiveIncludeScan(ast: AstNode): string[]{
    
        if(ast.nodeType === "EXPR_STMT"){
            return [...recursiveIncludeScan(ast.body)];
        }else if(ast.nodeType === "SAY_STMT"){
            return ["iostream", ...recursiveIncludeScan(ast.body)];
        }else if(ast.nodeType === "INFIX_CHAIN"){
            let includes:string[] = []
            for (let i = 0; i < ast.terms.length; i++) {
                const e = ast.terms[i];
                if(e !== undefined){
                    includes.push(...recursiveIncludeScan(e));
                }
            }
            return includes;
        }else if(ast.nodeType === "INFIX_OPE"){
            return [];
        }else if(ast.nodeType === "WS"){
            return [];
        }else if(ast.nodeType === "NUM_LITERAL"){
            return [];
        }else if(ast.nodeType === "PREFIX_OPE_EXPR"){
            return [...recursiveIncludeScan(ast.operand)]
        }else if(ast.nodeType === "PREFIX_OPE"){
            return [];
        }else if(ast.nodeType === "IDENT"){
            return [];
        }else if(ast.nodeType === "EMPTY_CODE_BLOCK"){
            return [];
        }else if(ast.nodeType === "VAR_DECL"){
            return [...recursiveIncludeScan(ast.type), ...recursiveIncludeScan(ast.initial)];
        }else if(ast.nodeType === "BUILTIN_TYPE"){
            let cppTypeDict = {"i8": "cstdint", "i16": "cstdint", "i32": "cstdint", "i64": "cstdint", "null": "cstddef", "str": "string"}
            if (ast.body in cppTypeDict){
                return [cppTypeDict[ast.body as keyof typeof cppTypeDict]];
            }
            return [];
        }else if(ast.nodeType === "RETURN_STMT"){
            return [...recursiveIncludeScan(ast.body)];
        }else if(ast.nodeType === "CONCRETE_BLOCK"){
            let includes:string[] = []
            for (const e of ast.stmts) {
                includes.push(...recursiveIncludeScan(e));
            }
            return includes;
        }else if(ast.nodeType === "BOOL_LITERAL"){
            return [];
        }else if(ast.nodeType === "NULL_LITERAL"){
            return []
        }else if(ast.nodeType === "FN_DECL"){
            let includes:string[] = [];
            includes.push(...recursiveIncludeScan(ast.returnType))
            includes.push(...recursiveIncludeScan(ast.block))
            includes.push(...recursiveIncludeScan(ast.args))
            return includes
        }else if(ast.nodeType === "ARG_LIST"){
            let includes:string[] = [];
            for (let i = 0; i < ast.names.length; i++) {
                includes.push(...recursiveIncludeScan(ast.types[i] as AstTypeExpr));
            }
            return includes;
        }else if(ast.nodeType === "STR_LITERAL"){
            return [];
        }else if(ast.nodeType === "CODE"){
            let includes:string[] = [];
            for (let i = 0; i < ast.decls.length; i++) {
                includes.push(...recursiveIncludeScan(ast.decls[i] as AstDecl));
            }
    
            return includes;
        }else if(ast.nodeType === "FN_CALL"){
            let includes:string[] = [];
            for (let i = 0; i < ast.args.length; i++) {
                includes.push(...recursiveIncludeScan(ast.args[i] as AstExpr));
            }
            return includes;
        }else if(ast.nodeType === "FOR_STMT"){
            let update = ast.update;
            let updateCode:string[] = []
            if(update !== undefined){
                updateCode = recursiveIncludeScan(update);
            }
            let initCode = recursiveIncludeScan(ast.init);
            let condCode = recursiveIncludeScan(ast.cond);
            return [...updateCode, ...initCode, ...condCode]
        }else if(ast.nodeType === "CODE_BLOCK"){
            if(ast.suf === undefined){
                return [...recursiveIncludeScan(ast.body)]
            }
            return [...recursiveIncludeScan(ast.body), ...recursiveIncludeScan(ast.suf)]
        }else if(ast.nodeType === "ELSE_BLOKC_SUF"){
            return [...recursiveIncludeScan(ast.block)]
        }else if(ast.nodeType === "ELIF_BLOCK_SUF"){
            return [...recursiveIncludeScan(ast.cond), ...recursiveIncludeScan(ast.block)]
        }else if(ast.nodeType === "IF_STMT"){
            return [...recursiveIncludeScan(ast.cond), ...recursiveIncludeScan(ast.block)]
        }else if(ast.nodeType === "PROMPT_BLOCK"){    
            return [];
        }else if(ast.nodeType === "SUM_TYPE_EXPR"){
            let includes:string[] = ["variant"];
    
            for (let i = 0; i < ast.typeTerms.length; i++) {
                includes.push(...recursiveIncludeScan(ast.typeTerms[i] as AstNode));
            }
            return includes;
        }else if(ast.nodeType === "TYPE_DECL"){
            return [...recursiveIncludeScan(ast.body)];
        }else if(ast.nodeType === "INSTANT_STRUCT_TYPE_EXPR"){
            let includes:string[] = [];
    
            for (let i = 0; i < ast.entryNames.length; i++) {

                includes.push(...recursiveIncludeScan(ast.entryTypes[i] as AstNode));
            }
    
            return includes;
        }else if(ast.nodeType === "STRUCT_DECL"){
            let includes:string[] = [];
    
            for (let i = 0; i < ast.entryNames.length; i++) {

                includes.push(...recursiveIncludeScan(ast.entryTypes[i] as AstNode));
            }
    
            return includes;
        }else if(ast.nodeType === "VECTOR_TYPE_EXPR"){
            return ["vector", ...recursiveIncludeScan(ast.type)]
        }else if(ast.nodeType === "FN_TYPE_EXPR"){
            let includes:string[] = ["functional"];
            includes.push(...recursiveIncludeScan(ast.returnType));
            
            for (let i = 0; i < ast.paramTypes.length; i++) {
                includes.push(...recursiveIncludeScan(ast.paramTypes[i] as AstNode));
            }
            return includes
        }else if(ast.nodeType === "CPP_IDENT_EXPR"){
            return [ast.header.substring(1, ast.header.length - 1)];
        }
    
        
        console.error("Unknown token", ast.nodeType);
        process.exit(-10);
}