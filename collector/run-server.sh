#!/bin/bash
   export PORT=$1; if [ "${PORT}" == "" ]; then PORT=8888; fi
   awk -i inplace '/^SERVER_PORT/ { print "SERVER_PORT='${PORT}'"; next}; { print }'  .env

   nodemon --ignore hotdir --ignore storage --trace-warnings index.js

