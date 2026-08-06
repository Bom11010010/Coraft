# Grammar

## CODE
CODEはCoraftファイルの最大の単位であり、コード全体を内包する。
CODEはCONSTRUCTのみを子とする。
```
CODE = CONSTRUCT[]
```

## CONSTRUCT
```
CONSTRUCT = DEFINE | ANNOTATION_FOR_LM
```

## ANNOTATION_FOR_LM
```
ANNOTATION_FOR_LM = '#' + /.*/g
```

## STATEMENT
```
STATEMENT = STATEMENT_BODY + BLOCK
```
## BLOCK
```
BLOCK = (EMPTYBLOCK | CODEBLOCK | PROMPTBLOCK) + BLOCK_SUFFIX
```

## EMPTYBLOCK
```
EMPTYBLOCK = ';'
```
## CODEBLOCK
```
CODEBLOCK = '{' + STATEMENT[] + '}'
```
## PROMPTBLOCK
```
PROMPTBLOCK = '?{' + NEW_LINE? + (/.*/g + NEW_LINE?)[] + '}?'
```
## BLOCK_SUFFIX
```
BLOCK_SUFFIX = ELIF | ELSE
```
## ELIF
```
ELIF = 'elif' + CONDITION + BLOCK
```
## ELSE
```
ELSE = 'else' + BLOCK
```

## DEFINE
```
DEFINE = FN_DEFINE | VAR_DEFINE
```

### FN_DEFINE
```
FN_DEFINE = 'fn' + FN_NAME + ARG_LIST_DEFINE? + (':' + TYPE )? + CODEBLOCK
```

### VAR_DEFINE
```
VAR_DEFINE = 'var' + VAR_NAME + (':' + TYPE)? + ('=' + INITIAL) + CODEBLOCK // CODEBLOCK is should be EMPTY_BLOCK
```