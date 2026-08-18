#!/usr/bin/env bash
cd "$(dirname "$0")"

mkdir -p ../bin/

export CMAKE_GENERATOR=Ninja

cargo about generate about.hbs > ../third_party_licenses/THIRD-PARTY-LICENSES.html

cargo build --release

rm -rf ../bin/opah


cp ./target/release/opah ../bin/opah
