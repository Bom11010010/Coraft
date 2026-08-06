import { parseConcreteCodeBlock } from "./parseConcreteCodeBlock";
import type { ParseData } from "../ParseData";
import { parseEmptyCodeBlock } from "./parseEmptyCodeBlock";
import { parseBlockSuf } from "./parseBlockSuf";
import type { AstCodeBlock } from "../Ast/AstCodeBlock";
import type { AstBlockBody } from "../Ast/AstBlockBody";
import type { AstBlockSuf } from "../Ast/AstBlockSuf";
import { parsePromptBlock } from "./parsePromptBlock";

export function parseCodeBlock(code: string): ParseData{
    let body:ParseData
    let result:ParseData
    let remain = code;


    if((body = parseEmptyCodeBlock(code)) !== undefined){
    }else if((body = parseConcreteCodeBlock(code)) !== undefined){
    }else if((body = parsePromptBlock(code))!== undefined){
    }else{
        return undefined;
    }
    remain = body.remain;
    
    let sufData = parseBlockSuf(remain);
    let suf: AstBlockSuf | undefined;

    if(sufData === undefined){
        suf = undefined;
    }else{
        suf = sufData.deliverable as AstBlockSuf;
        remain = sufData.remain;
    }


    let ast: AstCodeBlock = {
        nodeType: "CODE_BLOCK",
        body: body.deliverable as AstBlockBody,
        suf: suf
    }
    result = {
        deliverable: ast,
        remain: remain
    }

    return result
}