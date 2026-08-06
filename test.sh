rd "$(dirname "$0")"

rm ./a.cpp ./a.cpp.complement.cpp ./a.out

./build_all.sh
clear

echo "Transpile to C++"
./bin/dace ./t.cor

echo "Complement by LM"
cd opah
./run.sh ../a.cpp
cd ..

echo "Compile C++ to bin"
c++ ./a.cpp.complement.cpp

./a.out
