{
  description = "default-creds – Open-source default credentials database";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    bun2nix = {
      url = "github:nix-community/bun2nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    bun2nix,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};

    bun2nixPkg = bun2nix.packages.${system}.default;

    default-creds = pkgs.stdenv.mkDerivation (finalAttrs: {
      pname = "default-creds";
      version = "0.0.1";

      src = ./.;

      nativeBuildInputs = [
        pkgs.bun
        bun2nixPkg.hook
      ];

      bunDeps = bun2nixPkg.fetchBunDeps {
        bunNix = ./bun.nix;
      };

      buildPhase = ''
        runHook preBuild
        bun run build
        runHook postBuild
      '';

      installPhase = ''
                runHook preInstall

                mkdir -p $out/share/default-creds/src

                cp -r dist         $out/share/default-creds/dist
                cp -r src/data     $out/share/default-creds/src/data
                cp    package.json $out/share/default-creds/package.json
                cp -r node_modules $out/share/default-creds/node_modules

                mkdir -p $out/bin
                cat > $out/bin/default-creds << EOF
        #!/bin/sh
        export HOST="\''${HOST:-127.0.0.1}"
        export PORT="\''${PORT:-4321}"
        exec ${pkgs.nodejs}/bin/node $out/share/default-creds/dist/server/entry.mjs
        EOF
                chmod +x $out/bin/default-creds

                runHook postInstall
      '';

      meta = {
        description = "Open-source database of factory-set credentials";
        homepage = "https://github.com/anotherhadi/default-creds";
        license = pkgs.lib.licenses.mit;
        mainProgram = "default-creds";
      };
    });
  in {
    packages.${system} = {
      inherit default-creds;
      default = default-creds;
    };

    devShells.${system}.default = pkgs.mkShell {
      packages = [
        pkgs.bun
        bun2nixPkg
      ];
    };

    nixosModules.default = {
      config,
      lib,
      ...
    }: let
      cfg = config.services.default-creds;
    in {
      options.services.default-creds = {
        enable = lib.mkEnableOption "default-creds credential search service";

        port = lib.mkOption {
          type = lib.types.port;
          default = 4321;
          description = "TCP port the service will listen on.";
        };
      };

      config = lib.mkIf cfg.enable {
        systemd.services.default-creds = {
          description = "default-creds – default credentials database";
          wantedBy = ["multi-user.target"];
          after = ["network.target"];

          environment = {
            HOST = "127.0.0.1";
            PORT = toString cfg.port;
          };

          serviceConfig = {
            ExecStart = "${self.packages.${system}.default}/bin/default-creds";
            Restart = "on-failure";
            RestartSec = "5s";

            DynamicUser = true;

            NoNewPrivileges = true;
            PrivateTmp = true;
            ProtectSystem = "strict";
            ProtectHome = true;
            CapabilityBoundingSet = "";
            AmbientCapabilities = "";
            LockPersonality = true;
            MemoryDenyWriteExecute = false;
            RestrictNamespaces = true;
            RestrictRealtime = true;
          };
        };
      };
    };

    nixosModules.default-creds = self.nixosModules.default;
  };
}
