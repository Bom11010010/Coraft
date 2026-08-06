
import type { AstNullLiteral } from "../Ast/AstNullLiteral";
import type { ParseData } from "../ParseData";
import { parseKeyword } from "./parseKeyword";

export function parseNullLiteral(code: string): ParseData{
    let result:ParseData

    let i = 0;

    const literal = parseKeyword(code);
    if(literal === undefined || literal.deliverable.nodeType !== "KEYWORD"){
        return undefined;
    }

    if(literal.deliverable.name !== "null"){
        return undefined;
    }

    let ast: AstNullLiteral = {
        nodeType: "NULL_LITERAL"
    }

    result = {
        remain: literal.remain,
        deliverable: ast
    }

    return result
}