#!/usr/bin/env bash
cd "$(dirname "$0")"

export CMAKE_GENERATOR=Ninja

cargo run -- "$@"
