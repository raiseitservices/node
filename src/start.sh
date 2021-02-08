#!/bin/sh
# Starts the application with command (sh start.sh dev)
echo Starting Application    
node -r dotenv/config app.js dotenv_config_path=./config/$1.env
