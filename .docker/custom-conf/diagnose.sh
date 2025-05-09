#!/bin/bash

echo "==== DIAGNOSTIC TOOL ===="
echo "Testing connectivity to Next.js server..."
curl -v http://nextjs:3000/

echo "==== CONTAINER NETWORKS ===="
ip addr show

echo "==== DNS RESOLUTION ===="
cat /etc/resolv.conf
nslookup nextjs

echo "==== ROUTES ===="
ip route

echo "==== OPEN PORTS ===="
netstat -tuln

echo "==== OPENLITESPEED CONFIG ===="
cat /usr/local/lsws/conf/httpd_config.conf

echo "==== VHOST CONFIG ===="
ls -la /usr/local/lsws/conf/vhosts/
cat /usr/local/lsws/conf/vhosts/*/vhconf.conf

echo "==== OPENLITESPEED LOGS ===="
tail -n 50 /usr/local/lsws/logs/error.log
