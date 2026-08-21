{
  description = "Coraft";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs, ... }:
  let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in{
    devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [         
          cargo
          rustc
          rust-analyzer

          ninja
          cmake
	  
          
          clang
          libclang

          gcc

          dub
          ldc
          serve-d
          dfmt
        ];

        shellHook = ''
          if ! [ -f DCD/bin/dcd-server ]; then
            git clone "https://github.com/dlang-community/DCD.git"
            cd DCD
            dub build --build=release --config=server
            dub build --build=release --config=client
            cd ..
          fi
          
          export PATH="$PATH:$(realpath DCD/bin)"
        '';

        LIBCLANG_PATH = "${pkgs.libclang.lib}/lib";
        DC = "ldc2";
      };
  };
}
