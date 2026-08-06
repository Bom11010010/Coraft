
#include <iostream>
#include <cstdint>
#include <cstddef>
#include <memory>
#include <vector>
#include <string>

auto a = 0;

std::string fizzbuzz(std::int32_t i)
{

if(i % 15 == 0)
        return "FizzBuzz";
    if(i % 3 == 0)
        return "Fizz";
    if(i % 5 == 0)
        return "Buzz";
    return std::to_string(i);

}

std::int32_t test(std::int32_t i)
{

    if (i < 1) return 0;
    if (i == 1) return 1;
    if (i == 2) return 1;
    auto a = 1;
    auto b = 1;
    for(auto j = 3; j <= i; j = j + 1)
    {
        auto c = a + b;
        a = b;
        b = c;
    }
    return b;

}

std::string trim(std::string s)
{

    std::string::iterator it = s.begin();
    while(it != s.end() && *it == ' ')
    {
        it++;
    }
    s.erase(s.begin(), it);
    it = s.end();
    while(it != s.begin() && *(it-1) == ' ')
    {
        it--;
    }
    s.erase(it, s.end());
    return s;

}

std::string hello()
{
    return "   Hello, World  ";
}

std::int32_t co_main()
{
    std::string world = trim(hello());
    std::cout << world << std::endl;
    
{

    std::cout << "Hello, Coraft" << std::endl;

}
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
    return static_cast<int>(co_main());
}


