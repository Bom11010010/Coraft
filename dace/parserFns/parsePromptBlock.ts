import type { AstPromptBlock } from "../Ast/AstPromptBlock";
import type { ParseData } from "../ParseData";

export function parsePromptBlock(code: string): ParseData{
    let result:ParseData;
    let remain = code;

    let prompt:string = "";
    if(remain.substring(0,2) !== "?{"){
        return undefined;
    }
    remain = remain.substring(2);

    while(1){
        if(remain.substring(0,2) === "}?"){
            remain = remain.substring(2);
            break;
        }else{
            prompt += remain[0];
            remain = remain.substring(1);
        }
    }

    const ast:AstPromptBlock = {
        nodeType: "PROMPT_BLOCK",
        prompt: prompt
    }

    result = {
        deliverable: ast,
        remain: remain
    }

    return result;
}