#include <cstdio>
#include <cstdint>
#include <string>
#include <vector>


auto test = std::printf;

std::int32_t co_main(std::vector<std::string> args)
{
    std::string hello = "Hello, World";
    test(hello);
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


