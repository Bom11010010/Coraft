import type { AstArgList } from "../Ast/AstArgList";
import type { AstCodeBlock } from "../Ast/AstCodeBlock";
import type { AstFnDecl } from "../Ast/AstFnDecl";
import type { AstTypeExpr } from "../Ast/AstTypeExpr";
import { parseArgList } from "./parseArgList";
import { parseBuiltinType } from "./parseBuiltinType";
import { parseCodeBlock } from "./parseCodeBlock";
import type { ParseData } from "../ParseData"
import { parseIdent } from "./parseIdent";
import { parseKeyword } from "./parseKeyword"
import { parseWs } from "./parseWs";

export function parseFnDecl(code: string): ParseData{
    let result:ParseData;
    let remain: string = code;

    const keyword = parseKeyword(remain);

    if(keyword === undefined || keyword.deliverable.nodeType !== "KEYWORD"){
        return undefined;
    }

    if(keyword.deliverable.name !== "fn"){
        return undefined;
    }

    remain = keyword.remain;

    let t = parseWs(remain);

    if(t !== undefined){
        remain = t.remain;
    }

    const name = parseIdent(remain);

    if (name === undefined || name.deliverable.nodeType !== "IDENT"){
        return undefined;
    }

    remain = name.remain;

    t = parseWs(remain);

    if(t !== undefined){
        remain = t.remain;
    }

    const arglistData = parseArgList(remain);
    let arglist: AstArgList = {
        nodeType: "ARG_LIST",
        names: [],
        types: [],
        defaults: []
    }
    

    if(arglistData !== undefined){
        arglist = arglistData.deliverable as AstArgList
        remain = arglistData.remain
    }

    t = parseWs(remain);

    if(t !== undefined){
        remain = t.remain;
    }

    const returnTypeData:ParseData = parseBuiltinType(remain);
    let returnType: AstTypeExpr = {
        nodeType: "BUILTIN_TYPE",
        body: "void"
    }

    if(returnTypeData !== undefined){
        returnType = returnTypeData.deliverable as AstTypeExpr
        remain = returnTypeData.remain;
    }

    t = parseWs(remain);

    if(t !== undefined){
        remain = t.remain;
    }

    const block = parseCodeBlock(remain);

    if (block === undefined){
        return undefined;
    }
    remain = block.remain;

    const ast:AstFnDecl = {
        nodeType: "FN_DECL",
        name: name.deliverable.name,
        args: arglist,
        returnType: returnType,
        block: block.deliverable as AstCodeBlock
    }

    result = {
        deliverable: ast,
        remain: remain
    }

    return result
}