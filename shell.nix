{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.jdk17
    pkgs.gradle
    pkgs.maven   # optional but useful
    pkgs.git
    pkgs.curl
    pkgs.unzip
  ];

  shellHook = ''
    export JAVA_HOME=${pkgs.jdk17}
    export PATH=$JAVA_HOME/bin:$PATH
    echo "Spring Boot dev environment ready 🚀"
  '';
}
