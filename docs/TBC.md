# 検討中の仕様

## ジェネリック引数の括弧
```


Generic<T>      //こっちと
Generic[T]      //こっちで迷ってる。


```

## repeatループ
```

repeat(i: T; N){ //N回繰り返す。
    //コード
}

```

## parallelループ
```
parallel_for(initialize; condition; counting){
    // コード
}

parallel_for(auto&& element : container){
    // コード
}

// もしrepeatが採用されるなら

parallel_repeat(N){
    // コード
}

```

## 型定義の記号記法
```


*T                      // unique_pointer<T>
+T                      // shared_pointer<T>
-T                      // weak_pointer<T>


&T                      // T&
&&T                     // T&&

?T                      // std::optional<T>


```

## 複素数型
```


//型
complex<T>              //各軸がTタイプの複素数。

//リテラルサフィックス
i                       //純虚数。4iのように書かれ、直前の数値に虚数単位をかけた値になる。


```

## 二重数型
```


//型
dual<T>              //各軸がTタイプの二重数。

//リテラルサフィックス
eps                     //純イプシロン。4epsのように書かれ、直前の数値に二重数単位$\epsilon$をかけた値になる。


```

## 四元数型
```


quaternion<T>           //各軸がTタイプの四元数。


//リテラルサフィックス
i                       //純虚数。4iのように書かれ、直前の数値に虚数単位$\mathrm{i}$をかけた値になる。
j                       //純虚数。4jのように書かれ、直前の数値に虚数単位$\mathrm{j}$をかけた値になる。
k                       //純虚数。4kのように書かれ、直前の数値に虚数単位$\mathrm{k}$をかけた値になる。


```

## pureブロックプレフィックス

```


pure{}                  // スコープ内で定義された名前のみを使えるようにする（外の名前に触れなくする。）


```