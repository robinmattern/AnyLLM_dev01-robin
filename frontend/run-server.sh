#!/bin/bash
   export PORT=$1; if [ "${PORT}" == "" ]; then PORT=3000; fi
   awk -i inplace '/^SERVER_PORT/ { print "SERVER_PORT='${PORT}'"; next}; { print }'  .env

   vite 