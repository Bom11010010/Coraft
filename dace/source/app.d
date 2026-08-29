import std.stdio;

import parser.parser;
import parser.primitive;
import parser.combine;
import parser.number_literal;
import parser.other_literal;
import parser.term;
import std.ascii;


void main()
{
	auto parser = boolLiteral();
	auto result = parser.parse("false");

	writeln(result);
}
