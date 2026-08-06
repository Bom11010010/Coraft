
import type { AstBoolLiteral } from "../Ast/AstBoolLiteral";
import type { ParseData } from "../ParseData";
import { parseKeyword } from "./parseKeyword";

export function parseBoolLiteral(code: string): ParseData{
    let result:ParseData

    const literal = parseKeyword(code);
    if(literal === undefined || literal.deliverable.nodeType !== "KEYWORD"){
        return undefined;
    }

    if(literal.deliverable.name !== "true" && literal.deliverable.name !== "false"){
        return undefined;
    }

    let ast: AstBoolLiteral = {
        nodeType: "BOOL_LITERAL",
        body: literal.deliverable.name
    }

    result = {
        remain: literal.remain,
        deliverable: ast
    }

    return result
}