#!/bin/bash

set -e
URL="https://storage.googleapis.com/antigravity-public/antigravity-hub/2.4.2-6711062033203200/linux-x64/Antigravity.tar.gz"
TMP_FILE="/tmp/Antigravity.tar.gz"
INSTALL_DIR="/opt/Antigravity"
DESKTOP_DIR="/usr/share/applications"

# Absolute path of the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "\e[32m==>\e[0m Starting Antigravity installation..."

# Must run as root
if [[ $EUID -ne 0 ]]; then
    echo -e "\e[33m==>\e[0m Please run with sudo."
    exit 1
fi

# Check required tools
for cmd in curl tar; do
    if ! command -v $cmd &>/dev/null; then
        echo -e "\e[33m==>\e[0m $cmd is required but not installed."
        exit 1
    fi
done

echo -e "\e[32m==>\e[0m Downloading Antigravity..."
curl -L -o "$TMP_FILE" "$URL"

echo -e "\e[32m==>\e[0m Creating install directory..."
mkdir -p "$INSTALL_DIR"

echo -e "\e[32m==>\e[0m Extracting to $INSTALL_DIR..."
tar -xzf "$TMP_FILE" -C "$INSTALL_DIR" --strip-components=1

echo -e "\e[32m==>\e[0m Ensuring applications directory exists..."
mkdir -p "$DESKTOP_DIR"

echo -e "\e[32m==>\e[0m Creating desktop file..."
cat <<'EOF' >"$DESKTOP_DIR/antigravity.desktop"
[Desktop Entry]
Name=Antigravity
Comment=Code Editing. Redefined.
Exec=/opt/Antigravity/antigravity
Icon=/opt/Antigravity/resources/app/resources/linux/antigravity.png
Type=Application
Categories=Development;IDE;
Terminal=false
EOF

echo -e "\e[32m==>\e[0m Cleaning up..."
rm -f "$TMP_FILE"

echo -e "\e[32m==>\e[0m Antigravity installed successfully."
