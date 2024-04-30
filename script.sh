#!/bin/bash

case $1 in
    "clean")
        echo "removing node_modules if present"
        rm -rf node_modules
        ;;
    "install-runtime-dependencies")
        echo "Installing runtime dependencies"
        npm install --legacy-peer-deps --no-audit
        ;;
    "check-packages")
        echo "checking if node_modules id present or not"
        if [ ! -d "$PWD/node_modules" ]; then
            echo "running npm install on WebPWA-server"
            npm i
        else
            echo "node_modules already present, skipping install"
        fi
        ;;
    "delete-pm2-process")
        echo "checking status of pm2 process"
        if [ "$(pm2 id WebPWA)" != "[]" ]; then
            echo "pm2 process exist, delete process WebPWA"
            pm2 delete WebPWA
        else
            echo "pm2 process doesn't exist, skipping delete process WebPWA"
        fi
        ;;
esac
