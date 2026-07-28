#!/bin/bash

set -e
URL="https://api2.cursor.sh/updates/download/golden/linux-x64/cursor/3.13"
INSTALL_DIR="/opt/cursor"
INSTALL_FILE="$INSTALL_DIR/Cursor.appimage"
DESKTOP_DIR="/usr/share/applications"
ICON_URL="https://ypotqqt69y.ufs.sh/f/HxxcQDnqeRL8eemQLNwLYRh8tnD9qmCFgHZBPpuN0i7b1rd6"

# Absolute path of the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "\e[32m==>\e[0m Starting Cursor installation..."

# Must run as root
if [[ $EUID -ne 0 ]]; then
    echo -e "\e[33m==>\e[0m Please run with sudo."
    exit 1
fi

# Check required tools
if ! command -v curl &>/dev/null; then
    echo -e "\e[33m==>\e[0m curl is required but not installed."
    exit 1
fi

echo -e "\e[32m==>\e[0m Creating install directory..."
mkdir -p "$INSTALL_DIR"

echo -e "\e[32m==>\e[0m Downloading Cursor AppImage..."
curl -L "$URL" -o "$INSTALL_FILE"

echo -e "\e[32m==>\e[0m Making AppImage executable..."
chmod +x "$INSTALL_FILE"

echo -e "\e[32m==>\e[0m Ensuring applications directory exists..."
mkdir -p "$DESKTOP_DIR"

echo -e "\e[32m==>\e[0m Creating desktop file..."
cat <<'EOF' >"$DESKTOP_DIR/cursor.desktop"
[Desktop Entry]
Name=Cursor
Exec=/opt/cursor/Cursor.appimage
Icon=/opt/cursor/cursor.png
Type=Application
Categories=Development;
Terminal=false
EOF

echo -e "\e[32m==>\e[0m Creating icon file..."
curl -L "$ICON_URL" -o "$INSTALL_DIR/cursor.png"

echo -e "\e[32m==>\e[0m Cursor installed successfully."
