
#include <iostream>
#include <cstdint>
#include <cstddef>
#include <memory>
#include <vector>
#include <string>
#include <variant>
#include <vector>
#include <functional>

auto a = 0;

std::string fizzbuzz(std::int32_t i)
#pragma opah \
    fizzbuzz\


std::int32_t test(std::int32_t i)
#pragma opah \
    フィボナッチ数列のi番目を返す処理を書いてください。\


std::string trim(std::string s)
#pragma opah \
    Trim the string.\


std::string hello()
{
    return "   Hello, World  ";
}

using testType = std::variant<std::int32_t, std::string, std::vector<std::int32_t>>;
struct TestStruct
{
    std::string a;
    std::int32_t b;
}
;

using testType2 = std::variant<std::variant<TestStruct, std::int32_t>, std::int32_t>;
using testFnType = std::function<void (std::int32_t, std::vector<std::int32_t>)>;

std::int32_t co_main(std::vector<std::string> args)
{
    std::string world = trim(hello());
    testType testValue = "abc";
    std::cout << world << std::endl;
    
    #pragma opah \
            You Must console Output "Hello, Coraft" string with std::cout.\
        
    for(auto i = 1; i < 41; i = i + 1)
    {
        std::cout << "==============" << std::endl;
        std::cout << i << std::endl;
        std::cout << fizzbuzz(i) << std::endl;
        std::cout << test(i) << std::endl;
    }
    return 0;
}

int main(int argc, char *argv[])
{
    std::vector<std::string> co_argv(argc);
    for(size_t i = 0; i < argc; ++i)
    {
        co_argv[i] = std::string(argv[i]);
    }
    return static_cast<int>(co_main(co_argv));
}


