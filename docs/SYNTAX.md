# Syntax

## プリプロセッサ命令
### トランスパイラ指示
```Coraft


@manytime                           // ヘッダにおいて使う。デフォルトで付くインクルードガードをつけないという指示。
@model modelName                    // コード補完に使うLLMを指定する。その命令以降の行に適用される。
@value variable value               // プリプロセッサ変数をセット
@use fileName1 filename2 ...        // C/C++でいうところの#include。C/C++と違って一行で複数指定可能。C/C++ヘッダかCoraftコードファイルを指定かのう。filenameは<>で囲む形にトランスパイルされる。


```
### AST操作
AST操作マクロはC/C++における構文を操作するマクロのようなものである。C/C++と違ってASTに変換されてから定義、適用される。
```Coraft


@define macro {code}                    // プリプロセッサ変数とは別のもの。コードの途中にmacroの部分に指定した文字列が来たらcodeの中に置き換える。
@define macro(x, ...) {code}            // プリプロセッサ変数とは別のもの。コードの途中にmacroの部分に指定した文字列が来たらcodeの中に置き換える。こちらは引数を受け取れる。

@if (condition) {code}                  // conditionがtruthyならcode内を展開する。
@elif (condition) {code}                // 前回の#ifや#elifが適用されておらず、かつconditionがtruthyならcode内を展開する。
@else {code}                            // 前回の#ifや#elifが適用されなかったなら適用する。


```
## ビルトイン型

### Atom型
```Coraft


void

bool

float       // f32のエイリアス

uint        // u32のエイリアス

i8          // int8_t
i16         // int16_t
i32         // int32_t
i64         // int64_t

f16         // _Float16
f32         // float
f64         // double

u8          // uint8_t 
u16         // uint16_t 
u32         // uint32_t
u64         // uint64_t 

char

str         // std::string

null        // nullptr_t


```

### Generic型
```Coraft


array<T, S>             // T[S]. Sは省略可能。その場合生成コードのSも省略される。（廃止する可能性あり）

ptr<P, T>               // P=u: unique_pointer<T>, P=w: weak_pointer<T>, p=s: shared_pointer<T>. Pは省略可能で、デフォルトだとunique。
ref<R, T>               // R=falsy: T&, R=truthy: T&&. Rは省略可能で、デフォルトだとfalsy。

vector<T>               // std::vector<T>
list<T>                 // std::list<T>
map<O, K, V>            // O=falsy: std::unordered_map<K, V>, O=Truthy: std::map<K, V>. Oは省略可能で、デフォルトだとfalsy。

(args, ...) -> result   // std::function<result(args, ...)>

T | U | ...             // std::variant<T, U, ...>

opt<T>                  // std::optional<T>


```

### 指定不能型
代入する前にキャストが必須である。明示的にこれらの型を変数や引数や返り値に指定することはできない。
```


ix                      // int(サイズ不明整数)
ux                      // unsigned int(サイズ不明符号なし整数)
fx                      // float(サイズ不明浮動小数点数)


```

### 疑似型
```


auto             // autoキーワードに置換される

const<T>         // const T


```

## 演算子
```Coraft


A + B
A - B
A * B
A / B
A % B

A << B
A >> B

v++
++v
v--
--v

A == B
A != B
A >= B
A <= B
A > B
A < B

A || B
A && B

A | B
A & B
A ^ B

~A

!A

v = A

v += A
v -= A
v *= A
v /= A
v %= A

v <<= A
v >>= A
v |= A
v &= A
v ^= A

cond ? then : else

contain[i]
f(arg, ...)

namespace::name

obj.member
obj_ptr->member

v as T            //static_cast<T>(v)

new(class)        //Considering abolition
delete(instance)  //Considering abolition

ref(var)        //&var
deref(var)      //*var


```

## 糖衣構文
```Coraft


v(oper, arg1, arg2, ...) //v [oper] arg1 [oper] arg2に展開される。もっぱらstream系クラスを直感的に書くために使う。演算子連鎖（operator-chain）と呼ぶ。

container#               // container.size()に展開される。


```

## キーワード
```Coraft


elif        // else if

enum        // enum class

struct      // struct
class       // class



pub         // 外部ファイルへの公開フラグ。c++20においては`export` それ未満のバージョンにおいては該当キーワードが存在せず、単にヘッダに切り出される。

```

## namespaceの格上げ
一部のC++のstd名前空間にある識別子はグローバルに格上げされる。
```Coraft


map
unordered_map
vector

cout
cin
endl

and more...


```

## コード構造

### 括弧
```Coraft


{}      //ブロックや構造体の定義など
()      //演算優先順位やキャスト、関数呼び出し、演算子連鎖など
[]      //配列添え字
""      //文字列リテラル
''      //文字リテラル
?{}?    //LLMへのインラインプロンプト（トランスパイルの途中、C++コードの保管部分以外が出来上がった後にLLMがC++コードを補完し、生成内容を`{}`で包む。）


```

### ユーザー定義
```

//関数定義
fn functionName(arg ArgType, ...): ReturnType {
    //コード
}

// または

fn functionName(arg ArgType, ...) ReturnType ?{
    //プロンプト
}?

fn functionName ReturnType { //引数がない場合は括弧ごと省略可能
    //コード
}

fn functionName(arg ArgType, ...){ //返り値がない場合は省略可能(void型になる)
    //コード
}

fn functionName(arg ArgType, ...) void; //実装がない場合は省略可能。(プレースホルダーなどに使う)


//変数定義
var variableName Type;

//初期値を与えるには

var variableName Type = initialValue;

//定数にするには

var variableName const<Type>;

```

### ループ
```

//forループ
for(initialize; condition; counting){
    // コード
}

//または

for(element &&T: container){
    // コード
}

//whileループ
while(condition){
    //コード
}

//これらのループは -->
for(initialize; condition; counting)?{      // --> このように、ブロック部分をインラインプロンプトに置き換えた形でも書ける。
    // プロンプト
}?

```
## リテラル
### リテラル
```


1234           //数値
"text テキスト" //文字列
'c'         //文字


```
### リテラルのプレフィックス・サフィックス
これらは大文字小文字を区別する。
```

//プレフィックス
0b                  // 2進数数値
0o                  // 8進数数値
0x                  // 16進数数値(数値部分のアルファベットは小文字のみが認められる)

u8                  // utf8

//サフィックス
U                   //unsignedにする
_8                  //サイズを8bitにする。浮動小数点数には非対応。
_16                 //サイズを16bitにする。
_32                 //サイズを32bitにする。
_64                 //サイズを64bitにする。

L                   // long int
LL                  // long long int

F                   // float 

```

## エントリポイント
```


fn main(args vector<str>) i32;


```