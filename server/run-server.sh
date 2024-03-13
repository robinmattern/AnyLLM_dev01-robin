#!/bin/bash
   PORT=$1; if [ "${PORT}" == "" ]; then PORT=4001; fi; export PORT
   awk -i inplace '/^SERVER_PORT/ { print "SERVER_PORT='${PORT}'"; next}; { print }' .env

   nodemon --ignore documents --ignore vector-cache --ignore storage --ignore swagger --trace-warnings index.js  -- ${PORT}
   node ./swagger/init.js