#include <string>
#include <iostream>

std::string fizzbuzz(int i)
#pragma opah fizzbuzz

bool Mandelbrot(float real, float imag, float t, int repeatCount)
#pragma opah # write mandelbrot set.\
threshold is |z| > t.\
\
mandelbrot(real, imag, t, repeatCount)

int main(){
    std::string hello = "";

    hello = "hello";

    std::cout << hello << std::endl;

    for (size_t i = 1; i < 51; ++i)
    #pragma opah print `fizzbuzz(int)` function's return string.

    for (int y = -100; y < 100; ++y){
        for (int x = -100; x < 100; ++x){
            if(Mandelbrot(x / 40.f, y / 40.f, 2.f, 10)){
                std::cout << "+";
            }else{
                std::cout << " ";
            }
        }
        std::cout << std::endl;
        
    }
    
    return 0;
}