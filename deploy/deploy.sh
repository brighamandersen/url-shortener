#!/bin/bash
set -euo pipefail

echo "Deploying short"

# nginx

sudo cp /home/brig/code/url-shortener/deploy/nginx.conf /etc/nginx/conf.d/short.conf

sudo nginx -t
sudo systemctl reload nginx

# systemd

sudo cp /home/brig/code/url-shortener/deploy/systemd.service /etc/systemd/system/short.service

sudo systemctl daemon-reload
sudo systemctl enable short.service
sudo systemctl restart short.service

echo "Deployment complete for short"
