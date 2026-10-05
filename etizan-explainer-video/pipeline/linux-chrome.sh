#!/bin/sh
# Chromium على Linux (جلسات Claude Code السحابية) — بيشتغل root فلازم --no-sandbox.
# الاستخدام: export CHROME="$PWD/linux-chrome.sh"  (أو أي مسار للسكريبت ده)
exec "${CHROMIUM_BIN:-/opt/pw-browsers/chromium}" --no-sandbox "$@"
