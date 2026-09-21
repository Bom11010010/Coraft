import type { AstTypeExpr } from "../Ast/AstTypeExpr";
import type { ParseData } from "../ParseData";
import { parseIdent } from "./parseIdent";
import { parseTypeExpr } from "./parseTypeExpr";
import { parseWs } from "./parseWs";

export function parseInstantStructTypeExpr(code: string): ParseData{
    let result:ParseData;
    let remain = code;

    let nameNode = parseIdent(remain);
    let name = undefined;

    if(nameNode !== undefined){
        remain = nameNode.remain;
        if(nameNode.deliverable.nodeType === "IDENT"){
            name = nameNode.deliverable.name;
        }
    }

    let t = parseWs(remain);

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
                nodeType: "INSTANT_STRUCT_TYPE_EXPR",
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

    result = {
        remain: remain,
        deliverable: {
            nodeType: "INSTANT_STRUCT_TYPE_EXPR",
            name: name,
            entryNames: entryNames,
            entryTypes: entryTypes
        }
    }

    return result;
}