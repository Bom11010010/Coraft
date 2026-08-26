{
  description = "Coraft";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { nixpkgs, ... }:
  let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in{
    devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [         
          cargo
          cargo-about
          rustc
          rust-analyzer

          ninja
          cmake
	  
          
          clang
          libclang

          gcc
        ];

        LIBCLANG_PATH = "${pkgs.libclang.lib}/lib";
        DC = "ldc2";
      };
  };
}
