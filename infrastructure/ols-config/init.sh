#!/bin/bash

# Create symbolic links to configuration files
ln -sf /etc/litespeed/templates/httpd_config.conf /usr/local/lsws/conf/httpd_config.conf
mkdir -p /usr/local/lsws/conf/vhosts/hargile
ln -sf /etc/litespeed/vhosts/hargile/vhconf.conf /usr/local/lsws/conf/vhosts/hargile/vhconf.conf

# Create docroot directories
mkdir -p /var/www/vhosts/hargile/html/.well-known/acme-challenge
chown -R lsadm:lsadm /var/www/vhosts/hargile
chmod -R 755 /var/www/vhosts/hargile

# Start OpenLiteSpeed
/usr/local/lsws/bin/lswsctrl start
tail -f /usr/local/lsws/logs/error.log
