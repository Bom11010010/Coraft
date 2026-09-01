import type { AstConcreteBlock } from "./AstConcreteBlock";
import type { AstEmptyCodeBlock } from "./AstEmptyCodeBlock";
import type { AstPromptBlock } from "./AstPromptBlock";

export type AstBlockBody = AstEmptyCodeBlock | AstConcreteBlock | AstPromptBlock