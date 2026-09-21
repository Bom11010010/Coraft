import type { AstTypeExpr } from "../Ast/AstTypeExpr";
import type { ParseData } from "../ParseData";
import { parseCodeBlock } from "./parseCodeBlock";
import { parseIdent } from "./parseIdent";
import { parseKeyword } from "./parseKeyword";
import { parseTypeExpr } from "./parseTypeExpr";
import { parseWs } from "./parseWs";

export function parseStructDecl(code: string): ParseData{
    let result:ParseData;
    let remain = code;

    let keyword = parseKeyword(remain);
    
    if(keyword === undefined || keyword.deliverable.nodeType !== "KEYWORD"){
        return undefined;
    }
    
    if (keyword.deliverable.name !== "struct"){
        return undefined;
    }
    remain = keyword.remain;

    let t = parseWs(remain);
    
    if(t !== undefined){
        remain = t.remain;
    }

    let nameNode = parseIdent(remain);
    let name = undefined;
    
    if(nameNode === undefined || nameNode.deliverable.nodeType !== "IDENT"){
        return undefined;
    }

    remain = nameNode.remain;
    name = nameNode.deliverable.name;

    t = parseWs(remain);

    if(t !== undefined){
        remain = t.remain
    }

    if(remain[0] !== "{"){
        return undefined;
    }
    remain = remain.substring(1);

    t = parseWs(remain);

    if(t !== undefined){
        remain = t.remain;
    }

    let entryNames:string[] = [];
    let entryTypes:AstTypeExpr[] = [];
    
    if(remain[0] === "}"){
        remain = remain.substring(1);

        return {
            remain: remain,
            deliverable: {
                nodeType: "STRUCT_DECL",
                name: name,
                entryNames: [],
                entryTypes: []
            }
        }
    }else{
        while (1){
            let entryName = parseIdent(remain);
            if(entryName === undefined || entryName.deliverable.nodeType !== "IDENT"){
                return undefined;
            }
            entryNames.push(entryName.deliverable.name)
            remain = entryName.remain;

            t = parseWs(remain);

            if(t !== undefined){
                remain = t.remain;
            }

            let entryType = parseTypeExpr(remain);
            if(entryType === undefined){
                return undefined;
            }
            entryTypes.push(entryType.deliverable as AstTypeExpr)
            remain = entryType.remain;
        
            t = parseWs(remain);

            if(t !== undefined){
                remain = t.remain;
            }

            if(remain[0] === "}"){
                remain = remain.substring(1);
                break;
            }else if(remain[0] !== ","){
                return undefined;
            }
            remain = remain.substring(1);
            
            t = parseWs(remain);

            if(t !== undefined){
                remain = t.remain;
            }
            console.log(remain)
        }
    }
    
    const block = parseCodeBlock(remain)
    
    if(block === undefined){
        return undefined
    }
    remain = block.remain;

    result = {
        remain: remain,
        deliverable: {
            nodeType: "STRUCT_DECL",
            name: name,
            entryNames: entryNames,
            entryTypes: entryTypes
        }
    }
    

    return result;
}