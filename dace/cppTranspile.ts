import { recursiveDeparseCpp } from "./recursiveDeparseCpp";
import type { TranspileContext } from "./TranspileContext";

export function cppTranspile(ctx: TranspileContext){
    const ast = ctx.corraftAst;

    const code = 
    `
#include <iostream>
#include <cstdint>
#include <cstddef>
#include <memory>
#include <vector>
#include <string>

${recursiveDeparseCpp(ast)}
`;

    ctx.cppCode = code;
}