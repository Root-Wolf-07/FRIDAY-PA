#!/usr/bin/env bash
# Root convenience launcher to run the linked FRIDAY backend and frontend
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$SCRIPT_DIR/start.sh"
