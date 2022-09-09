let pkgs = import <nixpkgs> {};

in pkgs.mkShell rec {
  name = "nautical-next";

  buildInputs = with pkgs; [
    gnumake
    gcc
    readline
    openssl
    libxml2
    curl
    libiconv
    glibcLocales
    jq
    bat
    exa
    git
    nodejs-16_x
    (yarn.override { nodejs = nodejs-16_x; })
    silver-searcher
    fd
    bun
  ];

  shellHook = ''
    export PATH="$PWD/node_modules/.bin/:$PATH"
    alias scripts='jq ".scripts" package.json'
    alias c=bat
    alias g=git
    alias ls=exa

    # VSCode
    code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}

  '';
}
