import std.stdio;

import parser.parser;
import parser.primitive;
import parser.combine;
import parser.basic_words;
import std.ascii;


void main()
{
	auto parser = alphanumWord().thenExpect(optional(token(";")));
	auto result = parser.parse("abc+++");

	writeln(result);
}
