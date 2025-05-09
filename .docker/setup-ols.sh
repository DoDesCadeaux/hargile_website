#!/bin/bash
# Install acme.sh
if [ ! -f "/root/.acme.sh/acme.sh" ]; then
  echo "Installing acme.sh..."
  curl https://get.acme.sh | sh
fi

# Start OpenLiteSpeed
/usr/local/lsws/bin/lswsctrl start
tail -f /usr/local/lsws/logs/error.log
