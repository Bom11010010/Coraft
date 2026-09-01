
import { parseCode } from "./parserFns/parseCode";
import type { TranspileContext } from "./TranspileContext";

export function parse(ctx: TranspileContext){
    const code =  ctx.coraftCode;
    const data = parseCode(code);
    if(data === undefined){
        console.error("invalid token")
        process.exit(-1);
    }
    if(data.remain.length !== 0){
        console.error("surplus token", data.remain)
        process.exit(-2);
    }
    ctx.corraftAst = data.deliverable
}