import std.stdio;

import parser.parser;
import parser.primitive;
import parser.combine;
import parser.basic_words;
import parser.number_literal;
import std.ascii;


void main()
{
	auto parser = numberLiteral();
	auto result = parser.parse("-0x1033ff.3d34po");

	writeln(result);
}
