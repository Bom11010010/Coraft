import type { AstDecl } from "../Ast/AstDecl";
import type { ParseData } from "../ParseData";
import { parseDecl } from "./parseDecl";
import { parseWs } from "./parseWs";

export function parseCode(code: string): ParseData{
    let result:ParseData;
    let remain = code;

    let decls: AstDecl[] = [];
    
    while(1){
        let t = parseWs(remain);
        if(t !== undefined){
            remain = t.remain;
        }
        if(remain.length === 0){
            break;
        }

        let decl = parseDecl(remain);
        if(decl === undefined){
            break;
        }
        remain = decl.remain;
        decls.push(decl.deliverable as AstDecl)
    }

    result = {
        remain: remain,
        deliverable: {
            nodeType: "CODE",
            decls: decls
        }
    }


    return result;
}