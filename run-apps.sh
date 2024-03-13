#!/bin/bash

   aShow=$1;
   cd /webs/anyllm
if [ "${aShow}" == "show" ]; then
../kill-node-apps.sh show
 else
../kill-node-apps.sh
   nvs 18
   yarn dev:all
   fi
