#!/bin/bash

set -e

URL="https://download.jetbrains.com/python/pycharm-2026.1.tar.gz"
TMP_FILE="/tmp/pycharm.tar.gz"
INSTALL_DIR="/opt/pycharm"
DESKTOP_DIR="/usr/share/applications"

# Absolute path of the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "\e[32m==>\e[0m Starting Pycharm installation..."

# Must run as root
if [[ $EUID -ne 0 ]]; then
    echo -e "\e[32m==>\e[0m Please run with sudo."
    exit 1
fi

# Check required tools
for cmd in curl tar; do
    if ! command -v $cmd &>/dev/null; then
        echo -e "\e[33m==>\e[0m $cmd is required but not installed."
        exit 1
    fi
done

echo -e "\e[32m==>\e[0m Downloading Pycharm..."
curl -L -o "$TMP_FILE" "$URL"

echo -e "\e[32m==>\e[0m Creating install directory..."
mkdir -p "$INSTALL_DIR"

echo -e "\e[32m==>\e[0m Extracting to $INSTALL_DIR..."
tar -xzf "$TMP_FILE" -C "$INSTALL_DIR" --strip-components=1

echo -e "\e[32m==>\e[0m Ensuring applications directory exists..."
mkdir -p "$DESKTOP_DIR"

echo -e "\e[32m==>\e[0m Creating desktop file..."
cat <<'EOF' >"$DESKTOP_DIR/pycharm.desktop"
[Desktop Entry]
Name=Pycharm
Comment=Code Editing. Redefined.
Exec=/opt/pycharm/bin/pycharm
Icon=/opt/pycharm/bin/pycharm.png
Type=Application
Categories=Development;IDE;
Terminal=false
EOF

echo -e "\e[32m==>\e[0m Cleaning up..."
rm -f "$TMP_FILE"

echo -e "\e[32m==>\e[0m Pycharm installed successfully."
