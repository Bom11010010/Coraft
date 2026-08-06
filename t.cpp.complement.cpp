#include <string>
#include <iostream>

std::string fizzbuzz(int i)
{

if (i % 15 == 0)
    return "FizzBuzz";
else if (i % 3 == 0)
    return "Fizz";
else if (i % 5 == 0)
    return "Buzz";
else
    return std::to_string(i);

}
bool Mandelbrot(float real, float imag, float t, int repeatCount)
{

{
    float z_real = 0;
    float z_imag = 0;
    for (int i = 0; i < repeatCount; ++i)
    {
        float z_real2 = z_real * z_real - z_imag * z_imag + real;
        float z_imag2 = 2 * z_real * z_imag + imag;
        z_real = z_real2;
        z_imag = z_imag2;
        if (z_real * z_real + z_imag * z_imag > t * t)
        {
            return false;
        }
    }
    return true;
}

}
int main(){
    std::string hello = "";

    hello = "hello";

    std::cout << hello << std::endl;

    for (size_t i = 1; i < 51; ++i)
{

    std::cout << fizzbuzz(i) << std::endl;

}
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
