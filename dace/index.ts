import { transpile } from "typescript";
import { parse } from "./parse";
import type { TranspileContext } from "./TranspileContext";
import { cppTranspile } from "./cppTranspile";

var iPath = Bun.argv[2]

if(iPath === undefined){
    process.exit(1);
}

console.log(iPath)

const iFile = Bun.file(iPath)

let ctx: TranspileContext = {
    coraftCode:"",
    corraftAst:{nodeType:"EMPTY"},
    ir: undefined,
    cppAst:{nodeType:"EMPTY"},
    cppCode:"",
    hppAst:{nodeType:"EMPTY"},
    hppCode:"",
    includeListForCpp:[],
    includeListForHpp:[]
}

ctx.coraftCode = await iFile.text()

parse(ctx);
console.dir(ctx, {depth: null, colors: true})
cppTranspile(ctx)

console.dir(ctx, {depth: null, colors: true})

let codeLines = ctx.cppCode.split("\n");
let indent = 0;

let code = "";

for(let i = 0; i < codeLines.length; i++){
    if(codeLines[i] === "}"){
        indent--;
    }
    code += "    ".repeat(indent) + codeLines[i] + "\n"
    if(codeLines[i] === "{"){
        indent++;
    }
}

await Bun.write("a.cpp", code);
