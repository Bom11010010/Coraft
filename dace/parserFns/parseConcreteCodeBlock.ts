import type { AstStmt } from "../Ast/AstStmt";
import type { ParseData } from "../ParseData";
import { parseStmt } from "./parseStmt";
import { parseWs } from "./parseWs";

export function parseConcreteCodeBlock(code: string): ParseData{
    let result:ParseData;
    let remain: string = "";
    let t: ParseData;

    let stmts: AstStmt[] = [];

    const initialChar = code[0];
    if(initialChar !== "{"){
        return undefined
    }
    remain = code.substring(1);
    
    while(true){
        t = parseWs(remain);
        if(t !== undefined){
            remain = t.remain;
        }
        if(remain[0] === undefined || remain[0] === "}"){
            break;
        }
        let stmt = parseStmt(remain);
        if(stmt === undefined){
            return undefined;
        }
        remain = stmt.remain;
        stmts.push(stmt.deliverable as AstStmt);
    }
    if(remain[0] === "}"){
        remain = remain.substring(1);
    }

    result = {
        remain:remain,
        deliverable:{
            nodeType: "CONCRETE_BLOCK",
            stmts: stmts
        }
    }

    return result
}