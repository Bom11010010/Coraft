import { recursiveDeparseCpp } from "./recursiveDeparseCpp";
import { recursiveIncludeScan } from "./recursiveIncludeScan";
import type { TranspileContext } from "./TranspileContext";

export function cppTranspile(ctx: TranspileContext){
    const ast = ctx.corraftAst;

    let includes:string[] = []

    includes = [...recursiveIncludeScan(ast)];

    includes = [... new Set(includes)];
    console.log(includes)

    const code = 
    `${expandIncludeList(includes)}

${recursiveDeparseCpp(ast)}
`;

    ctx.cppCode = code;
}

function expandIncludeList(includes: string[]): string{
    let macros = "";

    for (let i = 0; i < includes.length; i++) {
        const e = includes[i];
        macros += `#include <${e}>\n`
    }

    return macros;
}