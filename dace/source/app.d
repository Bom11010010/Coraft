import std.stdio;

import parser.parser;
import parser.primitive;
import parser.combine;
import parser.basic_words;
import std.ascii;


void main()
{
	auto parser = decimalNumber().
			then(many(
				optional(ws()).
					then(token("+")).
					then(optional(ws())).
					then(decimalNumber())
			)
		);
	auto result = parser.parse("1 + 2 + 32");

	writeln(result);
}
