#!/usr/bin/env bash
cd "$(dirname "$0")"

export CMAKE_GENERATOR=Ninja

cargo about generate about.hbs > ../third_party_licenses/THIRD-PARTY-LICENSES.html

cargo build --release

rm -rf ../bin/opah
cp -r ./target/release ../bin/opah_bin

ln -s ../bin/opah_bin/opah ../bin/opah
